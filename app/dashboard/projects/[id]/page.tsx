import Sidebar from '@/components/nav/sidebar/Sidebar';
import { db } from '@/lib/db';

type Props = { params: { id: string } };

const ProjectPage = async ({ params }: Props) => {
  const project = await db
    .selectFrom('project')
    .selectAll()
    .where('id', '=', params.id)
    .execute();

  return (
    <div>
      <Sidebar projectId={params.id} projectName={project[0].name} />
    </div>
  );
};

export default ProjectPage;
