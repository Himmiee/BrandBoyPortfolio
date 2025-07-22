import React from "react";
import vidImg from "@/public/home/video-placeholder.webp";
import { BackgroundImageWrapper } from "@/layout/wrapper";
import { Button } from "@/components/ui/button";

export const VideoSection: React.FC = () => {
  return (
    <div className="py-6 md:py-12">
      <BackgroundImageWrapper image={vidImg} alt="Video section background">
        <div className="flex flex-col items-center justify-center text-center font-opensans h-full gap-6 text-white px-4 space-y-12 lg:space-y-24">
          <p className="text-2xl font-medium ">VIDEO FEATURE</p>

          <div className="font-playfair space-y-1">
            <p className="text-3xl md:text-6xl lg:text-[72px] pb-2 font-medium">
              Elevated Living in Ikoyi
            </p>
            <p className="text-base md:text-3xl opacity-90">
              A High-End Interior Reveal
            </p>
          </div>

          <Button
            variant="whiteOutline"
            size="lg"
            className="rounded-3xl w-48 h-12 text-lg"
          >
            WATCH VIDEO
          </Button>
        </div>
      </BackgroundImageWrapper>
    </div>
  );
};
