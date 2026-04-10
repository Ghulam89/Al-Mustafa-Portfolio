"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import type { Project } from "@/lib/portfolio-data";

type SessionState =
  | { status: "loading" }
  | { status: "unconfigured" }
  | { status: "login" }
  | { status: "ready" };

export function AdminPanel() {
  const [session, setSession] = useState<SessionState>({ status: "loading" });
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const refreshList = useCallback(async () => {
    setLoadError("");
    const res = await fetch("/api/admin/projects", { credentials: "include" });
    if (!res.ok) {
      setLoadError("Could not load your projects.");
      return;
    }
    const data = (await res.json()) as Project[];
    setUserProjects(data);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/session");
      const data = (await res.json()) as {
        authenticated: boolean;
        configured: boolean;
      };
      if (cancelled) return;
      if (!data.configured) {
        setSession({ status: "unconfigured" });
        return;
      }
      if (data.authenticated) {
        setSession({ status: "ready" });
        await refreshList();
      } else {
        setSession({ status: "login" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshList]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
      credentials: "include",
    });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      setLoginError(j.error ?? "Login failed");
      return;
    }
    setPassword("");
    setSession({ status: "ready" });
    await refreshList();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setSession({ status: "login" });
    setUserProjects([]);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setMessage("");
    const fd = new FormData();
    fd.set("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: fd,
      credentials: "include",
    });
    setUploading(false);
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      setMessage(j.error ?? "Upload failed");
      return;
    }
    const { url } = (await res.json()) as { url: string };
    setImageUrl(url);
    setMessage("Image uploaded — URL filled below.");
  }

  async function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title,
        description,
        details: details || description,
        tags: tagList,
        github,
        live,
        image: imageUrl,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      setMessage(j.error ?? "Could not save project");
      return;
    }
    setTitle("");
    setDescription("");
    setDetails("");
    setTags("");
    setGithub("");
    setLive("");
    setImageUrl("");
    setMessage("Project added. It will show on the home page.");
    await refreshList();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project from your portfolio?")) return;
    const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      setMessage(j.error ?? "Delete failed");
      return;
    }
    await refreshList();
    setMessage("Removed.");
  }

  if (session.status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">
        Loading…
      </div>
    );
  }

  if (session.status === "unconfigured") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-slate-200">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-white">
          Admin not configured
        </h1>
        <p className="mt-4 text-slate-400">
          Add <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">ADMIN_PASSWORD</code> to{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">.env.local</code>, restart{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">npm run dev</code>, then open
          this page again.
        </p>
        <Link href="/" className="mt-8 inline-block text-blue-400 hover:text-blue-300">
          ← Back to site
        </Link>
      </div>
    );
  }

  if (session.status === "login") {
    return (
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-12">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-white">
          Portfolio admin
        </h1>
        <p className="mt-2 text-sm text-slate-400">Sign in with your admin password.</p>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-blue-500/60 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
          />
          {loginError ? <p className="text-sm text-rose-400">{loginError}</p> : null}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Sign in
          </button>
        </form>
        <Link href="/" className="mt-10 text-center text-sm text-slate-500 hover:text-slate-300">
          ← Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-200">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-white">
            Upload projects
          </h1>
          <div className="flex gap-3">
            <Link href="/" className="text-sm text-slate-400 hover:text-white">
              View site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-white"
            >
              Log out
            </button>
          </div>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          New projects are saved on this machine in{" "}
          <code className="rounded bg-white/10 px-1">data/user-projects.json</code>. Images go to{" "}
          <code className="rounded bg-white/10 px-1">public/uploads/projects/</code>.
        </p>

        <form onSubmit={handleAddProject} className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
              Cover image
            </label>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <label className="cursor-pointer rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm hover:border-white/35">
                {uploading ? "Uploading…" : "Choose file"}
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleUpload} disabled={uploading} />
              </label>
              <span className="text-xs text-slate-500">or paste URL below</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">Image URL</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              placeholder="/uploads/projects/… or https://…"
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">Short description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={2}
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">Details (modal)</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              placeholder="Optional — defaults to short description"
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">Tags (comma-separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Next.js, TypeScript, AWS"
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">GitHub URL</label>
              <input
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/…"
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">Live demo URL</label>
              <input
                value={live}
                onChange={(e) => setLive(e.target.value)}
                placeholder="https://…"
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none"
              />
            </div>
          </div>
          {message ? <p className="text-sm text-emerald-400/90">{message}</p> : null}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving…" : "Add project"}
          </button>
        </form>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-white">Your uploaded projects</h2>
          {loadError ? <p className="mt-2 text-sm text-rose-400">{loadError}</p> : null}
          <ul className="mt-4 space-y-3">
            {userProjects.length === 0 ? (
              <li className="text-sm text-slate-500">None yet — add one above.</li>
            ) : (
              userProjects.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-slate-100">{p.title}</p>
                    <p className="text-xs text-slate-500">{p.id}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    className="rounded-lg border border-rose-500/40 px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-500/10"
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
