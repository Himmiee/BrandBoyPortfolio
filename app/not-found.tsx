"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 text-black">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-8xl md:text-9xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300"
            >
              <Home size={20} className="mr-2" />
              Go Home
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="border-black text-black hover:bg-gray-100 px-8 py-3 rounded-full transition-all duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </Button>
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-black/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-black/5 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default NotFound;
