// File: MenopauseTips.js
import React from 'react';

const MenopauseTips = () => {
  const tips = [
    {
      title: "Healthy Nutrition",
      suggestion:
        "A balanced diet rich in fruits, vegetables, and whole grains can help support your body during menopause. Try to reduce sugar and processed foods."
    },
    {
      title: "Regular Exercise",
      suggestion:
        "Engaging in regular physical activity, such as walking, swimming, or yoga, can help reduce mood swings and maintain bone density."
    },
    {
      title: "Stress Management",
      suggestion:
        "Practicing relaxation techniques like meditation, breathing exercises, and mindfulness can help reduce stress and anxiety, which may increase during menopause."
    },
    {
      title: "Stay Hydrated",
      suggestion:
        "Drinking enough water daily can help ease hot flashes and other discomforts. Keeping a water bottle nearby is a great reminder to stay hydrated."
    },
   
  ];

  return (
    <div className="menopause-tips-container bg-white p-10 rounded-lg shadow-lg max-w-6xl mx-auto my-12">
    <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">Tips for Managing Menopause Symptoms</h2>
    <ul className="space-y-8">
      {tips.map((tip, index) => (
        <li key={index} className="tip-item">
          <h3 className="text-3xl font-semibold text-gray-700">{tip.title}</h3>
          <p className="text-xl text-gray-600">{tip.suggestion}</p>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default MenopauseTips;
