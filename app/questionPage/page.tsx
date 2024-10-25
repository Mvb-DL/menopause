"use client";
import { useState, useEffect } from "react";
import "../styles/question.scss";
import Link from "next/link";
import Question from "../Question/page"

export default function TypingEffectPage() {
  const fullText = "Elena's diary. Day 187. 10/26/2024.";
  const [displayedText, setDisplayedText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [showFullTextInTopLeft, setShowFullTextInTopLeft] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false); // Zustand für Fragekomponente

  useEffect(() => {
    if (!fullText) return;

    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowInput(true), 200);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

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
    setShowQuestion(true); // Aktiviert die Fragekomponente
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 relative">
      {/* Ursprünglicher Text, der während des Tippens angezeigt wird */}
      <h1
        className={`text-3xl font-bold mb-8 ${displayedText === fullText || showFullTextInTopLeft ? "invisible" : ""}`}
      >
        {displayedText}
      </h1>

      {/* Text in der oberen linken Ecke, wenn die Aufnahme gestartet wurde */}
      {showFullTextInTopLeft && <h1 className="top-left-text">{fullText}</h1>}

      {showInput && !showQuestion && ( // Zeigt Eingabeform an, wenn Fragekomponente nicht aktiv ist
        <form className="flex flex-col items-center space-y-4">
          <button
            type="button"
            onClick={startRecording}
            className={`flex items-center justify-center w-16 h-16 rounded-full ${isRecording ? "bg-gray-400" : "bg-[#6750A4]"} text-white focus:outline-none`}
            disabled={isRecording}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0h-2a7 7 0 0014 0h-2zm-5 5a7 7 0 01-7-7H3a9 9 0 0018 0h-2a7 7 0 01-7 7z" />
            </svg>
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
                {transcribedText.split(". ").map((sentence, index) => {
                  const [firstWord, ...restOfSentence] = sentence.split(" ");
                  return (
                    <div key={index} className="editable-sentence">
                      <span className="first-word">{firstWord}</span>
                      <textarea defaultValue={` ${restOfSentence.join(" ")}.`} className="editable-text" />
                    </div>
                  );
                })}
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

      {showQuestion && <Question />} {/* Fragekomponente laden, wenn showQuestion true ist */}
    </div>
  );
}
