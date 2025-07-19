import { createContext } from 'react';
import { AnyRule } from '@/data/rules'; 
import { ThemeData, TypeData } from '@/data/themesTypes';

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
  dailyRuleIds: string[];
  bonusLetterData: {
    letter: string;
    value: number;
  } | null; // NEW: Bonus letter data
  metRuleCounts: [string, number][]; // This is how a Map gets serialized
  timeLeft: number;
  isGameOver: boolean;
  themeOfTheDay: ThemeData | null; // NEW: Theme of the day
  typeOfTheDay: TypeData | null; // NEW: Type of the day
}


// NEW: Define the shape of the context value
export interface PlayerStatsContextType {
  stats: PlayerStats | null;
  updateStats: (newStats: PlayerStats) => void;
  saveDailyGameState: (gameState: any) => void;
  // isScoreSubmitted: boolean;
  // setIsScoreSubmitted: (isSubmitted: boolean) => void;
}

// Create the context with a default that matches the new shape
export const PlayerStatsContext = createContext<PlayerStatsContextType | null>(null);