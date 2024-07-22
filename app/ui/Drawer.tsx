"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { navItem } from "./Navbar";

const Drawer = ({
  isOpen,
  navItems,
}: {
  isOpen: boolean;
  navItems: Array<navItem>;
}) => {
  const pathname = usePathname();

  return (
    <div
      className={`md:hidden fixed inset-0 text-dark-baby-powder bg-dark-eerie-black transition-all duration-300 pt-[80px] ${
        isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
    >
      <nav className="flex flex-col items-start p-[5%] gap-6">
        {navItems.map((item) => (
          <Link
            href={item.url}
            key={item.label}
            className={`${
              item.url === pathname && "text-indigo-400"
            } hover:text-indigo-400 transition-colors flex items-center gap-4`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Drawer;
