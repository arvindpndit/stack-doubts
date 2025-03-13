import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Open_Sans } from 'next/font/google';
import './globals.css';
import '../styles/prism.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/common/Navbar';
import LeftSideBar from '@/components/layout/LeftSideBar';
import RightSideBar from '@/components/layout/RightSideBar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Providers } from './providers';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk',
});

export const metadata: Metadata = {
  title: 'Stack Doubts',
  description:
    'A community driven platform for asking and answering programming questions',
  icons: {
    icon: 'public/assets/images/site-logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" suppressHydrationWarning>
        <Providers>
          <body className={`${openSans.className}`}>
            <div className="min-h-screen">
              <Navbar />
              <div className="container flex justify-between px-0 md:px-2 mt-0 md:mt-8">
                <div className="w-1/3 hidden lg:block   ">
                  <LeftSideBar />
                </div>
                <div className="w-full">{children}</div>
                <div className="w-2/6 hidden xl:block">
                  <RightSideBar />
                </div>
              </div>
              <div className="fixed bottom-0 w-full bg-white dark:bg-gray-900 block lg:hidden z-50">
                <BottomNavigation />
              </div>
            </div>
            <Toaster richColors />
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}

