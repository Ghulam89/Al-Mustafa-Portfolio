import { NextResponse } from "next/server";

import { getMergedProjects } from "@/lib/projects-store";

export async function GET() {
  try {
    const projects = await getMergedProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
  }
}
