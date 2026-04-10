"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import type { Project } from "@/lib/portfolio-data";
import { SectionShell } from "@/components/ui/section-shell";
import { useSpotlight } from "@/hooks/use-spotlight";

type LoadStatus = "loading" | "ready" | "error";

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");
  const [selectedTag, setSelectedTag] = useState("All");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("request failed");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setProjects(Array.isArray(data) ? (data as Project[]) : []);
        setLoadStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setProjects([]);
        setLoadStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const tags = useMemo(() => {
    const allTags = projects.flatMap((project) => project.tags);
    return ["All", ...Array.from(new Set(allTags))];
  }, [projects]);

  const filtered = useMemo(() => {
    if (selectedTag === "All") return projects;
    return projects.filter((project) => project.tags.includes(selectedTag));
  }, [selectedTag, projects]);

  const activeProject = projects.find((project) => project.id === activeProjectId) ?? null;

  return (
    <SectionShell
      id="projects"
      eyebrow="Projects"
      title="Case studies built for outcomes, speed, and scale."
      description="Filter by technology and click any project for full context."
    >
      {loadStatus === "loading" ? (
        <div className="grid gap-6 lg:grid-cols-3" aria-busy="true" aria-label="Loading projects">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className="h-52 bg-white/10" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-2/3 rounded bg-white/10" />
                <div className="h-3 w-full rounded bg-white/5" />
                <div className="h-3 w-4/5 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      ) : loadStatus === "error" ? (
        <p className="rounded-2xl border border-rose-500/30 bg-rose-500/5 px-5 py-6 text-sm text-rose-200/90">
          Projects could not be loaded. Refresh the page or try again later.
        </p>
      ) : projects.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-6 text-sm text-slate-400">
          No projects to show yet.
        </p>
      ) : (
        <>
          <div className="mb-7 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  selectedTag === tag
                    ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                    : "border border-white/20 bg-white/5 text-slate-200 hover:border-white/40"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDetails={() => setActiveProjectId(project.id)}
                className={index === 0 ? "lg:col-span-2" : ""}
              />
            ))}
          </div>
        </>
      )}

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] grid place-items-center bg-slate-950/75 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-slate-900/90 p-6"
            >
              <button
                type="button"
                onClick={() => setActiveProjectId(null)}
                className="absolute right-4 top-4 text-slate-300 hover:text-white"
              >
                <FiX />
              </button>
              <h3 className="text-2xl font-semibold text-white">{activeProject.title}</h3>
              <p className="mt-4 text-slate-300">{activeProject.details}</p>
              <div className="mt-5 flex gap-3">
                <a href={activeProject.github} target="_blank" rel="noreferrer" className="rounded-lg bg-white/10 px-4 py-2 text-sm text-slate-100">
                  GitHub
                </a>
                <a href={activeProject.live} target="_blank" rel="noreferrer" className="rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white">
                  Live Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionShell>
  );
}

function ProjectCard({
  project,
  onDetails,
  className,
}: {
  project: Project;
  onDetails: () => void;
  className?: string;
}) {
  const { coords, onMove } = useSpotlight();

  return (
    <motion.article
      whileHover={{ rotateX: -3, rotateY: 2.5, y: -9 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-lg shadow-blue-950/20 ${className ?? ""}`}
      style={
        {
          "--spot-x": `${coords.x}%`,
          "--spot-y": `${coords.y}%`,
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--spot-x)_var(--spot-y),rgba(99,102,241,0.22),transparent_44%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative h-52">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-slate-300">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-200 hover:text-blue-300">
            <FiGithub />
          </a>
          <a href={project.live} target="_blank" rel="noreferrer" className="text-slate-200 hover:text-blue-300">
            <FiExternalLink />
          </a>
          <button
            type="button"
            onClick={onDetails}
            className="ml-auto rounded-lg border border-white/20 px-3 py-1 text-xs text-slate-200 transition hover:border-white/40"
          >
            Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}
