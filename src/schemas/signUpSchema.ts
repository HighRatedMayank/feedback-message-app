// import { z } from "zod/v4";

// export const usernameValidation = z
// .string()
// .min(6, "Username must be of 6 characters minimum")
// .max(12, "Username should be of 12 characters maximum")
// .regex(/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/, "Username should contain certain characters only")

// export const signUpSchema = z.object({
//     username: usernameValidation,
//     email: z.string().email({message: "Valid email must be entered"}),
//     password: z.string().min(6, "password should be min 6 characters").max(12, "password should be max 12 characters")
// })

import { z } from 'zod';

export const usernameValidation = z
  .string()
  .min(6, 'Username must be of 6 characters minimum')
  .max(12, 'Username should be of 12 characters maximum')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const signUpSchema = z.object({
  username: usernameValidation,

  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});