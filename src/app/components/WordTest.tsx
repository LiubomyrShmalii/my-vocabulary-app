import React, { useState, useEffect } from "react";
import { Word } from "../../types/types";

type WordTestProps = {
  words: Word[];
  status: number;
  onGoHome: () => void;
  onUpdateWordStatus: (id: number, newStatus: number) => void;
};

export default function WordTest({
  words,
  status,
  onGoHome,
  onUpdateWordStatus,
}: WordTestProps) {
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<{
    index: number | null;
    isCorrect: boolean | null;
  }>({
    index: null,
    isCorrect: null,
  });
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const filteredWords = words.filter((word) => word.status === status);

    if (filteredWords.length > 0 && shuffledWords.length === 0) {
      const shuffleArray = (array: Word[]) =>
        [...array].sort(() => Math.random() - 0.5);

      setShuffledWords(shuffleArray(filteredWords));
      setCurrentIndex(0);
    }
  }, [words, status, shuffledWords.length]);

  if (shuffledWords.length === 0) {
    return (
      <div className="top3">
        <p className="text-lg">Усі слова з цієї категорії пройдено!</p>
        <button
          onClick={onGoHome}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded w-full"
        >
          Повернутись на головну
        </button>
      </div>
    );
  }

  const currentWord = shuffledWords[currentIndex];

  const handleAnswer = (isCorrect: boolean, index: number) => {
    if (isLocked) return;
    setIsLocked(true);

    setSelectedAnswer({ index, isCorrect });
    onUpdateWordStatus(currentWord.id, isCorrect ? 2 : 3);

    if (!isCorrect) {
      const correctIndex = currentWord.options.findIndex(
        (option) => option === currentWord.ua
      );
      setTimeout(() => {
        setCorrectAnswerIndex(correctIndex);
      }, 500);
    }

    setTimeout(() => {
      if (currentIndex < shuffledWords.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShuffledWords([]);
      }
      setIsLocked(false);
      setSelectedAnswer({ index: null, isCorrect: null });
      setCorrectAnswerIndex(null);
    }, 2000);
  };

  return (
    <div className="top3">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Що означає: <span className="text-blue-600">{currentWord.de}</span>?
      </h2>
      <div className="grid grid-cols-1 gap-4 w-full">
        {currentWord.options.map((option, index) => {
          let buttonColor = "bg-gray-100 text-gray-800";
          if (selectedAnswer.index === index) {
            buttonColor = selectedAnswer.isCorrect
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white";
          } else if (correctAnswerIndex === index) {
            buttonColor = "bg-green-500 text-white";
          }

          return (
            <button
              key={index}
              className={`px-4 py-2 border rounded ${buttonColor} text-center break-words`}
              onClick={() => handleAnswer(option === currentWord.ua, index)}
              disabled={isLocked}
            >
              {option}
            </button>
          );
        })}
      </div>
      <button
        onClick={onGoHome}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded w-full"
      >
        Повернутись на головну
      </button>
    </div>
  );
}
