import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { AiOutlineGithub, AiOutlineGoogle } from 'react-icons/ai';

const ProviderSignIn = () => {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);

  return (
    <form className="mt-4 flex flex-col items-center gap-y-2">
      <Button
        type="button"
        className="w-1/5 text-white bg-blue-500 hover:bg-blue-500/70"
        disabled={googleLoading}
        onClick={() => {
          setGoogleLoading(true);

          signIn('google', {
            callbackUrl: '/'
          });

          setGoogleLoading(false);
        }}
      >
        {googleLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        <AiOutlineGoogle className="mr-2 w-5 h-5" />
        Google
      </Button>

      <Button
        type="button"
        className="w-1/5"
        variant={'default'}
        disabled={githubLoading}
        onClick={() => {
          setGithubLoading(true);

          signIn('github', {
            callbackUrl: '/'
          });

          setGithubLoading(false);
        }}
      >
        {googleLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        <AiOutlineGithub className="mr-2 w-5 h-5" />
        Github
      </Button>
    </form>
  );
};

export default ProviderSignIn;
