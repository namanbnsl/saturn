import { UserAvatar } from '@/components/nav/navbar/UserAvatar';
import { getSession } from '@/lib/auth';
import Link from 'next/link';

const DashboardNavbar = async () => {
  const session = await getSession();

  return (
    <nav className="container space-y-10 mt-16">
      <div className="flex flex-col place-content-between place-items-start space-y-3 sm:flex-row sm:space-y-0">
        <div>
          <Link href={'/dashboard'} className="text-2xl">
            {/* TODO: Icon */}
            🪐
          </Link>
        </div>

        <div>
          {/* Avatar */}
          <UserAvatar
            name={session?.user.name as string}
            url={session?.user.image as string}
          />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
