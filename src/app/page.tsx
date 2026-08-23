import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, Download, ExternalLink, Building2, Braces, Terminal, Palette, Brain } from "lucide-react";
import { PERSONA, CORE_SKILLS } from "@/lib/constants";
import { listPublishedPortfolioProjectsSafe } from "@/features/admin/projects-repository";
import { listPublishedCollaborationsSafe } from "@/features/admin/collaborations-repository";
import { listPublishedExperienceSafe } from "@/features/admin/experience-repository";
import { getAboutSafe } from "@/features/admin/about-repository";
import { Reveal } from "@/components/marketing/reveal";
import { TerminalUI } from "@/components/marketing/terminal-ui";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const [projects, collaborations, experiences, about] = await Promise.all([
    listPublishedPortfolioProjectsSafe(),
    listPublishedCollaborationsSafe(),
    listPublishedExperienceSafe(),
    getAboutSafe(),
  ]);

  const featured = projects.filter((p) => p.featured && !p.comingSoon).slice(0, 4);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-hero-chrome hero-grid pt-16 sm:pt-20">
        {/* Single deliberate ambient effect — one signature-accent blob, no rainbow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-[10%] h-[500px] w-[500px] rounded-full bg-brand-blue/20 blur-[100px] animate-pulse"
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Left: Text + CTA — 3 cols */}
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 dark:border-brand-blue/40 bg-brand-blue-surface/95 dark:bg-brand-blue/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-widest text-brand-blue-deep dark:text-brand-blue-bright backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Open to opportunities
              </span>

              <h1 className="mt-5 sm:mt-6 flex flex-col text-[2.5rem] sm:text-[3.25rem] lg:text-display font-bold leading-[1.08] tracking-tight text-neutral-900 dark:text-neutral-50">
                <span>Engineer.</span>
                <span>Creator.</span>
                <span>Problem solver.</span>
              </h1>

              <p className="mt-5 sm:mt-6 max-w-lg text-body sm:text-body-lg leading-body text-neutral-600 dark:text-neutral-400">
                A blend of technical precision, creative thinking, and a
                relentless drive to build things that matter.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 px-6 py-3 text-body font-semibold text-white shadow-lg transition-all hover:bg-neutral-800 hover:shadow-xl"
                >
                  See my work
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3 text-body font-semibold text-neutral-700 dark:text-neutral-300 transition-all hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  About me
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 py-3 text-body font-semibold text-neutral-500 dark:text-neutral-400 transition-all hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <Download className="h-4 w-4" />
                  CV
                </a>
              </div>

              <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { value: String(projects.length) + "+", label: "Projects Built" },
                  { value: String(PERSONA.yearsOfExperience), label: "Years Exp." },
                  { value: String(experiences.length) + "+", label: "Roles Held" },
                  { value: "100%", label: "Client Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-h4 font-bold text-neutral-900 dark:text-neutral-100">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-caption uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Photo — first-class, asymmetric — 2 cols */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[360px]">
                <div className="absolute -inset-4 rounded-3xl bg-brand-blue/15 dark:bg-brand-blue/10 blur-2xl" />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/60 dark:border-neutral-700/60 shadow-2xl">
                  <Image
                    src={about?.photoUrl || "/photos/hero-main.webp"}
                    alt={PERSONA.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 60vw, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent p-5 pt-14">
                    <p className="text-body-sm font-semibold text-white">
                      {PERSONA.name}
                    </p>
                    <p className="text-caption text-neutral-300">
                      {PERSONA.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-5 w-5 text-neutral-400 dark:text-neutral-600" />
        </div>
      </section>

      {/* ── How I Build ──────────────────────────────────── */}
      <section className="bg-neutral-950 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-blue-bright">
                How I build
              </p>
              <h2 className="mt-3 text-h2 font-bold tracking-tight text-white">
                Discipline, not luck.
              </h2>
              <p className="mt-4 text-body leading-body text-neutral-400">
                Every project starts with the same standard: clarity on
                requirements, security by default, and ownership from first
                commit to production. No shortcuts that come back later.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="flex justify-center lg:justify-end">
              <TerminalUI />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-white dark:bg-neutral-900 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-blue dark:text-brand-blue-bright">
                Featured work
              </p>
              <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Selected <span className="text-brand-blue dark:text-brand-blue-bright">projects</span>
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.08}>
                  <div className="group overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-neutral-300 dark:text-neutral-600">
                          <ExternalLink className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-body font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                        {project.name}
                      </h3>
                      <p className="mt-1 text-caption text-neutral-500 dark:text-neutral-400">
                        {project.category} · {project.year}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10 text-center" delay={0.2}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3 text-body font-semibold text-neutral-700 dark:text-neutral-300 transition-all hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md"
              >
                View all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Core Skills ──────────────────────────────────── */}
      <section className="bg-neutral-50 dark:bg-neutral-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-teal dark:text-brand-teal-bright">
              What I do
            </p>
            <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Core capabilities
            </h2>
            <p className="mt-3 text-body leading-body text-neutral-500 dark:text-neutral-400">
              A blend of engineering discipline and creative problem-solving
              across the full stack.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_SKILLS.map((skill, i) => {
              const IconComponent =
                skill.icon === "Braces" ? Braces :
                  skill.icon === "Terminal" ? Terminal :
                    skill.icon === "Palette" ? Palette :
                      Brain;
              return (
                <Reveal key={skill.name} delay={i * 0.06}>
                  <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div
                      className={cn(
                        "mb-5 flex h-12 w-12 items-center justify-center rounded-xl",
                        skill.color === "blue" && "bg-brand-blue-surface dark:bg-brand-blue/15 text-brand-blue dark:text-brand-blue-bright",
                        skill.color === "teal" && "bg-brand-teal-surface dark:bg-brand-teal/15 text-brand-teal dark:text-brand-teal-bright",
                        skill.color === "amber" && "bg-brand-amber-surface dark:bg-brand-amber/15 text-brand-amber dark:text-brand-amber-bright",
                        skill.color === "coral" && "bg-brand-coral-surface dark:bg-brand-coral/15 text-brand-coral dark:text-brand-coral-bright",
                      )}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-h5 font-bold text-neutral-900 dark:text-neutral-100">
                      {skill.name}
                    </h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {skill.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Recent Collaborations ────────────────────────── */}
      {collaborations.length > 0 && (
        <section className="bg-white dark:bg-neutral-900 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-amber dark:text-brand-amber-bright">
                Collaborations
              </p>
              <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Partnering to{" "}
                <span className="text-brand-blue dark:text-brand-blue-bright">build</span>
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collaborations.slice(0, 3).map((collab, i) => (
                <Reveal key={collab.id} delay={i * 0.08}>
                  <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-700">
                        {collab.partnerLogoUrl ? (
                          <Image src={collab.partnerLogoUrl} alt={collab.partnerName} fill sizes="40px" className="object-contain p-2" />
                        ) : (
                          <Building2 className="h-5 w-5 text-neutral-300 dark:text-neutral-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-body font-semibold text-neutral-900 dark:text-neutral-100">
                          {collab.projectName}
                        </h3>
                        <p className="text-caption text-neutral-500 dark:text-neutral-400">
                          {collab.partnerName} · {collab.year}
                        </p>
                      </div>
                    </div>
                    <p className="text-body-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {collab.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10 text-center" delay={0.15}>
              <Link
                href="/collaborations"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3 text-body font-semibold text-neutral-700 dark:text-neutral-300 transition-all hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md"
              >
                View all collaborations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-neutral-900 dark:bg-neutral-950 py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-blue/20 dark:bg-brand-blue/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-h2 font-bold text-white">
            Let&apos;s build something{" "}
            <span className="text-brand-blue-bright">great</span> together.
          </h2>
          <p className="mt-4 text-body-lg leading-body text-neutral-400">
            I&apos;m currently open to freelance projects and full-time
            opportunities. Let&apos;s talk about your next project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white dark:bg-neutral-100 px-6 py-3 text-body font-semibold text-neutral-900 dark:text-neutral-900 transition-all hover:bg-neutral-100 dark:hover:bg-white hover:shadow-lg"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 dark:border-neutral-600 px-6 py-3 text-body font-semibold text-white dark:text-neutral-200 transition-all hover:border-neutral-500 dark:hover:border-neutral-400 hover:bg-neutral-800 dark:hover:bg-neutral-800"
            >
              Browse projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
