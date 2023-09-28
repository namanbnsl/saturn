import { db } from '@/lib/db';
import { nanoid } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body: {
    name: string;
    email: string;
    priority: 'LOW' | 'HIGH' | 'MEDIUM';
  } = await req.json();

  const checkProjectName = await db
    .selectFrom('project')
    .selectAll()
    .where((project) =>
      project.and({
        name: body.name,
        userEmail: body.email
      })
    )
    .execute();

  if (checkProjectName.length > 0) {
    return NextResponse.json({ msg: 'prjct exists' }, { status: 500 });
  } else {
    const id = nanoid();

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await db
      .insertInto('project')
      .values({
        id,
        name: body.name,
        userEmail: body.email,
        priority: body.priority
      })
      .execute();

    return NextResponse.json({ msg: 'success', id });
  }
}
