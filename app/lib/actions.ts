"use server";

import { cookies } from "next/headers";

export async function setTheme(theme: string) {
  cookies().set("theme", theme);
}

export async function getTheme() {
  return cookies().get("theme") ?? "light"; // Default theme is light
}
