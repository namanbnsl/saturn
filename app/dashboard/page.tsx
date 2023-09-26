import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

const DashboardPage = () => {
  return (
    <>
      <main className="container space-y-10 mt-20">
        <div className="mt-4 flex flex-col place-content-between place-items-start space-y-3 sm:flex-row sm:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your stuff here.</p>
          </div>

          <Link href={'/dashboard/projects/new'}>
            <Button>
              Create Project <PlusCircleIcon className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
