import * as z from "zod";

export const questionSchema = z.object({
  question: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  explanation: z.string().min(50, {
    message: "Description must be at least 50 characters ",
  }),
  tags: z.array(z.string()).min(3),
});
