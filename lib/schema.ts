import * as z from "zod";

export const questionSchema = z.object({
  question: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
