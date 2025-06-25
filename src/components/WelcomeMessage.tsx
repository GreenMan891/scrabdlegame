"use client";

import { useContext } from 'react';
// VVVV IMPORT THE CONTEXT VVVV
import { PlayerStatsContext } from '@/context/PlayerStatsContext';

export default function WelcomeMessage() {
  // VVVV GET THE STATS DIRECTLY FROM THE CONTEXT VVVV
  const context = useContext(PlayerStatsContext);
  const playerStats = context?.stats;

  // We no longer need isLoading or internal state.
  // The parent (HomePage) will handle the loading state.

  if (playerStats) {
    return (
      <p className="text-lg text-green-800 dark:text-green-300 font-semibold mt-4">
        Welcome, Player #{playerStats.username}
      </p>
    );
  }

  // If stats are not yet available, this component renders nothing.
  // The "Loading..." message will be handled by HomePage.
  return null;
}