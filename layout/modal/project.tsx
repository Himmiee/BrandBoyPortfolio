"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { IProject } from "@/types/interface/hero.interface";
import { Modal } from "./wrapper";

interface ProjectModalProps {
  project: IProject | null;
  open: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, open, onClose }: ProjectModalProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!project) return null;

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-5xl w-[95vw] max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl"
    >
      <div className="relative w-full">
        {/* Image Carousel */}
        <div className="relative h-[60vh] md:h-[70vh] bg-gray-100">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="w-full h-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="h-full -ml-0">
              {project.images.map((img, idx) => (
                <CarouselItem key={idx} className="relative h-full pl-0">
                  <div className="relative h-full w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="90vw"
                      priority={idx === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 z-10" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 z-10" />

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {Array.from({ length: count }).map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === current - 1
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  onClick={() => api?.scrollTo(idx)}
                />
              ))}
            </div>
          </Carousel>
        </div>

        {/* Project Info */}
        <div className="p-8 bg-white">
          <h2 className="text-3xl font-light tracking-wider text-gray-900 mb-4">
            {project.title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-base">
            {project.description}
          </p>
        </div>
      </div>
    </Modal>
  );
};
