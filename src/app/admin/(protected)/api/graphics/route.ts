import { createGraphics } from "@/features/admin/graphics-repository";
import { apiRequireAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { graphicsCreateSchema } from "@/features/admin/admin-schemas";

export async function POST(request: Request) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
  const parsed = graphicsCreateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid graphic content" }, { status: 400 });
  try {
    const item = await createGraphics(parsed.data);
    revalidatePath("/");
    revalidatePath("/graphics");
    revalidatePath("/admin/graphics");
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create graphic" },
      { status: 500 },
    );
  }
}
