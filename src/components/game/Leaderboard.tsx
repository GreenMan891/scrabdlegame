"use client";

import { useState, useEffect, useContext } from 'react';
import { PlayerStatsContext } from '@/context/PlayerStatsContext';

// --- Helper Functions ---
function formatRank(rank: number) {
  if (rank === 1) return '1st';
  if (rank === 2) return '2nd';
  if (rank === 3) return '3rd';
  return `${rank}th`;
}

function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.round((seconds - Math.floor(seconds)) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

// --- Data Structures ---
interface ScoreEntry {
  playerId: number;
  score: number;
  timeTaken: number;
}
interface LeaderboardData {
  topScores: ScoreEntry[];
  playerRankData: {
    rank: number;
    score: number;
    timeTaken: number;
  } | null;
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(PlayerStatsContext);
  const currentPlayerId = context?.stats?.username;

  useEffect(() => {
    if (!currentPlayerId) return;

    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/leaderboard?playerId=${currentPlayerId}`);
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentPlayerId]);

  if (isLoading) {
    return <p className="text-center text-gray-400 p-4">Loading leaderboard...</p>;
  }

  if (!leaderboardData) {
    return <p className="text-center text-red-400 p-4">Could not load leaderboard.</p>;
  }

  const { topScores, playerRankData } = leaderboardData;

  const renderRow = (rank: number, entry: ScoreEntry, isPlayer: boolean) => (
    <tr key={rank} className={isPlayer ? 'bg-yellow-400/20 text-yellow-300' : ''}>
      <td className="p-2 font-bold">{formatRank(rank)}</td>
      <td className="p-2 font-mono">#{entry.playerId}</td>
      <td className="p-2 font-bold">{entry.score}</td>
      <td className="p-2 font-mono">{formatTime(entry.timeTaken)}</td>
    </tr>
  );

  return (
    <div className="w-full bg-green-800 rounded-lg p-4 mt-2 text-left">
      <h3 className="text-xl font-bold text-center mb-3">Today's Leaderboard</h3>
      <table className="w-full text-sm sm:text-base">
        <thead>
          <tr className="text-gray-400">
            <th className="p-2 text-left">Rank</th>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Score</th>
            <th className="p-2 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {topScores.map((entry, index) => renderRow(index + 1, entry, entry.playerId === currentPlayerId))}
          
          {/* If player is not in top 10, show their rank separately */}
          {playerRankData && (
            <>
              <tr><td colSpan={4} className="text-center py-2">...</td></tr>
              {renderRow(
                playerRankData.rank,
                { playerId: playerRankData.rank, score: playerRankData.score, timeTaken: playerRankData.timeTaken },
                true
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}