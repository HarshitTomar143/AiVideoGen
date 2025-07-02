import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { topic, imageStyle, duration } = await req.json();

    // Validate input
    if (!topic || !imageStyle || !duration) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Build the prompt for Gemini
    const prompt = `write a script to generate a ${duration} video on topic: ${topic} along with Ai image prompt in ${imageStyle} format in each scene and give result in json format with imageprompt and contenttext as field`;

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });
    const config = {
      responseMimeType: 'application/json',
    };
    const model = 'gemini-1.5-flash';
    const contents = [
      {
        role: 'user',
        parts: [
          { text: prompt },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    let text = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    text = text.replace(/^```json|^```|```$/g, '').trim();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      result = text;
    }

    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}