"use client";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";

//@ts-ignore
const ParseHTML = ({ code }) => {
  const languageMatch = code.match(/class="language-(\w+)"/);
  const language = languageMatch ? languageMatch[1] : "plaintext";

  const codeSnippetWithoutTags = code.replace(/<[^>]*>/g, "");

  return (
    <SyntaxHighlighter
      lineProps={{
        style: { overflowWrap: "break-word", whiteSpace: "pre-wrap" },
      }}
      wrapLines={true}
      style={prism}
      language={language}
    >
      {codeSnippetWithoutTags}
    </SyntaxHighlighter>
  );
};

export default ParseHTML;
