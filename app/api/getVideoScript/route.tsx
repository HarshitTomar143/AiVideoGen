import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from '@google/genai';

// Route handler
export async function POST(req: NextRequest) {
  try {
    const { topic, imageStyle, duration } = await req.json();

    // Input validation
    if (!topic || !imageStyle || !duration) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Construct the Gemini prompt
    const prompt = `
You are an AI creative assistant. 
Generate a single-paragraph creative and engaging short story suitable for a ${duration} video on the topic "${topic}".
Also, generate a list of 3–5 AI image prompts (as descriptive strings) that match scenes or concepts in the story.
The response should be in this JSON format:

{
  "story": "The story in paragraph format here...",
  "imagePrompts": ["prompt1", "prompt2", "prompt3"]
}
Make sure the story is rich, imaginative, and does not include image prompt text inside the paragraph.
`;

    // Setup GenAI client
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
    };

    const model = 'gemini-1.5-flash';

    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];

    // Generate content
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    // Extract and parse the result
    let rawText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    rawText = rawText.replace(/^```json|^```|```$/g, '').trim();

    let result;
    try {
      result = JSON.parse(rawText);
    } catch (err) {
      console.error("JSON parse failed:", err);
      return NextResponse.json({ error: "Failed to parse AI response." }, { status: 500 });
    }

    // Validate structure
    if (!result.story || !Array.isArray(result.imagePrompts)) {
      return NextResponse.json({ error: "Incomplete AI response" }, { status: 500 });
    }

    return NextResponse.json({ result });

  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
