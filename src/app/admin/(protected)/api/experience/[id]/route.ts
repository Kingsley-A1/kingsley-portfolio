import {
  updateExperience,
  deleteExperience,
} from "@/features/admin/experience-repository";
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
  const item = await updateExperience(id, body);
  return NextResponse.json(item);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  const { id } = await params;
  await deleteExperience(id);
  return NextResponse.json({ success: true });
}
