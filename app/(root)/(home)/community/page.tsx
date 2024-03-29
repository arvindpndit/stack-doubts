import CommunityPage from "@/components/pages/CommunityPage";

const page = ({ searchParams }: any) => {
  return (
    <div className="w-full px-1 lg:pr-8 mt-28 h-screen">
      <CommunityPage searchParams={searchParams.query} />
    </div>
  );
};

export default page;
