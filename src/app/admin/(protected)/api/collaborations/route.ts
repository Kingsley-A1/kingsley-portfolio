import { createCollaboration } from "@/features/admin/collaborations-repository";
import { apiRequireAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { collaborationCreateSchema } from "@/features/admin/admin-schemas";

export async function POST(request: Request) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
  const parsed = collaborationCreateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid collaboration content" }, { status: 400 });
  try {
    const item = await createCollaboration(parsed.data);
    revalidatePath("/");
    revalidatePath("/collaborations");
    revalidatePath("/admin/collaborations");
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create collaboration" }, { status: 500 });
  }
}
