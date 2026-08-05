"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Collaboration } from "@/features/admin/collaborations-repository";

export function CollaborationForm({ initial }: { initial?: Collaboration }) {
  const router = useRouter();
  const isEdit = !!initial;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    partnerName: initial?.partnerName ?? "",
    partnerLogoUrl: initial?.partnerLogoUrl ?? "",
    projectName: initial?.projectName ?? "",
    description: initial?.description ?? "",
    role: initial?.role ?? "",
    year: initial?.year ?? String(new Date().getFullYear()),
    link: initial?.link ?? "",
    published: initial?.published ?? true,
    sortOrder: initial?.sortOrder ?? 0,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const url = isEdit
        ? `/admin/api/collaborations/${initial!.id}`
        : "/admin/api/collaborations";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/collaborations");
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  const fields: {
    key: keyof typeof form;
    label: string;
    type?: string;
    required?: boolean;
  }[] = [
      { key: "partnerName", label: "Partner Name", required: true },
      { key: "projectName", label: "Project Name", required: true },
      { key: "role", label: "Your Role", required: true },
      { key: "description", label: "Description", required: true },
      { key: "partnerLogoUrl", label: "Partner Logo URL" },
      { key: "year", label: "Year", required: true },
      { key: "link", label: "Project Link" },
    ];

  return (
    <div className="max-w-2xl space-y-6">
      <Link
        href="/admin/collaborations"
        className="inline-flex items-center gap-1 text-body-sm text-neutral-500 hover:text-neutral-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-5">
        {fields.map(({ key, label, required }) => (
          <div key={key}>
            <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
              {label} {required && "*"}
            </label>
            {key === "description" ? (
              <textarea
                value={String(form[key] ?? "")}
                onChange={(e) => update(key, e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body resize-none focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              />
            ) : (
              <input
                value={String(form[key] ?? "")}
                onChange={(e) => update(key, e.target.value)}
                className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => update("published", e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-brand-blue"
            />
            <span className="text-body-sm text-neutral-700">Published</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving || !form.partnerName.trim() || !form.projectName.trim()}
        className="flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-2.5 text-body font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {saving ? "Saving..." : isEdit ? "Update" : "Create"}
      </button>
    </div>
  );
}
