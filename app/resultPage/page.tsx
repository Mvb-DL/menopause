"use client";
import React, { useState } from "react";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import MenopauseTips from "../menoPauseTips/page";
import SymptomSummary from "../SymptomSummary/page";
import "chart.js/auto";

export default function Dashboard() {
  const [showCharts, setShowCharts] = useState(false); // Toggle for showing charts
  const [showTips, setShowTips] = useState(false); // Toggle for Menopause Tips
  const [showSum, setShowSum] = useState(false); // Toggle for Symptom Summary

  // Sample chart data
  const stepData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: [5000, 7000, 7500, 6000, 6500, 8000, 7000],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const calorieData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Calories Burned",
        data: [400, 450, 500, 600, 700, 750, 650],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const workoutData = {
    labels: ["Cardio", "Strength", "Flexibility"],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const sleepData = {
    labels: ["Sleep"],
    datasets: [
      {
        data: [7.5, 8],
        backgroundColor: ["#4BC0C0", "#E7E9ED"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

      {/* Button to toggle chart visibility */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowCharts(!showCharts)}
          className="px-6 py-3 text-white rounded-lg transition duration-300"
          style={{ backgroundColor: '#6B54A7' }}
        >
          {showCharts ? "Hide Charts" : "Show Charts"}
        </button>
      </div>

      {showCharts && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* Steps Line Chart */}
          <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center" style={{ height: "350px" }}>
            <h2 className="text-2xl font-semibold mb-4">Weekly Steps</h2>
            <div className="w-full h-full">
              <Line data={stepData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Calories Burned Bar Chart */}
          <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center" style={{ height: "350px" }}>
            <h2 className="text-2xl font-semibold mb-4">Calories Burned</h2>
            <div className="w-full h-full">
              <Bar data={calorieData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Workout Types Pie Chart */}
          <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center" style={{ height: "350px" }}>
            <h2 className="text-2xl font-semibold mb-4">Workout Distribution</h2>
            <div className="w-full h-full">
              <Pie data={workoutData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Sleep Hours Doughnut Chart */}
          <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center" style={{ height: "350px" }}>
            <h2 className="text-2xl font-semibold mb-4">Sleep Hours</h2>
            <div className="w-full h-full">
              <Doughnut data={sleepData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      )}

      {/* Buttons for Tips and Summary */}
      <div className="flex justify-center mt-8 space-x-4">
        <button 
          onClick={() => setShowTips(!showTips)} 
          className="px-6 py-3 text-white rounded-lg transition duration-300"
          style={{ backgroundColor: '#6B54A7' }}
        >
          {showTips ? "Hide Menopause Tips" : "Show Menopause Tips"}
        </button>

        <button 
          onClick={() => setShowSum(!showSum)} 
          className="px-6 py-3 text-white rounded-lg transition duration-300"
          style={{ backgroundColor: '#6B54A7' }}
        >
          {showSum ? "Hide Symptom Summary" : "Show Symptom Summary"}
        </button>
      </div>

      {/* Conditionally Render Menopause Tips */}
      {showTips && (
        <div className="mt-8">
          <MenopauseTips />
        </div>
      )}

      {/* Conditionally Render Symptom Summary */}
      {showSum && (
        <div className="mt-8">
          <SymptomSummary />
        </div>
      )}
    </div>
  );
}
