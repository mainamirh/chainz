"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";

import Drawer from "./Drawer";
import Theme from "./common/Theme";

import LogoGithub from "./common/logo-github";
import LogoTwitterX from "./common/logo-twitter-x";

import { Menu, X, ArrowRightLeft, Coins } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Theme as ThemeType } from "@/app/lib/actions";

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

export default function Navbar({ theme }: { theme: ThemeType }) {
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
      <header className="fixed z-50 flex w-full items-center justify-between border-b border-border bg-foreground px-[5%] py-3 text-xs shadow-sm md:text-sm">
        <div className="flex items-center gap-16">
          <Link href="/" className="text-xl font-bold md:text-2xl">
            Chain
            <span
              style={{ color: "transparent" }}
              className="bg-gradient-to-r from-iris-darker to-iris-lighter bg-clip-text"
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
              href={"https://github.com/mainamirh"}
              target="_blank"
              className="rounded-md p-2 transition-colors hover:bg-border"
            >
              <LogoGithub className="h-4 w-4" />
            </Link>
            <Link
              href={"https://x.com/mainamirh"}
              target="_blank"
              className="rounded-md p-2 transition-colors hover:bg-border"
            >
              <LogoTwitterX className="h-4 w-4" />
            </Link>
          </div>

          <Theme theme={theme} />

          <div onClick={toggleDrawer} className="flex md:hidden">
            {isDrawerOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </div>
        </div>
      </header>

      <Drawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        navItems={navItems}
      />
    </>
  );
}
