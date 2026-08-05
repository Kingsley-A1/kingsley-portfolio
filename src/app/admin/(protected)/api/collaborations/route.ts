import { createCollaboration } from "@/features/admin/collaborations-repository";
import { apiRequireAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  const body = await request.json();
  const item = await createCollaboration(body);
  return NextResponse.json(item);
}
