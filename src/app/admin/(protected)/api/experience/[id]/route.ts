import {
  updateExperience,
  deleteExperience,
} from "@/features/admin/experience-repository";
import { apiRequireAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { experienceUpdateSchema } from "@/features/admin/admin-schemas";

function refreshExperience() {
  revalidatePath("/");
  revalidatePath("/works");
  revalidatePath("/admin/experience");
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  const { id } = await params;
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
  const parsed = experienceUpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid experience content" }, { status: 400 });
  try {
    const item = await updateExperience(id, parsed.data);
    if (!item) return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    refreshExperience();
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  const { id } = await params;
  try {
    const deleted = await deleteExperience(id);
    if (!deleted) return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    refreshExperience();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
