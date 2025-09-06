'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, MessageCircle, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signInSchema } from '@/schemas/signInSchema';
import { signIn } from 'next-auth/react';
import LightRays from '@/components/background';

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    });
    
    if (result?.error) {
      toast({
        title: "Login Failed",
        description: "Incorrect username or password",
        variant: "destructive"
      });
    }
    
    if (result?.url) {
      toast({
        title: "Login Successful",
        description: "Login was successful",
      });
      router.replace("/dashboard");
    }
    setIsLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 relative overflow-hidden">
      
      <div className="absolute inset-0 -z-0 opacity-80">
        <LightRays
          raysOrigin="top-center"
          raysColor="#103CC2"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

   
      <div className="absolute top-6 left-6 z-20">
        <Link href="/" passHref>
          <Button variant="ghost" className="flex items-center space-x-2 cursor-pointer text-white hover:text-blue-400">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Button>
        </Link>
      </div>
      
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-800 shadow-lg shadow-blue-950/30 z-10">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/40 border border-blue-700/50">
              <MessageCircle className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Welcome Back to <span className="text-blue-500">FeedbackVault</span>
          </h1>
          <p className="mt-2 text-slate-400">Sign in to continue your secret conversations</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email/Username</FormLabel>
                  <Input 
                    {...field} 
                    className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
                    placeholder="Enter your email or username"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <Input 
                    type="password" 
                    {...field} 
                    className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-blue-700 hover:bg-blue-600 transition-colors cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
        
        <div className="text-center mt-4">
          <p className="text-slate-400">
            Not a member yet?{' '}
            <Link 
              href="/sign-up" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
