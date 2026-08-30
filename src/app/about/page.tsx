import type { Metadata } from "next";
import Image from "next/image";
import { Code2, Terminal, Palette, Brain, MapPin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
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
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About — ${PERSONA.name}`,
    description: `Full-stack engineer with ${PERSONA.yearsOfExperience} years of experience building elegant digital experiences.`,
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Braces: Code2,
  Terminal: Terminal,
  Palette: Palette,
  Brain: Brain,
};

export default async function AboutPage() {
  const about = await getAboutSafe();

  return (
    <>
      {/* ── Editorial split hero — deliberately distinct from the centered
           PageHero recipe used on Projects/Graphics/Collaborations/Works ── */}
      <section className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 pt-20 sm:pt-24">
        <div className="mx-auto grid max-w-7xl gap-y-12 px-6 pb-16 sm:pb-20 lg:grid-cols-12 lg:gap-x-10">
          {/* Text column — leads with conviction, not a resume opener */}
          <div className="lg:col-span-7 lg:pt-6">
            <Reveal>
              <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-blue dark:text-brand-blue-bright">
                About
              </p>
              <h1 className="mt-4 text-h1 sm:text-display font-bold leading-[1.05] tracking-tight text-neutral-900 dark:text-neutral-50">
                I build what other people
                <br />
                call impossible.
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 space-y-5 max-w-xl text-body sm:text-body-lg leading-body text-neutral-600 dark:text-neutral-400">
                <p>
                  {about?.extendedBio ||
                    `I'm ${PERSONA.name}, socially known as ${PERSONA.alias}. I don't think of engineering as a job — it's the way I test my own belief that almost anything can be built if you're precise enough about how you think.`}
                </p>
                <p>
                  I&apos;m a full-stack engineer first, but I read code like an
                  advocate for the craft: convinced that good software is a
                  discipline, not a talent, and that the people who go
                  furthest are the ones who stay curious long after the
                  tutorial ends. {PERSONA.focusStatement}
                </p>
                <p>
                  Outside the editor, I chase the same conviction through
                  public speaking, marketing, and graphic design — different
                  languages for the same instinct: find the thing that
                  seems too ambitious, then go build it anyway.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 px-5 py-2.5 text-body-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:shadow-lg"
                >
                  View my work
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-5 py-2.5 text-body-sm font-semibold text-neutral-700 dark:text-neutral-300 transition-all hover:border-neutral-400 dark:hover:border-neutral-600"
                >
                  Get in touch
                </Link>
                <span className="inline-flex items-center gap-1.5 text-body-sm text-neutral-500 dark:text-neutral-400">
                  <MapPin className="h-4 w-4 text-brand-blue dark:text-brand-blue-bright" />
                  {PERSONA.location}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Photo column — structural, sharper-cornered frame (radius hierarchy) */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative mx-auto max-w-sm lg:ml-auto lg:mr-0">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                  <Image
                    src={about?.photoUrl || "/photos/thinking.webp"}
                    alt={PERSONA.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 400px, 80vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 hidden sm:flex flex-col gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 shadow-lg">
                  <p className="text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {PERSONA.name}
                  </p>
                  <a
                    href={`mailto:${PERSONA.email}`}
                    className="inline-flex items-center gap-1.5 text-caption font-medium text-neutral-500 dark:text-neutral-400 hover:text-brand-blue dark:hover:text-brand-blue-bright"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {PERSONA.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Core Skills ──────────────────────────────────── */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-blue dark:text-brand-blue-bright">
              Capabilities
            </p>
            <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              What I bring to the table
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_SKILLS.map((skill, i) => {
              const Icon = iconMap[skill.icon] || Code2;
              return (
                <Reveal key={skill.name} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div
                      className={cn(
                        "mb-5 flex h-14 w-14 items-center justify-center rounded-2xl",
                        skill.color === "blue" &&
                        "bg-brand-blue-surface dark:bg-brand-blue/15 text-brand-blue dark:text-brand-blue-bright",
                        skill.color === "teal" &&
                        "bg-brand-teal-surface dark:bg-brand-teal/15 text-brand-teal dark:text-brand-teal-bright",
                        skill.color === "amber" &&
                        "bg-brand-amber-surface dark:bg-brand-amber/15 text-brand-amber dark:text-brand-amber-bright",
                        skill.color === "coral" &&
                        "bg-brand-coral-surface dark:bg-brand-coral/15 text-brand-coral dark:text-brand-coral-bright",
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-h5 font-bold text-neutral-900 dark:text-neutral-100">
                      {skill.name}
                    </h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
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
      <section className="bg-white dark:bg-neutral-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-blue dark:text-brand-blue-bright">
              Tech Stack
            </p>
            <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Technologies I work with
            </h2>
            <p className="mt-3 text-body text-neutral-500 dark:text-neutral-400">
              {PERSONA.yearsOfExperience} years of hands-on experience across the modern web stack — and the ground I&apos;m covering next.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                { title: "Frontend", items: TECH_STACK.frontend, color: "blue" },
                { title: "Backend", items: TECH_STACK.backend, color: "teal" },
                { title: "Tools & Infra", items: TECH_STACK.tools, color: "amber" },
                { title: "Learning: ML & AI", items: TECH_STACK.learning, color: "coral" },
              ] as const
            ).map((group, i) => (
              <Reveal key={group.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 p-6">
                  <h3
                    className={cn(
                      "text-body-sm font-bold uppercase tracking-widest mb-4",
                      group.color === "blue" && "text-brand-blue dark:text-brand-blue-bright",
                      group.color === "teal" && "text-brand-teal dark:text-brand-teal-bright",
                      group.color === "amber" && "text-brand-amber dark:text-brand-amber-bright",
                      group.color === "coral" && "text-brand-coral dark:text-brand-coral-bright",
                    )}
                  >
                    {group.title}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((tech) => (
                      <li
                        key={tech}
                        className="flex items-center gap-2 text-body-sm text-neutral-700 dark:text-neutral-300"
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
              <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-blue dark:text-brand-blue-bright">
                Beyond Code
              </p>
              <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Interests &amp; Passions
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {about.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 px-5 py-2.5 text-body font-medium text-neutral-700 dark:text-neutral-200 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
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
      <section className="relative overflow-hidden bg-neutral-900 dark:bg-neutral-950 py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-blue/20 dark:bg-brand-blue/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <h2 className="text-h2 font-bold text-white">
              Let&apos;s work{" "}
              <span className="text-brand-blue-bright">together</span>
            </h2>
            <p className="mt-4 text-body-lg leading-body text-neutral-400">
              I&apos;m currently open to freelance projects and full-time
              opportunities. Let&apos;s build something great.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-white dark:bg-neutral-100 px-6 py-3 text-body font-semibold text-neutral-900 dark:text-neutral-900 transition-all hover:bg-neutral-100 dark:hover:bg-white hover:shadow-lg"
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
