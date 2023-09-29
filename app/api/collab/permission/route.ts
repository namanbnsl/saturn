import JoinedProjectEmail from '@/emails/JoinedProject';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/send-email';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body: { projectId: string; fromEmail: string } = await req.json();

  const project = await db
    .selectFrom('project')
    .where('id', '=', body.projectId)
    .selectAll()
    .execute();

  await db
    .insertInto('membersInProject')
    .values({
      memberEmail: body.fromEmail,
      projectId: body.projectId
    })
    .execute();

  await db
    .deleteFrom('projectInvite')
    .where((p) =>
      p.and({ fromEmail: body.fromEmail, projectId: body.projectId })
    )
    .execute();

  const host = process.env.HOST;

  if (process.env.NODE_ENV === 'development') {
    console.log(`You have been invited to join ${project[0].name}`);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const res = await sendEmail({
      email: body.fromEmail,
      subject: `You have been invited to join ${project[0].name}`,
      react: JoinedProjectEmail({
        projectName: project[0].name,
        url: host as string
      })
    });
  }

  return NextResponse.json({ msg: 'success' });
}
