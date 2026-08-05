import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { PERSONA, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${PERSONA.name} — let's discuss your next project.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* Header spacer */}
      <div className="h-20" />

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1 text-body-sm text-neutral-500 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>

          <h1 className="text-h1 font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Let&apos;s work{" "}
            <span className="text-gradient-blue">together</span>
          </h1>
          <p className="mt-4 text-body-lg leading-body text-neutral-500 dark:text-neutral-400">
            Have a project in mind? I&apos;d love to hear about it. Reach out
            and let&apos;s discuss how we can build something great.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <a
              href={`mailto:${PERSONA.email}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="rounded-xl bg-brand-blue-surface dark:bg-brand-blue/15 p-3 text-brand-blue dark:text-brand-blue-bright">
                <Mail className="h-6 w-6" />
              </div>
              <span className="text-body font-semibold text-neutral-900 dark:text-neutral-100">
                Email me
              </span>
              <span className="text-body-sm text-neutral-500 dark:text-neutral-400">
                {PERSONA.email}
              </span>
              <ArrowUpRight className="mt-1 h-4 w-4 text-neutral-300 transition-colors group-hover:text-brand-blue" />
            </a>

            <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm">
              <div className="rounded-xl bg-brand-teal-surface dark:bg-brand-teal/15 p-3 text-brand-teal dark:text-brand-teal-bright">
                <MapPin className="h-6 w-6" />
              </div>
              <span className="text-body font-semibold text-neutral-900 dark:text-neutral-100">
                Location
              </span>
              <span className="text-body-sm text-neutral-500 dark:text-neutral-400">
                {PERSONA.location}
              </span>
            </div>
          </div>

          <p className="mt-12 text-body-sm text-neutral-400 dark:text-neutral-500">
            Typically responds within 24 hours.
          </p>
        </div>
      </section>
    </>
  );
}
