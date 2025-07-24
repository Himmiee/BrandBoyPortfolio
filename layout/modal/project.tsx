"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { IProject } from "@/types/interface/hero.interface";
import { Modal } from "./wrapper";
import { Pause, Play } from "lucide-react";

interface ProjectModalProps {
  project: IProject | null;
  open: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, open, onClose }: ProjectModalProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (open) {
      setIsPlaying(true);
      setImagesLoaded(false);
      setLoadedCount(0);
    } else {
      setIsPlaying(false);
      setImagesLoaded(false);
      setLoadedCount(0);
    }
  }, [open]);

  // Track image loading
  const handleImageLoad = () => {
    setLoadedCount((prev) => {
      const newCount = prev + 1;
      if (project && newCount >= project.images.length) {
        setImagesLoaded(true);
      }
      return newCount;
    });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!project) return null;

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-6xl w-[95vw] max-h-[90vh] bg-white overflow-hidden shadow-2xl"
    >
      <div className="relative w-full">
        {/* Marquee Container */}
        <div
          className="relative w-full bg-gray-50"
          style={{ height: "60vh", minHeight: "300px" }}
        >
          {/* Loading State */}
          {!imagesLoaded && (
            <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center z-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mb-2"></div>
              <p className="text-gray-600 text-sm">
                Loading images... ({loadedCount}/{project.images.length})
              </p>
            </div>
          )}

          {/* Marquee Slideshow */}
          <Marquee
            speed={30}
            pauseOnHover={true}
            pauseOnClick={true}
            play={isPlaying && imagesLoaded}
            gradient={true}
            gradientColor="white"
            gradientWidth={100}
            className="h-full"
          >
            {project.images.map((img, idx) => (
              <div
                key={`${project.id}-${idx}`}
                className="relative mx-4 h-full"
                style={{
                  width: "400px",
                  minWidth: "400px",
                  height: "60vh",
                  minHeight: "300px",
                }}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={idx < 3}
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="400px"
                    onLoad={handleImageLoad}
                  />

                  {/* Image overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">{img.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Duplicate images for seamless loop */}
            {project.images.map((img, idx) => (
              <div
                key={`${project.id}-duplicate-${idx}`}
                className="relative mx-4 h-full"
                style={{
                  width: "400px",
                  minWidth: "400px",
                  height: "60vh",
                  minHeight: "300px",
                }}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="400px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">{img.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>

          {/* Controls */}
          {imagesLoaded && (
            <>
              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="absolute top-4 right-4 z-10 bg-black/50 border border-white/20 text-white hover:bg-black/70 rounded-full p-3 transition-all duration-200"
                title={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              {/* Image Count */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm z-10">
                {project.images.length} images
              </div>

              {/* Instructions */}
              <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm z-10">
                Hover to pause • Click to pause
              </div>
            </>
          )}
        </div>

        {/* Project Info */}
        <div className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-light tracking-wider text-gray-900 mb-4">
                {project.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base mb-4">
                {project.description}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-100">
            <span>Continuous slideshow • Hover or click to pause</span>
            <span>{project.images.length} images total</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
