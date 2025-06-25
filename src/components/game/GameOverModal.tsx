import React from 'react';
import Leaderboard from './Leaderboard'; // Import the new component

interface GameOverModalProps {
  score: number;
}

export default function GameOverModal({ score }: GameOverModalProps) {
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
        <Leaderboard />

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