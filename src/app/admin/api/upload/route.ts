import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { apiRequireAuth } from "@/lib/admin-auth";
import { uploadFile, storageKey } from "@/lib/storage";
import { validateUpload } from "@/lib/upload-policy";

export async function POST(request: Request) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const validation = validateUpload(file);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `uploads/${Date.now()}-${randomUUID()}.${validation.extension}`;
    const key = storageKey(filename);

    const url = await uploadFile(key, buffer, file.type);

    return NextResponse.json({ url, key, filename, mime: file.type });
  } catch {
    console.error("Admin upload failed.");
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 },
    );
  }
}
