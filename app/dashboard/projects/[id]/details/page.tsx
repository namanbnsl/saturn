import ProjectUpdateForm from '@/components/projects/ProjectUpdateForm';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

type Props = {
  params: { id: string };
};

const ProjectDetailPage = async ({ params }: Props) => {
  const session = await getSession();

  const project = await db
    .selectFrom('project')
    .select(['id', 'name', 'priority', 'adminEmail'])
    .where('id', '=', params.id)
    .execute();

  const users = await db
    .selectFrom('membersInProject')
    .select(['membersInProject.memberEmail as email'])
    .where('projectId', '=', params.id)
    .execute();

  if (project[0].adminEmail !== session?.user.email) {
    return redirect(`/dashboard/projects/${params.id}`);
  }

  return (
    <main className="ml-14 mt-20">
      <div className="mt-4 flex flex-col place-content-between place-items-start space-y-3 sm:flex-row sm:space-y-0">
        <div>
          <h1 className="text-2xl font-semibold">Project Details.</h1>
          <p className="text-muted-foreground">
            Update your project from here.
          </p>
        </div>
      </div>

      <ProjectUpdateForm users={users} project={project[0]} />
    </main>
  );
};

export default ProjectDetailPage;
