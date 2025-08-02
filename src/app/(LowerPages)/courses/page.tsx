import ContentsArea from "@/components/ContentsArea/ContentsArea";
import Headline from "@/components/Headline/Headline";
import styles from "./Courses.module.css";
import { Metadata } from "next";
import Breadcrumb, { BreadcrumbProps } from "@/components/Breadcrumb/Breadcrumb";
import { commonTitle, pages } from "@/constants/meta";
import { handleStringHTML } from "@/utils/helper";

export const metadata: Metadata = {
  title: `${pages.courses.name.ja} | ${commonTitle}`,
  description: handleStringHTML(pages.courses.description, false),
};


const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.courses.name.ja, url: pages.courses.url },
];

export default function Courses() {
  return (
    <div className={styles.Courses}>
      <Headline
        subTitle={pages.courses.name.ja}
        title={pages.courses.name.en}
        description={handleStringHTML(pages.courses.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <div style={{ height: "1000px" }}>
          Contents Area
        </div>
      </ContentsArea>
    </div>
  )
}
