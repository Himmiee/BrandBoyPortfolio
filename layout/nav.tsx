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
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openContactModal = () => {
    setIsMobileMenuOpen(false);
    setShowContactModal(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowContactModal(true);
    }, 2000);
  }, []);

  return (
    <div className="bg-white max-w-7xl mx-auto font-opensans">
      <nav className="p-4 pb-2 md:p-8 flex items-center justify-between  md:pt-8 ">
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
          <div className="hidden md:flex gap-1">
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

          <button
            onClick={toggleMobileMenu}
            className="md:hidden w-8 h-8 flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className="md:hidden text-center pb-4">
        <Image
          src={BLogoWatermark}
          alt="BrandBoy Wordmark"
          className="h-6 w-auto mx-auto"
          priority
        />
      </div>

      <div className="hidden md:flex px-8 py-8 justify-center gap-32 font-myriad">
        {navLinks.map((link, idx) => {
          const isContact = link.toLowerCase().includes("contact");
          return (
            <a
              key={idx}
              onClick={isContact ? openContactModal : undefined}
              href={
                isContact
                  ? undefined
                  : `#${link.toLowerCase().replace(/\s+/g, "")}`
              }
              className="text-[36px] md:text-[30px] lg:text-[36px] font-medium text-black hover:text-gray-600 transition-colors cursor-pointer"
            >
              {link}
            </a>
          );
        })}
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, idx) => {
              const isContact = link.toLowerCase().includes("contact");
              return (
                <a
                  key={idx}
                  onClick={
                    isContact
                      ? openContactModal
                      : () => setIsMobileMenuOpen(false)
                  }
                  href={
                    isContact
                      ? undefined
                      : `#${link.toLowerCase().replace(/\s+/g, "")}`
                  }
                  className="block text-2xl font-myriad font-medium text-black hover:text-gray-600 transition-colors cursor-pointer py-2"
                >
                  {link}
                </a>
              );
            })}
          </div>

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

      {/* Contact Modal */}
      <div className="w-full">
        <Modal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          className="max-w-2xl"
        >
          <ContactForm />
        </Modal>
      </div>
    </div>
  );
};
