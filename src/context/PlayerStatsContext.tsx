import { createContext } from 'react';

export interface PlayerStats {
  username: number;
  highScore: number;
  lastGame: {
    date: string;
    score: number;
  } | null;
}

export interface SavedDailyState {
  grid: any[][]; // You can make these types more specific if you want
  hand: any[];
  tileBag: any[];
  basePoints: number;
  totalLengths: number;
  finalScore: number;
  bonusPoints: number;
  dailyRules: any[];
  metRuleCounts: [string, number][]; // This is how a Map gets serialized
  timeLeft: number;
  isGameOver: boolean;
}


// NEW: Define the shape of the context value
export interface PlayerStatsContextType {
  stats: PlayerStats | null;
  updateStats: (newStats: PlayerStats) => void;
  saveDailyGameState: (gameState: any) => void;
}

// Create the context with a default that matches the new shape
export const PlayerStatsContext = createContext<PlayerStatsContextType | null>(null);