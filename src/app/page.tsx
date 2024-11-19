"use client"; // Додаємо на початку файлу

import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import WordList from "./components/WordList";
import WordTest from "./components/WordTest";
import wordsData from "../data/words.json";
import { Word } from "../types/types";

export default function Page() {
  const [status, setStatus] = useState<number | null>(null);
  const [words, setWords] = useState<Word[]>(wordsData);

  // Завантаження слів з localStorage
  useEffect(() => {
    const savedWords = localStorage.getItem("words");
    if (savedWords) {
      setWords(JSON.parse(savedWords));
    } else {
      setWords(wordsData);
    }
  }, []);

  // Збереження слів у localStorage
  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  const handleUpdateWordStatus = (id: number, newStatus: number) => {
    setWords((prevWords) =>
      prevWords.map((word) =>
        word.id === id ? { ...word, status: newStatus } : word
      )
    );
  };

  const handleGoHome = () => setStatus(null);

  if (status === 2) {
    return <WordList words={words} onGoHome={handleGoHome} />;
  }

  if (!status) {
    return <HomePage onSelectStatus={setStatus} words={words} />;
  }

  // Для інших статусів можна додати умовний рендеринг
  return (
    <WordTest
      words={words}
      status={status}
      onGoHome={handleGoHome}
      onUpdateWordStatus={handleUpdateWordStatus}
    />
  );
}
