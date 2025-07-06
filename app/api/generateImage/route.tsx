import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

// Setup Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt missing" }, { status: 400 });
    }

    // Call Replicate API for image generation
    const replicateResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "db21e45eaa144653a836f6bdf123d12c", // stable-diffusion model version
        input: { prompt },
      }),
    });

    const replicateData = await replicateResponse.json();

    if (!replicateData?.urls?.get) {
      return NextResponse.json({ error: "Failed to initiate image generation" }, { status: 500 });
    }

    // Polling for result
    let imageUrl = null;
    while (!imageUrl) {
      const statusRes = await fetch(replicateData.urls.get, {
        headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` },
      });
      const statusData = await statusRes.json();

      if (statusData.status === "succeeded") {
        imageUrl = statusData.output[0];
      } else if (statusData.status === "failed") {
        return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
      }

      await new Promise(res => setTimeout(res, 1500));
    }

    // Download image and upload to Supabase
    const imageResponse = await fetch(imageUrl);
    const buffer = Buffer.from(await imageResponse.arrayBuffer());

    const imageName = `${uuidv4()}.png`;
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(`public/${imageName}`, buffer, {
        contentType: "image/png",
        upsert: true,
      });

  

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(`public/${imageName}`);

    return NextResponse.json({
      message: "Image generated and uploaded",
      imageUrl: publicUrlData.publicUrl,
    });

  } catch (err) {
    console.error("Image generation error:", err);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
