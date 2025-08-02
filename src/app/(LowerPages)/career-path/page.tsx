import ContentsArea from "@/components/ContentsArea/ContentsArea";
import Headline from "@/components/Headline/Headline";
import styles from "./CareerPath.module.css";
import { Metadata } from "next";
import Breadcrumb, { BreadcrumbProps } from "@/components/Breadcrumb/Breadcrumb";

export const metadata: Metadata = {
  title: "Test | ITエンジニア転職 × 生成AI特化のプログラミングスクール - SiiD",
  description: "Test SiiDは、ITエンジニア転職と生成AIに特化したプログラミングスクールです。実践的なカリキュラムと最新の技術を学び、あなたのキャリアを次のステージへと導きます。",
};

const breadcrumb: BreadcrumbProps[] = [
  { title: "TOP", url: "/" },
  { title: "卒業生の進路", url: "/career-path" },
];

export default function CareerPath() {
  return (
    <div className={styles.CareerPath}>
      <Headline
        subTitle="卒業生の進路"
        title="Career Path"
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
