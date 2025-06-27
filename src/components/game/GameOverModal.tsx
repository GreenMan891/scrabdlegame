import React from 'react';
import Leaderboard from './Leaderboard'; // Import the new component

interface GameOverModalProps {
  score: number;
  isScoreSubmitted: boolean;
}

export default function GameOverModal({ score, isScoreSubmitted }: GameOverModalProps) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black/60 overflow-y-auto p-4">
      {/* We make the content box taller and add padding to accommodate the leaderboard */}
      <div className="bg-green-900 text-white rounded-xl shadow-2xl flex flex-col items-center gap-4 text-center w-full max-w-lg p-6 animate-fade-in-up">
        <h2 className="text-4xl font-extrabold text-yellow-400">Game Over!</h2>
        
        <div>
          <p className="text-lg text-gray-300">Your Final Score</p>
          <p className="text-6xl font-bold">{score}</p>
        </div>

        {/* The leaderboard component will fetch and display itself */}
        <Leaderboard isScoreSubmitted={isScoreSubmitted} />

        <p className="mt-2 text-gray-400">Come back tomorrow for a new puzzle!</p>
      </div>
    </div>
  );
}
