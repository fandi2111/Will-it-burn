"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Retrieve the data stored in localStorage
    const storedQuestions = localStorage.getItem("generatedQuestions");
    const storedImageUrl = localStorage.getItem("generatedImage");

    if (storedQuestions) setQuestions(JSON.parse(storedQuestions));
    if (storedImageUrl) setImageUrl(storedImageUrl);
  }, []);

  return (
    <div className="container">
      <h1>Generated Results</h1>

      {/* Display Generated Questions */}
      {questions.length > 0 && (
        <section>
          <h2>Generated Questions</h2>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Display Generated Image */}
      {imageUrl && (
        <section>
          <h2>Generated Image</h2>
          <img src={imageUrl} alt="Generated AI Art" />
        </section>
      )}

      {/* Back Button */}
      <button onClick={() => router.push("/")}>Back to Home</button>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        img {
          max-width: 100%;
          border-radius: 10px;
          margin-top: 20px;
        }
        button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 1rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

