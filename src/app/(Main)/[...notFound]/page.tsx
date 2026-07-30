import { notFound } from 'next/navigation';

// root layout をルートグループへ分割したため、どのグループにも一致しない未知の URL を
// (Main) の not-found.tsx(dino ゲーム付き 404)へ着地させる catch-all ルート。
export default function NotFoundCatchAll() {
  notFound();
}
