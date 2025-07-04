"use client";
import React, { useState } from 'react';
import Header from '../dashboard/_components/header';
import SideNav from '../dashboard/_components/sideNav';
import SelectTopic from './_components/selectTopic';
import SelectStyle from './_components/selectStyle';
import SelectDuration from './_components/selectDuration';
import axios from 'axios';
import CustomLoading from './_components/customLoading';
import { v4 as uuidv4 } from 'uuid';

export default function CreateNew() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [videoScript, setVideoScript] = useState<string>("");
  const [imagePrompts, setImagePrompts] = useState<string[]>([]);
  const [scriptError, setScriptError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>("");

  const onHandleInputchange = (fieldName: string, fieldValue: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
    if (fieldName && fieldValue) {
      setErrorMsg("");
    }
  };

  const onClickVideoHandler = () => {
    const missingFields = [];
    if (!formData.topic || formData.topic.trim() === "") missingFields.push("topic");
    if (!formData.duration || formData.duration.trim() === "") missingFields.push("duration");
    if (!formData.imageStyle || formData.imageStyle.trim() === "") missingFields.push("style");
    if (missingFields.length > 0) {
      setErrorMsg(`Please select or enter: ${missingFields.join(", ")}`);
      return;
    }
    getVideoScript();
  };

  const getVideoScript = async () => {
    setLoading(true);
    setScriptError("");
    setVideoScript("");
    setImagePrompts([]);
    setAudioUrl("");

    try {
      const res = await axios.post("/api/getVideoScript", {
        topic: formData.topic,
        duration: formData.duration,
        imageStyle: formData.imageStyle,
      });

      console.log("API response:", res.data);

      const { result } = res.data;

      if (result && typeof result.story === "string") {
        const cleanedStory = result.story.trim();
        setVideoScript(cleanedStory);

        if (Array.isArray(result.imagePrompts)) {
          setImagePrompts(result.imagePrompts.filter((p: string) => typeof p === 'string' && p.trim().length > 0));
        }

        const audioId = uuidv4();
        const audioRes = await axios.post("/api/audio", {
          text: cleanedStory,
          id: audioId
        });

        if (audioRes.data?.audioUrl) {
          setAudioUrl(audioRes.data.audioUrl);
        }

        setScriptError("");
      } else {
        setScriptError("No story was generated. Try a different topic or style.");
      }
    } catch (err) {
      setScriptError("Failed to generate script. Please try again.");
      console.error("API error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideNav />
        <div className="md:px-20 w-320">
          <h2 className="font-bold text-4xl text-blue-950 text-center mt-5">Create New</h2>
          <div className="mt-10 shadow-md p-10">
            <SelectTopic onUserSelect={onHandleInputchange} />
            <SelectStyle onUserSelect={onHandleInputchange} />
            <SelectDuration onUserSelect={onHandleInputchange} />

            {errorMsg && (
              <div className="text-red-600 font-semibold mt-2 mb-2 text-center">{errorMsg}</div>
            )}

            <button
              onClick={onClickVideoHandler}
              className="mt-10 w-full cursor-pointer bg-blue-950 text-white h-12 rounded-lg hover:scale-105 duration-200 font-semibold hover:bg-blue-900"
            >
              Create short Video
            </button>

            {scriptError && !videoScript && (
              <div className="text-red-600 font-semibold mt-4 text-center">{scriptError}</div>
            )}

            {videoScript && (
              <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-bold text-xl mb-2">Generated Video Story</h3>
                <p className="whitespace-pre-wrap break-words text-base max-h-96 overflow-auto">
                  {videoScript}
                </p>
              </div>
            )}

            {audioUrl && (
              <div className="mt-4 text-center">
                <audio controls src={audioUrl} className="mx-auto" />
                <p className="text-sm text-gray-500 mt-2">Audio narration</p>
              </div>
            )}

            {imagePrompts.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Generated Image Prompts</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {imagePrompts.map((prompt, index) => (
                    <li key={index}>{prompt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <CustomLoading loading={loading} />
    </div>
  );
}
