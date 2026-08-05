import { listPortfolioProjects } from "@/features/admin/projects-repository";
import { AdminProjectsList } from "@/components/admin/projects-list";

export default async function AdminProjectsPage() {
  const projects = await listPortfolioProjects();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h2 font-bold text-neutral-900">Projects</h1>
        <p className="mt-1 text-body text-neutral-500">
          {projects.length} projects in your portfolio. Manage them in the
          Bespoke Technologies admin.
        </p>
      </div>

      <AdminProjectsList projects={projects} />
    </div>
  );
}
