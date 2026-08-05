import { GraphicsForm } from "@/components/admin/graphics-form";

export default function AdminGraphicsNewPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h2 font-bold text-neutral-900">Add Graphic</h1>
        <p className="mt-1 text-body text-neutral-500">
          Add a new design work to your portfolio.
        </p>
      </div>
      <GraphicsForm />
    </div>
  );
}
