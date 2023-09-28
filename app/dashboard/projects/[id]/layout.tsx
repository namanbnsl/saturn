import Sidebar from '@/components/nav/sidebar/Sidebar';
import { db } from '@/lib/db';

type Props = { children: React.ReactNode; params: { id: string } };

const ProjectLayout = async ({ params, children }: Props) => {
  const project = await db
    .selectFrom('project')
    .selectAll()
    .where('id', '=', params.id)
    .execute();

  return (
    <>
      <Sidebar projectId={project[0].id} projectName={project[0].name} />
      <main className="md:pl-72">{children}</main>
    </>
  );
};

export default ProjectLayout;
