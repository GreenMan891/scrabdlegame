"use client";

import Link from 'next/link';
import { useContext } from 'react';
import { PlayerStatsContext } from '@/context/PlayerStatsContext';
import Tile from '../game/Tile';

export default function Header() {
  const context = useContext(PlayerStatsContext);
  const playerStats = context?.stats;

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
          {playerStats ? (
            <span>Player #{playerStats.username}</span>
          ) : (
            <span className="text-gray-400">Loading...</span>
          )}
        </div>
      </nav>
    </header>
  );
}