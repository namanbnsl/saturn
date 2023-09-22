import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = async (props: Props) => {
  const session = await getSession();
  if (session?.user) return redirect('/dashboard');

  return <>{props.children}</>;
};

export default AuthLayout;
