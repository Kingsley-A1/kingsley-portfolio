"use client";

import { useState, useRef } from "react";
import { Upload, Link, Loader2 } from "lucide-react";

interface FileOrUrlInputProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  placeholder?: string;
  accept?: string;
}

export function FileOrUrlInput({
  value,
  onChange,
  label,
  placeholder = "https://...",
  accept = "image/*",
}: FileOrUrlInputProps) {
  const [mode, setMode] = useState<"url" | "file">("url");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/admin/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      setError("Upload failed. Try using a URL instead.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-body-sm font-semibold text-neutral-900 mb-1.5">
        {label}
      </label>

      {/* Mode toggle */}
      <div className="flex gap-1 mb-2">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-caption font-medium transition-colors ${
            mode === "url"
              ? "bg-neutral-900 text-white"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          <Link className="h-3.5 w-3.5" />
          URL
        </button>
        <button
          type="button"
          onClick={() => setMode("file")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-caption font-medium transition-colors ${
            mode === "file"
              ? "bg-neutral-900 text-white"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          <Upload className="h-3.5 w-3.5" />
          File
        </button>
      </div>

      {/* URL Input */}
      {mode === "url" && (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-body text-neutral-900 placeholder:text-neutral-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
          placeholder={placeholder}
        />
      )}

      {/* File Input */}
      {mode === "file" && (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-3 text-body-sm font-medium text-neutral-600 transition-colors hover:border-brand-blue hover:bg-brand-blue-surface disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                {value ? "Replace file" : "Choose file"}
              </>
            )}
          </button>
          {value && mode === "file" && (
            <p className="mt-1 text-caption text-neutral-500 truncate">
              ✅ Uploaded: {value.split("/").pop()?.slice(0, 30)}
            </p>
          )}
          {error && (
            <p className="mt-1 text-caption text-red-500">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
