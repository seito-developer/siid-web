import fs from 'fs';
import path from 'path';

export interface LinePresent {
  no: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
}

export function getLinePresents(): LinePresent[] {
  const filePath = path.join(process.cwd(), 'src/data/linePresents.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
