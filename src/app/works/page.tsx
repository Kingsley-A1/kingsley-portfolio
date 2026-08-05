import type { Metadata } from "next";
import { Building2, Calendar, MapPin } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { listPublishedExperienceSafe } from "@/features/admin/experience-repository";
import { PERSONA, SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Works",
  description: `Career timeline of ${PERSONA.name} — companies, roles, and projects across ${PERSONA.yearsOfExperience} years in software engineering.`,
  alternates: { canonical: "/works" },
  openGraph: {
    title: `Work Experience — ${PERSONA.name}`,
    description: `Career journey across ${PERSONA.yearsOfExperience} years in software engineering and technology.`,
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630 }],
  },
};

export default async function WorksPage() {
  const experiences = await listPublishedExperienceSafe();

  return (
    <>
      <PageHero
        label="Experience"
        title="Where I have made an impact."
        description={`A timeline of roles, companies, and projects across ${PERSONA.yearsOfExperience} years in software engineering and technology.`}
        gradient="blue"
      />

      <section className="bg-white dark:bg-neutral-900 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          {experiences.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-16 text-center">
              <p className="text-body text-neutral-500 dark:text-neutral-400">
                Work experience timeline coming soon.
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 sm:left-1/2 sm:-translate-x-px" />

              <div className="space-y-12">
                {experiences.map((exp, i) => {
                  const isLeft = i % 2 === 0;

                  return (
                    <Reveal key={exp.id} delay={i * 0.08}>
                      <div
                        className={cn(
                          "relative flex flex-col gap-4 sm:flex-row sm:items-start",
                          isLeft ? "sm:flex-row" : "sm:flex-row-reverse",
                        )}
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-8 top-6 z-10 -translate-x-1/2 sm:left-1/2">
                          <div
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-full border-4 border-white dark:border-neutral-950 shadow-sm",
                              exp.isCurrent
                                ? "bg-success"
                                : "bg-brand-blue",
                            )}
                          />
                        </div>

                        {/* Date label */}
                        <div
                          className={cn(
                            "hidden pt-6 sm:block sm:w-1/2",
                            isLeft ? "pr-12 text-right" : "pl-12 text-left",
                          )}
                        >
                          <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 px-4 py-1.5 text-body-sm font-medium text-neutral-600 dark:text-neutral-400">
                            <Calendar className="h-3.5 w-3.5" />
                            {exp.startDate} — {exp.endDate ?? "Present"}
                          </span>
                        </div>

                        {/* Card */}
                        <div
                          className={cn(
                            "ml-16 sm:ml-0 sm:w-1/2",
                            isLeft ? "sm:pr-12" : "sm:pl-12",
                          )}
                        >
                          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm transition-all hover:shadow-lg">
                            {/* Mobile date */}
                            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-caption font-medium text-neutral-500 dark:text-neutral-400 sm:hidden">
                              <Calendar className="h-3 w-3" />
                              {exp.startDate} — {exp.endDate ?? "Present"}
                            </span>

                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                                {exp.companyLogoUrl ? (
                                  <img
                                    src={exp.companyLogoUrl}
                                    alt={exp.company}
                                    className="h-6 w-6 object-contain"
                                  />
                                ) : (
                                  <Building2 className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-h5 font-bold text-neutral-900 dark:text-neutral-100">
                                  {exp.role}
                                </h3>
                                <p className="text-body text-neutral-600 dark:text-neutral-400">
                                  {exp.company}
                                  {exp.isCurrent && (
                                    <span className="ml-2 inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-caption font-semibold text-success">
                                      Current
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>

                            <p className="mt-3 text-body-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                              {exp.description}
                            </p>

                            {exp.skillsUsed.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-1.5">
                                {exp.skillsUsed.map((skill) => (
                                  <span
                                    key={skill}
                                    className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-1 text-caption font-medium text-neutral-600 dark:text-neutral-400"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
