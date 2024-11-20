import React from "react";
import { Word } from "../../types/types";

type WordListProps = {
  words: Word[];
  onGoHome: () => void;
};

export default function WordList({ words, onGoHome }: WordListProps) {
  const knownWords = words.filter((word) => word.status === 2);

  const resetProgress = () => {
    localStorage.clear(); // Очищення LocalStorage
    window.location.reload(); // Перезавантаження сторінки
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Слова, які я знаю</h1>
      <button
        onClick={onGoHome}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded w-full max-w-md min-w-[370px]"
      >
        Повернутися на головну
      </button>
      <button
        onClick={resetProgress}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded w-full max-w-md min-w-[370px]"
      >
        Скинути весь прогрес
      </button>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {knownWords.map((word) => (
          <div
            key={word.id}
            className="p-4 border border-gray-300 rounded shadow-sm bg-green-200 text-center"
          >
            <p className="text-lg font-bold">{word.de}</p>
            <p className="text-sm text-gray-600">{word.ua}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
