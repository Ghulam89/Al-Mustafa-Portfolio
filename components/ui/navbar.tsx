"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { navLinks } from "@/lib/portfolio-data";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-7xl px-4 pt-4">
      <nav
        className={
          isLight
            ? "flex items-center justify-between rounded-2xl border-2 border-slate-300 bg-white px-5 py-3 shadow-md shadow-slate-200/80"
            : "flex items-center justify-between rounded-2xl border-2 border-slate-800 bg-slate-950 px-5 py-3 shadow-lg shadow-black/30"
        }
      >
        <Link
          href="/"
          className={`text-sm font-semibold tracking-wide ${isLight ? "text-slate-900" : "text-white"}`}
        >
          Ghulam Mustafa
        </Link>
        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                isLight
                  ? "text-sm text-slate-600 transition hover:text-slate-900"
                  : "text-sm text-slate-200 transition hover:text-white"
              }
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`hidden text-xs md:inline ${isLight ? "text-slate-500" : "text-slate-400"}`}
          >
            Ctrl/Cmd + K
          </span>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
