import type { Metadata } from "next";
import {
  SITE_DESCRIPTION,
  SITE_URL,
  PERSONA,
} from "@/lib/constants";
import { PublicShell } from "@/components/layout/public-shell";
import { ThemeProvider } from "@/components/layout/theme-provider";
import {
  LIGHT_THEME_COLOR,
  THEME_BOOTSTRAP_SCRIPT,
} from "@/lib/theme-preference";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${PERSONA.name} — Full-Stack Software Engineer`,
    template: `%s — ${PERSONA.name}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "full-stack engineer",
    "software developer",
    "Next.js",
    "React",
    "NestJS",
    "Tailwind CSS",
    "portfolio",
    PERSONA.name,
    PERSONA.alias,
    "web development",
    "Nigeria",
  ],
  authors: [{ name: PERSONA.name }],
  creator: PERSONA.name,
  publisher: PERSONA.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: PERSONA.name,
    title: `${PERSONA.name} — Full-Stack Software Engineer`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: PERSONA.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONA.name} — Full-Stack Engineer`,
    description: SITE_DESCRIPTION,
    creator: "@blessedking_",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon-32.png",
  },
  verification: {
    // Add your Google Search Console verification code here when available
    // google: "your-verification-code",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content={LIGHT_THEME_COLOR} />
        {/* Preconnect to external origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: PERSONA.name,
              alternateName: PERSONA.alias,
              url: SITE_URL,
              jobTitle: PERSONA.title,
              email: PERSONA.email,
              description: SITE_DESCRIPTION,
              knowsAbout: [
                "Full-Stack Development",
                "Next.js",
                "React",
                "NestJS",
                "TypeScript",
                "Tailwind CSS",
                "PostgreSQL",
                "Web Performance",
                "Graphic Design",
              ],
              sameAs: [
                "https://github.com/kingsley-a1",
                "https://linkedin.com/in/kingsley-maduabuchi",
                "https://twitter.com/blessedking_",
              ],
            }),
          }}
        />
        {/* Inline theme script to prevent flash. Static string only — never interpolate user input here, it runs unsandboxed before hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_BOOTSTRAP_SCRIPT,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors">
        <ThemeProvider>
          <PublicShell>{children}</PublicShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
