import { AuthOptions, DefaultSession, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import { KyselyAdapter } from '@/lib/kysely-adapter';
import { sendEmail } from '@/lib/send-email';
import LoginLink from '@/emails/LoginLink';
import { db } from '@/lib/db';
import { nanoid } from '@/lib/utils';

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
  pages: {
    newUser: '/register',
    signIn: '/signIn'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true
    }),
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`Login link: ${url}`);
          return;
        } else {
          sendEmail({
            email: identifier,
            subject: 'Your saturn login link',
            react: LoginLink({ validationLink: url })
          });
        }
      }
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error('No profile');
      }

      const user = await db
        .selectFrom('user')
        .selectAll()
        .where('email', '=', profile.email)
        .execute();

      if (user.length > 0) {
        await db
          .updateTable('user')
          .set({
            // We had to do this because github gives image as avatar_url in props
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            image: profile.image ? profile.image : profile?.avatar_url,
            name: profile.name
          })
          .where('id', '=', user[0].id)
          .execute();
      } else {
        await db
          .insertInto('user')
          .values({
            id: nanoid(),
            email: profile.email,
            image: profile.image,
            name: profile.name
          })
          .execute();
      }

      return true;
    }
  }
};

export const getSession = () => {
  return getServerSession(authOptions);
};
