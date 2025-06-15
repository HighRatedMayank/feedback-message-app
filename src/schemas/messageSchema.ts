import { z } from "zod/v4";

const messageSchema = z.object({
    content: z.string()
    .min(1, {message: "Must be filled"})
    .max(140, {message: "Maximum 140 characters are allowed"})
})

export default messageSchema