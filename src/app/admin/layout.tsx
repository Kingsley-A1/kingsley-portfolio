// This layout wraps login and API routes only — no auth, no sidebar.
// Protected routes use the (protected) route group layout.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: null },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
