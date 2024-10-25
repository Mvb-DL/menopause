"use client";
import { useState } from "react";
import Link from "next/link";

export default function MenoPausePage() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [showSlider, setShowSlider] = useState(false);

  // Funktion zum Anzeigen des Textes und der zusätzlichen Buttons
  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
    setShowSlider(true); // Slider anzeigen, wenn ein Button geklickt wird
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#E6E0E9]">
      {/* Dashboard Container */}
      <div className="max-w-4xl w-full mx-auto bg-[#E8DEF8] shadow-lg rounded-lg p-6">
        
        {/* Personendaten oben */}
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-2xl font-bold text-center text-[#6750A4]">Dashboard</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#6750A4] font-semibold">Name:</p>
              <p className="text-gray-700">Max Mustermann</p>
            </div>
            <div>
              <p className="text-[#6750A4] font-semibold">Alter:</p>
              <p className="text-gray-700">45 Jahre</p>
            </div>
            <div>
              <p className="text-[#6750A4] font-semibold">Blutgruppe:</p>
              <p className="text-gray-700">A+</p>
            </div>
            <div>
              <p className="text-[#6750A4] font-semibold">Größe:</p>
              <p className="text-gray-700">1.75 m</p>
            </div>
          </div>
        </div>

        {/* Buttons in einer Reihe */}
        <div className="flex justify-around gap-4 mb-4">
          <button
            onClick={() => handleButtonClick(1)}
            className="w-1/3 px-6 py-3 text-white rounded-lg focus:outline-none"
            style={{
              backgroundColor: "#6750A4",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#D0BCFF")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6750A4")}
          >
            Button 1
          </button>
          <button
            onClick={() => handleButtonClick(2)}
            className="w-1/3 px-6 py-3 text-white rounded-lg focus:outline-none"
            style={{
              backgroundColor: "#D29DAC",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#E8DEF8")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#D29DAC")}
          >
            Button 2
          </button>
          <button
            onClick={() => handleButtonClick(3)}
            className="w-1/3 px-6 py-3 text-white rounded-lg focus:outline-none"
            style={{
              backgroundColor: "#E6E0E9",
              color: "#6750A4", // Dunkler Text für Lesbarkeit
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#D0BCFF")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#E6E0E9")}
          >
            Button 3
          </button>
        </div>

        {showSlider && (
          <div className="mt-4 p-4 bg-[#E8DEF8] rounded-lg">
            <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Default range
            </label>
            <input 
              id="default-range" 
              type="range" 
              defaultValue="50" 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
        )}

        {/* Zusätzlicher Text und Buttons je nach Auswahl */}
        {selectedButton && (
          <div className="mt-4 p-4 bg-[#E8DEF8] rounded-lg">
            <p className="text-lg font-semibold mb-4 text-[#6750A4]">
              {`Text für Button ${selectedButton}`}
            </p>
            <div className="flex justify-center"> {/* Center align the button */}
              {/* Link-Button zur pillPage */}
              <Link
                href="/pillPage"
                className="px-6 py-3 rounded-lg text-white focus:outline-none"
                style={{
                  backgroundColor: "#D29DAC",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#E8DEF8")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#D29DAC")}
              >
                Aktion 1
              </Link>
            </div>
          </div>
        )}

        {/* Slider-Bereich */}
       
      </div>
    </div>
  );
}
