// ── Personal Brand Identity ────────────────────────────────────────────────

export const PERSONA = {
  name: "Kingsley Maduabuchi",
  alias: "Blessed King",
  title: "Full-Stack Software Engineer",
  tagline: "I build elegant, high-performance digital experiences.",
  headline: "Engineer focused on value creation and business impact.",
  location: "Calabar, Nigeria",
  email: "blessedkingkingsley2002@gmail.com",
  phone: "+234 808 807 1657",
  yearsOfExperience: 4,
} as const;

export const SITE_NAME = PERSONA.name;
export const SITE_DOMAIN = "kingsley.dev";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_DOMAIN}`;
export const SITE_DESCRIPTION =
  "Kingsley Maduabuchi — Full-stack software engineer specializing in Next.js, React, NestJS, and Tailwind CSS. Building marketplaces, tools, and performant web experiences.";

// ── Tech Stack ─────────────────────────────────────────────────────────────

export const TECH_STACK = {
  frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
  backend: ["NestJS", "Node.js", "PostgreSQL", "CockroachDB", "Prisma"],
  tools: ["Git", "Docker", "Vercel", "Cloudflare", "Figma", "AWS S3/R2"],
  learning: ["Rust", "Go", "Kubernetes"],
} as const;

export const ALL_TECH = [
  ...TECH_STACK.frontend,
  ...TECH_STACK.backend,
  ...TECH_STACK.tools,
];

// ── Navigation ─────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Graphics", href: "/graphics" },
  { label: "Collaborations", href: "/collaborations" },
  { label: "Works", href: "/works" },
] as const;

// ── Social Links ───────────────────────────────────────────────────────────

export const SOCIAL_LINKS = {
  github: "https://github.com/kingsley-a1",
  linkedin: "https://linkedin.com/in/kingsley-maduabuchi",
  twitter: "https://twitter.com/blessedking_",
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  tiktok: "https://tiktok.com/",
  email: `mailto:${PERSONA.email}`,
} as const;

// ── Stats ──────────────────────────────────────────────────────────────────

export const STATS = [
  { value: "18+", label: "Projects Delivered" },
  { value: "4", label: "Years Experience" },
  { value: "7+", label: "Technologies Mastered" },
  { value: "100%", label: "Client Satisfaction" },
] as const;

// ── Core Skills ────────────────────────────────────────────────────────────

export const CORE_SKILLS = [
  {
    name: "Frontend Engineering",
    description:
      "Pixel-perfect, accessible, and performant interfaces with React, Next.js, and Tailwind CSS.",
    icon: "Braces",
    color: "blue",
  },
  {
    name: "Backend Systems",
    description:
      "Scalable APIs, database design, and server architecture with NestJS and PostgreSQL.",
    icon: "Terminal",
    color: "teal",
  },
  {
    name: "Graphic Design",
    description:
      "Brand identity, marketing collateral, and visual storytelling for businesses and campaigns.",
    icon: "Palette",
    color: "amber",
  },
  {
    name: "Technical Leadership",
    description:
      "End-to-end project ownership, client communication, and delivery accountability.",
    icon: "GitBranch",
    color: "coral",
  },
] as const;
