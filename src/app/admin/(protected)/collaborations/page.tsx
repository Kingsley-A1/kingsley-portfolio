import { listCollaborations } from "@/features/admin/collaborations-repository";
import { AdminCollaborationsList } from "@/components/admin/collaborations-list";

export default async function AdminCollaborationsPage() {
  const items = await listCollaborations();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-h2 font-bold text-neutral-900">
            Collaborations
          </h1>
          <p className="mt-1 text-body text-neutral-500">
            {items.length} collaborations in your portfolio.
          </p>
        </div>
        <a
          href="/admin/collaborations/new"
          className="rounded-xl bg-neutral-900 px-5 py-2.5 text-body-sm font-semibold text-white transition-all hover:bg-neutral-800"
        >
          + Add Collaboration
        </a>
      </div>

      <AdminCollaborationsList items={items} />
    </div>
  );
}
