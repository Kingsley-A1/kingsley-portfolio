"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Palette,
  Handshake,
  Briefcase,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/about",
    label: "About",
    icon: User,
  },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    href: "/admin/graphics",
    label: "Graphics",
    icon: Palette,
  },
  {
    href: "/admin/collaborations",
    label: "Collaborations",
    icon: Handshake,
  },
  {
    href: "/admin/experience",
    label: "Experience",
    icon: Briefcase,
  },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function NavItems() {
    return (
      <ul className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-body-sm font-medium transition-colors",
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
                )}
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen((v) => !v)}
        className="fixed left-4 top-4 z-50 rounded-xl bg-white p-2 shadow-md lg:hidden"
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-neutral-200 bg-white p-4 shadow-2xl transition-transform lg:static lg:translate-x-0 lg:shadow-none",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center gap-3 px-2 pt-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-xs font-bold text-white">
            KM
          </div>
          <div>
            <div className="text-body-sm font-semibold text-neutral-900">
              Portfolio Admin
            </div>
            <div className="text-caption text-neutral-500">Kingsley Maduabuchi</div>
          </div>
        </div>

        <NavItems />

        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-body-sm text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
          >
            <LogOut className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </aside>
    </>
  );
}
