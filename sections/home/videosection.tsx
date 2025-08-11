"use client";
import React, { useState, useRef, useEffect } from "react";
import vidImg from "@/public/home/video-placeholder.webp";
import { BackgroundImageWrapper } from "@/layout/wrapper";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ArrowLeft,
} from "lucide-react";

export const VideoSection: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl =
    "https://res.cloudinary.com/leeeeee/video/upload/f_auto,q_80/Copy_of_BRAND_BOY_TRAILER_1_uhflf5.mp4";

  useEffect(() => {
    if (showVideo && videoRef.current) {
      // Auto-play when video is shown
      setTimeout(() => {
        videoRef.current?.play();
        setIsPlaying(true);
      }, 300);
    }
  }, [showVideo]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleBack = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowVideo(false);
    setIsLoading(true);
  };

  return (
    <section className="relative">
      <BackgroundImageWrapper
        image={vidImg}
        alt="Video section background"
        className=""
      >
        <div className="relative z-10 flex flex-col items-center justify-center text-center font-opensans min-h-[60vh] gap-8 text-white px-4 py-12">
          {showVideo ? (
            <div className="w-full max-w-md mx-auto space-y-10 animate-in fade-in-50 zoom-in-95 duration-700">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-playfair font-medium">
                    Elevated Living in Ikoyi
                  </h3>
                  <p className="text-white/80 text-sm md:text-base font-light">
                    A High-End Interior Reveal
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-white/20 via-transparent to-amber-500/20 rounded-3xl blur-xl opacity-60"></div>

                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-2xl">
                  <div className="relative rounded-xl overflow-hidden bg-black shadow-lg">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/30 border-t-white"></div>
                      </div>
                    )}

                    <video
                      ref={videoRef}
                      src={videoUrl}
                      className="w-full h-auto max-h-[45vh] md:max-h-[50vh] object-contain bg-black"
                      playsInline
                      onLoadStart={handleVideoLoad}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      style={{ aspectRatio: "9/16" }}
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={togglePlayPause}
                          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                        >
                          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={toggleMute}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                          >
                            {isMuted ? (
                              <VolumeX size={16} />
                            ) : (
                              <Volume2 size={16} />
                            )}
                          </button>

                          <button
                            onClick={handleFullscreen}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                          >
                            <Maximize2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {!isPlaying && !isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={togglePlayPause}
                          className="p-6 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 shadow-xl"
                        >
                          <Play size={32} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3"
                  onClick={handleBack}
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Back to Preview
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-16 max-w-4xl">
                <p className="text-sm md:text-4xl font-medium tracking-[0.2em] uppercase opacity-80 font-myriad ">
                  Video Feature
                </p>

                <div className="font-notoserif space-y-4">
                  <h2 className="text-5xl md:text-6xl lg:text-[84px] font-medium leading-tight">
                    Elevated Living in Ikoyi
                  </h2>
                  <p className="text-2xl lg:text-[40px] opacity-90 font-light">
                    A High-End Interior Reveal
                  </p>
                </div>
              </div>

              <div className="relative group py-6 md:py-0">
                <Button
                  variant="whiteOutline"
                  size="lg"
                  className="rounded-full px-8 py-6 text-base md:text-lg font-medium border-2 border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:scale-105 transform"
                  onClick={() => setShowVideo(true)}
                >
                  <span className="flex items-center gap-3">WATCH VIDEO</span>
                </Button>

                <div className="absolute inset-0 rounded-full bg-white/10 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
              </div>
            </>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30 pointer-events-none"></div>
      </BackgroundImageWrapper>
    </section>
  );
};
