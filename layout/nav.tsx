"use client";

import { navLinks, socialIcons } from "@/helpers/data";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Modal } from "./modal/wrapper";
import { ContactForm } from "./forms/contact";
import Image from "next/image";
import BLogo from "@/public/logo/BrandBoy_Icon@4x.png";
import BLogoWatermark from "@/public/logo/BrandBoy_WordMark@4x.png";

export const NavComponent: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const openContactModal = () => {
    setIsMobileMenuOpen(false);
    setShowContactModal(true);
  };

  const handleScrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowContactModal(true);
    }, 2000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto font-opensans">
      {/* Top nav bar */}
      <nav className="p-4 pb-2 md:p-8 flex items-center justify-between md:pt-6">
        <div className="flex items-center">
          <Image src={BLogo} alt="BrandBoy Icon" className="h-9 w-9" priority />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <Image
            src={BLogoWatermark}
            alt="BrandBoy Wordmark"
            className="h-6 w-auto"
            priority
          />
        </div>

        <div className="flex items-center">
          {/* Desktop social icons */}
          <div className="hidden md:flex gap-1">
            {socialIcons.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  title={item.label}
                  className="w-7 h-7 rounded-full flex items-center justify-center border border-black hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <IconComponent />
                </div>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden w-8 h-8 flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile logo */}
      <div className="md:hidden text-center pb-4">
        <Image
          src={BLogoWatermark}
          alt="BrandBoy Wordmark"
          className="h-6 md:h-7 w-auto mx-auto"
          priority
        />
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:flex px-8 pb-0 justify-between max-w-3xl mx-auto font-myriad">
        {navLinks.map((link, idx) => {
          const isContact = link.toLowerCase().includes("contact");
          const sectionId = link.toLowerCase().replace(/\s+/g, "");
          return (
            <a
              key={idx}
              onClick={
                isContact
                  ? openContactModal
                  : (e) => handleScrollToSection(e, sectionId)
              }
              href={isContact ? undefined : `#${sectionId}`}
              className="text-[26px] font-medium text-black hover:text-gray-600 transition-colors cursor-pointer"
            >
              {link}
            </a>
          );
        })}
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, idx) => {
              const isContact = link.toLowerCase().includes("contact");
              const sectionId = link.toLowerCase().replace(/\s+/g, "");
              return (
                <a
                  key={idx}
                  onClick={
                    isContact
                      ? openContactModal
                      : (e) => handleScrollToSection(e, sectionId)
                  }
                  href={isContact ? undefined : `#${sectionId}`}
                  className="block text-2xl font-myriad font-medium text-black hover:text-gray-600 transition-colors cursor-pointer py-2"
                >
                  {link}
                </a>
              );
            })}
          </div>

          {/* Mobile social icons */}
          <div className="px-4 pb-6 flex gap-3 justify-center border-t border-gray-100 pt-6">
            {socialIcons.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  title={item.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-black hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <IconComponent />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        className="max-w-xl"
      >
        <ContactForm onClose={() => setShowContactModal(false)} />
      </Modal>
    </div>
  );
};
