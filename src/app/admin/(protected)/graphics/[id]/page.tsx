import { getGraphics } from "@/features/admin/graphics-repository";
import { notFound } from "next/navigation";
import { GraphicsForm } from "@/components/admin/graphics-form";

export default async function AdminGraphicsEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getGraphics(id);
  if (!item) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h2 font-bold text-neutral-900">Edit Graphic</h1>
        <p className="mt-1 text-body text-neutral-500">
          Update {item.title}
        </p>
      </div>
      <GraphicsForm initial={item} />
    </div>
  );
}
