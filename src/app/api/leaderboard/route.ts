import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const todayStr = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    
    // Get the current player's ID from the query parameters, e.g., /api/leaderboard?playerId=1235
    const searchParams = request.nextUrl.searchParams;
    const currentPlayerId = parseInt(searchParams.get('playerId') || '0', 10);

    // --- Fetch Top 10 Scores ---
    const topScores = await prisma.dailyScore.findMany({
      where: { date: todayStr },
      orderBy: [
        { score: 'desc' },
        { timeTaken: 'asc' },
      ],
      take: 10,
    });

    // --- Find Current Player's Rank ---
    let playerRankData = null;
    const isPlayerInTop10 = topScores.some(s => s.playerId === currentPlayerId);

    // If the player is not in the top 10 and we have a valid ID, find their specific rank.
    if (!isPlayerInTop10 && currentPlayerId > 0) {
      // Get all scores for today to determine the rank
      const allScores = await prisma.dailyScore.findMany({
        where: { date: todayStr },
        select: { playerId: true, score: true, timeTaken: true },
        orderBy: [
          { score: 'desc' },
          { timeTaken: 'asc' },
        ],
      });
      
      const rank = allScores.findIndex(s => s.playerId === currentPlayerId);

      // findIndex returns -1 if not found
      if (rank !== -1) {
        playerRankData = {
          rank: rank + 1, // Add 1 because findIndex is 0-based
          score: allScores[rank].score,
          timeTaken: allScores[rank].timeTaken,
        };
      }
    }

    // Return all the data needed by the frontend
    return NextResponse.json({
      topScores,
      playerRankData,
    });

  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}