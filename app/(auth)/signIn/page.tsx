'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useState } from 'react';
import ProviderSignIn from '@/components/auth/ProviderSignIn';
import { AiOutlineMail } from 'react-icons/ai';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';
import axios from 'axios';

const formSchema = z.object({
  email: z
    .string()
    .min(3, {
      message: 'Invalid Email.'
    })
    .email()
});

const SignInPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const { toast } = useToast();
  const [emailLoading, setEmailLoading] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const exists = await axios.post('/api/auth/check-user', {
      email: values.email.toLowerCase()
    });

    if (!exists.data.exists) {
      return toast({
        title: 'Account Not Found.',
        description: 'Please create an account and try again.',
        variant: 'destructive'
      });
    }

    try {
      setEmailLoading(true);

      const signInResult = await signIn('email', {
        email: values.email.toLowerCase(),
        redirect: false,
        callbackUrl: '/'
      });

      if (!signInResult?.ok) {
        return toast({
          title: 'Something went wrong.',
          description: 'Your sign in request failed. Please try again.',
          variant: 'destructive'
        });
      }

      return toast({
        title: 'Email verification link sent.',
        description:
          'We have sent the link to your email. Make sure to check spam too.'
      });
    } catch (err) {
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="text-center w-screen">
        <span className="text-lg font-bold">Sign In</span>

        <Form {...form}>
          <form
            className="mt-6 flex flex-col justify-center items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-1/5">
                  <FormControl>
                    <Input
                      autoCapitalize="none"
                      type="email"
                      className="focus:border-blue-500 border-2"
                      autoComplete="off"
                      autoCorrect="off"
                      placeholder="abc@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={emailLoading}
              className="mt-2 w-1/5"
              variant={'outline'}
              type="submit"
            >
              {emailLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <AiOutlineMail className="mr-2 w-5 h-5" />
              Sign In with Email
            </Button>
          </form>
        </Form>

        <div className="w-1/3 mx-auto">
          <div className="relative mt-8 flex justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </div>

        <ProviderSignIn />

        <div className="mt-8 text-gray-600">
          Don&apos;t Have An Account?{' '}
          <Link href={'/register'} className="text-blue-500 hover:opacity-80">
            Create One Now.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
