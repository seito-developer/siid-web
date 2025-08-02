import ContentsArea from "@/components/ContentsArea/ContentsArea";
import Headline from "@/components/Headline/Headline";
import styles from "./Courses.module.css";
import { Metadata } from "next";
import Breadcrumb, { BreadcrumbProps } from "@/components/Breadcrumb/Breadcrumb";

export const metadata: Metadata = {
  title: "Test | ITエンジニア転職 × 生成AI特化のプログラミングスクール - SiiD",
  description: "Test SiiDは、ITエンジニア転職と生成AIに特化したプログラミングスクールです。実践的なカリキュラムと最新の技術を学び、あなたのキャリアを次のステージへと導きます。",
};

const breadcrumb: BreadcrumbProps[] = [
  { title: "TOP", url: "/" },
  { title: "コース一覧", url: "/courses" },
];

export default function Courses() {
  return (
    <div className={styles.Courses}>
      <Headline
        subTitle="コース一覧"
        title="Courses"
        description="ここはページのディスクリプションに関する内容が入る想定をしています。PCでは2行、SPでは3行になります。"
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
