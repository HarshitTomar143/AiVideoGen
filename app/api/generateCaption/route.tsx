import { NextRequest, NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";

export async function POST(req:NextRequest){

try {
    
    const client = new AssemblyAI({
    apiKey: process.env.CAPTION_API!,
});

const {audioFileUrl}= await req.json()

// const audioFile = "./local_file.mp3";
const audioFile = audioFileUrl

const params:any = {
  audio: audioFile,
  speech_model: "universal",
};


  const transcript = await client.transcripts.transcribe(params);

  console.log(transcript.words);


    return NextResponse.json({'result':transcript.words})

} catch (error:any) {
    return NextResponse.json(
        {
            message: "Error: "+error.message,
            status: 500
        }
    )
}



}