export type Word = {
  id: number;
  de: string;
  ua: string;
  status: number; // 1 - не тестовані, 2 - знаю, 3 - треба вчити
  options: string[];
};
