import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";

/** Vercel server uploads are limited (~4.5MB body); stay under to avoid failed requests. */
const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

async function requireAdmin() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value ?? "";
  return verifyAdminToken(token);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 4MB on this host)" }, { status: 400 });
  }

  const ext = ALLOWED.get(file.type);
  if (!ext) {
    return NextResponse.json({ error: "Use JPG, PNG, WebP, or GIF" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const name = `${randomUUID()}${ext}`;

  /** Vercel serverless has no persistent disk — use Blob when token is set (link Blob store in Vercel dashboard). */
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (token) {
    try {
      const blob = await put(`portfolio-projects/${name}`, buf, {
        access: "public",
        token,
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url });
    } catch (e) {
      console.error("[admin/upload] blob put failed", e);
      return NextResponse.json(
        {
          error:
            "Blob upload failed. In Vercel: Storage → Blob → link store to this project so BLOB_READ_WRITE_TOKEN is set.",
        },
        { status: 502 },
      );
    }
  }

  if (process.env.VERCEL) {
    return NextResponse.json(
      {
        error:
          "Uploads on Vercel need Vercel Blob. Add Storage → Blob for this project (sets BLOB_READ_WRITE_TOKEN).",
      },
      { status: 503 },
    );
  }

  try {
    const dir = path.join(process.cwd(), "public", "uploads", "projects");
    await mkdir(dir, { recursive: true });
    const rel = `/uploads/projects/${name}`;
    await writeFile(path.join(dir, name), buf);
    return NextResponse.json({ url: rel });
  } catch (e) {
    console.error("[admin/upload] local write failed", e);
    return NextResponse.json({ error: "Could not save file on disk." }, { status: 500 });
  }
}
