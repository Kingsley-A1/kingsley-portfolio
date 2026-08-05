import { getAbout } from "@/features/admin/about-repository";
import { AboutEditor } from "@/components/admin/about-editor";

export default async function AdminAboutPage() {
  const about = await getAbout();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h2 font-bold text-neutral-900">Edit About</h1>
        <p className="mt-1 text-body text-neutral-500">
          Manage your bio, headline, interests, and profile assets.
        </p>
      </div>

      <AboutEditor initial={about} />
    </div>
  );
}
