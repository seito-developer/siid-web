import { Metadata } from 'next';

import CounselingCompleteSection from '@/components/CounselingComplete/CounselingCompleteSection';
import { buildPageMetadata, pages } from '@/constants/meta';

export const metadata: Metadata = buildPageMetadata(pages.counselingCompleteFlat, { noindex: true });

export default function CounselingComplete() {
  return <CounselingCompleteSection page={pages.counselingCompleteFlat} />;
}
