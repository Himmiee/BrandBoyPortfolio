"use client";
import { navLinks, socialIcons } from "@/helpers/data";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export const NavComponent: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white max-w-7xl mx-auto">
      {/* Top Header */}
      <nav className="p-4 md:p-8 flex items-center justify-between pt-6 md:pt-12">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          <h3 className="text-4xl md:text-6xl font-black">B</h3>
        </div>

        {/* Center Section - Brand Name (Hidden on mobile) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <p className="text-2xl font-bold tracking-wider">BRANDBOY</p>
        </div>

        {/* Right Section - Desktop: Social Icons, Mobile: Menu Button */}
        <div className="flex items-center">
          {/* Social Icons - Hidden on mobile */}
          <div className="hidden md:flex gap-2">
            {socialIcons.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  title={item.label}
                  className="w-7 h-7 rounded-full flex items-center justify-center border border-black hover:bg-black hover:text-white hover:border-black transition-all duration-200 cursor-pointer"
                >
                  <IconComponent />
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden w-8 h-8 flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Brand Name - Visible only on mobile */}
      <div className="md:hidden text-center pb-4">
        <p className="text-lg font-bold tracking-wider">BRANDBOY</p>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex px-8 py-8 justify-center gap-32">
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
            className="text-2xl font-medium text-black hover:text-gray-600 transition-colors cursor-pointer"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {/* Mobile Navigation Links */}
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
                className="block text-xl font-medium text-black hover:text-gray-600 transition-colors cursor-pointer py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Mobile Social Icons */}
          <div className="px-4 pb-6 flex gap-3 justify-center border-t border-gray-100 pt-6">
            {socialIcons.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  title={item.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-black hover:bg-black hover:text-white hover:border-black transition-all duration-200 cursor-pointer"
                >
                  <IconComponent />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
