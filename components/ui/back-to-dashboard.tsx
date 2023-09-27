import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const BackToDashboard = () => {
  return (
    <Link
      href={'/dashboard'}
      className="flex items-center hover:text-muted-foreground transition-all text-gray-300"
    >
      <ArrowLeft className="mr-2 w-5 h-5" /> Back To Dashboard
    </Link>
  );
};

export default BackToDashboard;
