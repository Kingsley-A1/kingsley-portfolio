"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Building2, Calendar } from "lucide-react";
import type { WorkExperience } from "@/features/admin/experience-repository";
import { useState } from "react";

export function AdminExperienceList({
  items,
}: {
  items: WorkExperience[];
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this experience entry?")) return;
    setDeleting(id);
    try {
      await fetch(`/admin/api/experience/${id}`, { method: "DELETE" });
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
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-100">
            {item.companyLogoUrl ? (
              <img
                src={item.companyLogoUrl}
                alt={item.company}
                className="h-8 w-8 object-contain"
              />
            ) : (
              <Building2 className="h-5 w-5 text-neutral-300" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-body font-semibold text-neutral-900">
              {item.role}
            </h3>
            <p className="text-body-sm text-neutral-600">
              {item.company}
              {item.isCurrent && (
                <span className="ml-2 rounded-full bg-success/10 px-2 py-0.5 text-caption font-medium text-success">
                  Current
                </span>
              )}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-caption text-neutral-400">
              <Calendar className="h-3 w-3" />
              {item.startDate} — {item.endDate ?? "Present"}
            </p>
            <p className="mt-1 text-body-sm text-neutral-500 line-clamp-1">
              {item.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {item.skillsUsed.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-neutral-200 px-2 py-0.5 text-caption text-neutral-500"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Link
                href={`/admin/experience/${item.id}`}
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
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center">
          <p className="text-body text-neutral-500">No work experience yet.</p>
        </div>
      )}
    </div>
  );
}
