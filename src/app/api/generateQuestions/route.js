import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { theme } = body;

    if (!theme) {
      return new Response(JSON.stringify({ error: "Theme is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Prompt OpenAI to generate a multiple-choice question
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant generating multiple-choice questions. Each question has 4 answer choices, and one is correct.",
        },
        {
          role: "user",
          content: `Generate a multiple-choice question about the theme "${theme}" with 4 answer options. Format your response as JSON like this: { "question": "string", "choices": ["option1", "option2", "option3", "option4"], "correctAnswerIndex": 0-3 }`,
        },
      ],
    });

    const messageContent = response.choices?.[0]?.message?.content;

    if (!messageContent) {
      return new Response(
        JSON.stringify({ error: "No content returned from OpenAI" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const question = JSON.parse(messageContent);

    // Ensure the response format is valid
    if (
      !question.question ||
      !Array.isArray(question.choices) ||
      typeof question.correctAnswerIndex !== "number"
    ) {
      return new Response(
        JSON.stringify({
          error: "Invalid response format from OpenAI",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ question }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating question:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate question." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}







