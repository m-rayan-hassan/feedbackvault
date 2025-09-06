import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt = `Generate a list of three engaging and anonymous prompts formatted as a single string. Each prompt must be separated by "||". These prompts are for an anonymous social feedback and question platform (like NGL or Qooh.me) where users can send feedback or questions but cannot reply back.  

Guidelines for the prompts:  
- Include exactly **two feedback-oriented prompts** (e.g., “What’s one way I could improve?”).  
- Include exactly **one curiosity-driven or fun question** (e.g., “What’s a fun memory you’ll never forget?”).  
- Prompts must be open-ended and thought-provoking (avoid yes/no style).  
- Keep the tone safe, positive, and inclusive (no personal, offensive, or sensitive topics).  
- Encourage honesty, reflection, and lighthearted interaction.  
- Output should ONLY be the three prompts separated by "||", no numbering or extra text.  

Example output:  
What’s one thing I could do to be a better friend?||What’s a suggestion you have for me to improve myself?||If you could swap lives with someone for a day, who would it be?
`

    // Call Gemini with streaming
    const result = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    // Convert to proper Next.js Response (replaces StreamingTextResponse)

    return NextResponse.json(
      {
        messages: result.text,
        message: "Messages suggested successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Something went wrong",
        details: String(error?.message || error),
      },
      { status: 500 }
    );
  }
}
