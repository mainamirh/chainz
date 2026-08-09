import "./globals.css";

import type { Metadata } from "next";
import { poppins } from "./fonts";

import ReactQueryProvider from "@/lib/ReactQueryProvider";

import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";

import { getTheme } from "@/lib/theme";
import { getQuotesLatest } from "@/lib/api/coinmarketcap";

export const metadata: Metadata = {
  title: "ChainZ - Compare The Best Exchanges to Buy or sell Crypto",
  description: "A platform for comparing coin prices across various exchanges.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();
  const quotesLatest = await getQuotesLatest({ next: { revalidate: 60 * 60 } });

  return (
    <html lang="en" data-theme={theme} data-scroll-behavior="smooth">
      <body className={poppins.className}>
        <Navbar theme={theme} aggregatedStats={quotesLatest} />

        <main className="mx-auto w-full max-w-360 pt-21.25">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </main>

        <Footer />
      </body>
    </html>
  );
}
