import { Metadata } from 'next';

import { redirect } from 'next/navigation';

import Breadcrumb, { BreadcrumbProps } from '@/components/Breadcrumb/Breadcrumb';
import CareerPathList, { ITEMS_PER_PAGE } from '@/components/CareerPath/CareerPathList/CareerPathList';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Headline from '@/components/Headline/Headline';
import { buildPageMetadata, pages } from '@/constants/meta';
import { getInterviews } from '@/lib/getInterviews';
import { handleStringHTML } from '@/utils/helper';
import { getTotalPages } from '@/utils/pagination';

import styles from './CareerPath.module.css';

// ビルド時点の件数分のページを事前生成する。記事が増えて生じた新しいページ番号は
// 初回アクセス時に生成され、以降は getInterviews の revalidate(10 分)で更新される。
export async function generateStaticParams() {
  const { totalCount } = await getInterviews({ limit: 1 });
  const totalPages = Math.max(1, getTotalPages(totalCount, ITEMS_PER_PAGE));
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  // ページ番号ごとに自己参照 canonical を出力する(/career-path/1, /career-path/2, …)
  return buildPageMetadata(pages.careerPath, {
    canonicalPath: `${pages.careerPath.url}/${page}`,
  });
}

const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.careerPath.name.ja, url: pages.careerPath.url },
];

interface PageProps {
  params: Promise<{
    page: string;
  }>;
}

export default async function CareerPath({ params }: PageProps) {
  const { page } = await params;

  // Number() は 01 / 1.0 / 0x1 / 1e0 も 1 にしてしまい、それぞれが自己参照 canonical を持つ
  // 重複ページになる。正規の表記（先頭 0 なしの正の整数）以外は 1 ページ目へ寄せる。
  if (!/^[1-9]\d*$/.test(page)) {
    redirect('/career-path/1');
  }
  const currentPage = Number(page);

  const { contents, totalCount } = await getInterviews({
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
  });
  const totalPages = getTotalPages(totalCount, ITEMS_PER_PAGE);

  // 取得失敗時は totalCount が 0 になる。その場合にリダイレクトすると /career-path/1 自身へ
  // 無限リダイレクトするため、ページ数が分かっているときだけ範囲外を 1 ページ目へ戻す。
  if (totalPages > 0 && currentPage > totalPages) {
    redirect('/career-path/1');
  }

  return (
    <div>
      <Headline
        subTitle={pages.careerPath.name.ja}
        title={pages.careerPath.name.en}
        description={handleStringHTML(pages.careerPath.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <div className={styles.CareerPath__Wrapper}>
          <CareerPathList
            interviews={contents}
            totalCount={totalCount}
            currentPage={currentPage}
          />
        </div>
      </ContentsArea>
    </div>
  );
}
