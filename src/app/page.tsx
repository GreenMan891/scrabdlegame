"use client";

import { useState, useEffect } from 'react';
import Game from "@/components/game/Game";
import { PlayerStatsContext, PlayerStats, PlayerStatsContextType, SavedDailyState } from '@/context/PlayerStatsContext';
import WelcomeMessage from '@/components/WelcomeMessage';

const PLAYER_STATS_KEY = 'dailyWordPlayerStats';
const DAILY_GAME_STATE_KEY = 'dailyWordGameState';

export default function HomePage() {
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [savedDailyState, setSavedDailyState] = useState<SavedDailyState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // This useEffect loads or creates the stats ONCE when the homepage loads.
  useEffect(() => {
    const initializeUser = async () => {
      try {
        let stats: PlayerStats | null = null;
        const savedStatsJSON = localStorage.getItem(PLAYER_STATS_KEY);

        if (savedStatsJSON) {
          // If stats exist, parse and use them.
          stats = JSON.parse(savedStatsJSON);
        } else {
          // --- NEW USER FLOW ---
          // No stats found, so call our API to register a new user.
          console.log("No player stats found. Registering new player...");
          const response = await fetch('/api/register', { method: 'POST' });

          if (!response.ok) {
            throw new Error('Failed to register new player');
          }

          const data = await response.json();
          const newPlayerId = data.playerId;

          stats = {
            username: newPlayerId, // Use the ID from the API
            highScore: 0,
            lastGame: null,
          };

          // Save the newly created profile to localStorage.
          localStorage.setItem(PLAYER_STATS_KEY, JSON.stringify(stats));
          console.log(`Registered as Player #${newPlayerId}`);
        }

        setPlayerStats(stats);

        // --- Daily Game State Logic (unchanged) ---
        const savedDailyGameJSON = localStorage.getItem(DAILY_GAME_STATE_KEY);
        const todayStr = new Date().toISOString().slice(0, 10);
        if (savedDailyGameJSON) {
          const dailyData = JSON.parse(savedDailyGameJSON);
          if (dailyData.saveDate === todayStr) {
            setSavedDailyState(dailyData.gameState);
          }
        }

      } catch (error) {
        console.error("Initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
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
              <Game />
            )}
          </div>
        </div>
      </div>
    </PlayerStatsContext.Provider >
  );
}
