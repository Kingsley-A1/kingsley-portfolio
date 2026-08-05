"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { PageLoadingBar } from "./page-loading-bar";

function LoadingBarWrapper() {
  return (
    <Suspense fallback={null}>
      <PageLoadingBar />
    </Suspense>
  );
}

export function PublicShell({
  children,
  socialLinks,
}: {
  children: React.ReactNode;
  socialLinks?: Record<string, string>;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <LoadingBarWrapper />
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer socialLinks={socialLinks} />
    </>
  );
}
