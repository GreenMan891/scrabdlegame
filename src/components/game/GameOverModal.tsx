import React, { useContext } from 'react';
import { PlayerStatsContext } from '@/context/PlayerStatsContext';

interface GameOverModalProps {
  score: number; // The score from this specific game
}

export default function GameOverModal({ score }: GameOverModalProps) {
  // VVVV CONSUME THE CONTEXT HERE VVVV
  const context = useContext(PlayerStatsContext);
  const stats = context?.stats;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black/60">
      <div className="bg-green-900 text-white p-6 sm:p-8 rounded-xl shadow-2xl flex flex-col items-center gap-4 animate-fade-in-up text-center w-11/12 max-w-md">
        <h2 className="text-4xl font-extrabold text-yellow-400">Game Over!</h2>
        
        <div>
          <p className="text-lg text-gray-300">Your Final Score</p>
          <p className="text-6xl font-bold">{score}</p>
        </div>

        {/* VVVV NEW STATS SECTION VVVV */}
        <div className="w-full bg-green-800 rounded-lg p-4 mt-2 space-y-2 text-left">
          {stats ? (
            <>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-400">Player ID:</span>
                <span className="font-mono text-lg">#{stats.username}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-400">High Score:</span>
                <span className="font-bold text-lg text-yellow-300">{stats.highScore}</span>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-300">Loading stats...</p>
          )}
        </div>

        <p className="mt-2 text-gray-400">Come back tomorrow for a new puzzle!</p>
      </div>
    </div>
  );
}

// import React from 'react';

// // VVVV REMOVED onPlayAgain PROP VVVV
// interface GameOverModalProps {
//   score: number;
// }

// export default function GameOverModal({ score }: GameOverModalProps) {
//   return (
//     <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black/60">
//       <div className="bg-green-900 text-white p-8 rounded-xl shadow-2xl flex flex-col items-center gap-6 animate-fade-in-up text-center">
//       <h2 className="text-4xl font-extrabold text-yellow-400">Game Over!</h2>
//       <div className="text-center">
//         <p className="text-lg text-gray-300">Your Final Score:</p>
//         <p className="text-6xl font-bold">{score}</p>
//       </div>
//       {/* VVVV REMOVED THE BUTTON VVVV */}
//       <p className="mt-4 text-gray-400">Come back tomorrow for new letters and rules!</p>
//       </div>
//     </div>
//   );
// }