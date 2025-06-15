import { z } from "zod/v4";

const signInSchema = z.object({
    email: z.string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
    password: z.string()
})

export default signInSchema