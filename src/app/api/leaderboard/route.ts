import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const todayStr = new Date().toISOString().slice(0, 10);
    const searchParams = request.nextUrl.searchParams;
    const currentPlayerId = parseInt(searchParams.get('playerId') || '0', 10);

    // --- STEP 1: Fetch ALL of today's scores, sorted correctly ---
    // This is more efficient than multiple queries.
    const allScores = await prisma.dailyScore.findMany({
      where: { date: todayStr },
      orderBy: [
        { score: 'desc' },
        { timeTaken: 'asc' },
      ],
      // We select only the fields we need.
      select: {
        playerId: true,
        score: true,
        timeTaken: true,
      },
    });

    // --- STEP 2: Process the results in JavaScript ---

    // The top 10 scores are simply the first 10 items in the sorted list.
    const topScores = allScores.slice(0, 10);

    let playerRankData = null;

    // Find the index of the current player in the full sorted list.
    const playerIndex = allScores.findIndex(s => s.playerId === currentPlayerId);

    // If the player is found (index is not -1) and they are NOT in the top 10 (index is 10 or greater)
    if (playerIndex !== -1 && playerIndex >= 10) {
      playerRankData = {
        rank: playerIndex + 1, // Rank is index + 1
        ...allScores[playerIndex], // Spread the score and timeTaken from the found entry
      };
    }

    // --- STEP 3: Return the structured data ---
    return NextResponse.json({
      topScores,
      playerRankData, // This will be null if the player is in the top 10 or not found
    });

  } catch (error) { 
  console.error('Failed to fetch leaderboard:', error);
  return new NextResponse('Internal Server Error', { status: 500 });
  }
}