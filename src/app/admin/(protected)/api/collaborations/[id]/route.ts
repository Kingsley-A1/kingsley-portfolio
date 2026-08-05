import {
  updateCollaboration,
  deleteCollaboration,
} from "@/features/admin/collaborations-repository";
import { apiRequireAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  const { id } = await params;
  const body = await request.json();
  const item = await updateCollaboration(id, body);
  return NextResponse.json(item);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  const { id } = await params;
  await deleteCollaboration(id);
  return NextResponse.json({ success: true });
}
