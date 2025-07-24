"use client";
import { IProject } from "@/types/interface/hero.interface";
import { useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ProjectModal } from "../modal/project";
import * as React from "react";

interface ProjectCardProps {
  project: IProject;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [open, setOpen] = useState(false);

  // Autoplay plugin instance
  const autoplayRef = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplayRef.current]);

  const handleCardClick = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <>
      <div className="group cursor-pointer" onClick={handleCardClick}>
        <div className="relative overflow-hidden mb-6">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {project.images.slice(0, 5).map((img, idx) => (
                <div
                  key={idx}
                  className="relative flex-[0_0_100%] aspect-[4/3] h-80"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-light tracking-wider text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-800 transition-colors duration-300">
            {project.description}
          </p>
        </div>
      </div>

      <ProjectModal project={project} open={open} onClose={handleModalClose} />
    </>
  );
};
