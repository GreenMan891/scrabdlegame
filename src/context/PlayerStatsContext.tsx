import { createContext } from 'react';

export interface PlayerStats {
  username: number;
  highScore: number;
  lastGame: {
    date: string;
    score: number;
  } | null;
}

// NEW: Define the shape of the context value
export interface PlayerStatsContextType {
  stats: PlayerStats | null;
  updateStats: (newStats: PlayerStats) => void;
  saveDailyGameState: (gameState: any) => void;
}

// Create the context with a default that matches the new shape
export const PlayerStatsContext = createContext<PlayerStatsContextType | null>(null);