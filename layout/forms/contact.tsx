"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { ContactFormData, contactSchema } from "@/helpers/schemas/schema";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import BLogo from "@/public/logo/BrandBoy_Icon@4x.png";
import { sendMail } from "@/lib/sendMail";
import { generateContactEmailTemplate } from "@/lib/generateMailTemplate";
import { Loader2 } from "lucide-react";

export const ContactForm = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const htmlTemplate = generateContactEmailTemplate({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        project: data.project,
        message: data.message,
      });

      const response = await sendMail({
        email: data.email,
        subject: `New Contact: ${data.fullName} - ${data.project} Project`,
        text: `Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${
          data.phone
        }\nProject: ${data.project}${
          data.message ? `\nMessage: ${data.message}` : ""
        }`,
        html: htmlTemplate,
      });

      if (response?.messageId) {
        onClose();
        toast.success("Message sent successfully!", {
          style: {
            background: "#ffffff",
            color: "#000",
            border: "1px solid #000",
          },
          icon: <CheckCircle className="text-black" size={20} />,
        });
        reset();
      } else {
        toast.error("Failed to send message. Please try again.", {
          style: {
            background: "#ffffff",
            color: "#b91c1c",
            border: "1px solid #ef4444",
          },
          icon: <XCircle className="text-red-600" size={20} />,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.", {
        style: {
          background: "#ffffff",
          color: "#b91c1c",
          border: "1px solid #ef4444",
        },
        icon: <AlertTriangle className="text-red-600" size={20} />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto font-opensans">
      {/* Logo & Tagline */}
      <div className="mb-2 text-center">
        <div className="flex items-center justify-center gap-3 pt-5 pb-2">
          <Image src={BLogo} alt="BrandBoy Icon" className="w-8 h-8" priority />
        </div>

        <p className="text-black text-[13px] font-medium mt-2">
          Interior Design | Construction | Branding Consultancy | Project
          Management
        </p>

        <p className="py-1 font-bold text-xl md:text-3xl">
          Let’s Bring Your Vision to Life
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-xl mx-auto"
      >
        {/* Full Name */}
        <div>
          <Input
            {...register("fullName")}
            id="fullName"
            placeholder="Full name"
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={loading}
              >
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
            rows={3}
            placeholder="Message / Special Request"
            className="w-full px-4 py-3 border border-black/40 rounded-lg outline-none transition-colors resize-none"
            disabled={loading}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="bg-black w-full rounded-lg text-base font-medium h-10"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="flex items-center gap-2">
                Submitting <Loader2 className="animate-spin " />
              </div>
            </>
          ) : (
            "Bring My Vision To Live"
          )}
        </Button>
      </form>
    </div>
  );
};
