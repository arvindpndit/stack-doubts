import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags | Stack Doubts",
  description:
    "Browse through programming tags and categories to find relevant content, discussions, and resources on Stack Doubts.",
};

const Tags = () => {
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <p className="text-lg font-semibold text-gray-700">Tags (Coming Soon!)</p>
    </div>
  );
};

export default Tags;
