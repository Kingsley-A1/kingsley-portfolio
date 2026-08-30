import { listPortfolioProjects } from "@/features/admin/projects-repository";
import { AdminProjectsList } from "@/components/admin/projects-list";
import { ExternalLink } from "lucide-react";

const bespokeAdminUrl = new URL(
  "/admin/portfolio",
  process.env.BESPOKE_PORTFOLIO_BASE_URL ?? "https://www.bespoketech.com.ng",
).toString();

export default async function AdminProjectsPage() {
  const projects = await listPortfolioProjects();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
        <h1 className="text-h2 font-bold text-neutral-900">Projects</h1>
        <p className="mt-1 text-body text-neutral-500">
          {projects.length} projects in your portfolio. Manage them in the
          Bespoke Technologies admin.
        </p>
        </div>
        <a
          href={bespokeAdminUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-body-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          Manage in Bespoke
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <AdminProjectsList projects={projects} />
    </div>
  );
}
