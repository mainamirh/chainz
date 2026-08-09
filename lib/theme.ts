"use server";

import { cookies } from "next/headers";

import type { Theme } from "./types";

export async function setTheme(theme: Theme) {
  const cookieStore = await cookies();
  cookieStore.set("theme", theme);
}

export async function getTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  return (theme?.value as Theme) ?? "system";
}
