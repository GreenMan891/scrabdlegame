"use client";

import Link from 'next/link';
import { useContext } from 'react';
import { PlayerStatsContext } from '@/context/PlayerStatsContext';

export default function Header() {
    const context = useContext(PlayerStatsContext);
    // Get the full stats object from the context
    const playerStats = context?.stats;
    return (
        <header className="bg-green-950 text-white shadow-md">
            <nav className="container mx-auto flex items-center justify-between p-4">
                <Link href="/" className="text-2xl font-bold">
                    Scrabdle (Working Title)
                </Link>
                {/* VVVV UPDATED STATS DISPLAY VVVV */}
                <div className="flex items-center gap-4 text-sm font-semibold">
                    {playerStats ? (
                        // Display the username (which is the sequential ID)
                        <span>Player #{playerStats.username}</span>
                    ) : (
                        <span className="text-gray-400">Loading...</span>
                    )}
                </div>
            </nav>
        </header>
    );
}