"use client";

import { useEffect, useState } from "react";
import { getQuestion } from "../util";
import Button from "../ui/Button";
import { QuestionType } from "../types";
import { motion } from "framer-motion";
import Loading from "../ui/Loading";

type Props = {
  topics: string[];
};

export default function TestQuestion({ topics }: Props) {
  const [current, setCurrent] = useState(0);
  const [question, setQuestion] = useState<QuestionType | null>(null);

  useEffect(() => {
    getQuestion(topics[current])
      .then((q) => setQuestion(q))
      .catch(() => {});
  }, [current]);

  return question ? (
    <motion.div
      className="mt-32 flex w-[60rem] flex-col gap-8"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <h5 className="font-header text-h5">{question.title}</h5>
      <p>{question.question}</p>
      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => (
          <Button
            current={current}
            key={i}
            variant="option"
            question={question}
            answer={opt}
            setCurrent={setCurrent}
            setQuestion={setQuestion}
          >
            {opt}
          </Button>
        ))}
      </div>
    </motion.div>
  ) : (
    <Loading />
  );
}
