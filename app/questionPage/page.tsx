"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function TypingEffectPage() {
  const fullText = "Willkommen zu unserem Fragebogen!";
  const [displayedText, setDisplayedText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[currentIndex]);
      currentIndex++;

      if (currentIndex === fullText.length) {
        clearInterval(typingInterval);
        setTimeout(() => setShowInput(true), 500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">{displayedText}</h1>

      {showInput && (
        <form className="flex flex-col items-center space-y-4">
          {/* Mikrofon-Icon für die Spracheingabe */}
          <button
            type="button"
            onClick={startRecording}
            className={`flex items-center justify-center w-16 h-16 rounded-full ${isRecording ? "bg-gray-400" : "bg-green-500"} text-white focus:outline-none`}
            disabled={isRecording}
          >
            <i className={`fas fa-microphone fa-2x`}></i> {/* Mikrofon-Icon */}
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
            <div className="mt-4 flex flex-col items-center">
              <textarea
                value={transcribedText}
                onChange={(e) => setTranscribedText(e.target.value)}
                rows={8} // Höhe angepasst
                className="w-full max-w-none p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                style={{ width: "800px" }} // Setzt die Breite auf 800px
              />
            </div>
          )}

          {transcribedText && ( // Absende-Button erscheint nur nach Stoppen der Aufnahme
            <Link href="/resultPage">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Absenden
              </button>
            </Link>
          )}
        </form>
      )}
    </div>
  );
}
