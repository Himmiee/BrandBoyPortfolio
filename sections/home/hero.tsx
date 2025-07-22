import React from "react";
import Image from "next/image";
import heroImg from "@/public/home/hero-img.webp";

export const HeroSection: React.FC = () => {
  return (
    <section className="w-full h-auto max-w-7xl mx-auto p-4 md:px-8 md:py-16">
      <Image
        src={heroImg}
        alt="Hero image"
        className="w-full h-80 md:h-auto object-cover"
        priority
      />
    </section>
  );
};
