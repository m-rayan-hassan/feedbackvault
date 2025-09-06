"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import * as React from "react";
import { Loader2, Sparkles, Send, User } from "lucide-react";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default function UserPage({ params }: PageProps) {
  const { username } = React.use(params);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    "What’s one thing I could do to be a better friend?",
    "What’s a suggestion you have for me to improve myself?",
    "If you could swap lives with someone for a day, who would it be?",
  ]);
  const [isSendButtonLoading, setIsSendButtonLoading] = useState(false);
  const [isSuggestButtonLoading, setIsSuggestButtonLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const { toast } = useToast();

  const handleSend = async () => {
    try {
      setIsSendButtonLoading(true);
      if (message.length < 10) {
        setErrorMessage("Message should be at least 10 characters");
        return;
      }
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username,
        content: message,
      });
      toast({
        title: "Success",
        description: `Message sent to @${username}: ${message}`,
      });
      setMessage("");
      setErrorMessage("");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;

      toast({
        title: "Error",
        description: String(errorMessage),
        variant: "destructive",
      });
    } finally {
      setIsSendButtonLoading(false);
    }
  };

  const suggestMessages = async () => {
    try {
      setIsSuggestButtonLoading(true);
      const response = await axios.post("/api/suggest-messages");
      const messages = response.data.messages;
      const suggestedMessages = messages.split("||");
      setMessages(suggestedMessages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error in suggesting messages",
        variant: "destructive",
      });
    } finally {
      setIsSuggestButtonLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-8 px-4 relative overflow-hidden">
     
      <div className="max-w-2xl mx-auto space-y-8 bg-slate-900/80 backdrop-blur-sm p-6 rounded-lg border border-slate-800 shadow-lg shadow-blue-950/30 z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/40 border border-blue-700/50">
              <User className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Public Profile
          </h1>
          <p className="text-slate-400">
            Send anonymous messages to <span className="font-semibold text-blue-400">@{username}</span>
          </p>
        </div>

        {/* Send Message Section */}
        <div className="space-y-4 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <Send className="h-5 w-5 text-blue-400" />
            Send Anonymous Message
          </h2>
          <Textarea
            placeholder="What's a simple thing that makes you happy?"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setErrorMessage("");
            }}
            className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
            rows={4}
          />
          {errorMessage && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}
          <div className="flex justify-center">
            {isSendButtonLoading ? (
              <Button disabled className="bg-blue-700 hover:bg-blue-800 w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </Button>
            ) : (
              <Button 
                onClick={handleSend} 
                className="bg-blue-700 cursor-pointer hover:bg-blue-600 w-full transition-colors"
              >
                Send Message
              </Button>
            )}
          </div>
        </div>

        {/* Messages Section */}
        <div className="space-y-4 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <Sparkles className="h-5 w-5 text-blue-400" />
            Message Suggestions
          </h2>
          <p className="text-slate-400 text-sm">
            Click on any message below to select it, or generate new suggestions with AI.
          </p>
          
          <div className="flex justify-center">
            {isSuggestButtonLoading ? (
              <Button disabled className="bg-blue-900/50 border border-blue-800/50 text-blue-300">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                AI is thinking...
              </Button>
            ) : (
              <Button 
                onClick={suggestMessages}
                className="bg-blue-900/50 cursor-pointer hover:bg-blue-800/50 border border-blue-800/50 text-blue-300 hover:text-blue-200 transition-colors"
                variant="outline"
              >
                Suggest Messages with AI
              </Button>
            )}
          </div>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold text-lg mb-3 text-blue-400">Suggested Messages</h3>
              <div className="space-y-2">
                {messages.map((msg, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left p-3 border border-slate-700 rounded-lg hover:bg-blue-900/20 hover:border-blue-800/50 transition-all duration-200 text-slate-200 hover:text-white"
                    onClick={() => setMessage(msg)}
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4 pt-4 border-t border-slate-700">
          <p className="text-slate-400">Get your own message board</p>
          <Button className="bg-blue-700 hover:bg-blue-600 cursor-pointer">
            <Link href="/sign-up">Create Account</Link>
          </Button>
        </div>
      </div>

    </div>
  );
}