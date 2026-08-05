import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { listPublishedCollaborationsSafe } from "@/features/admin/collaborations-repository";
import { PERSONA, SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Collaborations",
  description: `Partnerships and joint projects ${PERSONA.name} has worked on — collaborating with brands, businesses, and creators.`,
  alternates: { canonical: "/collaborations" },
  openGraph: {
    title: `Collaborations — ${PERSONA.name}`,
    description: "Partnering with brands, businesses, and creators to build impactful digital experiences.",
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630 }],
  },
};

const borderColors = [
  "border-l-brand-blue",
  "border-l-brand-teal",
  "border-l-brand-amber",
  "border-l-brand-coral",
];

export default async function CollaborationsPage() {
  const collaborations = await listPublishedCollaborationsSafe();

  return (
    <>
      <PageHero
        label="Collaborations"
        title="Great things are built together."
        description="Partnerships and joint projects with brands, businesses, and creators — each one a story of shared vision and execution."
        gradient="full"
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          {collaborations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 p-16 text-center">
              <p className="text-body text-neutral-500">
                Collaboration stories coming soon.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {collaborations.map((collab, i) => (
                <Reveal key={collab.id} delay={i * 0.08}>
                  <div
                    className={cn(
                      "group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl border-l-4",
                      borderColors[i % borderColors.length],
                    )}
                  >
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                      {/* Partner logo */}
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-neutral-100">
                        {collab.partnerLogoUrl ? (
                          <img
                            src={collab.partnerLogoUrl}
                            alt={collab.partnerName}
                            className="h-10 w-10 object-contain"
                          />
                        ) : (
                          <span className="text-h4 font-bold text-neutral-300">
                            {collab.partnerName.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-h4 font-bold text-neutral-900 group-hover:text-brand-blue transition-colors">
                            {collab.projectName}
                          </h3>
                          <span className="rounded-full bg-brand-blue-surface px-3 py-1 text-caption font-semibold text-brand-blue-deep">
                            {collab.year}
                          </span>
                        </div>

                        <p className="mt-1 text-body text-neutral-500">
                          with{" "}
                          <span className="font-semibold text-neutral-700">
                            {collab.partnerName}
                          </span>
                          {" · "}
                          <span className="text-brand-teal font-medium">
                            {collab.role}
                          </span>
                        </p>

                        <p className="mt-3 text-body leading-body text-neutral-600">
                          {collab.description}
                        </p>

                        {collab.link && (
                          <a
                            href={collab.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-body-sm font-medium text-neutral-700 transition-all hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue-surface"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Project
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
