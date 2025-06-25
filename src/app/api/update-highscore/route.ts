import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming request body
    const body = await request.json();
    const { playerId, newHighScore } = body;

    // 2. Basic validation
    if (!playerId || typeof newHighScore !== 'number') {
      return new NextResponse('Missing playerId or newHighScore', { status: 400 });
    }

    // 3. Find the player in the database
    const player = await prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!player) {
      return new NextResponse('Player not found', { status: 404 });
    }

    // 4. Only update if the new score is actually higher
    if (newHighScore > player.highScore) {
      await prisma.player.update({
        where: { id: playerId },
        data: { highScore: newHighScore },
      });
    }

    return NextResponse.json({ success: true, message: 'High score updated (if applicable).' });

  } catch (error) {
    console.error('Failed to update high score:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}