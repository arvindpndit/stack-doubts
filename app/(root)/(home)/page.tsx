import Image from "next/image";
import { ClerkProvider } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import LeftSideBar from "@/components/LeftSideBar";

export default function Home() {
  return (
    <ClerkProvider>
      <Navbar />
      <LeftSideBar />
    </ClerkProvider>
  );
}
