const DashboardPage = () => {
  return (
    <div>
      {/* Navbar */}
      <main className="container space-y-10 mt-20">
        <div className="mt-4 flex flex-col place-content-between place-items-start space-y-3 sm:flex-row sm:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your projects.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
