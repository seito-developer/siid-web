import { Metadata } from 'next';

import NavigationPcLower from '@/components/Navigation/NavigationPcLower/NavigationPcLower';
import NotFoundHero from '@/components/NotFound/NotFoundHero';
import { commonTitle, pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

export const metadata: Metadata = {
  title: `${pages.notFound.name.en.toUpperCase()} | ${commonTitle}`,
  description: handleStringHTML(pages.notFound.description, false),
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div>
      <NavigationPcLower />
      <NotFoundHero />
    </div>
  );
}
