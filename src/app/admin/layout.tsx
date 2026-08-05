// This layout wraps login and API routes only — no auth, no sidebar.
// Protected routes use the (protected) route group layout.

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
