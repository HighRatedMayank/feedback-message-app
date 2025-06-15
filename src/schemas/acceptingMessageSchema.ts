import { z } from "zod/v4";

const acceptingMessageSchema = z.object({
    acceptMessages: z.boolean()
})

export default acceptingMessageSchema