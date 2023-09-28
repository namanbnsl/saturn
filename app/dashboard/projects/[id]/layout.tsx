import Sidebar from '@/components/nav/sidebar/Sidebar';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

type Props = { children: React.ReactNode; params: { id: string } };

const ProjectLayout = async ({ params, children }: Props) => {
  const session = await getSession();

  const headersList = headers();
  const hostUrl = headersList.get('x-url') || '';

  if (hostUrl.includes('/share/public')) {
    return (
      <>
        <main className={'flex w-screen h-screen items-center justify-center'}>
          {children}
        </main>
      </>
    );
  }

  const project = await db
    .selectFrom('project as p')
    .select(['p.id', 'p.name', 'p.priority', 'p.adminEmail'])
    .innerJoin('membersInProject as m', 'p.id', 'm.projectId')
    .where((p) =>
      p.and({
        'p.id': params.id,
        'm.projectId': params.id,
        'm.memberEmail': session?.user.email as string
      })
    )
    .execute();

  if (project.length <= 0) {
    redirect('/dashboard');
  }

  let canShare = true;

  if (project[0].adminEmail !== session?.user.email) {
    canShare = false;
  }

  return (
    <>
      {hostUrl.includes('/share/public') ? (
        <></>
      ) : (
        <Sidebar
          canShare={canShare}
          projectId={project[0].id}
          projectName={project[0].name}
        />
      )}

      <main
        className={cn(
          '',
          hostUrl.includes('/share/public')
            ? 'flex w-screen h-screen items-center justify-center'
            : 'md:pl-72'
        )}
      >
        {children}
      </main>
    </>
  );
};

export default ProjectLayout;
