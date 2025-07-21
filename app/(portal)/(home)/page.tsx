import { NavComponent } from "@/layout/nav";
import { VideoSection } from "@/sections/home/VideoSection";
import { HeroSection } from "@/sections/home/hero";

const HomePage = () => {
  return (
    <>
      <NavComponent />
      <HeroSection />
      <VideoSection />
    </>
  );
};
export default HomePage;
