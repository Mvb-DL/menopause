"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';


export default function Question() {
  const fullMessage =
    "Oh that sounds like a busy day! Maybe some rest and relaxation can help you calm your hot flushes down a bit :)";
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [transcribedText, setTranscribedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  // Effekt für schrittweises Anzeigen des Textes
  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullMessage.length) {
        setDisplayedMessage((prev) => prev + fullMessage[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Geschwindigkeit des Effekts in Millisekunden

    return () => clearInterval(typingInterval);
  }, [fullMessage]);

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
      {/* Nachricht mit Typing-Effekt */}
      <p className="typing-effect text-center text-2xl font-semibold mb-6">{displayedMessage}</p>

      <button
        type="button"
        onClick={startRecording}
        className={`flex items-center justify-center w-16 h-16 rounded-full ${
          isRecording ? "bg-gray-400" : "bg-[#6750A4]"
        } text-white focus:outline-none`}
        disabled={isRecording}
      >
        <FontAwesomeIcon icon={faMicrophone} className="text-white text-3xl" />
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
          Finish Diary
        </button>
      </Link>
    </div>
  );
}
