import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async (props: Props) => {
  const session = await getSession();
  if (!session?.user) return redirect('/signIn');

  return <>{props.children}</>;
};

export default DashboardLayout;
