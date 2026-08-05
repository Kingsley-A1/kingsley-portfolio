import { getExperience } from "@/features/admin/experience-repository";
import { notFound } from "next/navigation";
import { ExperienceForm } from "@/components/admin/experience-form";

export default async function AdminExperienceEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getExperience(id);
  if (!item) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h2 font-bold text-neutral-900">Edit Role</h1>
      </div>
      <ExperienceForm initial={item} />
    </div>
  );
}
