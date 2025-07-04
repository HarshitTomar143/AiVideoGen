import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const gTTS = require("gtts");

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service Role Key (not anon key)
);

export async function POST(req: NextRequest) {
  try {
    const { text, id } = await req.json();

    if (!text || !id) {
      return NextResponse.json({ error: "Missing text or id" }, { status: 400 });
    }

    const fileName = `${id}.mp3`;
    const tempDir = path.join(process.cwd(), "tmp");
    const filePath = path.join(tempDir, fileName);

    // Create temp directory if not exists
    fs.mkdirSync(tempDir, { recursive: true });

    // Generate audio using gTTS
    const gtts = new gTTS(text, "en");
    const writeStream = fs.createWriteStream(filePath);
    await pipeline(gtts.stream(), writeStream); // ✅ Fixed: no Readable.from()

    // Read the audio file into a buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Upload to Supabase Storage bucket
    const { data, error: uploadError } = await supabase.storage
      .from("audios") // ← your Supabase bucket name
      .upload(`public/${fileName}`, fileBuffer, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL of the uploaded audio
    const { data: publicUrlData } = supabase.storage
      .from("audios")
      .getPublicUrl(`public/${fileName}`);

    // Clean up temporary local file
    fs.unlinkSync(filePath);

    return NextResponse.json({
      message: "Audio uploaded to Supabase",
      url: publicUrlData.publicUrl,
    });
  } catch (err) {
    console.error("Audio generation/upload failed:", err);
    return NextResponse.json(
      { error: "Audio generation/upload failed", details: String(err) },
      { status: 500 }
    );
  }
}
