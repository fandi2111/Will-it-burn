import { z } from "zod";

export const Question = z.object({
  title: z.string(),
  question: z.string(),
  options: z.array(z.string()),
});

export const Explanation = z.object({
  explanation: z.string(),
  score: z.number(),
});
