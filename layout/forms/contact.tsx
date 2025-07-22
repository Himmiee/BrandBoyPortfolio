"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { ContactFormData, contactSchema } from "@/helpers/schemas/schema";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="w-full max-w-3xl mx-auto font-opensans ">
      <div className="mb-6 text-center">
        <h2 className="text-6xl font-bold text-gray-900 mb-2 pt-5 flex items-center justify-center">
          B<span className="text-4xl font-bold">BRANDBOY</span>
        </h2>
        <p className="text-black text-[13px] font-medium">
          Interior Design | Construction | Branding Consultancy | Project
          Management
        </p>
        <p className="pt-8  pb-4 font-bold text-xl md:text-4xl">
          Let’s Bring Your Vision to Life
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl mx-auto">
        {/* Full Name */}
        <div>
          {/* <Label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full Name
          </Label> */}
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
          {/* <Label htmlFor="email" className="block text-sm font-medium mb-1">
            Business Email
          </Label> */}
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
          {/* <Label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone Number
          </Label> */}
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
          {/* <Label htmlFor="project" className="block text-sm font-medium mb-1">
            Project Type
          </Label> */}
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
          {/* <Label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </Label> */}
          <textarea
            {...register("message")}
            id="message"
            rows={4}
            placeholder="Message / Special Request"
            className="w-full px-4 py-3 border border-black/40 rounded-lg  outline-none transition-colors resize-none"
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
