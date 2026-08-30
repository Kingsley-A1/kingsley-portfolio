import { updateAbout } from "@/features/admin/about-repository";
import { apiRequireAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { aboutUpdateSchema } from "@/features/admin/admin-schemas";

export async function PUT(request: Request) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
  const parsed = aboutUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid about content" }, { status: 400 });
  }
  try {
    const about = await updateAbout(parsed.data);
    if (!about) return NextResponse.json({ error: "About content not found" }, { status: 404 });
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/about");
    return NextResponse.json(about);
  } catch {
    return NextResponse.json(
      { error: "Failed to update about" },
      { status: 500 },
    );
  }
}
