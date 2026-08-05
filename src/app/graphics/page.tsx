import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { GraphicsGallery } from "@/components/marketing/graphics-gallery";
import { listPublishedGraphicsSafe } from "@/features/admin/graphics-repository";
import { PERSONA, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Graphics",
  description: `Design portfolio of ${PERSONA.name} — brand assets, posters, banners, and social graphics created for campaigns and clients.`,
  alternates: { canonical: "/graphics" },
  openGraph: {
    title: `Graphics — ${PERSONA.name}`,
    description: "Brand identity, marketing collateral, and visual storytelling for businesses and campaigns.",
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630 }],
  },
};

export default async function GraphicsPage() {
  const graphics = await listPublishedGraphicsSafe();

  return (
    <>
      <PageHero
        label="Graphics"
        title="Visual storytelling meets design precision."
        description="Curated design work — brand assets, posters, banners, and social graphics created for campaigns and clients."
        gradient="warm"
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12">
            <h2 className="text-h2 font-bold text-neutral-900">
              Design <span className="text-gradient-warm">portfolio</span>
            </h2>
            <p className="mt-2 text-body text-neutral-500 max-w-xl">
              {graphics.length} works spanning branding, social media, print, and more.
            </p>
          </Reveal>

          <GraphicsGallery items={graphics} />
        </div>
      </section>
    </>
  );
}
