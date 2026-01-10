'use client';

import CheckIcon from '@/components/CheckIcon/CheckIcon';
import useIsPc from '@/hooks/useIsPc';

import styles from './GenerativeAi.module.css';
import AiIllustration from './Icons/AiIllustration';
import ChatGptIcon from './Icons/ChatGptIcon';
import CursorIcon from './Icons/CursorIcon';
import DocumentIcon from './Icons/DocumentIcon';
import DocumentIconPc from './Icons/DocumentIconPc';
import GithubCopilotIcon from './Icons/GithubCopilotIcon';

export default function GenerativeAi() {
  const isPc = useIsPc();
  return (
    <div className={styles.GenerativeAi}>
      <div className={styles.GenerativeAi__Container}>
        <div className={styles.GenerativeAi__Title}>{'</ GenerativeAi >'}</div>
        <h2 className={styles.GenerativeAi__Heading}>生成AIへの取り組み</h2>

        <ul className={styles.GenerativeAi__List}>
          <li className={styles.GenerativeAi__Item}>
            <h3 className={styles.GenerativeAi__Header}>
              <div className={styles.GenerativeAi__HeaderIcon}>
                <CheckIcon />
              </div>
              <span className={styles.GenerativeAi__HeaderText}>生成AIはエンジニアの「新たな常識」</span>
            </h3>
            <p className={styles.GenerativeAi__Text}>
              生成AIの登場により、開発現場の生産性は飛躍的に向上し、エンジニアに求められるスキルレベルは急速に底上げされています。
              <br />
              それに伴い、企業の採用基準も「生成AIを使いこなせること」が前提となりつつあります。
              <br />
              当スクールは、この時代の変化を先取りし、すべての受講生が生成AIを「武器」として使いこなし、市場価値の高いエンジニアになるための指導を徹底しています。
            </p>

            <div className={styles.GenerativeAi__Illustration}>
              <AiIllustration />
            </div>
          </li>

          <li className={styles.GenerativeAi__Item}>
            <h3 className={styles.GenerativeAi__Header}>
              <div className={styles.GenerativeAi__HeaderIcon}>
                <CheckIcon />
              </div>
              <span className={styles.GenerativeAi__HeaderText}>単なる「使い方」では終わらない</span>
            </h3>
            <p className={styles.GenerativeAi__Text}>私たちは、ツールの操作方法を教えるだけではありません。生産性を最大化し、自身のスキルとして血肉化させるための「効果的な活用術」を、以下のツールを通じて実践的に指導します。</p>

            <div className={styles.GenerativeAi__Tools}>
              <div className={styles.GenerativeAi__Tool}>
                <h4 className={styles.GenerativeAi__ToolTitle}>ChatGPT</h4>
                <p className={styles.GenerativeAi__ToolDescription}>仕様の整理/コードの壁打ち/エラー解決など</p>
                <div className={styles.GenerativeAi__ToolIcons}>
                  <ChatGptIcon />
                </div>
              </div>

              <div className={styles.GenerativeAi__Tool}>
                <h4 className={styles.GenerativeAi__ToolTitle}>GitHub Copilot & Cursor</h4>
                <p className={styles.GenerativeAi__ToolDescription}>精度の高いコード補完による開発速度の向上</p>
                <div className={styles.GenerativeAi__ToolIcons}>
                  <GithubCopilotIcon />
                  <CursorIcon />
                </div>
              </div>
            </div>
          </li>

          <li className={styles.GenerativeAi__Item}>
            <h3 className={styles.GenerativeAi__Header}>
              <div className={styles.GenerativeAi__HeaderIcon}>
                <CheckIcon />
              </div>
              <span className={styles.GenerativeAi__HeaderText}>生成AIはエンジニアの「新たな常識」</span>
            </h3>
            <p className={styles.GenerativeAi__Text}>一部のカリキュラムでは当スクール独自開発の「AI先生」が、あなたの学習を強力にサポートします。</p>
            <div className={styles.GenerativeAi__Example}>
              <div className={styles.GenerativeAi__ExampleIcon}>{isPc ? <DocumentIconPc /> : <DocumentIcon />}</div>
              <h4 className={styles.GenerativeAi__ExampleTitle}>
                <span className={styles.GenerativeAi__ExampleTitleTag}>具体例</span>
                <span className={styles.GenerativeAi__ExampleTitleText}>AI先生との書類作成</span>
              </h4>
              <p className={styles.GenerativeAi__ExampleText}>AI先生と対話しながら履歴書や職務経歴書を作成することで、従来の作成方法に比べ、推定4〜5倍のスピードで質の高い書類を完成させることが可能です。</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
