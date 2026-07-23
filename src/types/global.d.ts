export {};

declare global {
  interface Window {
    // Analytics.tsx の OpenAI Ads ピクセル初期化時に定義される（env 未設定時は undefined）
    __bugfixTrackOpenAIAds?: (
      eventName: string,
      eventData?: Record<string, unknown>,
      options?: Record<string, unknown>,
    ) => void;
  }
}
