"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Message } from "@/models/User";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { MessageCard } from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, RefreshCcw, Copy, Link, MessageCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { User } from "next-auth";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session, status } = useSession();
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);

        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message || "Failed to fetch messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    if (session && session.user) {
      fetchMessages();
      fetchAcceptMessage();
    }
  }, [session, status, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to update message settings",
        variant: "destructive",
      });
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950 text-white">
        Please Login to access dashboard
      </div>
    );
  }

  const { username } = session?.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL Copied!",
      description: "Profile URL has been copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 relative overflow-hidden">

      <div className="max-w-6xl mx-auto p-6 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-800 shadow-lg shadow-blue-950/30">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/40 border border-blue-700/50">
              <MessageCircle className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            User <span className="text-blue-500">Dashboard</span>
          </h1>
          <p className="text-slate-400">Manage your anonymous messages</p>
        </div>

        {/* Profile Link Section */}
        <div className="mb-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Link className="h-5 w-5 text-blue-400" />
            Your Unique Profile Link
          </h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="flex-1 bg-slate-800 border border-slate-700 text-white p-3 rounded-md focus:border-blue-500 transition-colors"
            />
            <Button 
              onClick={copyToClipboard} 
              className="bg-blue-700 cursor-pointer hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          </div>
          <p className="text-sm text-slate-400 mt-2">
            Share this link to receive anonymous feedback and questions
          </p>
        </div>

        <div className="mb-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">
                Message Settings
              </h2>
              <p className="text-sm text-slate-400">
                {acceptMessages ? "You are currently accepting messages" : "Messages are currently disabled"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isSwitchLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              ) : (
                <Switch
                  {...register("acceptMessages")}
                  checked={acceptMessages}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitchLoading}
                  className="data-[state=checked]:bg-blue-600"
                />
              )}
              <span className="text-white">
                {acceptMessages ? "On" : "Off"}
              </span>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-700 my-8" />

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Your Messages ({messages.length})
            </h2>
            <Button
              onClick={(e) => {
                e.preventDefault();
                fetchMessages(true);
              }}
              disabled={isLoading}
              variant="outline"
              className="border-blue-700 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300 transition-colors"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="h-4 w-4" />
              )}
              <span className="ml-2">Refresh</span>
            </Button>
          </div>

          {messages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.map((message) => (
                <MessageCard
                  key={message._id as string}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No messages yet</p>
              <p className="text-slate-500 text-sm mt-2">
                Share your profile link to start receiving anonymous messages
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;