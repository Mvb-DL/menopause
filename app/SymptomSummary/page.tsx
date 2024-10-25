// File: SymptomSummary.js
import React from 'react';

const SymptomSummary = () => {
  const symptoms = [
    {
      name: "Hot Flashes",
      description:
        "A sudden feeling of warmth, usually most intense over the face, neck, and chest. Can be accompanied by sweating and red, blotchy skin."
    },
    {
      name: "Night Sweats",
      description:
        "Intense sweating during sleep that may disrupt sleep and lead to tiredness. Night sweats are often a symptom of hot flashes occurring at night."
    },
    {
      name: "Mood Changes",
      description:
        "Fluctuations in mood, such as irritability, anxiety, or depression, which may be influenced by hormonal changes during menopause."
    },
   
  ];

  return (
    <div className="symptom-summary-container bg-white p-10 rounded-lg shadow-lg max-w-6xl mx-auto my-12">
      <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">Common Menopause Symptoms</h2>
      <ul className="space-y-8">
        {symptoms.map((symptom, index) => (
          <li key={index} className="symptom-item">
            <h3 className="text-3xl font-semibold text-gray-700">{symptom.name}</h3>
            <p className="text-xl text-gray-600">{symptom.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SymptomSummary;
