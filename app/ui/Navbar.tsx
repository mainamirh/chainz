"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";

import Button from "./common/Button";
import Drawer from "./Drawer";

import {
  Menu,
  X,
  Home,
  ArrowRightLeft,
  Coins,
  MoonStar,
  SunMedium,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type navItem = {
  label: string;
  url: string;
  icon: LucideIcon;
};

const navItems: Array<navItem> = [
  {
    label: "Home",
    url: "/",
    icon: Home,
  },
  {
    label: "Exchanges",
    url: "/exchanges",
    icon: ArrowRightLeft,
  },
  {
    label: "Coins",
    url: "/coins",
    icon: Coins,
  },
];

export default function Navbar() {
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
      <header className="fixed w-full z-50 flex text-xs md:text-sm justify-between items-center bg-foreground px-[5%] py-4 border-b border-border">
        <div>
          <Link href="/" className="text-xl md:text-2xl font-bold">
            Chain
            <span
              style={{ color: "transparent" }}
              className="bg-gradient-to-r from-iris-darker to-iris-lighter bg-clip-text"
            >
              Z
            </span>
          </Link>
        </div>
        <nav className="items-center gap-8 hidden md:flex">
          {navItems.map((item) => (
            <Link
              href={item.url}
              key={item.label}
              className={`${
                item.url === pathname && "text-indigo-400"
              } hover:text-indigo-400 transition-colors`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button type="button">Login</Button>
          {/* <MoonStar className="w-5 h-5" />
          <SunMedium className="w-5 h-5" /> */}
          <div onClick={toggleDrawer} className="md:hidden flex">
            {isDrawerOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </div>
        </div>
      </header>

      <Drawer isOpen={isDrawerOpen} navItems={navItems} />
    </>
  );
}
