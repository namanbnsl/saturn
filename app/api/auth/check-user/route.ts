import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const checkUser = async ({
  email
}: {
  email: string;
}): Promise<boolean> => {
  const user = await db
    .selectFrom('user')
    .selectAll()
    .where('email', '=', email)
    .execute();

  return user.length > 0 ? true : false;
};

export const POST = async (req: Request) => {
  const { email } = await req.json();

  const exists = await checkUser({ email });

  return NextResponse.json({ exists });
};
