import {
  updateGraphics,
  deleteGraphics,
} from "@/features/admin/graphics-repository";
import { apiRequireAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  try {
    const { id } = await params;
    const body = await request.json();
    const item = await updateGraphics(id, body);
    return NextResponse.json(item);
  } catch (error) {
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
  try {
    const { id } = await params;
    await deleteGraphics(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete graphic" },
      { status: 500 },
    );
  }
}
