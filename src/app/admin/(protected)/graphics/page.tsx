import { listGraphics } from "@/features/admin/graphics-repository";
import { AdminGraphicsList } from "@/components/admin/graphics-list";

export default async function AdminGraphicsPage() {
  const items = await listGraphics();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-h2 font-bold text-neutral-900">Graphics</h1>
          <p className="mt-1 text-body text-neutral-500">
            {items.length} design works in your portfolio.
          </p>
        </div>
        <a
          href="/admin/graphics/new"
          className="rounded-xl bg-neutral-900 px-5 py-2.5 text-body-sm font-semibold text-white transition-all hover:bg-neutral-800"
        >
          + Add Graphic
        </a>
      </div>

      <AdminGraphicsList items={items} />
    </div>
  );
}
