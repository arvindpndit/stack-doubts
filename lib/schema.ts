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
      // Extract visible text content inside <p></p> tags
      const pMatches = data.match(/<p>([^<]*)<\/p>/g) || [];
      const pContent = pMatches
        .map((match) => match.replace(/<\/?[^>]+(>|$)/g, ""))
        .join("")
        .trim();

      // Extract visible text content inside <pre><code></code></pre> tags
      const preMatches =
        data.match(
          /<pre class="language-javascript"><code>(.*?)<\/code><\/pre>/g
        ) || [];
      const preContent = preMatches
        .map((match) =>
          match.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " ")
        )
        .join("")
        .trim();

      // Concatenate the content from both <p> and <pre><code> tags
      const finalContent = pContent + preContent;

      // Count characters of visible text content while excluding &nbsp;
      const count = finalContent.replace(/&nbsp;/g, "").length;
      // Validate against the minimum length
      return count >= 10;
    },
    {
      message: "Answer must contain at least 10 characters",
    }
  ),
});
