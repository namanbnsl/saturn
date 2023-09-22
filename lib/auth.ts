import { AuthOptions, DefaultSession, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { KyselyAdapter } from '@/lib/kysely-adapter';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: AuthOptions = {
  adapter: KyselyAdapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ]
};

export const getSession = () => {
  return getServerSession(authOptions);
};
