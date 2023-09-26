import { db } from '@/lib/db';
import { nanoid } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body: {
    name: string;
    userId: string;
    priority: 'LOW' | 'HIGH' | 'MEDIUM';
  } = await req.json();

  const checkProjectName = await db
    .selectFrom('project')
    .selectAll()
    .where('name', '=', body.name)
    .execute();

  if (checkProjectName.length > 0) {
    return NextResponse.json({ msg: 'prjct exists.' }, { status: 500 });
  }

  db.insertInto('project')
    .values({
      id: nanoid(),
      name: body.name,
      userId: body.userId,
      priority: body.priority
    })
    .execute();

  return NextResponse.json({ msg: 'success' });
}
