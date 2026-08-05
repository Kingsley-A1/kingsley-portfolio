"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PERSONA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm py-3"
          : "bg-white dark:bg-neutral-950 py-5",
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-h5 font-bold tracking-tight text-neutral-900 dark:text-white transition-colors hover:text-brand-blue dark:hover:text-brand-blue-bright"
        >
          {PERSONA.name}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-lg px-4 py-3 min-h-[44px] text-body-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-blue/10 text-brand-blue-deep dark:bg-brand-blue/20 dark:text-brand-blue-bright"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="ml-2 rounded-lg bg-neutral-900 px-5 py-3 min-h-[44px] text-body-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:shadow-lg dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Let&apos;s Talk
            </Link>
          </li>
        </ul>

        {/* Right-side actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="bg-white dark:bg-neutral-900 mx-4 mt-3 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 shadow-xl md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-body font-medium transition-colors",
                      isActive
                        ? "bg-brand-blue/10 text-brand-blue-deep dark:bg-brand-blue/20 dark:text-brand-blue-bright"
                        : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/contact"
                className="mt-2 block rounded-lg bg-neutral-900 px-4 py-3 text-center text-body font-semibold text-white dark:bg-white dark:text-neutral-900"
              >
                Let&apos;s Talk
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
