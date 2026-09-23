import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit mobile number"
    ),

  address: z
    .string()
    .trim()
    .min(5, "Please enter your complete address")
    .max(200, "Address is too long"),

  apartment: z
    .string()
    .trim()
    .max(100, "This field is too long")
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .trim()
    .min(2, "Please enter your city")
    .max(50, "City name is too long"),

  state: z
    .string()
    .trim()
    .min(2, "Please enter your state")
    .max(50, "State name is too long"),

  pincode: z
    .string()
    .trim()
    .regex(
      /^[1-9][0-9]{5}$/,
      "Please enter a valid 6-digit pincode"
    ),
});