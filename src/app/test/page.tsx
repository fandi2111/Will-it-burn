import TestQuestion from "./TestQuestion";

export default function TestPage() {
  const suffled_topics = [];

  const topics: string[] = [
    "poverty",
    "food shortage",
    "climate change",
    "racism",
    "sexism",
    "income inequalities",
    "mental health",
    "misinformation about mental illness",
    "homelessness",
    "healthcare disparities",
    "unemployment",
  ];

  for (let i = 0; i < suffled_topics.length; i += 1) {
    suffled_topics.push(topics[Math.floor(Math.random() * topics.length)]);
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center overflow-auto">
      <TestQuestion topics={suffled_topics} />
    </main>
  );
}
