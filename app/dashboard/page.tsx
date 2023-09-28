import DashboardNavbar from '@/components/nav/navbar/Navbar';
import {
  Project,
  ProjectsDataTable
} from '@/components/projects/AllProjectsTable';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

const DashboardPage = async () => {
  const session = await getSession();

  async function getData(): Promise<Project[]> {
    const projectsWhereMember = await db
      .selectFrom('project as p')
      .select(['p.id', 'p.name', 'p.priority'])
      .innerJoin('membersInProject as m', 'p.id', 'm.projectId')
      .where('m.memberEmail', '=', session?.user.email as string)
      .execute();

    return projectsWhereMember;
  }

  const data = await getData();

  return (
    <>
      <DashboardNavbar />

      <main className="container space-y-10 mt-20">
        <div className="mt-4 flex flex-col place-content-between place-items-start space-y-3 sm:flex-row sm:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your projects here.</p>
          </div>

          <Link href={'/dashboard/projects/new'}>
            <Button>
              <PlusCircleIcon className="mr-2 w-4 h-4" />
              Create Project
            </Button>
          </Link>
        </div>

        <ProjectsDataTable data={data} />
      </main>
    </>
  );
};

export default DashboardPage;
