import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { get, put } from "@vercel/blob";

import type { Project } from "@/lib/portfolio-data";
import { projects as defaultProjects } from "@/lib/portfolio-data";

const dataPath = path.join(process.cwd(), "data", "user-projects.json");

/** Single JSON file in Blob — same store as image uploads; survives Vercel’s read-only disk. */
const USER_PROJECTS_BLOB_PATH = "portfolio-data/user-projects.json";

function blobToken(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() || undefined;
}

function useBlobForUserProjects(): boolean {
  return Boolean(blobToken());
}

async function ensureDataDir() {
  await mkdir(path.dirname(dataPath), { recursive: true });
}

async function readUserProjectsFromBlob(): Promise<Project[]> {
  const token = blobToken();
  if (!token) return [];

  try {
    const result = await get(USER_PROJECTS_BLOB_PATH, {
      access: "public",
      token,
    });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return [];
    }
    const raw = await new Response(result.stream).text();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as Project[];
  } catch {
    return [];
  }
}

async function writeUserProjectsToBlob(list: Project[]): Promise<void> {
  const token = blobToken();
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not set");
  }
  const body = `${JSON.stringify(list, null, 2)}\n`;
  await put(USER_PROJECTS_BLOB_PATH, body, {
    access: "public",
    token,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function readUserProjects(): Promise<Project[]> {
  if (useBlobForUserProjects()) {
    return readUserProjectsFromBlob();
  }

  try {
    const raw = await readFile(dataPath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as Project[];
  } catch (e) {
    const err = e as NodeJS.ErrnoException;
    if (err.code === "ENOENT") return [];
    throw e;
  }
}

export class ProjectsPersistenceError extends Error {
  constructor(
    message = "On Vercel, connect Blob storage so BLOB_READ_WRITE_TOKEN is set — the server disk is read-only.",
  ) {
    super(message);
    this.name = "ProjectsPersistenceError";
  }
}

export async function writeUserProjects(list: Project[]): Promise<void> {
  if (useBlobForUserProjects()) {
    await writeUserProjectsToBlob(list);
    return;
  }

  if (process.env.VERCEL) {
    throw new ProjectsPersistenceError();
  }

  await ensureDataDir();
  await writeFile(dataPath, `${JSON.stringify(list, null, 2)}\n`, "utf8");
}

export async function getMergedProjects(): Promise<Project[]> {
  const user = await readUserProjects();
  const seen = new Set(user.map((p) => p.id));
  const defaults = defaultProjects.filter((p) => !seen.has(p.id));
  return [...defaults, ...user];
}

export function slugifyId(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "project";
}
