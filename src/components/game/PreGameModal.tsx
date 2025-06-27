import React from 'react';
import { PlayerStats } from '@/context/PlayerStatsContext';

// --- Helper Function ---
function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs < 10 ? '0' : ''}${secs}`;
}

interface PreGameModalProps {
    playerStats: PlayerStats | null;
    savedDailyState: any | null;
    onStartGame: () => void;
}

export default function PreGameModal({ playerStats, savedDailyState, onStartGame }: PreGameModalProps) {
    const isNewGame = !savedDailyState;

    return (
        // Backdrop
        <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black/60 overflow-y-auto p-4">
            {/* Modal Content */}
            <div className="bg-green-900 text-white p-8 rounded-xl shadow-2xl flex flex-col items-center gap-6 animate-fade-in-up text-center w-11/12 max-w-md">

                {isNewGame ? (
                    // --- Scenario 1: New Game ---
                    <>
                        <h2 className="text-4xl font-extrabold text-yellow-400 mb-2">
                            Welcome, Player #{playerStats?.username || '...'}!
                        </h2>
                        <div className="flex flex-col gap-4 w-full items-center">
                            <div className="max-w-4xl mx-auto px-4">
                                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Scrabdle - The daily anagram making game</h1>
                                <p className="text-lg text-gray-200">
                                    Drag tiles from your hand to the grid to form words. Adapt your strategy to the daily rules and compete for a high score.
                                </p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-300">
                                    Ready for today's puzzle?
                                </p>
                            </div>
                            <button 
                                onClick={onStartGame}
                                className="px-12 py-3 bg-green-600 text-white font-bold text-xl rounded-lg hover:bg-green-500 transition-transform transform hover:scale-105"
                            >
                                Play
                            </button>
                        </div>
                    </>
                ) : (
                    // --- Scenario 2: Game in Progress ---
                    <>
                        <h2 className="text-4xl font-extrabold text-yellow-400">
                            Welcome Back!
                        </h2>
                        <p className="text-lg text-gray-300">
                            Your game is in progress.
                        </p>
                        <div className="text-center">
                            <p className="text-gray-400">Time Elapsed </p>
                            <p className="text-5xl font-mono">{formatTime(savedDailyState.timeLeft)}</p>
                        </div>
                        <button
                            onClick={onStartGame}
                            className="mt-4 px-12 py-3 bg-green-600 text-white font-bold text-xl rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105"
                        >
                            Continue
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}