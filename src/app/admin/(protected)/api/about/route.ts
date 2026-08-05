import { updateAbout } from "@/features/admin/about-repository";
import { apiRequireAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const unauth = await apiRequireAuth();
  if (unauth) return unauth;
  try {
    const body = await request.json();
    const about = await updateAbout({
      headline: body.headline,
      bio: body.bio,
      extendedBio: body.extendedBio,
      interests: body.interests,
    });
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update about" },
      { status: 500 },
    );
  }
}
