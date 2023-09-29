'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { toast } from '@/components/ui/use-toast';
import { errorCodes } from '@/lib/errorCodes';
import axios from 'axios';
import { VenetianMask } from 'lucide-react';
import { useState } from 'react';

type Props = {
  email: string;
  projectId: string;
};

const AskPermissionButton = ({ email, projectId }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const result = await axios.post('/api/collab/projectInvite', {
        projectId,
        fromEmail: email
      });

      if (result.data.msg === 'success') {
        return toast({
          title: 'Permission asked.',
          description:
            'We have sent the permission to the admin. Make sure to check your dashboard for updates. 🪐'
        });
      } else if (result.data.msg === errorCodes.projectInviteExists) {
        return toast({
          title: 'Duplicate Invite.',
          description: 'You already have a permission ask. 🪐'
        });
      }
    } catch (err) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your permission ask failed. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={onSubmit} className="w-[70%] h-10" disabled={loading}>
        {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        <VenetianMask className="mr-2 w-4 h-4" />
        Ask permission
      </Button>
    </div>
  );
};

export default AskPermissionButton;
