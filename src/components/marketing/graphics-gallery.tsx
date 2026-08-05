"use client";

import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import type { GraphicsWork } from "@/features/admin/graphics-repository";
import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

export function GraphicsGallery({ items }: { items: GraphicsWork[] }) {
  const [lightbox, setLightbox] = useState<GraphicsWork | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-16 text-center">
        <p className="text-body text-neutral-500 dark:text-neutral-400">
          Graphics portfolio coming soon. Check back later.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.06}>
            <div
              className="group relative mb-6 cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm transition-all hover:shadow-xl"
              onClick={() => setLightbox(item)}
            >
              <div className="overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <div className="p-5 w-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-body font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-body-sm text-neutral-300">
                        {item.category}
                        {item.client && ` · ${item.client}`}
                      </p>
                    </div>
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Info below image */}
              <div className="p-4">
                <h3 className="text-body-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                  {item.title}
                </h3>
                <p className="text-caption text-neutral-500 dark:text-neutral-400">
                  {item.category} · {item.year}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-xl bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.imageUrl}
              alt={lightbox.title}
              className="max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
            <div className="absolute bottom-0 inset-x-0 rounded-b-2xl bg-gradient-to-t from-neutral-900/90 to-transparent p-6 pt-16">
              <h3 className="text-h5 font-bold text-white">{lightbox.title}</h3>
              <p className="text-body-sm text-neutral-300">
                {lightbox.category}
                {lightbox.client && ` · ${lightbox.client}`} · {lightbox.year}
              </p>
              {lightbox.description && (
                <p className="mt-1 text-body-sm text-neutral-400">
                  {lightbox.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
