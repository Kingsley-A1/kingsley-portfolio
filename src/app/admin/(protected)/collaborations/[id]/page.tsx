import { getCollaboration } from "@/features/admin/collaborations-repository";
import { notFound } from "next/navigation";
import { CollaborationForm } from "@/components/admin/collaboration-form";

export default async function AdminCollaborationEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getCollaboration(id);
  if (!item) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h2 font-bold text-neutral-900">
          Edit Collaboration
        </h1>
      </div>
      <CollaborationForm initial={item} />
    </div>
  );
}
