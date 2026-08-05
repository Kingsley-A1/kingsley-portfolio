"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import type { GraphicsWork } from "@/features/admin/graphics-repository";
import { useState } from "react";

export function AdminGraphicsList({ items }: { items: GraphicsWork[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this graphic?")) return;
    setDeleting(id);
    try {
      await fetch(`/admin/api/graphics/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-lg"
        >
          <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-300">
                No image
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-body font-semibold text-neutral-900 truncate">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-caption text-neutral-500">
                  {item.category} · {item.year}
                  {item.client && ` · ${item.client}`}
                </p>
              </div>
              {!item.published && (
                <EyeOff className="h-4 w-4 flex-shrink-0 text-neutral-400" />
              )}
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                href={`/admin/graphics/${item.id}`}
                className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-caption font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
              >
                <Pencil className="h-3 w-3" />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                disabled={deleting === item.id}
                className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-caption font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 className="h-3 w-3" />
                {deleting === item.id ? "..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="col-span-full rounded-2xl border border-dashed border-neutral-300 p-12 text-center">
          <p className="text-body text-neutral-500">
            No graphics yet. Add your first design work.
          </p>
        </div>
      )}
    </div>
  );
}
