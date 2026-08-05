"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Clock, Monitor, Smartphone, MonitorSmartphone, Globe } from "lucide-react";
import type { PortfolioProjectItem } from "@/features/admin/projects-repository";
import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  web: Globe,
  mobile: Smartphone,
  ios: Smartphone,
  desktop: Monitor,
  "web+mobile": MonitorSmartphone,
};

const FILTERS = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "desktop", label: "Desktop" },
  { value: "web+mobile", label: "Web + Mobile" },
] as const;

export function ProjectsShowcase({
  projects,
}: {
  projects: PortfolioProjectItem[];
}) {
  const [filter, setFilter] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "mobile") return projects.filter((p) => p.type === "mobile" || p.type === "ios");
    return projects.filter((p) => p.type === filter);
  }, [projects, filter]);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full border px-5 py-2 text-body-sm font-medium transition-all",
              filter === f.value
                ? "border-neutral-900 bg-neutral-900 text-white shadow-md"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => {
          const TypeIcon = typeIcons[project.type] || Globe;

          return (
            <Reveal key={project.id} delay={i * 0.05}>
              <div
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <TypeIcon className="h-10 w-10 text-neutral-300 dark:text-neutral-600" />
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-300",
                      hoveredId === project.id ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-body-sm font-semibold text-neutral-900 shadow-lg transition-transform hover:scale-105"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Live
                      </a>
                    )}
                  </div>

                  {/* Coming soon badge */}
                  {project.comingSoon && (
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-brand-amber/90 px-3 py-1 text-caption font-semibold text-white backdrop-blur-sm">
                      <Clock className="h-3 w-3" />
                      Coming Soon
                    </div>
                  )}

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute right-3 top-3 rounded-full bg-brand-blue/90 px-3 py-1 text-caption font-semibold text-white backdrop-blur-sm">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-body font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-brand-blue transition-colors">
                      {project.name}
                    </h3>
                    <span className="flex-shrink-0 rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-caption font-medium uppercase text-neutral-500 dark:text-neutral-400">
                      {project.type}
                    </span>
                  </div>
                  <p className="mt-1 text-caption text-neutral-500 dark:text-neutral-400">
                    {project.category}
                  </p>
                  <p className="mt-2 text-body-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 text-caption text-neutral-500 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="rounded-full border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 text-caption text-neutral-400 dark:text-neutral-500">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 text-caption text-neutral-400 dark:text-neutral-500">
                    {project.year}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-neutral-300 p-16 text-center">
          <p className="text-body text-neutral-500">
            No projects match this filter.
          </p>
        </div>
      )}
    </div>
  );
}
