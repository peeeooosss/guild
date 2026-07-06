import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    const sanitized = name.trim().slice(0, 30);

    return NextResponse.json({
      user: {
        name: sanitized,
        joinedAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ error: 'Authentication failed.' }, { status: 500 });
  }
}
