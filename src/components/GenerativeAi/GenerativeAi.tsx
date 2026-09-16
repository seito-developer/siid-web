import styles from './GenerativeAi.module.css';
import AiIllustration from './Icons/AiIllustration';
import ClaudeIcon from './Icons/ClaudeIcon';
import DocumentIcon from './Icons/DocumentIcon';
import DocumentIconPc from './Icons/DocumentIconPc';
import GithubCopilotIcon from './Icons/GithubCopilotIcon';
import OpenAiIcon from './Icons/OpenAiIcon';

export default function GenerativeAi() {
  return (
    <div className={styles.GenerativeAi}>
      <div className={styles.GenerativeAi__Container}>
        <div className={styles.GenerativeAi__Title}>{'</ GenerativeAi >'}</div>
        <h2 className={styles.GenerativeAi__Heading}>生成AIへの取り組み</h2>

        <ul className={styles.GenerativeAi__List}>
          <li className={styles.GenerativeAi__Item}>
            <h3 className={styles.GenerativeAi__Header}>
              <div className={styles.GenerativeAi__HeaderIcon}>
                <svg width="97" height="111" fill="none">
                  <use href="#Hexagon" />
                </svg>
                <span className={styles.GenerativeAi__HeaderIconText}>CHECK</span>
              </div>
              <span className={styles.GenerativeAi__HeaderText}>生成AIはエンジニアの「新たな常識」</span>
            </h3>
            <p className={styles.GenerativeAi__Text}>
              生成AIの登場により、開発現場の生産性は飛躍的に向上し、エンジニアに求められるスキルレベルは急速に底上げされています。
              <br />
              それに伴い、当スクールでもAIによる学習促進とAI駆動開発スキルが学べるカリキュラムをご提供します。
            </p>

            <div className={styles.GenerativeAi__Illustration}>
              <AiIllustration />
            </div>
          </li>

          <li className={styles.GenerativeAi__Item}>
            <h3 className={styles.GenerativeAi__Header}>
              <div className={styles.GenerativeAi__HeaderIcon}>
                <svg width="97" height="111" fill="none">
                  <use href="#Hexagon" />
                </svg>
                <span className={styles.GenerativeAi__HeaderIconText}>CHECK</span>
              </div>
              <span className={styles.GenerativeAi__HeaderText}>単なる「使い方」では終わらない</span>
            </h3>
            <p className={styles.GenerativeAi__Text}>私たちは、ツールの操作方法を教えるだけではありません。生産性を最大化し、自身のスキルとして血肉化させるための「効果的な活用術」を、以下のツールを通じて実践的に指導します。</p>

            <div className={styles.GenerativeAi__Tools}>
              <div className={styles.GenerativeAi__Tool}>
                <h4 className={styles.GenerativeAi__ToolTitle}>ChatGPT, GitHub Copilot</h4>
                <p className={styles.GenerativeAi__ToolDescription}>プロンプトエンジニアリングやコード補完を学ぶ</p>
                <div className={styles.GenerativeAi__ToolIcons}>
                  <OpenAiIcon />
                  <GithubCopilotIcon />
                </div>
              </div>

              <div className={styles.GenerativeAi__Tool}>
                <h4 className={styles.GenerativeAi__ToolTitle}>Codex, Claude Code</h4>
                <p className={styles.GenerativeAi__ToolDescription}>AIエージェントによる開発手法を学ぶ</p>
                <div className={styles.GenerativeAi__ToolIcons}>
                  <OpenAiIcon />
                  <ClaudeIcon />
                </div>
              </div>
            </div>
          </li>

          <li className={styles.GenerativeAi__Item}>
            <h3 className={styles.GenerativeAi__Header}>
              <div className={styles.GenerativeAi__HeaderIcon}>
                <svg width="97" height="111" fill="none">
                  <use href="#Hexagon" />
                </svg>
                <span className={styles.GenerativeAi__HeaderIconText}>CHECK</span>
              </div>
              <span className={styles.GenerativeAi__HeaderText}>転職活動もAIで効率化</span>
            </h3>
            <p className={styles.GenerativeAi__Text}>「言語化が難しい自己分析・企業研究・書類作成」はAIではじめの8割を作成し、最後を人間の講師が添削・伴走支援します。</p>
            <div className={styles.GenerativeAi__Example}>
              <div className={`${styles.GenerativeAi__ExampleIcon} ${styles.GenerativeAi__ExampleIconSp}`}>
                <DocumentIcon />
              </div>
              <div className={`${styles.GenerativeAi__ExampleIcon} ${styles.GenerativeAi__ExampleIconPc}`}>
                <DocumentIconPc />
              </div>
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
