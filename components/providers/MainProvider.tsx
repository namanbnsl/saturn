import AuthProvider from '@/components/providers/AuthProvider';

type Props = {
  children: React.ReactNode;
};

const MainProvider = (props: Props) => {
  return <AuthProvider>{props.children}</AuthProvider>;
};

export default MainProvider;
