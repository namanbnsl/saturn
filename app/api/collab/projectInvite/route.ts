import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body: { projectId: string; fromEmail: string } = await req.json();

  try {
    await db
      .insertInto('projectInvite')
      .values({
        projectId: body.projectId,
        fromEmail: body.fromEmail
      })
      .execute();
  } catch (err) {
    const error = err as { message: string };

    if (
      error.message ===
      'duplicate key value violates unique constraint "projectInvite_pkey"'
    ) {
      return NextResponse.json({ msg: 'duplicate project invite' });
    }
  }

  return NextResponse.json({ msg: 'success' });
}
