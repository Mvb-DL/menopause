"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MenoPausePage() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [showSlider, setShowSlider] = useState(false);
  const [data, setData] = useState(null);
  const [polling, setPolling] = useState(true);

  // Function to handle button clicks
  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
    setShowSlider(true); // Show slider when a button is clicked
  };

  // Polling logic to fetch data from the iOS app every second
  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const response = await fetch("/api/receiveData");
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
          setPolling(false); // Stop polling once data is received
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (polling) {
      fetchData();
      intervalId = setInterval(fetchData, 1000); // Poll every second
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [polling]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#E6E0E9]">
      {/* Dashboard Container */}
      <div className="max-w-4xl w-full mx-auto bg-[#E8DEF8] shadow-lg rounded-lg p-6">
        {/* User Information */}
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-2xl font-bold text-center text-[#6750A4]">
            Dashboard
          </h1>
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

        {/* Health Data Section */}
        {polling ? (
          <div className="flex flex-col items-center mb-8">
            <p className="text-center text-gray-700 mb-4">
              Waiting for data from Apple HealthKit...
            </p>
            {/* Loading spinner */}
            <div className="loader"></div>
          </div>
        ) : data ? (
          <div className="flex flex-col gap-4 mb-8">
            <h2 className="text-xl font-bold text-center text-[#6750A4]">
              Health Data
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.steps && (
                <div>
                  <p className="text-[#6750A4] font-semibold">Steps today:</p>
                  <p className="text-gray-700">{data.steps}</p>
                </div>
              )}
              {data.heartRate && (
                <div>
                  <p className="text-[#6750A4] font-semibold">Heart Rate:</p>
                  <p className="text-gray-700">{data.heartRate} bpm</p>
                </div>
              )}
              {data.sleepAnalysis && (
                <div>
                  <p className="text-[#6750A4] font-semibold">Sleep Duration (last night):</p>
                  <p className="text-gray-700">
                    {data.sleepAnalysis.sleepDuration} hours
                  </p>
                </div>
              )}
              {data.menstrualFlow && (
                <div>
                  <p className="text-[#6750A4] font-semibold">Menstrual Flow:</p>
                  <p className="text-gray-700">{data.menstrualFlow}</p>
                </div>
              )}
              {data.hotFlashes !== undefined && (
                <div>
                  <p className="text-[#6750A4] font-semibold">Hot Flashes:</p>
                  <p className="text-gray-700">
                    {data.hotFlashes ? "Yes" : "No"}
                  </p>
                </div>
              )}
              {data.moodChanges && (
                <div>
                  <p className="text-[#6750A4] font-semibold">Mood Changes:</p>
                  <p className="text-gray-700">{data.moodChanges}</p>
                </div>
              )}
              {data.bodyTemperature && (
                <div>
                  <p className="text-[#6750A4] font-semibold">
                    Body Temperature:
                  </p>
                  <p className="text-gray-700">{data.bodyTemperature} °C</p>
                </div>
              )}
              {data.bloodPressure && (
                <div>
                  <p className="text-[#6750A4] font-semibold">Blood Pressure:</p>
                  <p className="text-gray-700">
                    {data.bloodPressure.systolic}/
                    {data.bloodPressure.diastolic} mmHg
                  </p>
                </div>
              )}
              {/* Add other health data fields as needed */}
            </div>
          </div>
        ) : null}

        {/* Buttons */}
        <div className="flex justify-around gap-4 mb-4 mt-4">
          <button
            onClick={() => handleButtonClick(1)}
            className="w-1/3 px-6 py-3 text-white rounded-lg focus:outline-none"
            style={{
              backgroundColor: "#6750A4",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#D0BCFF")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#6750A4")
            }
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#E8DEF8")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#D29DAC")
            }
          >
            Button 2
          </button>
          <button
            onClick={() => handleButtonClick(3)}
            className="w-1/3 px-6 py-3 text-white rounded-lg focus:outline-none"
            style={{
              backgroundColor: "#E6E0E9",
              color: "#6750A4", // Dark text for readability
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#D0BCFF")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#E6E0E9")
            }
          >
            Button 3
          </button>
        </div>

        {/* Slider Section */}
        {showSlider && (
  <div className="mt-4 p-4 bg-[#E8DEF8] rounded-lg">
    <label
      htmlFor="menopause-stage"
      className="block mb-2 text-sm font-medium text-gray-900 text-center"
    >
      Wechseljahresstadium
    </label>
    <input
      id="menopause-stage"
      type="range"
      min="0"
      max="3"
      step="1"
      defaultValue="0"
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
    <div className="flex justify-between text-sm mt-2 text-gray-900">
      <span>Prämenopause</span>
      <span>Perimenopause</span>
      <span>Menopause</span>
      <span>Postmenopause</span>
    </div>
  </div>
)}


        {/* Additional Text and Buttons based on selection */}
        {selectedButton && (
          <div className="mt-4 p-4 bg-[#E8DEF8] rounded-lg">

            <div className="flex justify-center">
              <Link
                href="/pillPage"
                className="px-6 py-3 rounded-lg text-white focus:outline-none"
                style={{
                  backgroundColor: "#D29DAC",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#E8DEF8")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#D29DAC")
                }
              >
                Last question ahead!
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* CSS for the loading spinner */}
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #6750A4; /* Purple */
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
