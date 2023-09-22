'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

const Home = () => {
  return (
    <div className="p-6">
      <Button onClick={() => signIn()}>Get Started.</Button>
    </div>
  );
};

export default Home;
