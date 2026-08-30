import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyPortfolioRevalidation } from "@/lib/portfolio-revalidation";

const payloadSchema = z.object({
  event: z.enum([
    "portfolio.created",
    "portfolio.updated",
    "portfolio.deleted",
  ]),
  projectId: z.string().trim().min(1).max(200),
  occurredAt: z.string().datetime(),
});

function json(body: object, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const body = await request.text();
  const verified = verifyPortfolioRevalidation({
    body,
    timestamp: request.headers.get("x-portfolio-timestamp"),
    signature: request.headers.get("x-portfolio-signature"),
    secret: process.env.PORTFOLIO_REVALIDATION_SECRET,
  });

  if (!verified) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return json({ ok: false, error: "Invalid payload" }, 400);
  }

  const parsed = payloadSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ ok: false, error: "Invalid payload" }, 400);
  }

  revalidatePath("/");
  revalidatePath("/projects");

  return json({ ok: true }, 200);
}
