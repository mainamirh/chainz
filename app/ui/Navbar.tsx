"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";

import Drawer from "./Drawer";
import Theme from "./common/Theme";

import { Github } from "./icons";

import { Menu, X, ArrowRightLeft, Coins } from "lucide-react";
import AggregatedStats from "./AggregatedStats";

import type { LucideIcon } from "lucide-react";
import type { QuotesLatest, Theme as ThemeType } from "@/lib/types";

export type navItem = {
  label: string;
  url: string;
  icon: LucideIcon;
};

const navItems: Array<navItem> = [
  {
    label: "Cryptocurrencies",
    url: "/",
    icon: Coins,
  },
  {
    label: "Exchanges",
    url: "/exchanges",
    icon: ArrowRightLeft,
  },
];

export default function Navbar({
  theme,
  aggregatedStats,
}: {
  theme: ThemeType;
  aggregatedStats: QuotesLatest;
}) {
  const pathname = usePathname();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  function toggleDrawer() {
    if (!isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setDrawerOpen((prev) => !prev);
  }

  return (
    <>
      <header className="border-border bg-foreground fixed z-50 flex w-full flex-col border-b pb-2 text-xs shadow-xs md:text-sm">
        <AggregatedStats aggregatedStats={aggregatedStats} />

        <div className="border-border flex items-center justify-between border-t px-[5%] pt-2">
          <div className="flex items-center gap-16">
            <Link href="/" className="text-xl font-bold md:text-2xl">
              Chain
              <span
                style={{ color: "transparent" }}
                className="from-iris-darker to-iris-lighter bg-linear-to-r bg-clip-text"
              >
                Z
              </span>
            </Link>
            <nav className="hidden items-center gap-8 font-medium md:flex">
              {navItems.map((item) => (
                <Link
                  href={item.url}
                  key={item.label}
                  className={`${
                    item.url === pathname && "text-indigo-400"
                  } transition-colors hover:text-indigo-400`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Link
                href={"https://github.com/mainamirh/chainz"}
                target="_blank"
                className="hover:bg-border rounded-md p-2 transition-colors"
              >
                <Github className="h-4 w-4" />
              </Link>
              {/* <Link
                href={"https://x.com/mainamirh"}
                target="_blank"
                className="rounded-md p-2 transition-colors hover:bg-border"
              >
                <X className="h-4 w-4" />
              </Link> */}
            </div>

            <div className="hidden sm:block">
              <Theme theme={theme} />
            </div>

            <div onClick={toggleDrawer} className="flex md:hidden">
              {isDrawerOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </div>
          </div>
        </div>
      </header>

      <Drawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        navItems={navItems}
        theme={theme}
      />
    </>
  );
}
