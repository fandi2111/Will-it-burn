import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env.local
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
      });
    }

    // Correct method for generating images in OpenAI v4.x.x
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "256x256",
    });    

    const imageUrl = response.data[0].url;

    return new Response(JSON.stringify({ imageUrl }), { status: 200 });
  } catch (error) {
    console.error("Error generating image:", error);

    return new Response(
      JSON.stringify({ error: "Failed to generate image" }),
      { status: 500 }
    );
  }
}


