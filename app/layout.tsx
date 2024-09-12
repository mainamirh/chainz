import "./globals.css";

import type { Metadata } from "next";
import { poppins } from "./fonts";
import Navbar from "./ui/Navbar";
import ReactQueryProvider from "./lib/ReactQueryProvider";
import { getTheme } from "./lib/actions";

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

  return (
    <html lang="en" data-theme={theme}>
      <body className={`${poppins.className} bg-background text-content`}>
        <Navbar theme={theme} />

        <main className="mx-auto w-full max-w-[1440px] py-[70px]">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}
