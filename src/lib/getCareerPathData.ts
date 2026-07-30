import fs from 'fs';
import path from 'path';

import { CareerPathData } from '@/types/career';

export function getCareerPathData(): CareerPathData[] {
  const graduatesDir = path.join(process.cwd(), 'src/data/graduates');
  const files = fs.readdirSync(graduatesDir);

  const careerPathData = files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const filePath = path.join(graduatesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as CareerPathData;
    })
    // 編集フィールド未記入のドラフト（fetch-graduates スクリプトが追加）は表示しない
    .filter(data => !data._draft)
    .sort((a, b) => {
      const numA = parseInt(a.id, 10);
      const numB = parseInt(b.id, 10);
      return numB - numA;
    });

  return careerPathData;
}
