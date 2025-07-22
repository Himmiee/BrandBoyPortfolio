import * as z from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  project: z
    .string()
    .min(1, "Please select a project type")
    .refine((val) => val !== "select", "Please choose a valid project type"),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
