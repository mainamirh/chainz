"use server";

import { cookies } from "next/headers";

export type Theme = "light" | "dark" | "system";

export async function setTheme(theme: Theme) {
  (await cookies()).set("theme", theme);
}

export async function getTheme(): Promise<Theme> {
  const themeCookie = (await cookies()).get("theme");
  return (themeCookie?.value as Theme) ?? "system";
}
