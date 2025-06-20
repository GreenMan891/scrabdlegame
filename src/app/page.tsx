"use client"; // This page now uses state and hooks

import { useState, useEffect } from 'react';
import Game from "@/components/game/Game";
import { PlayerStatsContext, PlayerStats, PlayerStatsContextType } from '@/context/PlayerStatsContext';

const PLAYER_STATS_KEY = 'dailyWordPlayerStats';
const DAILY_GAME_STATE_KEY = 'dailyWordGameState'; // Bring this key here

export default function HomePage() {
  // VVVV STATE MANAGEMENT MOVED HERE VVVV
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [savedDailyState, setSavedDailyState] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // This useEffect loads or creates the stats ONCE when the homepage loads.
  useEffect(() => {
    try {
      // VVVV THIS IS THE FIX: CHECK FOR RESET FIRST VVVV
      const urlParams = new URLSearchParams(window.location.search);
      const devReset = urlParams.get('reset') === 'true';

      if (devReset) {
        // If reset is requested, clear the daily game state from storage.
        localStorage.removeItem(DAILY_GAME_STATE_KEY);
      }

      // --- Load Player Stats (this part is unchanged) ---
      const savedStatsJSON = localStorage.getItem(PLAYER_STATS_KEY);
      if (savedStatsJSON) {
        setPlayerStats(JSON.parse(savedStatsJSON));
      } else {
        const newUsername = Math.floor(1000 + Math.random() * 999000);
        const newStats: PlayerStats = {
          username: newUsername,
          highScore: 0,
          lastGame: null,
        };
        localStorage.setItem(PLAYER_STATS_KEY, JSON.stringify(newStats));
        setPlayerStats(newStats);
      }

      const savedDailyGameJSON = localStorage.getItem(DAILY_GAME_STATE_KEY);
      const todayStr = new Date().toISOString().slice(0, 10);

      if (savedDailyGameJSON) {
        const dailyData = JSON.parse(savedDailyGameJSON);
        if (dailyData.saveDate === todayStr) {
          setSavedDailyState(dailyData.gameState);
        }
      }


    } catch (error) {
      console.error("Failed to load saved data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);// Empty array ensures it runs only once

  // Function to update stats, which we'll pass down via context
  const updateStats = (newStats: PlayerStats) => {
    try {
      setPlayerStats(newStats);
      localStorage.setItem(PLAYER_STATS_KEY, JSON.stringify(newStats));
    } catch (error) {
      console.error("Failed to save player stats:", error);
    }
  };

  const saveDailyGameState = (gameState: any) => {
    try {
      const saveData = {
        saveDate: new Date().toISOString().slice(0, 10),
        gameState: gameState,
      };
      localStorage.setItem(DAILY_GAME_STATE_KEY, JSON.stringify(saveData));
    } catch (error) {
      console.error("Failed to save daily game state:", error);
    }
  };

  const contextValue: PlayerStatsContextType = {
    stats: playerStats,
    updateStats,
    saveDailyGameState,
  };
  return (
    <PlayerStatsContext.Provider value={contextValue}>
      <div className="w-full">
        <div className="text-center mb-4">
          {/* Make font size responsive */}
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl font-bold">Scrabdle - The daily anagram making game</h1>
            <p className="text-lg text-gray-600 mt-2">
              Drag tiles from your hand to the grid to form words. Adapt your strategy to the daily rules and compete for a high score.
            </p>
            <p className="text-md text-gray-500 mt-1">
              (Not affiliated with similarly-named anagram games).
            </p>
          </div>
        </div>
        <div className="
          w-full                          
          lg:max-w-7xl                    // On large screens, set a max-width
          lg:mx-auto                      // On large screens, center it horizontally
          lg:border-4 lg:sm:border-8      // On large screens, apply the full border
          lg:border-[#003300]             // On large screens, apply the border color
          lg:rounded-lg                   // On large screens, apply rounded corners
          lg:overflow-hidden              // On large screens, clip the corners
          border-y-4 sm:border-y-8        // On ALL screens, have top/bottom borders
          border-[#003300]                // On ALL screens, have the border color
        ">
          <div className="flex justify-center">
            {isLoading ? (
              // Show a simple loading indicator while waiting for localStorage
              <div className="text-center p-10 text-xl text-gray-500">
                Loading Game...
              </div>
            ) : (
              // Once loading is false, render the game with the guaranteed stats
              <Game playerStats={playerStats} savedDailyState={savedDailyState} />
            )}
          </div>
        </div>
      </div>
    </PlayerStatsContext.Provider >
  );
}
