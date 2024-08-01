import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./fonts";
import Navbar from "./ui/Navbar";
import ReactQueryProvider from "./lib/ReactQueryProvider";

export const metadata: Metadata = {
  title: "ChainZ - Compare The Best Exchanges to Buy or sell Crypto",
  description: "A platform for comparing coin prices across various exchanges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-background text-content`}>
        <Navbar />
        {/* <div className="w-full h-[400px] -z-10 top-[80px] absolute bg-gradient" /> */}

        <main className="py-[70px] w-full max-w-[1440px] mx-auto">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}
