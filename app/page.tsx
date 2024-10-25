"use client"; // Ensure this component runs on the client side

import { useState } from "react";
import Link from "next/link";
import "./styles/home.scss"; // Import the SCSS file

function ApiPage({ isVisible }) {
  return (
    <div className={`api-page ${isVisible ? "fade-in" : ""}`}>
  {/* Increased font size for the heading */}
  <h1 className="text-5xl font-bold mb-8 text-center">Connect Your APIs</h1>

  <div className="flex flex-col items-center"> {/* Center align buttons */}
    <Link href="/menoPausePage">
      <button
        className="w-64 mb-4 px-6 py-3 text-white rounded-lg focus:outline-none"
        style={{
          backgroundColor: "#6750A4",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#D0BCFF")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#6750A4")}
      >
        Connect to Apple Health
      </button>
    </Link>

    <button
      className="w-64 mb-4 px-6 py-3 text-white rounded-lg focus:outline-none"
      style={{
        backgroundColor: "#D29DAC",
        transition: "background-color 0.3s",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#E8DEF8")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#D29DAC")}
    >
      Connect to Clue
    </button>

    {/* Button with a plus icon */}
    <button
      className="w-64 mb-4 px-6 py-3 text-white rounded-lg focus:outline-none flex items-center justify-center"
      style={{
        backgroundColor: "#E6E0E9",
        color: "#6750A4", // Dunkler Text für Kontrast auf hellen Hintergrund
        transition: "background-color 0.3s",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#D0BCFF")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#E6E0E9")}
    >
      <span className="text-xl">+</span> {/* Plus icon as text */}
    </button>
  </div>
</div>


  );
}

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="relative grid-container font-[family-name:var(--font-geist-sans)]">
      {/* SVG background */}
      <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80" className="absolute inset-0 w-full h-full z-0">
        <defs>
          <style>
            {`
              @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .out-top { animation: rotate 20s linear infinite; transform-origin: 13px 25px; }
              .in-top { animation: rotate 10s linear infinite; transform-origin: 13px 25px; }
              .out-bottom { animation: rotate 25s linear infinite; transform-origin: 84px 93px; }
              .in-bottom { animation: rotate 15s linear infinite; transform-origin: 84px 93px; }
            `}
          </style>
        </defs>
        <path fill="#D0BCFF" className="out-top" d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"/>
        <path fill="#D29DAC" className="in-top" d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"/>
        <path fill="#6750A4" className="out-bottom" d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"/>
        <path fill="#D0BCFF" className="in-bottom" d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"/>
      </svg>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start relative z-10">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 text-white rounded-lg text-lg"
            style={{
              backgroundColor: "rgba(103, 80, 164, 1)", // halbtransparentes Lila
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(103, 80, 164, 0.7)")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(103, 80, 164, 0.9)")}
          >
            Start Now
          </button>
        ) : (
          <ApiPage isVisible={showForm} />
        )}
      </main>
    </div>
  );
}
