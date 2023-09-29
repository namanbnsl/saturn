import { nanoid } from '@/lib/utils';
import { Resend } from 'resend';

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const sendEmail = async ({
  email,
  subject,
  react,
  test
}: {
  email: string;
  subject: string;
  marketing?: boolean;
  test?: boolean;
  react: React.ReactElement;
}) => {
  if (!resend) {
    console.log(
      'Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.'
    );
    return Promise.resolve();
  }

  return resend.emails.send({
    from: 'onboarding@resend.dev',
    to: test ? 'delivered@resend.dev' : email,
    subject,
    react,
    headers: {
      'X-Entity-Ref-ID': nanoid()
    }
  });
};
