import NavigationPcLower from '@/components/Navigation/NavigationPcLower/NavigationPcLower';

export default function LowerPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationPcLower />
      {children}
    </>
  );
}
