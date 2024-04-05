import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Jobs | Stack Doubts",
  description:
    "Discover programming job opportunities and advance your career in the tech industry with Stack Doubts' job listings.",
};

const page = () => {
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <p className="text-lg font-semibold text-gray-700">
        Find Jobs (Coming Soon!)
      </p>
    </div>
  );
};

export default page;
