import AuthProvider from '@/components/providers/AuthProvider';
import { Toaster } from '@/components/ui/toaster';

type Props = {
  children: React.ReactNode;
};

const MainProvider = (props: Props) => {
  return (
    <AuthProvider>
      <Toaster />
      {props.children}
    </AuthProvider>
  );
};

export default MainProvider;
