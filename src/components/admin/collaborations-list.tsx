"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, ExternalLink, EyeOff } from "lucide-react";
import type { Collaboration } from "@/features/admin/collaborations-repository";
import { useState } from "react";

export function AdminCollaborationsList({
  items,
}: {
  items: Collaboration[];
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this collaboration?")) return;
    setDeleting(id);
    try {
      await fetch(`/admin/api/collaborations/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:shadow-md"
        >
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-100">
            {item.partnerLogoUrl ? (
              <img
                src={item.partnerLogoUrl}
                alt={item.partnerName}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <span className="text-h5 font-bold text-neutral-300">
                {item.partnerName.charAt(0)}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-body font-semibold text-neutral-900">
                {item.projectName}
              </h3>
              {!item.published && (
                <EyeOff className="h-3.5 w-3.5 text-neutral-400" />
              )}
            </div>
            <p className="text-body-sm text-neutral-500">
              with <span className="font-medium text-neutral-700">{item.partnerName}</span> · {item.role} · {item.year}
            </p>
            <p className="mt-1 text-body-sm text-neutral-500 line-clamp-1">
              {item.description}
            </p>
            <div className="mt-2 flex gap-2">
              <Link
                href={`/admin/collaborations/${item.id}`}
                className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-caption font-medium text-neutral-600 hover:bg-neutral-50"
              >
                <Pencil className="h-3 w-3" /> Edit
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                disabled={deleting === item.id}
                className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-caption font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 className="h-3 w-3" />
                {deleting === item.id ? "..." : "Delete"}
              </button>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-caption text-brand-blue hover:underline"
                >
                  <ExternalLink className="h-3 w-3" /> Visit
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center">
          <p className="text-body text-neutral-500">
            No collaborations yet.
          </p>
        </div>
      )}
    </div>
  );
}
