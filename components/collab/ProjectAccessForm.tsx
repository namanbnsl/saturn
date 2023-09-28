'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { shortenEmail } from '@/lib/utils';
import { CheckIcon, Copy, VenetianMask } from 'lucide-react';
import { useState } from 'react';

type Props = {
  projectId?: string;
  hostUrl: string;
  permissions: { projectId: string; fromEmail: string }[];
};

const ProjectAccessForm = ({ hostUrl, permissions }: Props) => {
  const [copyText, setCopyText] = useState<'Copy Link' | 'Copied'>('Copy Link');
  const shareUrl = hostUrl + '/public';

  const copyLink = () => {
    clearTimeout(
      setTimeout(() => {
        setCopyText('Copy Link');
      }, 2000)
    );

    navigator.clipboard.writeText(shareUrl);
    setCopyText('Copied');

    setTimeout(() => {
      setCopyText('Copy Link');
    }, 2000);
  };

  return (
    <div className="mt-4 w-[60%]">
      <Tabs defaultValue="access">
        <TabsList>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="access">Access</TabsTrigger>
        </TabsList>
        <TabsContent value="permissions">
          <div className="mt-8">
            <div>
              <h1 className="text-md font-semibold">Permissions.</h1>
              <p className="text-muted-foreground">
                Give access to people from here by accepting their ask for
                permission.
              </p>
            </div>

            <div className="mt-4 flex flex-col w-1/2">
              {permissions.map((permission) => (
                <div
                  key={shortenEmail(permission.fromEmail)}
                  className="px-4 py-2 mb-1.5 rounded-md border flex justify-between items-center"
                >
                  {shortenEmail(permission.fromEmail)}

                  <Button variant={'outline'} className="h-9.5 w-1/3">
                    <VenetianMask className="mr-2 w-4 h-4" />
                    Allow
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="access">
          <div className="mt-8">
            <div>
              <h1 className="text-md font-semibold">Share your project.</h1>
              <p className="text-muted-foreground">
                Give access to people from here by sharing this link to them.
              </p>
            </div>

            <div className="mt-4 flex items-center gap-x-2">
              <Input value={shareUrl} readOnly className="text-sm" />
              <Button
                onClick={copyLink}
                variant="secondary"
                className="shrink-0 w-1/4"
              >
                {copyText === 'Copied' ? (
                  <>
                    <CheckIcon className="mr-1.5 h-4 w-4" />
                    <span>{copyText}</span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-3 w-3" />
                    <span>{copyText}</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectAccessForm;
