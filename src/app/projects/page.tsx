import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { ProjectsShowcase } from "@/components/marketing/projects-showcase";
import { listPublishedPortfolioProjectsSafe } from "@/features/admin/projects-repository";
import { PERSONA, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore ${PERSONA.name}'s portfolio — web applications, mobile apps, and digital products built with precision and purpose.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects — ${PERSONA.name}`,
    description: "From government portals to fashion platforms — explore the portfolio of engineering excellence.",
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630 }],
  },
};

export default async function ProjectsPage() {
  const projects = await listPublishedPortfolioProjectsSafe();

  const liveCount = projects.filter((p) => !p.comingSoon).length;
  const comingSoonCount = projects.filter((p) => p.comingSoon).length;

  return (
    <>
      <PageHero
        label="Projects"
        title="Products shipped with purpose."
        description="Explore production systems, customer experiences, and digital products engineered to solve real business problems."
        gradient="blue"
      />

      {/* ── Stats Bar ───────────────────────────────────── */}
      <section className="border-b border-neutral-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: String(projects.length) + "+", label: "Projects Built" },
              { value: String(liveCount), label: "Live & Deployed" },
              { value: String(comingSoonCount), label: "In Development" },
              { value: String(new Set(projects.map((p) => p.type)).size), label: "Platform Types" },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-brand-blue/30 pl-4">
                <div className="text-h4 font-bold text-neutral-900">{stat.value}</div>
                <div className="mt-1 text-caption uppercase tracking-widest text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Grid ────────────────────────────────── */}
      <section className="bg-neutral-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12">
            <h2 className="text-h2 font-bold text-neutral-900">
              The <span className="text-gradient-blue">portfolio</span>
            </h2>
            <p className="mt-2 text-body text-neutral-500 max-w-xl">
              Filter by platform type. Projects marked &quot;Coming Soon&quot; are
              actively being developed.
            </p>
          </Reveal>

          <ProjectsShowcase projects={projects} />
        </div>
      </section>
    </>
  );
}
