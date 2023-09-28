import { db } from '@/lib/db';
import { nanoid } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body: {
    name: string;
    email: string;
    priority: 'LOW' | 'HIGH' | 'MEDIUM';
  } = await req.json();

  const projectQuery = await db
    .selectFrom('project as p')
    .select('p.id')
    .innerJoin('membersInProject as m', 'p.id', 'm.projectId')
    .where((p) => p.and({ name: body.name, memberEmail: body.email }))
    .limit(1)
    .execute();

  if (projectQuery.length > 0) {
    return NextResponse.json({ msg: 'prjct exists' }, { status: 500 });
  } else {
    const id = nanoid();

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await db
      .insertInto('project')
      .values({
        id,
        name: body.name,
        priority: body.priority
      })
      .execute();

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result2 = await db
      .insertInto('membersInProject')
      .values({
        memberEmail: body.email,
        projectId: id
      })
      .execute();

    return NextResponse.json({ msg: 'success', id });
  }
}
