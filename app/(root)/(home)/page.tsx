import Image from "next/image";
import { ClerkProvider } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import LeftSideBar from "@/components/LeftSideBar";
import MainContainer from "@/components/MainContainer";
import RightSideBar from "@/components/RightSideBar";

export default function Home() {
  return (
    <ClerkProvider>
      <Navbar />
      <div className="flex justify-between px-5">
        <div className="w-1/5 border ">
          <LeftSideBar />
        </div>
        <div className="w-full px-4">
          <MainContainer />
        </div>
        <div className="w-2/6 border">
          <RightSideBar />
        </div>
      </div>
    </ClerkProvider>
  );
}
