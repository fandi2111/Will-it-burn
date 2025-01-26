import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { Explanation, Question } from "./schema";
import { ExplanationType, QuestionType } from "./types";
import { z } from "zod";

export async function getQuestion(topic: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  const text = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: "You are a teacher to raise awareness on social issues.",
      },
      {
        role: "user",
        content: `Write a short scenario (max 250 words) that highlights ${topic} in a subtle everyday way and come up with simple probable actions for the user to take. The answer must not be obvious and its goal is to test the awareness of ${topic} of the user.`,
      },
    ],
    store: true,
    n: 1,
    response_format: zodResponseFormat(Question, "question"),
  });

  return text.choices[0].message.parsed! satisfies QuestionType;
}

export async function getExplanation(question: QuestionType, answer: string) {
  const openai = new OpenAI({
    // apiKey: process.env.OPENAI_KEY,
    apiKey:
      "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",
    dangerouslyAllowBrowser: true,
  });

  const text = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: "You are a teacher to raise awareness on social issues",
      },
      {
        role: "user",
        content: `Based on this question: ${question.question}; with the following probable actions: ${question.options
          .map((opt, i) => `${i + 1}. ${opt}`)
          .join(
            "; ",
          )}.\n Explain whether or not the answer ${answer} is correct in less than 100 words and give a awareness score from 0 to 100`,
      },
    ],
    store: true,
    n: 1,
    response_format: zodResponseFormat(Explanation, "explanation"),
  });

  return text.choices[0].message.parsed! satisfies ExplanationType;
}
