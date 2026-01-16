import useIsPc from '@/hooks/useIsPc';

import ReskillBanner from '../../ReskillBanner/ReskillBanner';

import ReskillBannerPc from './ReskillBannerPc/ReskillBannerPc';

export default function ReskillBannerSection() {
  const isPc = useIsPc();

  return (
    <a href="" target="_blank" rel="noopener noreferrer">
      {isPc && <ReskillBannerPc />}
      {!isPc && <ReskillBanner />}
    </a>
  );
}
