#!/usr/bin/env node
/**
 * fetch-graduates.mjs — YouTube チャンネルから卒業生インタビュー動画を取得し、
 * src/data/graduates/ を更新するスクリプト。
 *
 * 使い方:
 *   node scripts/fetch-graduates.mjs            # 新規動画をドラフトとして追加
 *   node scripts/fetch-graduates.mjs --dry-run  # 変更せずに検出結果だけ表示
 *   YOUTUBE_API_KEY=xxx node scripts/fetch-graduates.mjs  # 全履歴を取得（API版）
 *
 * 設計方針:
 *   - 既存の student-*.json（手作業でキュレーション済み）は youtubeId で照合し、
 *     絶対に上書きしない（非破壊マージ）。
 *   - YouTube のメタデータから機械的に取れる項目のみ自動で埋める
 *     （youtubeId / title / description / thumbnail / publishedAt、タイトルから age・sex）。
 *   - achievement / detailContent / reason などの編集フィールドは動画を視聴しないと
 *     書けないため空のまま。新規動画は `_draft: true` を付けて追加し、
 *     getCareerPathData() 側で描画対象から除外される。人がフィールドを埋めて
 *     `_draft` を削除すると公開される。
 *
 * データ取得元:
 *   - 既定: チャンネルの RSS フィード（依存ゼロ・最新15件）。増分更新向け。
 *   - YOUTUBE_API_KEY があれば YouTube Data API v3（uploads プレイリスト全件）を使用。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GRADUATES_DIR = path.join(__dirname, '..', 'src', 'data', 'graduates');

// --- 設定（環境変数で上書き可能） ---
const CHANNEL_ID = process.env.SIID_CHANNEL_ID || 'UCm94WagHb7fgz6Xn5F3NXkA'; // @programming-siid
// 卒業生インタビュー動画を判定するタイトルパターン
const TITLE_PATTERN = new RegExp(
  process.env.GRAD_TITLE_PATTERN || 'SiiD実績|\\d{2}代(?:男性|女性)',
);
const API_KEY = process.env.YOUTUBE_API_KEY || '';

const DRY_RUN = process.argv.includes('--dry-run');

/** RSS フィードから動画一覧を取得（最新15件・依存ゼロ） */
async function fetchFromRss() {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RSS 取得失敗: ${res.status} ${res.statusText}`);
  const xml = await res.text();

  const entries = xml.split('<entry>').slice(1);
  return entries.map((entry) => {
    const pick = (re) => (entry.match(re)?.[1] ?? '').trim();
    const decode = (s) =>
      s
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');
    return {
      videoId: pick(/<yt:videoId>([^<]+)<\/yt:videoId>/),
      title: decode(pick(/<title>([^<]*)<\/title>/)),
      description: decode(pick(/<media:description>([\s\S]*?)<\/media:description>/)),
      thumbnail: pick(/<media:thumbnail url="([^"]+)"/),
      publishedAt: pick(/<published>([^<]+)<\/published>/),
    };
  });
}

/** YouTube Data API v3 から全アップロード動画を取得（要 API キー） */
async function fetchFromApi() {
  const chRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`,
  );
  if (!chRes.ok) throw new Error(`channels API 失敗: ${chRes.status}`);
  const chJson = await chRes.json();
  const uploads =
    chJson.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads) throw new Error('uploads プレイリストが見つかりません');

  const videos = [];
  let pageToken = '';
  do {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${uploads}&pageToken=${pageToken}&key=${API_KEY}`,
    );
    if (!res.ok) throw new Error(`playlistItems API 失敗: ${res.status}`);
    const json = await res.json();
    for (const item of json.items ?? []) {
      const s = item.snippet;
      videos.push({
        videoId: s.resourceId?.videoId,
        title: s.title ?? '',
        description: s.description ?? '',
        thumbnail:
          s.thumbnails?.maxres?.url ||
          s.thumbnails?.high?.url ||
          s.thumbnails?.default?.url ||
          '',
        publishedAt: s.publishedAt ?? '',
      });
    }
    pageToken = json.nextPageToken ?? '';
  } while (pageToken);
  return videos;
}

/** タイトルから年代・性別を推定（例: 「30代男性」→ age:30, sex:'男性'） */
function parseTitle(title) {
  const age = Number(title.match(/(\d{2})代/)?.[1] ?? 0);
  const sex = title.includes('男性') ? '男性' : title.includes('女性') ? '女性' : '';
  return { age, sex };
}

/** 既存の卒業生データを読み込み、youtubeId→データ のマップと最大 id を返す */
function loadExisting() {
  const files = fs.existsSync(GRADUATES_DIR)
    ? fs.readdirSync(GRADUATES_DIR).filter((f) => f.endsWith('.json'))
    : [];
  const byVideoId = new Map();
  let maxId = 0;
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(GRADUATES_DIR, file), 'utf-8'));
    if (data.youtubeId) byVideoId.set(data.youtubeId, file);
    const idNum = parseInt(data.id, 10);
    if (!Number.isNaN(idNum)) maxId = Math.max(maxId, idNum);
  }
  return { byVideoId, maxId };
}

/** 新規動画からドラフト用の卒業生データを生成 */
function buildDraft(video, id) {
  const { age, sex } = parseTitle(video.title);
  return {
    id: String(id),
    title: video.title,
    voice: String(id).padStart(2, '0'),
    youtubeId: video.videoId,
    description: video.description,
    tags: [],
    age,
    sex,
    course: '',
    reason: '',
    detailTitle: '',
    achievement: '',
    detailContent: '',
    thumbnail: video.thumbnail,
    publishedAt: video.publishedAt,
    // 動画視聴が必要な編集フィールドが未記入であることを示すフラグ。
    // getCareerPathData() で描画対象から除外される。人が埋めたら削除すること。
    _draft: true,
  };
}

async function main() {
  const useApi = Boolean(API_KEY);
  console.log(
    `取得元: ${useApi ? 'YouTube Data API v3（全履歴）' : 'RSS フィード（最新15件）'}`,
  );

  const videos = useApi ? await fetchFromApi() : await fetchFromRss();
  const graduateVideos = videos.filter((v) => v.videoId && TITLE_PATTERN.test(v.title));
  console.log(
    `動画 ${videos.length} 件中、卒業生インタビュー候補 ${graduateVideos.length} 件`,
  );

  const { byVideoId, maxId } = loadExisting();
  let nextId = maxId;
  const added = [];
  const skipped = [];

  for (const video of graduateVideos) {
    if (byVideoId.has(video.videoId)) {
      skipped.push(video);
      continue;
    }
    nextId += 1;
    const draft = buildDraft(video, nextId);
    const filename = `student-${nextId}.json`;
    if (!DRY_RUN) {
      fs.writeFileSync(
        path.join(GRADUATES_DIR, filename),
        JSON.stringify(draft, null, 2) + '\n',
        'utf-8',
      );
    }
    added.push({ filename, video });
  }

  console.log('\n--- 結果 ---');
  console.log(`既存として維持（スキップ）: ${skipped.length} 件`);
  console.log(`${DRY_RUN ? '追加予定' : '追加'}（ドラフト）: ${added.length} 件`);
  for (const { filename, video } of added) {
    console.log(`  + ${filename}  ${video.title}`);
  }
  if (added.length > 0) {
    console.log(
      '\n※ 追加分は _draft:true のためサイトには未表示です。' +
        '\n  各 student-*.json の course / reason / detailTitle / achievement / detailContent / tags を' +
        '\n  動画を視聴して記入し、"_draft": true を削除すると公開されます。',
    );
  }
  if (DRY_RUN) console.log('\n(--dry-run のためファイルは書き込んでいません)');
}

main().catch((err) => {
  console.error('エラー:', err.message);
  process.exit(1);
});
