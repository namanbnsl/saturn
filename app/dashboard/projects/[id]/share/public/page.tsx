import AskPermissionButton from '@/components/collab/AskPermissionButton';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

type Props = {
  params: { id: string };
};

const PublicSharePage = async ({ params }: Props) => {
  const session = await getSession();

  const project = await db
    .selectFrom('project')
    .selectAll()
    .where('id', '=', params.id)
    .executeTakeFirst();

  const check = await db
    .selectFrom('membersInProject')
    .selectAll()
    .where((p) =>
      p.and({
        projectId: params.id,
        memberEmail: session?.user.email as string
      })
    )
    .execute();

  if (check.length > 0) {
    return redirect(`/dashboard/projects/${params.id}`);
  }

  return (
    <div className="flex flex-col text-center gap-y-6">
      <div className="text-center mt-4 flex flex-col place-content-between place-items-start space-y-3 sm:flex-row sm:space-y-0">
        <div>
          <h1 className="text-2xl">
            You have been invited to join{' '}
            <span className="font-semibold">{project?.name}</span>.
          </h1>
          <p className="text-muted-foreground mt-2">
            Ask permission to the admin and after he allows you will see the
            <br />
            project in your dashboard.
          </p>
        </div>
      </div>

      <AskPermissionButton
        email={session?.user.email as string}
        projectId={params.id}
      />
    </div>
  );
};

export default PublicSharePage;
