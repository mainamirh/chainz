import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./fonts";
import Navbar from "./ui/Navbar";

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
        {children}
      </body>
    </html>
  );
}
