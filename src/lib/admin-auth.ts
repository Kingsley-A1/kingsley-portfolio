import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionToken,
  verifySecretValue,
  verifySessionToken,
} from "@/lib/admin-session";

const SESSION_COOKIE = "kp_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

export function verifyAdminPassword(password: string): boolean {
  return verifySecretValue(password, process.env.ADMIN_PASSWORD);
}

export async function createAdminSession(): Promise<string> {
  const secret = process.env.SESSION_SECRET ?? "";
  const token = await createSessionToken(
    secret,
    Date.now() + SESSION_MAX_AGE * 1000,
  );
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return token;
}

export async function getAdminSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const secret = process.env.SESSION_SECRET ?? "";
  if (!token || !(await verifySessionToken(token, secret))) return null;
  return token;
}

export async function requireAdmin(): Promise<void> {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function apiRequireAuth(): Promise<Response | null> {
  const session = await getAdminSession();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return null;
}
