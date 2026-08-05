import { CollaborationForm } from "@/components/admin/collaboration-form";

export default function AdminCollaborationNewPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h2 font-bold text-neutral-900">
          Add Collaboration
        </h1>
      </div>
      <CollaborationForm />
    </div>
  );
}
