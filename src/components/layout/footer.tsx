import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { PERSONA, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterXIcon,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
} from "@/components/icons/social-icons";
import type { ComponentType, SVGProps } from "react";

const SOCIAL_ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterXIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
};

export function Footer({
  socialLinks: dbLinks = {},
}: {
  socialLinks?: Record<string, string>;
}) {
  const year = new Date().getFullYear();
  const links = { ...SOCIAL_LINKS, ...dbLinks };

  const visibleSocials = Object.entries(links).filter(
    ([key, url]) =>
      key !== "email" && url && url.length > 5,
  );

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-h4 font-bold tracking-tight text-neutral-900 dark:text-white"
            >
              {PERSONA.name}
            </Link>
            <p className="mt-3 max-w-sm text-body-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              Full-stack software engineer building elegant, high-performance
              digital experiences with modern web technologies.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {visibleSocials.map(([key, url]) => {
                const IconComponent = SOCIAL_ICON_MAP[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-2 text-neutral-500 dark:text-neutral-400 transition-colors hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-neutral-200"
                    aria-label={key}
                  >
                    {IconComponent ? (
                      <IconComponent className="h-4 w-4" />
                    ) : (
                      <span className="text-[10px] font-bold uppercase">
                        {key.slice(0, 2)}
                      </span>
                    )}
                    <span className="hidden text-caption font-medium sm:inline capitalize">
                      {key}
                    </span>
                  </a>
                );
              })}
              <a
                href={SOCIAL_LINKS.email}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2.5 min-h-[44px] text-caption font-semibold text-neutral-500 transition-colors hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-700 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                aria-label="Email"
              >
                <Mail className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Email</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Graphics", href: "/graphics" },
                { label: "Collaborations", href: "/collaborations" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-neutral-500 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-body-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Contact
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${PERSONA.email}`}
                  className="inline-flex items-center gap-1 text-body-sm text-neutral-500 dark:text-neutral-400 transition-colors hover:text-brand-blue dark:hover:text-brand-blue-bright"
                >
                  {PERSONA.email}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <span className="text-body-sm text-neutral-400 dark:text-neutral-500">
                  {PERSONA.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-100 dark:border-neutral-800 pt-6 text-center">
          <p className="text-caption text-neutral-400 dark:text-neutral-500">
            &copy; {year} {SITE_NAME}. Built with precision &amp; pride.
          </p>
        </div>
      </div>
    </footer>
  );
}
