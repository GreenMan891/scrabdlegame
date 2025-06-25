import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// This function now performs a real, atomic database transaction
import type { Prisma } from '@prisma/client';

async function getNextUserId(): Promise<number> {
  // Use Prisma's transaction feature to ensure atomicity
  const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // Find the counter for player IDs, or create it if it doesn't exist
    const counter = await tx.counter.upsert({
      where: { name: 'playerId' },
      update: {
        value: {
          increment: 1,
        },
      },
      create: {
        name: 'playerId',
        value: 1, // The very first player will get ID 1
      },
    });

    // Create the new player record with the new ID
    await tx.player.create({
      data: {
        id: counter.value,
        highScore: 0,
      },
    });
    
    return counter.value;
  });

  return result;
}

export async function POST(request: Request) {
  try {
    const newUserId = await getNextUserId();

    // The user record is already created in the transaction, so we just return the ID
    return NextResponse.json({ playerId: newUserId });

  } catch (error) {
    console.error('Registration failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}