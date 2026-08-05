import { createGraphics } from "@/features/admin/graphics-repository";
import { apiRequireAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  try {
    const body = await request.json();
    const item = await createGraphics(body);
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create graphic" },
      { status: 500 },
    );
  }
}
