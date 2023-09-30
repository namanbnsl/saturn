'use client';

import BackToDashboard from '@/components/ui/back-to-dashboard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Forward, LucideIcon, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
};

type Props = {
  projectId: string;
  projectName: string;
  isAdmin: boolean;
};

const Sidebar = ({ projectId, projectName, isAdmin }: Props) => {
  const items: SidebarItem[] = [
    {
      label: 'Project Details',
      href: `/dashboard/projects/${projectId}/details`,
      icon: Settings,
      disabled: !isAdmin
    },
    {
      label: 'Share',
      href: `/dashboard/projects/${projectId}/share`,
      icon: Forward,
      disabled: !isAdmin
    }
  ];

  const pathname = usePathname();

  const router = useRouter();

  return (
    <aside className="fixed top-0 w-72 h-full border-r">
      <div className="p-6">
        <BackToDashboard />
      </div>

      <div className="p-4">
        <span className="text-muted-foreground mr-1">Working On: </span>
        {projectName}
      </div>

      <div className="flex flex-col justify-center p-3.5 gap-y-2">
        <span className="text-muted-foreground">Actions: </span>
        {items.map((item) => (
          <Button
            key={item.href}
            disabled={item.disabled}
            onClick={() => {
              router.push(item.href);
            }}
            variant={'outline'}
            className={cn(
              'rounded-xl flex items-center justify-center gap-x-2',
              pathname === item.href ? 'bg-accent text-red-200' : ''
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
