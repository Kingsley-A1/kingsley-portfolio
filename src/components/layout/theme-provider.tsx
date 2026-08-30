"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  DARK_THEME_COLOR,
  LIGHT_THEME_COLOR,
  normalizeTheme,
  type Theme,
} from "@/lib/theme-preference";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const adminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    setMounted(true);
    setTheme(normalizeTheme(localStorage.getItem("theme")));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const appliedTheme = adminRoute ? "light" : theme;
    root.classList.toggle("dark", appliedTheme === "dark");
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        appliedTheme === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR,
      );
    localStorage.setItem("theme", theme);
  }, [adminRoute, theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme: adminRoute ? "light" : theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
