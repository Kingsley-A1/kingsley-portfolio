import Link from "next/link";
import {
  Briefcase,
  FolderKanban,
  Handshake,
  Palette,
  User,
} from "lucide-react";
import { PERSONA } from "@/lib/constants";

const QUICK_LINKS = [
  {
    href: "/admin/about",
    label: "Edit About",
    description: "Bio, headline, interests, photo",
    icon: User,
    color: "bg-brand-blue-surface text-brand-blue",
  },
  {
    href: "/admin/projects",
    label: "Manage Projects",
    description: "Portfolio projects & case studies",
    icon: FolderKanban,
    color: "bg-brand-teal-surface text-brand-teal",
  },
  {
    href: "/admin/graphics",
    label: "Graphics Works",
    description: "Design portfolio & gallery",
    icon: Palette,
    color: "bg-brand-amber-surface text-brand-amber",
  },
  {
    href: "/admin/collaborations",
    label: "Collaborations",
    description: "Partnerships & joint projects",
    icon: Handshake,
    color: "bg-brand-coral-surface text-brand-coral",
  },
  {
    href: "/admin/experience",
    label: "Work Experience",
    description: "Career history & roles",
    icon: Briefcase,
    color: "bg-neutral-100 text-neutral-600",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h2 font-bold text-neutral-900">Dashboard</h1>
        <p className="mt-1 text-body text-neutral-500">
          Welcome back, {PERSONA.alias}. Manage your portfolio content here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${link.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-body font-semibold text-neutral-900 group-hover:text-brand-blue transition-colors">
                {link.label}
              </h3>
              <p className="mt-1 text-body-sm text-neutral-500">
                {link.description}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-h5 font-bold text-neutral-900 mb-2">
          Quick tip
        </h2>
        <p className="text-body-sm text-neutral-500">
          All content changes are reflected immediately on your public portfolio.
          Use the sidebar to navigate between sections. Changes auto-save.
        </p>
      </div>
    </div>
  );
}
