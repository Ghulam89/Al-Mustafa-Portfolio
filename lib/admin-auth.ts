import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "portfolio_admin_session";

function adminSecret(): string {
  return (process.env.ADMIN_PASSWORD ?? "").trim();
}

export function isAdminConfigured(): boolean {
  return adminSecret().length > 0;
}

export function createAdminToken(): string {
  const secret = adminSecret();
  if (!secret) {
    throw new Error("ADMIN_PASSWORD is not set");
  }
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = String(exp);
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyAdminToken(token: string): boolean {
  const secret = adminSecret();
  if (!secret) return false;
  const i = token.lastIndexOf(".");
  if (i <= 0) return false;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  if (!/^\d+$/.test(payload) || !/^[a-f0-9]{64}$/i.test(sig)) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  const exp = Number(payload);
  return Number.isFinite(exp) && Date.now() <= exp;
}
