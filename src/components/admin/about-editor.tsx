"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Globe } from "lucide-react";
import type { AboutContent } from "@/features/admin/about-repository";
import { cn } from "@/lib/utils";

const INTEREST_OPTIONS = [
  "Technology",
  "AI",
  "Software Development",
  "Hardware Engineering",
  "Building Startups",
  "French",
  "Creativity",
  "Innovation",
  "Excellence",
  "Public Speaking",
  "Marketing",
  "Graphic Design",
  "Writing",
];

const SOCIAL_FIELDS = [
  { key: "github", label: "GitHub" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "twitter", label: "Twitter / X" },
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
] as const;

export function AboutEditor({ initial }: { initial: AboutContent | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    headline: initial?.headline ?? "",
    bio: initial?.bio ?? "",
    extendedBio: initial?.extendedBio ?? "",
    interests: initial?.interests ?? [],
    socialLinks: initial?.socialLinks ?? ({} as Record<string, string>),
  });

  function toggleInterest(interest: string) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/admin/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Headline */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <label className="block text-body-sm font-semibold text-neutral-900 mb-2">
          Headline
        </label>
        <input
          value={form.headline}
          onChange={(e) => setForm((p) => ({ ...p, headline: e.target.value }))}
          placeholder="Engineer focused on value creation and business impact."
          className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body text-neutral-900 placeholder:text-neutral-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
        />
      </div>

      {/* Short Bio */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <label className="block text-body-sm font-semibold text-neutral-900 mb-2">
          Short Bio
        </label>
        <textarea
          value={form.bio}
          onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
          rows={3}
          placeholder="Brief introduction..."
          className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body text-neutral-900 placeholder:text-neutral-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 resize-none"
        />
      </div>

      {/* Extended Bio */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <label className="block text-body-sm font-semibold text-neutral-900 mb-2">
          Extended Bio
        </label>
        <textarea
          value={form.extendedBio}
          onChange={(e) =>
            setForm((p) => ({ ...p, extendedBio: e.target.value }))
          }
          rows={6}
          placeholder="Tell your full story..."
          className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body text-neutral-900 placeholder:text-neutral-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 resize-none"
        />
      </div>

      {/* Interests */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <label className="block text-body-sm font-semibold text-neutral-900 mb-3">
          Interests
        </label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => {
            const selected = form.interests.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-body-sm font-medium transition-all",
                  selected
                    ? "border-brand-blue bg-brand-blue-surface text-brand-blue-deep"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300",
                )}
              >
                {selected && <Plus className="mr-1 inline h-3 w-3 rotate-45" />}
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <label className="block text-body-sm font-semibold text-neutral-900 mb-3">
          Social Links
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          {SOCIAL_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-caption font-medium text-neutral-500 mb-1">
                {label}
              </label>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                <input
                  value={form.socialLinks[key] ?? ""}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      socialLinks: { ...p.socialLinks, [key]: e.target.value },
                    }))
                  }
                  placeholder={`https://${key}.com/...`}
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-body-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-2.5 text-body font-semibold text-white transition-all hover:bg-neutral-800 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {saved && (
          <span className="text-body-sm font-medium text-success">
            ✓ Saved successfully
          </span>
        )}
      </div>
    </div>
  );
}
