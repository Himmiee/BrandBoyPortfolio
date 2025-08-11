import { HeroSection } from "@/sections/home/hero";
import ProjectsShowcase from "@/sections/home/projects";
import { VideoSection } from "@/sections/home/videosection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <VideoSection />
      <ProjectsShowcase />
    </>
  );
};
export default HomePage;
