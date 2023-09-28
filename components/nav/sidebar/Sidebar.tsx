'use client';

import BackToDashboard from '@/components/ui/back-to-dashboard';
import { Button } from '@/components/ui/button';
import { Forward, LucideIcon, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type Props = {
  projectId: string;
  projectName: string;
};

const Sidebar = ({ projectId, projectName }: Props) => {
  const items: SidebarItem[] = [
    {
      label: 'Project Details',
      href: `/dashboard/projects/${projectId}/details`,
      icon: Settings
    },
    {
      label: 'Share',
      href: `/dashboard/projects/${projectId}/share`,
      icon: Forward
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
            onClick={() => {
              router.push(item.href);
            }}
            className={cn(
              'rounded-xl flex items-center justify-center gap-x-2',
              pathname === item.href ? 'bg-accent text-red-200' : ''
            )}
            variant={'outline'}
            key={item.href}
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
