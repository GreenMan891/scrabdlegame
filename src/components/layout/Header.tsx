"use client";

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { PlayerStatsContext } from '@/context/PlayerStatsContext';
import Tile from '../game/Tile';

export default function Header() {
  const context = useContext(PlayerStatsContext);
  const playerStats = context?.stats;

  const [topScore, setTopScore] = useState<number | null>(null);
  const [topLoading, setTopLoading] = useState(true);
  const [resolvedPlayerId, setResolvedPlayerId] = useState<number | null>(null);
  const [playerRank, setPlayerRank] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchTop() {
      try {
        // Resolve player id: prefer context, fallback to localStorage
        let pid: number | null = null;
        if (playerStats && typeof playerStats.username === 'number') {
          pid = playerStats.username;
        } else {
          try {
            const saved = localStorage.getItem('dailyWordPlayerStats') || localStorage.getItem('dailywordplayerstats') || localStorage.getItem('dailyWordPlayerStats');
            if (saved) {
              const parsed = JSON.parse(saved);
              if (parsed && typeof parsed.username === 'number') pid = parsed.username;
            }
          } catch (e) {
            // ignore parse errors
          }
        }

        if (mounted) setResolvedPlayerId(pid);

        const url = pid ? `/api/leaderboard?playerId=${encodeURIComponent(String(pid))}` : '/api/leaderboard';
        const res = await fetch(url);
        if (!res.ok) throw new Error('network');
        const data = await res.json();

        const top = data?.topScores?.[0]?.score ?? null;
        if (mounted) setTopScore(top);

        // Determine player's rank: API returns playerRankData when player is outside top 10
        let rank: number | null = null;
        if (pid != null) {
          if (data?.playerRankData && typeof data.playerRankData.rank === 'number') {
            rank = data.playerRankData.rank;
          } else if (Array.isArray(data?.topScores)) {
            const idx = data.topScores.findIndex((s: any) => s.playerId === pid);
            if (idx !== -1) rank = idx + 1;
          }
        }
        if (mounted) setPlayerRank(rank);
      } catch (e) {
        if (mounted) {
          setTopScore(null);
          setPlayerRank(null);
        }
      } finally {
        if (mounted) setTopLoading(false);
      }
    }
    fetchTop();
    return () => { mounted = false; };
  }, []);

  // VVVV DEFINE THE TITLE AND ITS TILES VVVV
  const title = "SCRABDLE";
  const titleTiles = [
    { letter: 'S', value: 1 },
    { letter: 'C', value: 3 },
    { letter: 'R', value: 1 },
    { letter: 'A', value: 1 },
    { letter: 'B', value: 3 },
    { letter: 'D', value: 2 },
    { letter: 'L', value: 1 },
    { letter: 'E', value: 1 },
  ];

  return (
    <header className="bg-green-950 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-2 sm:p-4">
        
        {/* VVVV REPLACED THE OLD <Link> WITH THIS NEW DIV VVVV */}
        <Link href="/" className="cursor-pointer">
          <div className="flex gap-0.3">
            {titleTiles.map((tile, index) => (
              <div key={index} className="w-10 h-10 sm:w-12 sm:h-12">
                <Tile
                  letter={tile.letter}
                  value={tile.value}
                  // Use a fixed size for the header tiles
                  tileSize={48}
                  // Set isFound to true to make them green
                  isFound={false}
                  // No drag handlers are needed thanks to our change in Step 1
                />
              </div>
            ))}
          </div>
        </Link>
        
        <div className="flex items-center gap-4 text-sm font-semibold">
          {(resolvedPlayerId !== null || playerStats) ? (
            <span>
              Player #{resolvedPlayerId ?? playerStats?.username}
              {playerRank ? <span className="ml-2 text-sm">(Rank #{playerRank})</span> : null}
            </span>
          ) : (
            <span className="text-gray-400">Loading...</span>
          )}

          <span className="text-gray-300">|</span>

          {topLoading ? (
            <span className="text-gray-400">Top score today: Loading...</span>
          ) : topScore !== null ? (
            <span>Top score today: {topScore}</span>
          ) : (
            <span className="text-gray-400">Top score today: —</span>
          )}
        </div>
      </nav>
    </header>
  );
}