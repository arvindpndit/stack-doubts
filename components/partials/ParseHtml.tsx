"use client";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";

//@ts-ignore
const ParseHTML = ({ code }) => {
  return <SyntaxHighlighter style={coy}>{code}</SyntaxHighlighter>;
};

export default ParseHTML;
