"use client";

import { ButtonHTMLAttributes, useState } from "react";
import cn from "../lib/cn";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  Variants,
} from "framer-motion";
import { ExplanationType, QuestionType } from "../types";
import { getExplanation } from "../util";

type Props = {
  variant: "option";
  question: QuestionType;
  answer: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  HTMLMotionProps<"button">;

export default function Button({
  className,
  children,
  variant,
  question,
  answer,
  ...props
}: Props) {
  const [explanation, setExplanation] = useState<ExplanationType>();

  const variants: Variants = {
    hover: {
      backgroundColor: "#d5bdaf",
    },
  };

  return (
    <>
      <motion.button
        className={cn(
          variant == "option" && "bg-secondary/50 p-2 text-left",
          className,
        )}
        initial="initial"
        whileHover="hover"
        variants={variants}
        onClick={async () => {
          const exp = await getExplanation(question, answer);
          setExplanation(exp);
        }}
        {...props}
      >
        {children}
      </motion.button>
      <AnimatePresence>
        {explanation && (
          <motion.div
            className="absolute left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-bg/50 backdrop-blur-md backdrop-filter"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <div className="w-[40rem] rounded-sm bg-bg p-8 shadow-xl">
              <p className="font-header">Score: {explanation.score}</p>
              <p>{explanation.explanation}</p>
            </div>
            <div className="absolute bottom-8">Click anywhere to continue</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
