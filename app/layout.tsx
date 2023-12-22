import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/common/Navbar";
import LeftSideBar from "@/components/layout/LeftSideBar";
import RightSideBar from "@/components/layout/RightSideBar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Stack Overflow",
  description:
    "A community driven platform for asking and answering programming questions",
  icons: {
    icon: "public/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <div>
            <Navbar />
            <div className="flex justify-between px-0 md:px-2">
              <div className="w-1/5 hidden md:block  ">
                <LeftSideBar />
              </div>
              <div className="w-full ">{children}</div>
              <div className="w-2/6 hidden md:block">
                <RightSideBar />
              </div>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
