"use client";

import { setTheme } from "@/app/lib/actions";
import { Monitor, Sun, Moon } from "lucide-react";

import type { Theme as ThemeType } from "@/app/lib/actions";

const Theme = ({ theme }: { theme: ThemeType }) => {
  return (
    <div className="flex items-center rounded-full border border-border p-[3px]">
      <span
        className={`${theme === "system" ? "bg-border" : "hover:[&>svg]:text-content"} cursor-pointer rounded-full p-2`}
        onClick={() => setTheme("system")}
      >
        <Monitor className="h-4 w-4 text-content/70 transition-colors" />
      </span>
      <span
        className={`${theme === "light" ? "bg-border" : "hover:[&>svg]:text-content"} cursor-pointer rounded-full p-2`}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4 text-content/70 transition-colors" />
      </span>
      <span
        className={`${theme === "dark" ? "bg-border" : "hover:[&>svg]:text-content"} cursor-pointer rounded-full p-2`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4 text-content/70 transition-colors" />
      </span>
    </div>
  );
};

export default Theme;
