"use client";

import { useState, useEffect } from "react";

// Define the structure of a question
interface Question {
  question: string;
  choices: string[];
  correctAnswerIndex: number;
}

// Themes to iterate through
const themes = ["poverty", "climate change", "mental health"];

export default function Quiz() {
  const [themeIndex, setThemeIndex] = useState(0); // Current theme index
  const [theme, setTheme] = useState(themes[0]); // Current theme
  const [question, setQuestion] = useState<Question | null>(null); // Current question
  const [correctAnswers, setCorrectAnswers] = useState(0); // Count of correct answers in the current theme
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch a new question when the theme changes or after answering
  const fetchQuestion = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generateQuestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch question");
      }

      const data = await response.json();
      console.log("Fetched question data:", data);
      setQuestion(data.question); // Expecting { question, choices, correctAnswerIndex }
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the first question on mount or when the theme changes
  useEffect(() => {
    fetchQuestion();
  }, [theme]);

  // Handle user's answer selection
  const handleAnswer = (index: number) => {
    if (question && index === question.correctAnswerIndex) {
      setCorrectAnswers((prev) => prev + 1);

      // Check if the user has answered 2 questions correctly for the current theme
      if (correctAnswers + 1 === 2) {
        const nextThemeIndex = (themeIndex + 1) % themes.length;
        setThemeIndex(nextThemeIndex);
        setTheme(themes[nextThemeIndex]);
        setCorrectAnswers(0); // Reset correct answers for the new theme
      }
    }

    // Fetch a new question after answering
    fetchQuestion();
  };

  const finishQuiz = () => {
    alert("Quiz finished!");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1>Quiz</h1>
      <p>Theme: {theme}</p>

      {question && question.choices ? (
        <>
          <h2>{question.question}</h2>
          <ul>
            {question.choices.map((choice, index) => (
              <li key={index}>
                <button onClick={() => handleAnswer(index)}>{choice}</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading question...</p>
      )}

      <button onClick={finishQuiz}>Finish Quiz</button>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        button {
          margin: 10px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}







