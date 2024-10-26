// components/TranscribedTextList.tsx

import React from 'react';
import "../styles/text.scss"

interface TranscribedTextListProps {
  entries?: string[];
}

const TranscribedTextList: React.FC<TranscribedTextListProps> = ({ entries = [] }) => {
  const defaultEntries = [
    "Today I saw a beautiful sunrise over the mountains. The sky was painted with hues of pink and orange, and the air felt crisp and fresh. I took a deep breath, feeling an immense sense of peace and gratitude. It’s moments like these that make me appreciate the beauty of nature.",
    
    "The weather was perfect, so I took a long walk by the lake. The water was calm, mirroring the sky, and ducks were swimming lazily near the shore. I could hear the gentle rustle of leaves in the breeze and felt the warmth of the sun on my face. Walking along the path, I felt relaxed and content, lost in my thoughts.",
    
    "Met an old friend and we talked for hours about life and dreams. We reminisced about our childhood, shared stories of our travels, and discussed our future ambitions. It felt so refreshing to reconnect and share our aspirations and struggles. There’s something so comforting about being around someone who understands you deeply.",
    
    "I spent the afternoon reading a fascinating book on history. The book explored ancient civilizations and their unique cultures, traditions, and achievements. I was particularly engrossed in the chapter about the lost city of Atlantis and the theories surrounding its existence. Time seemed to fly by as I immersed myself in the stories of the past.",
    
    "In the evening, I tried a new recipe and it turned out delicious. It was a creamy pasta dish with garlic, herbs, and a hint of lemon zest. As I took my first bite, I was surprised at how well the flavors melded together. Cooking has always been therapeutic for me, and tonight, it felt especially rewarding to create something so tasty."
  ];

  const transcribedEntries = entries.length ? entries : defaultEntries;

  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-semibold mb-6">Past Diary Entries</h2> {/* Bestehende Überschrift */}
      <div className="flex justify-center items-center">
        <div className="transcribed-text-list space-x-4 overflow-x-auto p-4">
          {transcribedEntries.map((transcribedText, entryIndex) => (
            <div 
              key={entryIndex} 
              className="transcribed-entry"
              aria-label={`Diary Entry ${entryIndex + 1}`}
            >
              <p className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed">
                {transcribedText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TranscribedTextList;
