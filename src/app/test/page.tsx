import { QuestionType } from "../types";
import Button from "../ui/Button";

export default async function TestPage() {
  const placeholder: QuestionType = {
    title: "Subtle Racism in Everyday Interactions",
    question:
      "Maria is standing at the corner of Elm Street, waiting for the pedestrian light to change. She's heading home after a long day at work. As she waits, she sees a group of people crossing the street before the light turns green, so she decides to do the same, considering it's safe. A few meters away, a police officer approaches another young woman, Lily, who is also crossing. The officer starts to question Lily's decision to cross and asks for her identification. Maria, observing this from a distance, notices that Lily is the only one being stopped. Despite being equally at fault, the others, who are of a different racial background, continue on their way without incident. Maria feels uncomfortable with the situation but isn't sure if it's appropriate to act. \n",
    options: [
      "Approach the officer after he finishes with Lily to inquire why only she was stopped and if others received the same treatment.",
      "Start a conversation with Lily once she's free to offer support and express concern over the incident.",
      "Reflect on her own experiences and biases to better understand racial dynamics in her community.",
      "Join a community group focused on educating about racial issues and advocating for policy changes.",
      "Choose not to get involved but take note of similar incidents in the future to observe patterns.",
    ],
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center overflow-auto pt-32">
      <div className="flex w-[60rem] flex-col gap-8">
        <h5 className="font-header text-h5">{placeholder.title}</h5>
        <p>{placeholder.question}</p>
        <div className="flex flex-col gap-2">
          {placeholder.options.map((opt, i) => (
            <Button
              key={i}
              variant="option"
              question={placeholder}
              answer={opt}
            >
              {opt}
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
}
