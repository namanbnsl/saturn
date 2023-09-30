import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const body: {
    id: string;
    name: string;
    priority: 'LOW' | 'HIGH' | 'MEDIUM';
    adminEmail: string;
  } = await req.json();

  const result = await db
    .selectFrom('membersInProject')
    .selectAll()
    .where((mp) =>
      mp.and({
        memberEmail: body.adminEmail,
        projectId: body.id
      })
    )
    .execute();

  if (result.length > 0) {
    await db
      .updateTable('project')
      .set({
        name: body.name,
        priority: body.priority,
        adminEmail: body.adminEmail
      })
      .where('id', '=', body.id)
      .execute();

    return NextResponse.json({ msg: 'success' });
  } else {
    return NextResponse.json({ msg: 'usr not in prjct' }, { status: 200 });
  }
}
