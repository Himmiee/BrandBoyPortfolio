import React from "react";
import Image, { StaticImageData } from "next/image";

interface BackgroundImageWrapperProps {
  image: StaticImageData;
  alt?: string;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
  priority?: boolean;
}

export const BackgroundImageWrapper: React.FC<BackgroundImageWrapperProps> = ({
  image,
  alt = "Background",
  className = "h-[400px] md:h-[600px]",
  overlayClassName = "bg-black/40",
  children,
  priority = false,
}) => {
  return (
    <div className={`relative w-full bg-amber-100 overflow-hidden ${className}`}>
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="relative z-10 w-full h-full flex items-center justify-center text-white">
        {children}
      </div>
    </div>
  );
};
