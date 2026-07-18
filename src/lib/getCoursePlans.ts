import fs from 'fs';
import path from 'path';

export type CoursePlanId = 'career' | 'fullSupport' | 'vip';

export interface CoursePlanFeature {
  text: string;
  em?: string;
}

export interface CoursePlan {
  id: CoursePlanId;
  title: string[];
  description: string;
  price: string;
  subsidizedPrice: string;
  recommend: boolean;
  features: CoursePlanFeature[];
  advice: string[];
}

export interface ComparisonGoal {
  items?: string[];
  text?: string;
  em?: string;
}

export interface ComparisonRow {
  label: string;
  values: [string, string, string];
}

export interface CourseComparisonData {
  goal: ComparisonGoal[];
  software: string[];
  human: string[];
  rows: ComparisonRow[];
  note: string;
}

export interface CoursePlansData {
  plans: CoursePlan[];
  comparison: CourseComparisonData;
}

export function getCoursePlansData(): CoursePlansData {
  const filePath = path.join(process.cwd(), 'src/data/coursePlans.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
