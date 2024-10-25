"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Question() {
  const [transcribedText, setTranscribedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      let chunks: BlobPart[] = [];
      recorder.ondataavailable = (event) => chunks.push(event.data);

      recorder.onstop = async () => {
        setIsRecording(false);
        const audioBlob = new Blob(chunks, { type: "audio/wav" });

        try {
          const transcribedText = await queryHuggingFaceAPI(audioBlob);
          setTranscribedText(transcribedText);
        } catch (error) {
          console.error("Fehler bei der Transkription:", error);
          setTranscribedText("Transkription fehlgeschlagen.");
        }
      };

      recorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
  };

  const queryHuggingFaceAPI = async (audioBlob: Blob): Promise<string> => {
    const response = await fetch("https://api-inference.huggingface.co/models/openai/whisper-large-v3", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "audio/wav",
      },
      body: audioBlob,
    });

    if (!response.ok) {
      throw new Error(`Fehler: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result.text || "Transkription fehlgeschlagen.";
  };

  return (
    <div className="question-container flex flex-col items-center space-y-4">
      <h2>Thank you for saving your diary!</h2>
      <p>Here is a question to reflect on your day:</p>
      <p>What is one thing you learned today?</p>

      <button
        type="button"
        onClick={startRecording}
        className={`flex items-center justify-center w-16 h-16 rounded-full ${
          isRecording ? "bg-gray-400" : "bg-[#6750A4]"
        } text-white focus:outline-none`}
        disabled={isRecording}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0h-2a7 7 0 0014 0h-2zm-5 5a7 7 0 01-7-7H3a9 9 0 0018 0h-2a7 7 0 01-7 7z" />
        </svg>
      </button>

      {isRecording && (
        <button
          type="button"
          onClick={stopRecording}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Stop
        </button>
      )}

      {transcribedText && (
        <article className="transcribed-text mt-4 p-4 bg-gray-100 rounded-lg">
          <h3>Your Answer:</h3>
          <p>{transcribedText}</p>
        </article>
      )}

      {/* Button to navigate to resultPage */}
      <Link href="/resultPage">
        <button className="mt-4 px-6 py-2 bg-[#6750A4] text-white rounded-lg hover:bg-[#543a85] focus:outline-none">
          Go to Result Page
        </button>
      </Link>
    </div>
  );
}
