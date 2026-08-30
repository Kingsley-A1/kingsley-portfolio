import { createExperience } from "@/features/admin/experience-repository";
import { apiRequireAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { experienceCreateSchema } from "@/features/admin/admin-schemas";

export async function POST(request: Request) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
  const parsed = experienceCreateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid experience content" }, { status: 400 });
  try {
    const item = await createExperience(parsed.data);
    revalidatePath("/");
    revalidatePath("/works");
    revalidatePath("/admin/experience");
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
