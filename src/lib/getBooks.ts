import fs from 'fs';
import path from 'path';

export interface Book {
  title: string;
  publisher: string;
  date: string;
  imageUrl: string;
  link: string;
  // Amazon の購入ページ。出版社ページ(link)と別に持つ
  amazonLink?: string;
  width: number;
  height: number;
}

export function getBooks(): Book[] {
  const filePath = path.join(process.cwd(), 'src/data/books.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
