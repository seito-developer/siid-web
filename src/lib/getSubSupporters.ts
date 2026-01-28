import fs from 'fs';
import path from 'path';

export interface SubSupporter {
  id: string;
  name: string;
  englishName: string;
  role: string;
  avatarUrl: string;
}

export function getSubSupporters(): SubSupporter[] {
  const filePath = path.join(process.cwd(), 'src/data/subSupporters.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
