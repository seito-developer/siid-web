# LP リニューアル セクション別実測データ

PSD から自動生成したセクションごとの座標・サイズ・テキスト全文・スタイル。
実装時はここを参照し、PSD を直接開かなくても済むようにする。

生成: `python3 scripts/lp-career/gen-section-docs.py <PSD ディレクトリ> --out-dir docs/spec/lp-career-sections`

並び順は DOM 順(`docs/spec/07_lp-career-renewal.md` §3.1 の決定に従い FAQ → FREE GIFTS)。

| # | セクション | コンポーネント | 補足 |
|---|-----------|--------------|------|
| 01 | [ヘッダー(固定ナビ)](./01-header.md) | `header` |  |
| 02 | [FV(動画背景)](./02-fv.md) | `fv` | [補足](./02-fv.notes.md) |
| 03 | [ABOUT](./03-about.md) | `about` |  |
| 04 | [RESULTS(カルーセル)](./04-result.md) | `result` |  |
| 05 | [INSTRUCTOR](./05-instructor.md) | `instructor` |  |
| 06 | [STRENGTH](./06-strength.md) | `strength` |  |
| 07 | [DIFFERENCE(他社比較)](./07-difference.md) | `difference` |  |
| 08 | [内定までの 5STEP](./08-step.md) | `step` |  |
| 09 | [SKILLS(カリキュラム)](./09-skill.md) | `skill` |  |
| 10 | [RESKILLING SUPPORT(給付金)](./10-support.md) | `support` |  |
| 11 | [PRICING(料金プラン)](./11-plan.md) | `plan` |  |
| 12 | [コース比較表](./12-graph.md) | `graph` | [補足](./12-graph.notes.md) |
| 13 | [VOICE(受講生の声)](./13-voice.md) | `voice` |  |
| 14 | [FAQ](./14-faq.md) | `faq` |  |
| 15 | [FREE GIFTS(7 大特典)](./15-present.md) | `present` |  |
| 16 | [FREE COUNSELING(予約フォーム)](./16-counselling.md) | `counselling` |  |
| 17 | [SP ドロワーメニュー](./17-drawer.md) | `drawer` |  |
