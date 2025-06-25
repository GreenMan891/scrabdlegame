import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming request body
    const body = await request.json();
    const { playerId, score, timeTaken } = body;

    // 2. Basic validation
    if (!playerId || typeof score !== 'number' || typeof timeTaken !== 'number') {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const todayStr = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

    // 3. Optional: Check if the user has already submitted a score for today
    // This prevents duplicate entries if the user refreshes the page after the game ends.
    const existingScore = await prisma.dailyScore.findFirst({
      where: {
        playerId: playerId,
        date: todayStr,
      },
    });

    if (existingScore) {
      return NextResponse.json({ success: true, message: 'Score for today already submitted.' });
    }

    // 4. Create the new daily score entry
    await prisma.dailyScore.create({
      data: {
        date: todayStr,
        playerId: playerId,
        score: score,
        timeTaken: timeTaken,
      },
    });

    return NextResponse.json({ success: true, message: 'Daily score submitted.' });

  } catch (error) {
    console.error('Failed to submit daily score:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}