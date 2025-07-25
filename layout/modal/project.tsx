"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { IProject } from "@/types/interface/hero.interface";
import { Modal } from "./wrapper";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectModalProps {
  project: IProject | null;
  open: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, open, onClose }: ProjectModalProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (open) {
      setIsPlaying(true);
      setImagesLoaded(false);
      setLoadedCount(0);
      setCurrentImageIndex(0);
    } else {
      setIsPlaying(false);
      setImagesLoaded(false);
      setLoadedCount(0);
      setCurrentImageIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (!isMobile || !isPlaying || !imagesLoaded || !project) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [isMobile, isPlaying, imagesLoaded, project]);

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

  const goToPrevious = () => {
    if (!project) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    if (!project) return;
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  if (!project) return null;

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-6xl w-[95vw] max-h-[90vh] bg-white overflow-hidden shadow-2xl"
    >
      <div className="relative w-full">
        {/* Image Container */}
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

          {/* Mobile View - Single Image with Navigation */}
          {isMobile ? (
            <div className="relative w-full h-full">
              {project.images.map((img, idx) => (
                <Image
                  key={`preload-${idx}`}
                  src={img.src}
                  alt={img.alt}
                  width={1}
                  height={1}
                  className="absolute opacity-0 pointer-events-none"
                  onLoad={handleImageLoad}
                  priority={idx < 3}
                />
              ))}

              <div className="relative w-full h-full">
                <Image
                  src={project.images[currentImageIndex]?.src}
                  alt={project.images[currentImageIndex]?.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="95vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">
                      {project.images[currentImageIndex]?.alt}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              {imagesLoaded && project.images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 border border-white/20 text-white hover:bg-black/70 rounded-full p-3 transition-all duration-200"
                    title="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 border border-white/20 text-white hover:bg-black/70 rounded-full p-3 transition-all duration-200"
                    title="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {imagesLoaded && project.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        idx === currentImageIndex
                          ? "bg-white"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Desktop View -  Slideshow */
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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium">{img.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

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
          )}

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
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm z-10 md:block hidden">
                {project.images.length} images
              </div>

              {!isMobile && (
                <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm z-10">
                  Hover to pause • Click to pause
                </div>
              )}
            </>
          )}
        </div>

        {/* Project Info */}
        <div className="px-0 py-6 md:p-6 bg-white">
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

          <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-100">
            <span>
              {isMobile
                ? "Auto-advance slideshow • Use arrows to navigate"
                : "Continuous slideshow • Hover or click to pause"}
            </span>
            <span>{project.images.length} images total</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
