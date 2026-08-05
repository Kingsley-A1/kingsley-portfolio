"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import type { WorkExperience } from "@/features/admin/experience-repository";

export function ExperienceForm({ initial }: { initial?: WorkExperience }) {
  const router = useRouter();
  const isEdit = !!initial;
  const [saving, setSaving] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [form, setForm] = useState({
    company: initial?.company ?? "",
    role: initial?.role ?? "",
    description: initial?.description ?? "",
    startDate: initial?.startDate ?? "",
    endDate: initial?.endDate ?? "",
    isCurrent: initial?.isCurrent ?? false,
    companyLogoUrl: initial?.companyLogoUrl ?? "",
    skillsUsed: initial?.skillsUsed ?? [],
    published: initial?.published ?? true,
    sortOrder: initial?.sortOrder ?? 0,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addSkill() {
    const skill = skillInput.trim();
    if (skill && !form.skillsUsed.includes(skill)) {
      update("skillsUsed", [...form.skillsUsed, skill]);
    }
    setSkillInput("");
  }

  function removeSkill(skill: string) {
    update(
      "skillsUsed",
      form.skillsUsed.filter((s) => s !== skill),
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      const url = isEdit
        ? `/admin/api/experience/${initial!.id}`
        : "/admin/api/experience";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/experience");
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link
        href="/admin/experience"
        className="inline-flex items-center gap-1 text-body-sm text-neutral-500 hover:text-neutral-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-5">
        <div>
          <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
            Company *
          </label>
          <input
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            placeholder="Bespoke Technologies"
          />
        </div>

        <div>
          <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
            Role *
          </label>
          <input
            value={form.role}
            onChange={(e) => update("role", e.target.value)}
            className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            placeholder="Full-Stack Software Engineer"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
              Start Date *
            </label>
            <input
              value={form.startDate}
              onChange={(e) => update("startDate", e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              placeholder="Jan 2023"
            />
          </div>
          <div>
            <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
              End Date
            </label>
            <input
              value={form.endDate}
              onChange={(e) => update("endDate", e.target.value)}
              disabled={form.isCurrent}
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 disabled:opacity-40"
              placeholder="Present"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isCurrent"
            checked={form.isCurrent}
            onChange={(e) => update("isCurrent", e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 text-brand-blue"
          />
          <label htmlFor="isCurrent" className="text-body-sm text-neutral-700">
            Current position
          </label>
        </div>

        <div>
          <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
            Description *
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body resize-none focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            placeholder="Describe your responsibilities and achievements..."
          />
        </div>

        <div>
          <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
            Skills Used
          </label>
          <div className="flex gap-2 mb-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className="flex-1 rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              placeholder="Add a skill..."
            />
            <button
              type="button"
              onClick={addSkill}
              className="rounded-xl bg-neutral-100 px-4 py-2.5 text-body-sm font-medium text-neutral-700 hover:bg-neutral-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {form.skillsUsed.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 rounded-full bg-brand-blue-surface px-3 py-1 text-body-sm text-brand-blue-deep"
              >
                {skill}
                <button onClick={() => removeSkill(skill)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
            Company Logo URL
          </label>
          <input
            value={form.companyLogoUrl}
            onChange={(e) => update("companyLogoUrl", e.target.value)}
            className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            placeholder="https://..."
          />
        </div>

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
        disabled={saving || !form.company.trim() || !form.role.trim()}
        className="flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-2.5 text-body font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {saving ? "Saving..." : isEdit ? "Update Role" : "Create Role"}
      </button>
    </div>
  );
}
