import {
  updateGraphics,
  deleteGraphics,
} from "@/features/admin/graphics-repository";
import { apiRequireAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { graphicsUpdateSchema } from "@/features/admin/admin-schemas";

function refreshGraphics() {
  revalidatePath("/");
  revalidatePath("/graphics");
  revalidatePath("/admin/graphics");
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
  const parsed = graphicsUpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid graphic content" }, { status: 400 });
  try {
    const item = await updateGraphics(id, parsed.data);
    if (!item) return NextResponse.json({ error: "Graphic not found" }, { status: 404 });
    refreshGraphics();
    return NextResponse.json(item);
  } catch {
    return NextResponse.json(
      { error: "Failed to update graphic" },
      { status: 500 },
    );
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
    const deleted = await deleteGraphics(id);
    if (!deleted) return NextResponse.json({ error: "Graphic not found" }, { status: 404 });
    refreshGraphics();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete graphic" },
      { status: 500 },
    );
  }
}
