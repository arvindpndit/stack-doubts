import * as z from "zod";

export const questionSchema = z.object({
  question: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  explanation: z.string().min(50, {
    message: "Description must be at least 50 characters ",
  }),
  tags: z.array(z.string()),
});

export const answerSchema = z.object({
  content: z.string().refine(
    (data) => {
      // Extract content inside <></> tags
      const matches = data.match(/<.*?>(.*?)<\/.*?>/);

      // Count characters inside <></> tags while excluding &nbsp;
      const count = matches ? matches[1].replace(/&nbsp;/g, "").length : 0;

      // Validate against the minimum length
      return count >= 10;
    },
    {
      message: "Answer must contain at least 10 characters",
    }
  ),
});
