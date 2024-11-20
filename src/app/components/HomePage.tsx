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
    <div className="top">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Виберіть категорію:
      </h1>
      <button
        onClick={() => onSelectStatus(1)}
        className="w-full min-w-[370px] px-4 py-2 mb-4 bg-blue-500 text-white rounded text-center"
      >
        Слова, які потрібно тестувати ({countWordsByStatus(1)})
      </button>
      <button
        onClick={() => onSelectStatus(2)}
        className="w-full min-w-[370px] px-4 py-2 mb-4 bg-green-500 text-white rounded text-center"
      >
        Слова, які знаю ({countWordsByStatus(2)})
      </button>
      <button
        onClick={() => onSelectStatus(3)}
        className="w-full min-w-[370px] px-4 py-2 bg-red-500 text-white rounded text-center"
      >
        Слова, які треба вчити ({countWordsByStatus(3)})
      </button>
    </div>
  );
}
