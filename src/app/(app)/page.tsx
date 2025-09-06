"use client";

import {
  Mail,
  MessageCircle,
  Send,
  Shield,
  Sparkles,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import LightRays from "@/components/background";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState<{ _id: string; username: string }[]>([]);
  const [baseUrl, setBaseUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.protocol}//${window.location.host}`);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/get-users");
        setIsLoading(false);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <main className="relative overflow-hidden flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 text-white bg-slate-950">
        <div
          className="absolute inset-0 -z-0 opacity-80"
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

        <section className="text-center mb-8 md:mb-12 z-10 relative">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/40 border border-blue-700/50 backdrop-blur-sm">
              <MessageCircle className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white pb-2 relative">
            Unlock Honest Feedback with FeedbackVault
            <Sparkles className="h-7 w-7 text-blue-500 absolute -top-2 -right-8" />
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            FeedbackVault – A safe space to ask questions and share thoughts
            anonymously.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-400">
            <div className="flex items-center bg-slate-900/70 px-3 py-1.5 rounded-full border border-slate-800">
              <Shield className="h-4 w-4 mr-2 text-blue-500" />
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center bg-slate-900/70 px-3 py-1.5 rounded-full border border-slate-800">
              <Send className="h-4 w-4 mr-2 text-blue-500" />
              <span>Send Messages Without Sign Up</span>
            </div>
          </div>
        </section>

        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-lg md:max-w-xl z-10"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="bg-slate-900 border border-slate-800 shadow-lg shadow-blue-950/30 hover:shadow-blue-900/20 transition-all duration-300 group">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white group-hover:text-blue-400 transition-colors">
                      <Mail className="h-5 w-5 text-blue-500" />
                      {message.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <div>
                      <p className="text-slate-300">{message.content}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      <div className="flex justify-center flex-col items-center bg-slate-900 py-16 border-t border-slate-800">
        <div className="text-center mb-12 max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/40 border border-blue-700/50">
              <Share2 className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-white">
            Get Anonymous Feedback
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Create an account, share your unique FeedbackVault link with
            friends, colleagues, or social media, and receive honest, anonymous
            feedback and questions from people in your circle.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-400 font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Sign Up</h3>
              <p className="text-slate-400">
                Create your free account in seconds
              </p>
            </div>
            <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-400 font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Share Link
              </h3>
              <p className="text-slate-400">
                Share your unique profile link anywhere
              </p>
            </div>
            <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-400 font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Receive Feedback
              </h3>
              <p className="text-slate-400">Get honest, anonymous messages</p>
            </div>
          </div>
          <Button className="bg-blue-700 hover:bg-blue-600 cursor-pointer px-8 py-3 text-lg">
            <Link href="/sign-up">Create Your Account</Link>
          </Button>
        </div>
      </div>

      <div className="flex justify-center items-center bg-slate-950 py-8">
        <div className="flex items-center">
          <div className="h-px w-20 bg-slate-700"></div>
          <span className="px-4 text-slate-500 font-medium text-lg">OR</span>
          <div className="h-px w-20 bg-slate-700"></div>
        </div>
      </div>

      <div className="flex justify-center flex-col items-center bg-slate-950 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Give Feedback to FeedbackVault Users
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Pick a user and send them your anonymous feedback or questions.
            They'll never know it's you!
          </p>
        </div>

        <div className="flex flex-wrap gap-6 justify-center items-center px-4 max-w-6xl w-full">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-5 rounded-lg w-full sm:w-[400px]">
                  <Skeleton className="h-[170px] w-full rounded-xl bg-slate-900" />
                </div>
              ))
            : users.map((user) => (
                <div
                  key={user._id.toString()}
                  className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg shadow-slate-950 hover:shadow-blue-950/30 transition-all duration-300 w-full sm:w-[380px] group hover:border-blue-800/50"
                >
                  <p className="text-lg font-bold text-white mb-4">
                    Send an anonymous message to{" "}
                    <span className="text-blue-500">@{user.username}</span>
                  </p>
                  <div className="flex items-center bg-slate-800 rounded-md mt-3 p-1 group-hover:bg-slate-800/80 transition-colors">
                    <input
                      type="text"
                      value={`${baseUrl}/u/${user.username}`}
                      disabled
                      className="text-sm bg-transparent text-slate-300 w-full mr-2 rounded pl-2 py-2 sm:text-lg truncate"
                    />
                    <Button className="bg-blue-700 cursor-pointer hover:bg-blue-600 transition-all duration-300 flex items-center gap-1 group-hover:scale-105">
                      <a
                        href={`${baseUrl}/u/${user.username}`}
                        target="_blank"
                        className="flex items-center"
                      >
                        Send
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <div className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Why Choose <span className="text-blue-500">FeedbackVault</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-blue-800/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-900/50 transition-colors">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Complete Anonymity
              </h3>
              <p className="text-slate-400">
                Your identity stays hidden. No one can trace your feedback.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-blue-800/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-900/50 transition-colors">
                <Send className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Easy to Use
              </h3>
              <p className="text-slate-400">
                Share your thoughts or questions in just a few clicks.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-blue-800/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-900/50 transition-colors">
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Genuine Insights
              </h3>
              <p className="text-slate-400">
                Receive honest feedback and perspectives without bias.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center p-6 bg-slate-950 border-t border-slate-800 text-slate-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            <span className="font-medium text-white">FeedbackVault</span>
          </div>
          <p>© 2025 FeedbackVault. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
