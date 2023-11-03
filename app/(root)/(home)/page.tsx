import Image from "next/image";
import { ClerkProvider } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <ClerkProvider>
      <UserButton />
      <div className="h1-bold">stack overflow</div>
      <div className="h2-bold">testing css</div>
    </ClerkProvider>
  );
}
