'use client';

import BackToDashboard from '@/components/ui/back-to-dashboard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  AlarmCheck,
  Forward,
  LucideIcon,
  Projector,
  Settings,
  Webhook
} from 'lucide-react';
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
  const projectSettings: SidebarItem[] = [
    {
      label: 'Webhooks',
      href: `/dashboard/projects/${projectId}/webhooks`,
      icon: Webhook,
      disabled: !isAdmin
    },
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

  const projectItems: SidebarItem[] = [
    {
      label: 'Tasks',
      href: `/dashboard/projects/${projectId}/tasks`,
      icon: AlarmCheck
    },
    {
      label: 'Meets',
      href: `/dashboard/projects/${projectId}/meets`,
      icon: Projector
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
        <span className="text-muted-foreground">Project: </span>
        {projectItems.map((item) => (
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

      <div className="flex flex-col justify-center p-3.5 gap-y-2">
        <span className="text-muted-foreground">Project Actions: </span>
        {projectSettings.map((item) => (
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
