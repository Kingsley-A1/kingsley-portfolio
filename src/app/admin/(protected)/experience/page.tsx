import { listExperience } from "@/features/admin/experience-repository";
import { AdminExperienceList } from "@/components/admin/experience-list";

export default async function AdminExperiencePage() {
  const items = await listExperience();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-h2 font-bold text-neutral-900">
            Work Experience
          </h1>
          <p className="mt-1 text-body text-neutral-500">
            {items.length} roles in your career timeline.
          </p>
        </div>
        <a
          href="/admin/experience/new"
          className="rounded-xl bg-neutral-900 px-5 py-2.5 text-body-sm font-semibold text-white transition-all hover:bg-neutral-800"
        >
          + Add Role
        </a>
      </div>

      <AdminExperienceList items={items} />
    </div>
  );
}
