import { projects } from "@/helpers/project";
import { ProjectCard } from "@/layout/cards/project";

export default function ProjectsShowcase() {
  return (
    <section className="lg:py-6 p-4 md:p-8 max-w-7xl mx-auto">
      <div className="text-center mb-3 md:mb-0">
        <h2 className="text-4xl font-light tracking-wider text-gray-900 md:mb-4">
          PROJECTS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 pt-3 gap-6 md:gap-4 lg:gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
