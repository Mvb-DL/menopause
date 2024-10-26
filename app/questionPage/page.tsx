"use client";
import { useState } from "react";
import "../styles/question.scss";
import Link from "next/link";
import Question from "../Question/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

export default function TypingEffectPage() {
  const fullText = "Elena's diary. Day 187. 10/26/2024.";
  const [transcribedText, setTranscribedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [showFullTextInTopLeft, setShowFullTextInTopLeft] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setIsRecording(true);
      setShowFullTextInTopLeft(true);
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

  const handleSaveDiary = () => {
    setShowQuestion(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 relative">
      {/* Direkte Anzeige des vollständigen Textes, nur wenn showQuestion false ist */}
      {!showQuestion && (
        <h1 className="text-3xl font-bold mb-8 text-center">{fullText}</h1>
      )}

      {/* Text in der oberen linken Ecke, wenn die Aufnahme gestartet wurde */}
      {showFullTextInTopLeft && !showQuestion && (
        <h1 className="top-left-text">{fullText}</h1>
      )}

      {!showQuestion && (
        <form className="flex flex-col items-center space-y-4">
          {/* Sofort sichtbarer Aufnahme-Button */}
          <button
            type="button"
            onClick={startRecording}
            className={`flex items-center justify-center w-16 h-16 rounded-full ${
              isRecording ? "bg-gray-400" : "bg-[#6750A4]"
            } text-white focus:outline-none`}
            disabled={isRecording}
            aria-label="Start Recording"
            style={{ border: '2px solid white' }}
          >
            <FontAwesomeIcon icon={faMicrophone} className="text-white text-3xl" />
          </button>

          {isRecording && (
            <button
              type="button"
              onClick={stopRecording}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Stoppen
            </button>
          )}

{transcribedText && (
            <article lang="en" className="transcribed-text">
              <h1>Elena's Diary</h1>
              <h2>Day 187 - 10/26/2024</h2>
              <section aria-label="Diary Entry">
                {/* Display the transcribed text as normal text */}
                <p>{transcribedText}</p>
              </section>
            </article>
          )}

          {transcribedText && (
            <button
              type="button"
              onClick={handleSaveDiary}
              className="px-6 py-2 bg-[#6750A4] text-white rounded-lg hover:bg-[#6790A4] focus:outline-none"
            >
              Save your Diary
            </button>
          )}
        </form>
      )}

      {showQuestion && <Question />}
    </div>
  );
}
