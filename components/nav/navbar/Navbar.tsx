import { UserAvatar } from '@/components/nav/navbar/UserAvatar';
import { getSession } from '@/lib/auth';
import Link from 'next/link';

const DashboardNavbar = async () => {
  const session = await getSession();

  const links = [
    { href: '/dashboard', title: 'Dashboard' },
    { href: '/dashboard/projects/new', title: 'New' }
  ];

  return (
    <nav className="container space-y-10 mt-12">
      <div className="flex flex-col place-content-between place-items-start space-y-3 sm:flex-row sm:space-y-0">
        <div>
          <Link href={'/dashboard'} className="text-2xl">
            {/* TODO: Icon */}
            🪐
          </Link>
        </div>

        <div className="flex gap-x-2">
          {links.map((link) => (
            <Link
              className="text-gray-300 hover:text-muted-foreground transition-all"
              href={link.href}
              key={link.href}
            >
              {link.title}
            </Link>
          ))}
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
