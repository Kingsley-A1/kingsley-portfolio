"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { PageLoadingBar } from "./page-loading-bar";
import { AgentWalkers } from "@/components/businessos/agent-walkers";

function LoadingBarWrapper() {
  return (
    <Suspense fallback={null}>
      <PageLoadingBar />
    </Suspense>
  );
}

function AgentWalkersWrapper() {
  return (
    <Suspense fallback={null}>
      <AgentWalkers />
    </Suspense>
  );
}

export function PublicShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname === "/businessos") {
    return <>{children}</>;
  }

  return (
    <>
      <LoadingBarWrapper />
      <AgentWalkersWrapper />
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
