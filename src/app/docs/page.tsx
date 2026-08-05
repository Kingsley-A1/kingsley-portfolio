import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { PERSONA, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Documentation",
  description: `Versioned release notes, changelog, and technical documentation for ${PERSONA.name}'s portfolio.`,
  alternates: { canonical: "/docs" },
  openGraph: {
    title: `Docs — ${PERSONA.name}`,
    description: "Release notes, technical specifications, and version history.",
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630 }],
  },
};

interface DocVersion {
  version: string;
  date: string;
  title: string;
  sections: {
    heading: string;
    items: string[];
  }[];
}

const VERSIONS: DocVersion[] = [
  {
    version: "v1.2.0",
    date: "2026-08-05",
    title: "Chrome Hero & Social Integration",
    sections: [
      {
        heading: "Design System",
        items: [
          "Introduced chrome hero section with multi-color radial blobs (blue, teal, amber, coral)",
          "Added subtle 64px dot-grid pattern overlay to hero background",
          "Upgraded portrait card with double glow ring and white border",
          "Applied 10px (0.625rem) card radius globally via CSS tokens",
          "Added dark mode support across all page sections",
        ],
      },
      {
        heading: "Social & Branding",
        items: [
          "Added editable social links to admin About editor (GitHub, LinkedIn, Twitter/X, Facebook, Instagram, TikTok)",
          "Implemented proper SVG brand icons for all social platforms in footer",
          "Changed site branding from alias to full name (Kingsley Maduabuchi)",
          "Migrated social_links JSONB column to personal_about table",
        ],
      },
      {
        heading: "Developer Experience",
        items: [
          "Replaced generic icons with developer-specific lucide icons (Braces, Terminal, GitBranch)",
          "Added global page loading bar with gradient animation on route changes",
          "Replaced glass/transparent header with solid white background",
          "Admin sidebar now solid with dark opaque mobile overlay",
        ],
      },
    ],
  },
  {
    version: "v1.1.0",
    date: "2026-08-04",
    title: "Core Portfolio Release",
    sections: [
      {
        heading: "Architecture",
        items: [
          "Standalone Next.js 16 application sharing CockroachDB and Cloudflare R2 infrastructure with bespoke-technologies-FE",
          "Independent Vercel deployment and GitHub repository",
          "Reads portfolio_projects table from shared database; manages personal content in own tables",
        ],
      },
      {
        heading: "Public Pages",
        items: [
          "Home — animated gradient hero, featured projects, core skills, recent collaborations",
          "About — personal story, tech stack grid, interests cloud, all database-driven",
          "Projects — filterable grid (web/mobile/desktop) with hover overlays",
          "Graphics — CSS columns masonry gallery with fullscreen lightbox",
          "Collaborations — color-coded cards with partner logos and external links",
          "Works — alternating vertical timeline with company logos and skills tags",
        ],
      },
      {
        heading: "Admin System",
        items: [
          "Password-based admin authentication with session cookies",
          "Dashboard with quick-access cards to all sections",
          "About editor — bio, headline, interests",
          "Projects viewer — read-only from shared portfolio_projects",
          "Graphics CRUD — title, category, description, image URL, client",
          "Collaborations CRUD — partner, project, role, link",
          "Experience CRUD — company, role, dates, skills tags",
        ],
      },
    ],
  },
  {
    version: "v1.0.0",
    date: "2026-08-03",
    title: "Initial Scaffold",
    sections: [
      {
        heading: "Foundation",
        items: [
          "Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript",
          "Creative design token system: Blue × Teal × Amber × Coral spectrum",
          "Custom font stack: Inter, system-ui, JetBrains Mono",
          "Glass-morphism utilities, gradient text, animated backgrounds",
          "motion/react for scroll-triggered reveal animations",
        ],
      },
      {
        heading: "Infrastructure",
        items: [
          "pg Pool connection to shared CockroachDB cluster",
          "Cloudflare R2 / S3-compatible storage adapter",
          "Ordered SQL migration runner",
          "Database tables: personal_about, graphics_works, collaborations, work_experience",
        ],
      },
    ],
  },
];

const TECH_SPECS = [
  { label: "Framework", value: "Next.js 16 (App Router)" },
  { label: "Runtime", value: "Node.js 24 + React 19" },
  { label: "Styling", value: "Tailwind CSS 4 + Custom Design Tokens" },
  { label: "Database", value: "CockroachDB (PostgreSQL-compatible)" },
  { label: "Storage", value: "Cloudflare R2 (S3 API)" },
  { label: "Animation", value: "Motion (formerly Framer Motion)" },
  { label: "Icons", value: "Lucide React + Custom SVGs" },
  { label: "Deployment", value: "Vercel" },
  { label: "Package Manager", value: "pnpm" },
  { label: "Language", value: "TypeScript 5 (strict mode)" },
];

export default function DocsPage() {
  return (
    <>
      <PageHero
        label="Documentation"
        title="Versioned release notes & technical reference."
        description="Track changes, understand the architecture, and reference the tech stack that powers this portfolio."
        gradient="blue"
      />

      {/* ── Tech Specs ──────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-24 dark:bg-neutral-900">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-h2 font-bold text-neutral-900 dark:text-white mb-10">
              Technical <span className="text-gradient-blue">specifications</span>
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_SPECS.map((spec, i) => (
              <Reveal key={spec.label} delay={i * 0.04}>
                <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-800">
                  <dt className="text-caption font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 text-body font-medium text-neutral-900 dark:text-neutral-100">
                    {spec.value}
                  </dd>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Version History ─────────────────────────────── */}
      <section className="bg-neutral-50 py-16 sm:py-24 dark:bg-neutral-950">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal className="mb-12">
            <h2 className="text-h2 font-bold text-neutral-900 dark:text-white">
              Version <span className="text-gradient-blue">history</span>
            </h2>
            <p className="mt-2 text-body text-neutral-500 dark:text-neutral-400">
              Semantic versioning. All dates in YYYY-MM-DD format.
            </p>
          </Reveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-700" />

            <div className="space-y-10">
              {VERSIONS.map((version, vi) => (
                <Reveal key={version.version} delay={vi * 0.08}>
                  <div className="relative pl-14">
                    {/* Version dot */}
                    <div className="absolute left-[5px] top-2 z-10 -translate-x-1/2">
                      <div
                        className={`flex h-3 w-3 items-center justify-center rounded-full border-2 border-white dark:border-neutral-950 ${
                          vi === 0
                            ? "bg-brand-blue"
                            : "bg-neutral-300 dark:bg-neutral-600"
                        }`}
                      />
                    </div>

                    <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="rounded-full bg-brand-blue-surface px-3 py-1 text-caption font-bold text-brand-blue-deep dark:bg-brand-blue/20 dark:text-brand-blue-bright">
                          {version.version}
                        </span>
                        <span className="text-caption text-neutral-500 dark:text-neutral-400 font-mono">
                          {version.date}
                        </span>
                        <h3 className="text-body font-semibold text-neutral-900 dark:text-white">
                          {version.title}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {version.sections.map((section) => (
                          <div key={section.heading}>
                            <h4 className="text-body-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                              {section.heading}
                            </h4>
                            <ul className="space-y-1.5">
                              {section.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-body-sm text-neutral-500 dark:text-neutral-400"
                                >
                                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brand-blue" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
