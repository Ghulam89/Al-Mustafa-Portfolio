import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_COOKIE, isAdminConfigured, verifyAdminToken } from "@/lib/admin-auth";

export async function GET() {
  if (!isAdminConfigured()) {
    return NextResponse.json({ authenticated: false, configured: false });
  }
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value ?? "";
  const authenticated = verifyAdminToken(token);
  return NextResponse.json({ authenticated, configured: true });
}
