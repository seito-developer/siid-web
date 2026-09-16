import PageTransition from '@/components/PageTransition/PageTransition';

// layout と違い template はクライアント遷移のたびに作り直されるため、
// ページのフェードイン(PageTransition)を毎回やり直せる。NavigationPcLower は
// layout 側に置いたままなので、遷移しても remount されずスクロール状態を保つ。
export default function LowerPagesTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
