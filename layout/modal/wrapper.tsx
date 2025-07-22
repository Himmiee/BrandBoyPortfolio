"use client";

import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm z-10"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative z-20 w-full max-w-3xl bg-white shadow-lg p-6 ${className}`}
      >
        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <X size={20} />
        </button> */}

        {children}
      </div>
    </div>
  );
};
