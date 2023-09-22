'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const DashboardPage = () => {
  return (
    <div className="p-6">
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default DashboardPage;
