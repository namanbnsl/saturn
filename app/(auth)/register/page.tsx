'use client';

import ProviderSignIn from '@/components/auth/ProviderSignIn';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="text-center w-screen">
        <span className="text-lg font-bold">Create Account.</span>

        <ProviderSignIn />

        <div className="mt-8 text-gray-600">
          Already Have An Account?{' '}
          <Link href={'/signIn'} className="text-blue-500 hover:opacity-80">
            Sign In Now.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
