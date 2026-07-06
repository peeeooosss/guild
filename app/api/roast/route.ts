import { NextRequest, NextResponse } from 'next/server';
import { getGroqResponse } from '@/lib/groq';
import { ROAST_SYSTEM_PROMPT } from '@/lib/prompts';

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();
    if (!input || typeof input !== 'string') {
      return NextResponse.json({ error: 'No input provided for roasting.' }, { status: 400 });
    }

    const roast = await getGroqResponse(
      [{ role: 'user', content: input }],
      ROAST_SYSTEM_PROMPT,
    );

    return NextResponse.json({ roast });
  } catch (error) {
    console.error('Roast API Error:', error);
    return NextResponse.json(
      { roast: "You're so cooked our AI couldn't even process your expenses." },
      { status: 200 },
    );
  }
}
