import { z } from "zod";

export const serviceOptions = [
  "Property Management",
  "Rent Collection",
  "Tenant Management",
  "Maintenance",
  "Buying or Selling",
  "Construction / Development",
  "Valuation",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "That name looks a little long"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .max(30, "That phone number looks a little long")
    .optional()
    .or(z.literal("")),
  propertyAddress: z
    .string()
    .trim()
    .max(160, "Please keep the address under 160 characters")
    .optional()
    .or(z.literal("")),
  service: z.enum(serviceOptions).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (10+ characters)")
    .max(2000, "Please keep your message under 2000 characters"),
  // Honeypot — must remain empty. Bots tend to fill every field.
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export type ContactState = {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactFormValues, string>>;
};
