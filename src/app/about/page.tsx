import type { Metadata } from "next";
import { Code2, Terminal, Palette, GitBranch, MapPin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { getAboutSafe } from "@/features/admin/about-repository";
import { PERSONA, TECH_STACK, CORE_SKILLS } from "@/lib/constants";
import { SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${PERSONA.name} — full-stack engineer with ${PERSONA.yearsOfExperience} years of experience in Next.js, React, NestJS & Tailwind CSS.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${PERSONA.name}`,
    description: `Full-stack engineer with ${PERSONA.yearsOfExperience} years of experience building elegant digital experiences.`,
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630 }],
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Braces: Code2,
  Terminal: Terminal,
  Palette: Palette,
  GitBranch: GitBranch,
};

export default async function AboutPage() {
  const about = await getAboutSafe();

  return (
    <>
      <PageHero
        label="About"
        title="Engineer. Creator. Problem solver."
        description="A blend of technical precision, creative thinking, and a relentless drive to build things that matter."
        gradient="full"
      />

      {/* ── Story Section ─────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Photo card */}
            <Reveal>
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-brand-blue/20 via-brand-teal/20 to-brand-amber/20 blur-md" />
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue-surface via-brand-teal-surface to-brand-amber-surface p-1">
                  <div className="aspect-[3/4] rounded-2xl bg-white flex items-center justify-center">
                    <div className="text-center p-10">
                      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-teal text-4xl font-bold text-white shadow-xl">
                        {PERSONA.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <h2 className="mt-6 text-h4 font-bold text-neutral-900">
                        {PERSONA.name}
                      </h2>
                      <p className="mt-1 text-body text-neutral-500">
                        {PERSONA.title}
                      </p>
                      <div className="mt-4 flex flex-col gap-2 text-body-sm text-neutral-500">
                        <span className="inline-flex items-center justify-center gap-1.5">
                          <MapPin className="h-4 w-4 text-brand-coral" />
                          {PERSONA.location}
                        </span>
                        <a
                          href={`mailto:${PERSONA.email}`}
                          className="inline-flex items-center justify-center gap-1.5 text-brand-blue hover:underline"
                        >
                          <Mail className="h-4 w-4" />
                          {PERSONA.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Story text */}
            <Reveal delay={0.1}>
              <div>
                <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-teal">
                  My Story
                </p>
                <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900">
                  From curiosity to{" "}
                  <span className="text-gradient-blue">craftsmanship</span>
                </h2>
                <div className="mt-6 space-y-4 text-body leading-body text-neutral-600">
                  <p>
                    {about?.extendedBio ||
                      `I'm ${PERSONA.name}, socially known as ${PERSONA.alias}. An Engineer, Technician, and Software Developer passionate about technology, professional marketing, public speaking, and making positive contributions toward changing the world.`}
                  </p>
                  <p>
                    I enjoy creating things, graphic design, and diving deep into
                    research. My technical side thrives in Next.js, NestJS, and
                    crafting premium digital experiences. Outside tech, I cherish
                    expression — through public speaking, marketing, and writing.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-body-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:shadow-lg"
                  >
                    View my work
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-body-sm font-semibold text-neutral-700 transition-all hover:border-neutral-400"
                  >
                    Get in touch
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Core Skills ──────────────────────────────────── */}
      <section className="bg-neutral-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-amber">
              Capabilities
            </p>
            <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900">
              What I bring to the table
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_SKILLS.map((skill, i) => {
              const Icon = iconMap[skill.icon] || Code2;
              return (
                <Reveal key={skill.name} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div
                      className={cn(
                        "mb-5 flex h-14 w-14 items-center justify-center rounded-2xl",
                        skill.color === "blue" &&
                          "bg-brand-blue-surface text-brand-blue",
                        skill.color === "teal" &&
                          "bg-brand-teal-surface text-brand-teal",
                        skill.color === "amber" &&
                          "bg-brand-amber-surface text-brand-amber",
                        skill.color === "coral" &&
                          "bg-brand-coral-surface text-brand-coral",
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-h5 font-bold text-neutral-900">
                      {skill.name}
                    </h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-neutral-500">
                      {skill.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ──────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-blue">
              Tech Stack
            </p>
            <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900">
              Technologies I work with
            </h2>
            <p className="mt-3 text-body text-neutral-500">
              {PERSONA.yearsOfExperience} years of hands-on experience across the modern web stack.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                { title: "Frontend", items: TECH_STACK.frontend, color: "blue" },
                { title: "Backend", items: TECH_STACK.backend, color: "teal" },
                { title: "Tools & Infra", items: TECH_STACK.tools, color: "amber" },
                { title: "Learning", items: TECH_STACK.learning, color: "coral" },
              ] as const
            ).map((group, i) => (
              <Reveal key={group.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <h3
                    className={cn(
                      "text-body-sm font-bold uppercase tracking-widest mb-4",
                      group.color === "blue" && "text-brand-blue",
                      group.color === "teal" && "text-brand-teal",
                      group.color === "amber" && "text-brand-amber",
                      group.color === "coral" && "text-brand-coral",
                    )}
                  >
                    {group.title}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((tech) => (
                      <li
                        key={tech}
                        className="flex items-center gap-2 text-body-sm text-neutral-700"
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            group.color === "blue" && "bg-brand-blue",
                            group.color === "teal" && "bg-brand-teal",
                            group.color === "amber" && "bg-brand-amber",
                            group.color === "coral" && "bg-brand-coral",
                          )}
                        />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interests ───────────────────────────────────── */}
      {about?.interests && about.interests.length > 0 && (
        <section className="bg-animated-gradient py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Reveal>
              <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-coral">
                Beyond Code
              </p>
              <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900">
                Interests &amp; Passions
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {about.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-neutral-300 bg-white/80 px-5 py-2.5 text-body font-medium text-neutral-700 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-neutral-900 py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-teal/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <h2 className="text-h2 font-bold text-white">
              Let&apos;s work{" "}
              <span className="text-gradient-warm">together</span>
            </h2>
            <p className="mt-4 text-body-lg leading-body text-neutral-400">
              I&apos;m currently open to freelance projects and full-time
              opportunities. Let&apos;s build something great.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-body font-semibold text-neutral-900 transition-all hover:bg-neutral-100 hover:shadow-lg"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
