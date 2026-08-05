import Link from "next/link";
import { ArrowDown, ArrowRight, Download, ExternalLink, Building2, Braces, Terminal, Palette, GitBranch } from "lucide-react";
import { PERSONA, STATS, CORE_SKILLS } from "@/lib/constants";
import { listPublishedPortfolioProjectsSafe } from "@/features/admin/projects-repository";
import { listPublishedCollaborationsSafe } from "@/features/admin/collaborations-repository";
import { listPublishedExperienceSafe } from "@/features/admin/experience-repository";
import { Reveal } from "@/components/marketing/reveal";
import { TerminalUI } from "@/components/marketing/terminal-ui";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const [projects, collaborations, experiences] = await Promise.all([
    listPublishedPortfolioProjectsSafe(),
    listPublishedCollaborationsSafe(),
    listPublishedExperienceSafe(),
  ]);

  const featured = projects.filter((p) => p.featured && !p.comingSoon).slice(0, 4);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-hero-chrome hero-grid pt-16 sm:pt-20">
        {/* Chrome color blobs — vibrant but not noisy */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-[10%] h-[500px] w-[500px] rounded-full bg-brand-blue/20 blur-[100px] animate-pulse"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[30%] -left-20 h-[400px] w-[400px] rounded-full bg-brand-teal/15 blur-[100px]"
          style={{ animationDelay: "2s" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 left-[30%] h-[350px] w-[350px] rounded-full bg-brand-amber/15 blur-[100px]"
          style={{ animationDelay: "1s" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[10%] right-[30%] h-[250px] w-[250px] rounded-full bg-brand-coral/10 blur-[80px]"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:py-32">
          <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Left: Text + CTA — 3 cols */}
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 dark:border-brand-blue/40 bg-brand-blue-surface/95 dark:bg-brand-blue/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-widest text-brand-blue-deep dark:text-brand-blue-bright backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Open to opportunities
              </span>

              <h1 className="mt-5 sm:mt-6 text-[2.25rem] sm:text-[3rem] lg:text-display font-bold leading-[1.15] sm:leading-display tracking-tight text-neutral-900 dark:text-neutral-50">
                Full-stack engineer building{" "}
                <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-amber bg-clip-text text-transparent">production-grade</span>{" "}
                digital products.
              </h1>

              <p className="mt-4 sm:mt-5 max-w-lg text-body sm:text-body-lg leading-body text-neutral-600 dark:text-neutral-400">
                I design and engineer performant web applications, APIs, and
                business systems. {PERSONA.yearsOfExperience} years of hands-on
                experience across the modern JavaScript ecosystem — Next.js,
                React, NestJS &amp; Tailwind CSS.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 px-6 py-3 text-body font-semibold text-white shadow-lg transition-all hover:bg-neutral-800 hover:shadow-xl"
                >
                  See my work
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3 text-body font-semibold text-neutral-700 dark:text-neutral-300 transition-all hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  About me
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 py-3 text-body font-semibold text-neutral-500 dark:text-neutral-400 transition-all hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800"
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

            {/* Right: Terminal + Personality Card — 2 cols */}
            <div className="lg:col-span-2 flex flex-col items-center lg:items-end gap-6">
              {/* Terminal UI — hidden on mobile, visible on sm+ */}
              <TerminalUI className="hidden sm:block" />

              {/* Personality card */}
              <div className="relative w-full max-w-[340px]">
                {/* Chrome glow ring */}
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-blue/30 via-brand-teal/25 to-brand-amber/20 dark:from-brand-blue/15 dark:via-brand-teal/12 dark:to-brand-amber/10 blur-xl animate-pulse" />
                <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-brand-blue/15 via-brand-coral/10 to-brand-teal/15 dark:from-brand-blue/8 dark:via-brand-coral/5 dark:to-brand-teal/8 blur-md" />
                <div className="relative rounded-[1.25rem] border border-white/60 dark:border-neutral-700/60 bg-white/90 dark:bg-neutral-900/90 p-3 shadow-2xl backdrop-blur-sm">
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-br from-brand-blue-surface via-brand-teal-surface to-brand-amber-surface dark:from-brand-blue/10 dark:via-brand-teal/10 dark:to-brand-amber/10">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center p-8">
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue via-brand-teal to-brand-amber text-3xl font-bold text-white shadow-lg ring-4 ring-white dark:ring-neutral-800">
                          {PERSONA.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <h2 className="text-h4 font-bold text-neutral-900 dark:text-neutral-100">
                          {PERSONA.name}
                        </h2>
                        <p className="mt-1 text-body-sm text-neutral-500 dark:text-neutral-400">
                          {PERSONA.title}
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {["Developer", "Technician", "Designer", "Marketer"].map(
                            (role) => (
                              <span
                                key={role}
                                className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-1 text-caption font-medium text-neutral-600 dark:text-neutral-400 shadow-sm"
                              >
                                {role}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
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

      {/* ── Featured Projects ─────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-white dark:bg-neutral-900 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-blue dark:text-brand-blue-bright">
                Featured work
              </p>
              <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Selected <span className="text-gradient-blue">projects</span>
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.08}>
                  <div className="group overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
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
                      GitBranch;
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
                <span className="text-gradient-warm">build</span>
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collaborations.slice(0, 3).map((collab, i) => (
                <Reveal key={collab.id} delay={i * 0.08}>
                  <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-700">
                        {collab.partnerLogoUrl ? (
                          <img src={collab.partnerLogoUrl} alt={collab.partnerName} className="h-6 w-6 object-contain" />
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
            <span className="text-gradient-warm">great</span> together.
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
