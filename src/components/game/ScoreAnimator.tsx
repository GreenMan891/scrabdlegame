import React from 'react';

interface ScoreAnimatorProps {
  currentlyScoringWord: string | null;
  currentCalculation: string;
  animatedTotalScore: number;
}

export default function ScoreAnimator({
  currentlyScoringWord,
  currentCalculation,
  animatedTotalScore,
}: ScoreAnimatorProps) {
  return (
    <div className="w-full bg-green-950 px-4 py-2 rounded-lg text-gray-300 font-bold text-center">
      
      {/* Top line: Which word is being scored? */}
      <div className="text-sm text-yellow-400 h-6">
        {currentlyScoringWord ? `Scoring: ${currentlyScoringWord}` : ''}
      </div>

      {/* Middle line: The calculation breakdown */}
      <div className="text-lg sm:text-xl h-8 font-mono">
        {currentCalculation}
      </div>

      {/* Bottom line: The running total */}
      <div className="text-2xl sm:text-3xl text-white">
        Total: {animatedTotalScore}
      </div>

    </div>
  );
}