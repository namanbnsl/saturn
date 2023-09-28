'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SendHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const updatingFormSchema = z.object({
  name: z.string().min(3, { message: 'Name should be at least 3 characters.' }),
  priority: z.string({ required_error: 'Please select a priority.' })
});

type Props = {
  project: {
    id: string;
    name: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
  };
};

const ProjectUpdateForm = ({ project }: Props) => {
  const form = useForm<z.infer<typeof updatingFormSchema>>({
    resolver: zodResolver(updatingFormSchema),
    defaultValues: {
      name: project.name,
      priority: project.priority
    }
  });

  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof updatingFormSchema>) => {
    try {
      setUpdateLoading(true);

      const body = {
        id: project.id,
        ...values
      };

      const res = await axios.patch('/api/projects/update', body);

      if (res.data.msg === 'success') {
        router.push(`/dashboard/projects/${project.id}`);
        router.refresh();

        return toast({
          title: 'Project updated.',
          description: 'Your project has been updated. 🪐'
        });
      }
    } catch (err) {
      return toast({
        title: 'Something went wrong.',
        description: 'Please try again later or contact us.',
        variant: 'destructive'
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mt-10 w-1/3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  className="focus:border-gray-200 border-[2.5px] transition-all duration-200"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your project&apos;s name. You can always change this
                later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Project Priority." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="LOW">
                      <div className="flex items-center gap-x-2">
                        <div>Low</div>
                        <div className="w-4 h-4 bg-green-400 rounded-full" />
                      </div>
                    </SelectItem>
                    <SelectItem value="MEDIUM">
                      <div className="flex items-center gap-x-2">
                        <div>Medium</div>
                        <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                      </div>
                    </SelectItem>
                    <SelectItem value="HIGH">
                      <div className="flex items-center gap-x-2">
                        <div>High</div>
                        <div className="w-4 h-4 bg-red-400 rounded-full" />
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                This is your project&apos;s priority. You can always change this
                later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={updateLoading} className="w-1/2" type="submit">
          {updateLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          <SendHorizontal className="mr-2 w-4 h-4" />
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ProjectUpdateForm;
