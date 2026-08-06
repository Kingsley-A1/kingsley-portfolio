import { NextResponse } from "next/server";
import { apiRequireAuth } from "@/lib/admin-auth";
import { uploadFile, storageKey } from "@/lib/storage";

export async function POST(request: Request) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop() || "png";
    const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const key = storageKey(filename);

    const url = await uploadFile(key, buffer, file.type || "application/octet-stream");

    return NextResponse.json({ url, key, filename });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 },
    );
  }
}
