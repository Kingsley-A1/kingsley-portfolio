import {
  updateCollaboration,
  deleteCollaboration,
} from "@/features/admin/collaborations-repository";
import { apiRequireAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { collaborationUpdateSchema } from "@/features/admin/admin-schemas";

function refreshCollaborations() {
  revalidatePath("/");
  revalidatePath("/collaborations");
  revalidatePath("/admin/collaborations");
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
  const parsed = collaborationUpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid collaboration content" }, { status: 400 });
  try {
    const item = await updateCollaboration(id, parsed.data);
    if (!item) return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
    refreshCollaborations();
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Failed to update collaboration" }, { status: 500 });
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
    const deleted = await deleteCollaboration(id);
    if (!deleted) return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
    refreshCollaborations();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete collaboration" }, { status: 500 });
  }
}
