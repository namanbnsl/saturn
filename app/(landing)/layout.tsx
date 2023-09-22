import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const LandingLayout = async (props: Props) => {
  const session = await getSession();

  if (session?.user) return redirect('/dashboard');
  return <>{props.children}</>;
};

export default LandingLayout;
