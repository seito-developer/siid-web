import { Metadata } from 'next';

import CounselingCompleteSection from '@/components/CounselingComplete/CounselingCompleteSection';
import { buildPageMetadata, pages } from '@/constants/meta';

export const metadata: Metadata = buildPageMetadata(pages.counselingCompleteLp1, { noindex: true });

export default function CounselingCompleteLp1() {
  return <CounselingCompleteSection page={pages.counselingCompleteLp1} />;
}
