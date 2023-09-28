import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const body: {
    id: string;
    name: string;
    priority: 'LOW' | 'HIGH' | 'MEDIUM';
  } = await req.json();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const result = await db
    .updateTable('project')
    .set({ name: body.name, priority: body.priority })
    .where('id', '=', body.id)
    .execute();

  return NextResponse.json({ msg: 'success' });
}
