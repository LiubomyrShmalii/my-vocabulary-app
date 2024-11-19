import React from "react";
import { Word } from "../../types/types";

type HomePageProps = {
  onSelectStatus: (status: number) => void;
  words: Word[];
};

export default function HomePage({ onSelectStatus, words }: HomePageProps) {
  const countWordsByStatus = (status: number) => {
    return words.filter((word) => word.status === status).length;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Виберіть категорію:</h1>
      <button
        onClick={() => onSelectStatus(1)}
        className="w-full max-w-[460px] px-4 py-2 mb-4 bg-blue-500 text-white rounded"
      >
        Слова, які потрібно тестувати ({countWordsByStatus(1)})
      </button>
      <button
        onClick={() => onSelectStatus(2)}
        className="w-full max-w-[460px] px-4 py-2 mb-4 bg-green-500 text-white rounded"
      >
        Слова, які знаю ({countWordsByStatus(2)})
      </button>
      <button
        onClick={() => onSelectStatus(3)}
        className="w-full max-w-[460px] px-4 py-2 bg-red-500 text-white rounded"
      >
        Слова, які треба вчити ({countWordsByStatus(3)})
      </button>
    </div>
  );
}
