import DashboardNavbar from '@/components/nav/navbar/Navbar';
import ProjectCreationForm from '@/components/projects/ProjectCreationForm';
import BackToDashboard from '@/components/ui/back-to-dashboard';
import { getSession } from '@/lib/auth';

const NewProjectPage = async () => {
  const session = await getSession();

  return (
    <>
      <DashboardNavbar />

      <main className="container space-y-10 mt-20">
        <BackToDashboard />
        <div className="mt-4 flex flex-col place-content-between place-items-start space-y-3 sm:flex-row sm:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold">Create New Project.</h1>
            <p className="text-muted-foreground">Create new projects here.</p>
          </div>
        </div>

        <ProjectCreationForm email={session?.user.email as string} />
      </main>
    </>
  );
};

export default NewProjectPage;
