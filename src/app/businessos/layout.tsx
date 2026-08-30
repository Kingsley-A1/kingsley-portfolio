import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BusinessOS",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function BusinessOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
