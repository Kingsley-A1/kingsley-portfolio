import Link from "next/link";
import { ArrowDown, ArrowRight, Download, ExternalLink, Building2, Braces, Terminal, Palette, GitBranch } from "lucide-react";
import { PERSONA, STATS, CORE_SKILLS } from "@/lib/constants";
import { listPublishedPortfolioProjectsSafe } from "@/features/admin/projects-repository";
import { listPublishedCollaborationsSafe } from "@/features/admin/collaborations-repository";
import { listPublishedExperienceSafe } from "@/features/admin/experience-repository";
import { Reveal } from "@/components/marketing/reveal";
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
      <section className="relative flex min-h-screen items-center overflow-hidden bg-animated-gradient pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-brand-blue/10 blur-3xl animate-pulse"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-brand-teal/10 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue-surface px-4 py-1.5 text-caption font-semibold uppercase tracking-widest text-brand-blue-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Open to opportunities
              </span>

              <h1 className="mt-6 text-display font-bold leading-display tracking-tight text-neutral-900">
                Full-stack engineer building{" "}
                <span className="text-gradient-blue">production-grade</span>{" "}
                digital products.
              </h1>

              <p className="mt-5 max-w-lg text-body-lg leading-body text-neutral-600">
                I design and engineer performant web applications, APIs, and
                business systems. {PERSONA.yearsOfExperience} years of hands-on
                experience across the modern JavaScript ecosystem — Next.js,
                React, NestJS &amp; Tailwind CSS.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 text-body font-semibold text-white shadow-lg transition-all hover:bg-neutral-800 hover:shadow-xl"
                >
                  See my work
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-body font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50"
                >
                  About me
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 text-body font-semibold text-neutral-500 transition-all hover:border-neutral-400 hover:bg-neutral-50"
                >
                  <Download className="h-4 w-4" />
                  CV
                </a>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { value: String(projects.length) + "+", label: "Projects Built" },
                  { value: String(PERSONA.yearsOfExperience), label: "Years Exp." },
                  { value: String(experiences.length) + "+", label: "Roles Held" },
                  { value: "100%", label: "Client Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-h4 font-bold text-neutral-900">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-caption uppercase tracking-widest text-neutral-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-blue/20 via-brand-teal/20 to-brand-amber/20 blur-sm" />
                <div className="relative glass rounded-3xl p-2 shadow-xl">
                  <div className="aspect-[3/4] w-72 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue-surface via-brand-teal-surface to-brand-amber-surface sm:w-80">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center p-8">
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-teal text-3xl font-bold text-white shadow-lg">
                          {PERSONA.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <h2 className="text-h4 font-bold text-neutral-900">
                          {PERSONA.name}
                        </h2>
                        <p className="mt-1 text-body-sm text-neutral-500">
                          {PERSONA.title}
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {["Developer", "Technician", "Designer", "Marketer"].map(
                            (role) => (
                              <span
                                key={role}
                                className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-caption font-medium text-neutral-600"
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
          <ArrowDown className="h-5 w-5 text-neutral-400" />
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-blue">
                Featured work
              </p>
              <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900">
                Selected <span className="text-gradient-blue">projects</span>
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.08}>
                  <div className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="aspect-video overflow-hidden bg-neutral-100">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-neutral-300">
                          <ExternalLink className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-body font-semibold text-neutral-900 truncate">
                        {project.name}
                      </h3>
                      <p className="mt-1 text-caption text-neutral-500">
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
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-body font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:shadow-md"
              >
                View all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Core Skills ──────────────────────────────────── */}
      <section className="bg-neutral-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-teal">
              What I do
            </p>
            <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900">
              Core capabilities
            </h2>
            <p className="mt-3 text-body leading-body text-neutral-500">
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
                <div className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div
                    className={cn(
                      "mb-5 flex h-12 w-12 items-center justify-center rounded-xl",
                      skill.color === "blue" && "bg-brand-blue-surface text-brand-blue",
                      skill.color === "teal" && "bg-brand-teal-surface text-brand-teal",
                      skill.color === "amber" && "bg-brand-amber-surface text-brand-amber",
                      skill.color === "coral" && "bg-brand-coral-surface text-brand-coral",
                    )}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-h5 font-bold text-neutral-900">
                    {skill.name}
                  </h3>
                  <p className="mt-2 text-body-sm leading-relaxed text-neutral-500">
                    {skill.description}
                  </p>
                </div>
              </Reveal>
            )})}
          </div>
        </div>
      </section>

      {/* ── Recent Collaborations ────────────────────────── */}
      {collaborations.length > 0 && (
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-overline font-bold uppercase tracking-[0.2em] text-brand-amber">
                Collaborations
              </p>
              <h2 className="mt-3 text-h2 font-bold tracking-tight text-neutral-900">
                Partnering to{" "}
                <span className="text-gradient-warm">build</span>
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collaborations.slice(0, 3).map((collab, i) => (
                <Reveal key={collab.id} delay={i * 0.08}>
                  <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
                        {collab.partnerLogoUrl ? (
                          <img src={collab.partnerLogoUrl} alt={collab.partnerName} className="h-6 w-6 object-contain" />
                        ) : (
                          <Building2 className="h-5 w-5 text-neutral-300" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-body font-semibold text-neutral-900">
                          {collab.projectName}
                        </h3>
                        <p className="text-caption text-neutral-500">
                          {collab.partnerName} · {collab.year}
                        </p>
                      </div>
                    </div>
                    <p className="text-body-sm text-neutral-600 line-clamp-2">
                      {collab.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10 text-center" delay={0.15}>
              <Link
                href="/collaborations"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-body font-semibold text-neutral-700 transition-all hover:border-neutral-400 hover:shadow-md"
              >
                View all collaborations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-neutral-900 py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-3xl"
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
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-body font-semibold text-neutral-900 transition-all hover:bg-neutral-100 hover:shadow-lg"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-6 py-3 text-body font-semibold text-white transition-all hover:border-neutral-500 hover:bg-neutral-800"
            >
              Browse projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
