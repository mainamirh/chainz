"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Theme from "./common/Theme";

import type { navItem } from "./Navbar";
import type { Theme as ThemeType } from "@/app/lib/actions";

const Drawer = ({
  isOpen,
  toggleDrawer,
  navItems,
  theme,
}: {
  isOpen: boolean;
  toggleDrawer: () => void;
  navItems: Array<navItem>;
  theme: ThemeType;
}) => {
  const pathname = usePathname();

  return (
    <div
      className={`text-dark-baby-powder fixed inset-0 z-40 bg-foreground pt-[95px] transition-all duration-300 md:hidden ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <nav className="flex flex-col items-start gap-6 p-[5%]">
        {navItems.map((item) => (
          <Link
            href={item.url}
            key={item.label}
            className={`${
              item.url === pathname && "text-indigo-400"
            } flex items-center gap-4 transition-colors hover:text-indigo-400`}
            onClick={toggleDrawer}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center justify-end p-[5%]">
        <Theme theme={theme} />
      </div>
    </div>
  );
};

export default Drawer;
