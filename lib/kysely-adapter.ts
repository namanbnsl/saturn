import {
  type AdapterUser,
  type Adapter,
  VerificationToken
} from 'next-auth/adapters';
import { db } from './db';
import { nanoid } from 'nanoid';

export const KyselyAdapter: Adapter = {
  createUser: async (data) =>
    (await db
      .insertInto('user')
      .values({ id: nanoid(), ...data })
      .executeTakeFirstOrThrow()
      .then(async () => {
        return await db
          .selectFrom('user')
          .selectAll()
          .where('email', '=', `${data.email}`)
          .executeTakeFirstOrThrow();
      })) as AdapterUser,
  getUser: async (id) =>
    ((await db
      .selectFrom('user')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst()) as AdapterUser) ?? null,
  getUserByEmail: async (email) =>
    ((await db
      .selectFrom('user')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst()) as AdapterUser) ?? null,
  getUserByAccount: async ({ providerAccountId, provider }) =>
    ((await db
      .selectFrom('user')
      .innerJoin('account', 'user.id', 'account.userId')
      .selectAll('user')
      .where('account.providerAccountId', '=', providerAccountId)
      .where('account.provider', '=', provider)
      .executeTakeFirst()) as AdapterUser) ?? null,
  updateUser: async ({ id, ...user }) => {
    if (!id) throw new Error('User not found');
    return (await db
      .updateTable('user')
      .set(user)
      .where('id', '=', id)
      .executeTakeFirstOrThrow()
      .then(async () => {
        return await db
          .selectFrom('user')
          .selectAll()
          .where('id', '=', id)
          .executeTakeFirstOrThrow();
      })) as AdapterUser;
  },
  deleteUser: async (userId) => {
    await db.deleteFrom('user').where('user.id', '=', userId).execute();
  },
  linkAccount: async (account) => {
    await db
      .insertInto('account')
      .values({ id: nanoid(), ...account })
      .executeTakeFirstOrThrow();
  },
  unlinkAccount: async ({ providerAccountId, provider }) => {
    await db
      .deleteFrom('account')
      .where('account.providerAccountId', '=', providerAccountId)
      .where('account.provider', '=', provider)
      .executeTakeFirstOrThrow();
  },
  createSession: async (data) =>
    await (async () => {
      await db
        .insertInto('session')
        .values({ id: nanoid(), ...data })
        .executeTakeFirstOrThrow();
      return await db
        .selectFrom('session')
        .selectAll()
        .where('sessionToken', '=', data.sessionToken)
        .executeTakeFirstOrThrow();
    })(),
  getSessionAndUser: async (sessionTokenArg) => {
    const result = await db
      .selectFrom('session')
      .innerJoin('user', 'user.id', 'session.userId')
      .selectAll('user')
      .select([
        'session.id as sessionId',
        'session.userId',
        'session.sessionToken',
        'session.expires'
      ])
      .where('session.sessionToken', '=', sessionTokenArg)
      .executeTakeFirst();
    if (!result) return null;
    const { sessionId: id, userId, sessionToken, expires, ...user } = result;
    return {
      user: user as AdapterUser,
      session: { id, userId, sessionToken, expires }
    };
  },
  updateSession: async (session) =>
    await db
      .updateTable('session')
      .set(session)
      .where('session.sessionToken', '=', session.sessionToken)
      .executeTakeFirstOrThrow()
      .then(async () => {
        return await db
          .selectFrom('session')
          .selectAll()
          .where('session.sessionToken', '=', session.sessionToken)
          .executeTakeFirstOrThrow();
      }),
  deleteSession: async (sessionToken) => {
    await db
      .deleteFrom('session')
      .where('session.sessionToken', '=', sessionToken)
      .executeTakeFirstOrThrow();
  },
  createVerificationToken: async (verificationToken) =>
    await db
      .insertInto('verificationToken')
      .values(verificationToken)
      .executeTakeFirstOrThrow()
      .then(async () => {
        return await db
          .selectFrom('verificationToken')
          .selectAll()
          .where('token', '=', verificationToken.token)
          .executeTakeFirstOrThrow();
      }),
  useVerificationToken: async ({ identifier, token }) =>
    ((await db
      .selectFrom('verificationToken')
      .selectAll()
      .where('token', '=', token)
      .executeTakeFirst()
      .then(async (res) => {
        await db
          .deleteFrom('verificationToken')
          .where('verificationToken.token', '=', token)
          .where('verificationToken.identifier', '=', identifier)
          .executeTakeFirst();
        return res;
      })) as VerificationToken) ?? null
};
