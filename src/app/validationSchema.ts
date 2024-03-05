import { z } from "zod";

export const registrationSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username must not be empty!" })
    .max(255, {
      message: "Username must not be more than 255 characters long!",
    }),
  email: z.string().email({ message: "Invalid email id!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email id!" }),
  password: z.string().min(1, { message: "Invalid password!" }),
});
