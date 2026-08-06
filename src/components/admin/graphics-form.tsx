"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FileOrUrlInput } from "@/components/admin/file-or-url-input";
import type { GraphicsWork } from "@/features/admin/graphics-repository";

const CATEGORIES = [
  "Branding",
  "Social Media",
  "Flyer",
  "Poster",
  "Business Card",
  "Banner",
  "Logo Design",
  "Illustration",
  "Print",
  "Other",
];

export function GraphicsForm({ initial }: { initial?: GraphicsWork }) {
  const router = useRouter();
  const isEdit = !!initial;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    category: initial?.category ?? "Branding",
    description: initial?.description ?? "",
    imageUrl: initial?.imageUrl ?? "",
    client: initial?.client ?? "",
    year: initial?.year ?? String(new Date().getFullYear()),
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
        ? `/admin/api/graphics/${initial!.id}`
        : "/admin/api/graphics";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/graphics");
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link
        href="/admin/graphics"
        className="inline-flex items-center gap-1 text-body-sm text-neutral-500 hover:text-neutral-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to graphics
      </Link>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-5">
        <div>
          <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
            Title *
          </label>
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            placeholder="Mercy Nice Kitchen Flyer"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
              Year
            </label>
            <input
              value={form.year}
              onChange={(e) => update("year", e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              placeholder="2026"
            />
          </div>
        </div>

        <div>
          <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
            Client (optional)
          </label>
          <input
            value={form.client}
            onChange={(e) => update("client", e.target.value)}
            className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            placeholder="Mercy Nice Kitchen"
          />
        </div>

        <div>
          <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body resize-none focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            placeholder="Brief description of the design work..."
          />
        </div>

        <FileOrUrlInput
          label="Image *"
          value={form.imageUrl}
          onChange={(url) => update("imageUrl", url)}
          placeholder="/graphics/my-design.png or https://..."
        />

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => update("published", e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-brand-blue focus:ring-brand-blue"
            />
            <span className="text-body-sm text-neutral-700">Published</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving || !form.title.trim() || !form.imageUrl.trim()}
        className="flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-2.5 text-body font-semibold text-white transition-all hover:bg-neutral-800 disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {saving ? "Saving..." : isEdit ? "Update Graphic" : "Create Graphic"}
      </button>
    </div>
  );
}
