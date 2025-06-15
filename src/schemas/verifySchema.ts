import { z } from "zod";

const verifySchema = z.object({
    code: z.string().length(6, "Code must be 6 digit length"),
})

export default verifySchema