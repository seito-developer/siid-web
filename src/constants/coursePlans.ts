import type { CoursePlanId } from '@/lib/getCoursePlans';

/**
 * コース紹介カード（/courses）のアンカー ID。
 * グローバルナビ・フッターの「コース/プラン」下層メニューから `/courses#...` で参照する。
 * getCoursePlans.ts は `fs` を使うサーバー専用モジュールのため、型のみを import している。
 */
export const COURSE_PLAN_ANCHOR_IDS: Record<CoursePlanId, string> = {
  career: 'plan-career',
  fullSupport: 'plan-full-support',
  vip: 'plan-vip',
};
