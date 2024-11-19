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
  const [isLocked, setIsLocked] = useState<boolean>(false); // Стан для блокування кнопок
  const [selectedAnswer, setSelectedAnswer] = useState<{
    index: number | null;
    isCorrect: boolean | null;
  }>({
    index: null,
    isCorrect: null,
  }); // Стан для вибраної відповіді
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
    null
  ); // Стан для правильного індексу

  // Перемішування списку тільки один раз при завантаженні
  useEffect(() => {
    const filteredWords = words.filter((word) => word.status === status);

    if (filteredWords.length > 0 && shuffledWords.length === 0) {
      const shuffleArray = (array: Word[]) =>
        [...array].sort(() => Math.random() - 0.5);

      setShuffledWords(shuffleArray(filteredWords));
      setCurrentIndex(0); // Починаємо з першого слова після перемішування
    }
  }, [words, status, shuffledWords.length]);

  // Якщо всі слова пройдені або немає слів
  if (shuffledWords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg">Усі слова з цієї категорії пройдено!</p>
        <button
          onClick={onGoHome}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Повернутись на головну
        </button>
      </div>
    );
  }

  const currentWord = shuffledWords[currentIndex];

  const handleAnswer = (isCorrect: boolean, index: number) => {
    if (isLocked) return; // Блокуємо повторні кліки
    setIsLocked(true); // Блокуємо кнопки

    // Зберігаємо стан обраної відповіді
    setSelectedAnswer({ index, isCorrect });

    // Оновлюємо статус поточного слова
    onUpdateWordStatus(currentWord.id, isCorrect ? 2 : 3);

    if (!isCorrect) {
      // Якщо відповідь неправильна, підсвічуємо правильну через 0.5 секунди
      const correctIndex = currentWord.options.findIndex(
        (option) => option === currentWord.ua
      );
      setTimeout(() => {
        setCorrectAnswerIndex(correctIndex);
      }, 500);
    }

    // Затримка перед переходом до наступного слова
    setTimeout(() => {
      if (currentIndex < shuffledWords.length - 1) {
        setCurrentIndex(currentIndex + 1); // Переходимо до наступного слова
      } else {
        setShuffledWords([]); // Завершуємо тест
      }
      setIsLocked(false); // Розблоковуємо кнопки
      setSelectedAnswer({ index: null, isCorrect: null }); // Скидаємо вибір
      setCorrectAnswerIndex(null); // Скидаємо підсвічування правильної відповіді
    }, 2000); // Затримка 2 секунди
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 max-w-[460px] text-center mb-4">
        Що означає: <span className="text-blue-600">{currentWord.de}</span>?
      </h2>
      <div className="grid grid-cols-1 gap-4 w-full max-w-[460px]">
        {currentWord.options.map((option, index) => {
          // Застосовуємо кольори залежно від правильності відповіді
          let buttonColor = "bg-gray-100 text-gray-800";
          if (selectedAnswer.index === index) {
            buttonColor = selectedAnswer.isCorrect
              ? "bg-green-500 text-white" // Зелений для правильної відповіді
              : "bg-red-500 text-white"; // Червоний для неправильної відповіді
          } else if (correctAnswerIndex === index) {
            buttonColor = "bg-green-500 text-white"; // Зелений для правильної відповіді (при підсвічуванні)
          }

          return (
            <button
              key={index}
              className={`px-4 py-2 border rounded ${buttonColor} text-center break-words`}
              onClick={() => handleAnswer(option === currentWord.ua, index)}
              disabled={isLocked} // Блокуємо кнопки під час затримки
            >
              {option}
            </button>
          );
        })}
      </div>
      <button
        onClick={onGoHome}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Повернутись на головну
      </button>
    </div>
  );
}
