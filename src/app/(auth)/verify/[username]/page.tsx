"use client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import axios from "axios";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ShieldCheck, Loader2 } from "lucide-react";
import LightRays from "@/components/background";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {},
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Verification Failed",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-0 opacity-50"
        style={{ width: "100%", height: "100%" }}
      >
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

      <div className="w-full max-w-md p-8 space-y-8 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-800 shadow-lg shadow-blue-950/30 z-10">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/40 border border-blue-700/50">
              <ShieldCheck className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Verify Your <span className="text-blue-500">Account</span>
          </h1>
          <p className="mt-2 text-slate-400 flex items-center justify-center gap-2">
            <Mail className="h-4 w-4 text-blue-400" />
            Enter the verification code sent to your email
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Verification Code
                  </FormLabel>
                  <Input
                    {...field}
                    className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
                    placeholder="Enter your 6-digit code"
                    maxLength={6}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-600 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-slate-400 text-sm">
            Didn't receive the code? Check your spam folder or request a new
            one.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
