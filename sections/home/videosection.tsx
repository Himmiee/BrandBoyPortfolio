import React from "react";
import vidImg from "@/public/home/video-placeholder.webp";
import { BackgroundImageWrapper } from "@/layout/wrapper";

export const VideoSection: React.FC = () => {
  return (
    <section className=" mx-auto">
      <BackgroundImageWrapper image={vidImg} alt="Video section background">
        <div className="text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold">Watch Our Story</h2>
          <p className="mt-4 max-w-xl mx-auto">
            Discover how we bring brands to life through creativity, strategy,
            and storytelling.
          </p>
        </div>
      </BackgroundImageWrapper>
    </section>
  );
};
