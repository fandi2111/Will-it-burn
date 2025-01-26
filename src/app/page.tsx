"use client";
// export default function Page() {
//   return (
//     <main>
//       this is the landing page of how app that will revolutionalize the world
//       trust
//     </main>
//   );
// }



import React, { useState } from "react";
import { questions } from "../data/data";

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (answerIndex: number) => {
    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1); // Increment score if the answer is correct
    }
    setSelectedAnswer(answerIndex); // Highlight the selected answer
    setTimeout(() => {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }, 1000); // 1-second delay before moving to the next question
  };

  const isQuizComplete = currentQuestionIndex >= questions.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">
        {isQuizComplete ? "Quiz Completed!" : "Answer the Question"}
      </h1>
      {!isQuizComplete ? (
        <div className="bg-white shadow-md rounded p-4 w-full max-w-md">
          <h2 className="text-xl font-medium mb-4">
            {questions[currentQuestionIndex].question}
          </h2>
          <div className="flex flex-col gap-3">
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <button
                key={index}
                className={`py-2 px-4 border rounded transition-colors ${
                  selectedAnswer === index
                    ? index === questions[currentQuestionIndex].correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded p-4 w-full max-w-md">
          <h2 className="text-xl font-medium mb-4">
            Your score: {score}/{questions.length}
          </h2>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
            }}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
