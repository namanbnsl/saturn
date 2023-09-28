import ProjectUpdateForm from '@/components/projects/ProjectUpdateForm';
import { db } from '@/lib/db';

type Props = {
  params: { id: string };
};

const ProjectDetailPage = async ({ params }: Props) => {
  const project = await db
    .selectFrom('project')
    .select(['id', 'name', 'priority'])
    .where('id', '=', params.id)
    .execute();

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

      <ProjectUpdateForm project={project[0]} />
    </main>
  );
};

export default ProjectDetailPage;
