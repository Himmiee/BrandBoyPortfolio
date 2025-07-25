"use client";
import React, { useState } from "react";
import vidImg from "@/public/home/video-placeholder.webp";
import { BackgroundImageWrapper } from "@/layout/wrapper";
import { Button } from "@/components/ui/button";

export const VideoSection: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  const videoUrl =
    "https://res.cloudinary.com/leeeeee/video/upload/f_auto,q_80/Copy_of_BRAND_BOY_TRAILER_1_uhflf5.mp4";

  return (
    <section className="relative">
      <BackgroundImageWrapper image={vidImg} alt="Video section background">
        <div className="relative z-10 flex flex-col items-center justify-center text-center font-opensans min-h-[70vh] md:min-h-[50vh] lg:min-h-[80vh] gap-8 text-white px-4 py-16 lg:py-24 space-y-16">
          {showVideo ? (
            <div className="w-full ">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
                <video
                  src={videoUrl}
                  className="w-full h-auto  max-h-[70vh] object-cover"
                  controls
                  autoPlay
                  playsInline
                />
              </div>

              {/* Back button */}
              <Button
                variant="ghost"
                size="sm"
                className="mt-6 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => setShowVideo(false)}
              >
                ← Back to Preview
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-16 max-w-4xl">
                <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase opacity-80">
                  Video Feature
                </p>

                <div className="font-playfair space-y-4">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl  font-medium leading-tight">
                    Elevated Living in Ikoyi
                  </h2>
                  <p className="text-lg md:text-2xl lg:text-3xl opacity-90 font-light">
                    A High-End Interior Reveal
                  </p>
                </div>
              </div>

              <div className="relative group">
                <Button
                  variant="whiteOutline"
                  size="lg"
                  className="rounded-full px-8 py-6 text-base md:text-lg font-medium border-2 border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:scale-105 transform"
                  onClick={() => setShowVideo(false)}
                >
                  <span className="flex items-center gap-3">WATCH VIDEO</span>
                </Button>

                <div className="absolute inset-0 rounded-full bg-white/10 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
              </div>
            </>
          )}
        </div>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30 pointer-events-none"></div>
      </BackgroundImageWrapper>
    </section>
  );
};
