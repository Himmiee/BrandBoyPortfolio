"use client";
import { useRef } from "react";
import { projects } from "@/helpers/project";
import { ProjectCard } from "@/layout/cards/project";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectsShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="lg:py-6 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-center md:justify-between my-4 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 md:mb-4">
          PROJECTS
        </h2>

        {/* Arrow controls */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={scrollLeft}
            className="bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Horizontal scrolling layout */}
      <div
        ref={scrollContainerRef}
        className="pt-3 overflow-x-auto scrollbar-hide"
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-6 pb-4">
          {projects.map((project) => (
            <div key={project.id} className="flex-none md:w-72">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
