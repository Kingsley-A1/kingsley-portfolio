import { ExternalLink, Eye, EyeOff, Star } from "lucide-react";
import type { PortfolioProjectItem } from "@/features/admin/projects-repository";
import { cn } from "@/lib/utils";

export function AdminProjectsList({
  projects,
}: {
  projects: PortfolioProjectItem[];
}) {
  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-5"
        >
          <div className="h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-300">
                <ExternalLink className="h-6 w-6" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-body font-semibold text-neutral-900">
                {project.name}
              </h3>
              {project.featured && (
                <Star className="h-3.5 w-3.5 text-brand-amber" />
              )}
              {!project.published && (
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-caption text-neutral-500">
                  Draft
                </span>
              )}
              {project.comingSoon && (
                <span className="rounded-full bg-brand-amber-surface px-2 py-0.5 text-caption font-medium text-brand-amber-deep">
                  Coming Soon
                </span>
              )}
            </div>
            <p className="mt-0.5 text-body-sm text-neutral-500 line-clamp-2">
              {project.description}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-caption font-medium uppercase text-neutral-500">
                {project.type}
              </span>
              <span className="text-caption text-neutral-400">
                {project.category}
              </span>
              <span className="text-caption text-neutral-400">
                {project.year}
              </span>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-caption text-brand-blue hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Live
                </a>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-200 px-2 py-0.5 text-caption text-neutral-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center">
          <p className="text-body text-neutral-500">
            No projects yet. Add them in the Bespoke Technologies admin.
          </p>
        </div>
      )}
    </div>
  );
}
