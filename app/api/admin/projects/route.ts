import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";
import type { Project } from "@/lib/portfolio-data";
import { projects as defaultProjects } from "@/lib/portfolio-data";
import {
  readUserProjects,
  slugifyId,
  writeUserProjects,
} from "@/lib/projects-store";

async function requireAdmin() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value ?? "";
  return verifyAdminToken(token);
}

function defaultIds() {
  return new Set(defaultProjects.map((p) => p.id));
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const list = await readUserProjects();
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<Project>;
  try {
    body = (await request.json()) as Partial<Project>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const image = typeof body.image === "string" ? body.image.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const details = typeof body.details === "string" ? body.details.trim() : "";
  const github = typeof body.github === "string" ? body.github.trim() : "";
  const live = typeof body.live === "string" ? body.live.trim() : "";
  const tags = Array.isArray(body.tags)
    ? body.tags.map((t) => String(t).trim()).filter(Boolean)
    : [];

  if (!title || !image || !description) {
    return NextResponse.json(
      { error: "Title, image URL, and short description are required." },
      { status: 400 },
    );
  }

  const list = await readUserProjects();
  const defaults = defaultIds();
  let baseId = body.id && typeof body.id === "string" ? slugifyId(body.id) : slugifyId(title);
  let id = baseId;
  let n = 0;
  while (defaults.has(id) || list.some((p) => p.id === id)) {
    n += 1;
    id = `${baseId}-${n}`;
  }

  const project: Project = {
    id,
    title,
    image,
    description,
    details: details || description,
    tags: tags.length ? tags : ["Portfolio"],
    github: github || "#",
    live: live || "#",
  };

  list.push(project);
  await writeUserProjects(list);

  return NextResponse.json(project, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")?.trim();
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  if (defaultIds().has(id)) {
    return NextResponse.json({ error: "Cannot delete built-in projects" }, { status: 403 });
  }

  const list = await readUserProjects();
  const next = list.filter((p) => p.id !== id);
  if (next.length === list.length) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  await writeUserProjects(next);
  return NextResponse.json({ ok: true });
}
