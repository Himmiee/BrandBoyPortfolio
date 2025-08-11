"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { ContactFormData, contactSchema } from "@/helpers/schemas/schema";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import BLogo from "@/public/logo/BrandBoy_Icon@4x.png";

export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-lg mx-auto font-opensans max-h-[80vh] overflow-auto hide-scrollbar">
      {/* Logo & Tagline */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-3 pt-5 pb-2">
          <Image
            src={BLogo}
            alt="BrandBoy Icon"
            className="w-10 h-10 md:w-14 md:h-14"
            priority
          />
        </div>

        <p className="text-black text-[13px] font-medium mt-2">
          Interior Design | Construction | Branding Consultancy | Project
          Management
        </p>

        <p className="py-4  font-bold text-xl md:text-[34px]">
          Let’s Bring Your Vision to Life
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 max-w-xl mx-auto"
      >
        {/* Full Name */}
        <div>
          <Input
            {...register("fullName")}
            id="fullName"
            placeholder="Full name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Input
            {...register("phone")}
            id="phone"
            type="tel"
            placeholder="Phone Number"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Project Type */}
        <div>
          <Controller
            control={control}
            name="project"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full" id="project">
                  <SelectValue placeholder="Select Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="branding">Branding</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="mobile-app">Mobile App</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.project && (
            <p className="text-red-500 text-xs mt-1">
              {errors.project.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <textarea
            {...register("message")}
            id="message"
            rows={4}
            placeholder="Message / Special Request"
            className="w-full px-4 py-3 border border-black/40 rounded-lg outline-none transition-colors resize-none"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="bg-black w-full rounded-lg text-lg font-medium h-12"
        >
          Bring My Vision To Live
        </Button>
      </form>
    </div>
  );
};
