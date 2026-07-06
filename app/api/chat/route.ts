import { NextRequest, NextResponse } from 'next/server';
import { getGroqResponse } from '@/lib/groq';
import { incrementAndCheckLimit } from '@/lib/redis';
import { THERAPIST_PROMPT, FINANCE_COACH_PROMPT, COMBINED_PROMPT } from '@/lib/prompts';
import { getUserId } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { messages, agentTypes } = await req.json();
    const userId = getUserId(req);

    const { count, limited } = await incrementAndCheckLimit(userId, 'all');

    if (limited) {
      const cutoffText =
        "Yo, you've maxed out your 30 daily Guild messages for today. Honestly? That's enough screen time. Go touch grass, lock in on your goals, and come back tomorrow. I'll be right here when you need me.";
      return NextResponse.json({ rateLimited: true, reply: cutoffText, remainingChats: 0 });
    }

    const hasTherapist = agentTypes?.includes('therapist');
    const hasFinance = agentTypes?.includes('finance');

    let systemPrompt: string;
    if (hasTherapist && hasFinance) {
      systemPrompt = COMBINED_PROMPT;
    } else if (hasFinance) {
      systemPrompt = FINANCE_COACH_PROMPT;
    } else {
      systemPrompt = THERAPIST_PROMPT;
    }

    const reply = await getGroqResponse(messages, systemPrompt);

    return NextResponse.json({ reply, remainingChats: 30 - count });
  } catch (error) {
    console.error('Guild Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to reach your Guild advisor. Try again in a bit.' },
      { status: 500 },
    );
  }
}
