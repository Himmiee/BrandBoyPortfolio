import React from "react";
import Image from "next/image";
import heroImg from "@/public/home/hero-img.webp";

export const HeroSection: React.FC = () => {
  return (
    <section  id="herosection" className="w-full h-auto max-w-7xl mx-auto pt-8 p-4 md:px-8 md:pb-0">
      <Image
        src={heroImg}
        alt="Hero image"
        className="w-full h-96 md:h-auto object-cover"
        priority
      />
    </section>
  );
};
