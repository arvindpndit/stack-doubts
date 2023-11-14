import Image from "next/image";
import { ClerkProvider } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import LeftSideBar from "@/components/LeftSideBar";
import MainContainer from "@/components/MainContainer";
import RightSideBar from "@/components/RightSideBar";

export default function Home() {
  return <MainContainer />;
}
