"use client";
import React, { useState } from "react";
import { questions } from "../data/data";

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [currentTopic, setCurrentTopic] = useState(1); // Start with topic 1
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers per topic

  const handleAnswerClick = (answerIndex: number) => {
    const isCorrect =
      answerIndex === questions[currentTopic - 1][currentQuestionIndex].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1); // Increment correct answers for the current topic
    }

    setSelectedAnswer(answerIndex);
    setTimeout(() => {
      // Check if two questions are answered correctly for the current topic
      if (correctAnswers + (isCorrect ? 1 : 0) >= 2) {
        // Move to the next topic
        setCurrentTopic(currentTopic + 1);
        setCorrectAnswers(0); // Reset correct answers for the new topic
        setCurrentQuestionIndex(0); // Reset question index for the new topic
      } else {
        // Move to the next question within the same topic
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }

      setSelectedAnswer(null);
    }, 1000); // 1-second delay before moving to the next question
  };

  const isQuizComplete = currentTopic > Object.keys(questions).length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg p-4">
      <h1 className="text-2xl font-bold mb-6">
        {isQuizComplete ? "Quiz Completed!" : `Topic ${currentTopic}`}
      </h1>
      {!isQuizComplete ? (
        <div className="bg-bg shadow-md rounded p-4 w-full max-w-md">
          <h2 className="text-xl font-medium mb-4">
            {questions[currentTopic - 1][currentQuestionIndex].question}
          </h2>
          <div className="flex flex-col gap-3">
            {questions[currentTopic - 1][currentQuestionIndex].answers.map(
              (answer, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 border rounded transition-colors ${
                    selectedAnswer === index
                      ? index ===
                        questions[currentTopic - 1][currentQuestionIndex].correctAnswer
                        ? "bg-accent text-fg"
                        : "bg-wrong text-fg"
                      : "bg-secondary text-fg hover:bg-primary"
                  }`}
                  onClick={() => handleAnswerClick(index)}
                  disabled={selectedAnswer !== null}
                >
                  {answer}
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="bg-bg shadow-md rounded p-4 w-full max-w-md">
          <h2 className="text-xl font-medium mb-4">
            Your total score: {score}
          </h2>
          <button
            className="py-2 px-4 bg-secondary text-fg rounded hover:bg-primary"
            onClick={() => {
              setCurrentTopic(1); // Restart from topic 1
              setCurrentQuestionIndex(0);
              setScore(0);
              setCorrectAnswers(0);
            }}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

