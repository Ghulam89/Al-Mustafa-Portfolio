import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { Project } from "@/lib/portfolio-data";
import { projects as defaultProjects } from "@/lib/portfolio-data";

const dataPath = path.join(process.cwd(), "data", "user-projects.json");

async function ensureDataDir() {
  await mkdir(path.dirname(dataPath), { recursive: true });
}

export async function readUserProjects(): Promise<Project[]> {
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

export async function writeUserProjects(list: Project[]): Promise<void> {
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
