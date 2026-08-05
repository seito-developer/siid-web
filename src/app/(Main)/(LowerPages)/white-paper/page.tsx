import { Metadata } from 'next';

import Image from 'next/image';

import Breadcrumb, {
  BreadcrumbProps,
} from '@/components/Breadcrumb/Breadcrumb';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Headline from '@/components/Headline/Headline';
import { buildPageMetadata, pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

import styles from './WhitePaper.module.css';

export const metadata: Metadata = buildPageMetadata(pages.whitePaper);

const LINE_WHITE_PAPER_URL = 'https://bit.ly/4p3SOBn';
const PRIVACY_POLICY_URL = 'https://bug-fix.org/privacy-policy';

const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.whitePaper.name.ja, url: pages.whitePaper.url },
];

export default function WhitePaper() {
  return (
    <div>
      <Headline
        subTitle={pages.whitePaper.name.ja}
        title={pages.whitePaper.name.en}
        description={handleStringHTML(pages.whitePaper.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <section className={styles.WhitePaper}>
          <p className={styles.WhitePaper__Lead}>
            公式LINEへのご登録で、SiiDの紹介資料をダウンロードいただけます。
            <br />
            <a
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.WhitePaper__PolicyLink}
            >
              プライバシーポリシー
            </a>
            にご同意の上、お申し込みください。
          </p>
          <figure className={styles.WhitePaper__Figure}>
            <div className={styles.WhitePaper__Images}>
              <Image
                src="/siid/images/white-paper/page-1.jpg"
                alt="サービス資料の画像１"
                width={960}
                height={540}
              />
              <Image
                src="/siid/images/white-paper/page-2.jpg"
                alt="サービス資料の画像２"
                width={960}
                height={540}
              />
            </div>
            <figcaption className={styles.WhitePaper__Caption}>
              ※画像はイメージです。
            </figcaption>
          </figure>
          <div className={styles.WhitePaper__Actions}>
            <a
              href={LINE_WHITE_PAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.WhitePaper__LineLink}
            >
              公式LINEで資料を受け取る
            </a>
          </div>
        </section>
      </ContentsArea>
    </div>
  );
}
