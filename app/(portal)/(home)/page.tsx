import { HeroSection } from "@/sections/home/hero";
import ProjectsShowcase from "@/sections/home/projects";
import { VideoSection } from "@/sections/home/videosection";

const HomePage = () => {
  return (
    <>
      <VideoSection />
      <HeroSection />
      <ProjectsShowcase />
    </>
  );
};
export default HomePage;
