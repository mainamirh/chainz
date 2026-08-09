"use client";

import { setTheme } from "@/lib/theme";
import { Monitor, Sun, Moon } from "lucide-react";

import type { Theme as ThemeType } from "@/lib/types";

const Theme = ({ theme }: { theme: ThemeType }) => {
  return (
    <div className="border-border flex items-center rounded-full border p-[3px]">
      <span
        className={`${theme === "system" ? "bg-border" : "[&>svg]:hover:text-content"} cursor-pointer rounded-full p-2`}
        onClick={() => setTheme("system")}
      >
        <Monitor className="text-content/70 h-4 w-4 transition-colors" />
      </span>
      <span
        className={`${theme === "light" ? "bg-border" : "[&>svg]:hover:text-content"} cursor-pointer rounded-full p-2`}
        onClick={() => setTheme("light")}
      >
        <Sun className="text-content/70 h-4 w-4 transition-colors" />
      </span>
      <span
        className={`${theme === "dark" ? "bg-border" : "[&>svg]:hover:text-content"} cursor-pointer rounded-full p-2`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="text-content/70 h-4 w-4 transition-colors" />
      </span>
    </div>
  );
};

export default Theme;
