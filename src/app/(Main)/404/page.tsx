import { notFound } from 'next/navigation';

// `next build` は Pages Router 由来の 404.html を常に出力し、`/404` という URL はその静的ページに
// 一致してしまう(Issue #154)。App Router 側に同じパスのルートを置いて、他の未知の URL と同じ
// (Main) の not-found.tsx(dino ゲーム付き 404)へ着地させる。dev では再現しない(production build のみ)。
export default function NotFoundAlias() {
  notFound();
}
