import ProjectAccessForm from '@/components/collab/ProjectAccessForm';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

type Props = {
  params: { id: string };
};

const ProjectDetailPage = async ({ params }: Props) => {
  const session = await getSession();

  const project = await db
    .selectFrom('project')
    .where('id', '=', params.id)
    .select(['adminEmail'])
    .executeTakeFirst();

  if (project?.adminEmail !== session?.user.email) {
    return redirect(`/dashboard/projects/${params.id}`);
  }

  const headersList = headers();
  const hostUrl = headersList.get('x-url') || '';

  const permissions = await db
    .selectFrom('projectInvite')
    .selectAll()
    .where('projectId', '=', params.id)
    .execute();

  return (
    <main className="ml-14 mt-20">
      <div className="mt-4 flex flex-col place-content-between place-items-start space-y-3 sm:flex-row sm:space-y-0">
        <div>
          <h1 className="text-2xl font-semibold">Share your project.</h1>
          <p className="text-muted-foreground">
            Give access to people from here.
          </p>
        </div>
      </div>

      <ProjectAccessForm
        projectId={params.id}
        hostUrl={hostUrl}
        permissions={permissions}
      />
    </main>
  );
};

export default ProjectDetailPage;
