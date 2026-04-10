"use client";

import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export function FooterSection() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-8">
        <p className="text-sm text-slate-300">
          © {new Date().getFullYear()} Ghulam Mustafa. Crafted with precision.
        </p>
        <div className="flex items-center gap-4 text-slate-200">
          <a href="https://github.com/ghulam-mustafa" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-blue-300">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/ghulam-mustafa" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-blue-300">
            <FiLinkedin />
          </a>
          <a href="mailto:ghulam.mustafa.dev@gmail.com" aria-label="Email" className="transition hover:text-blue-300">
            <FiMail />
          </a>
        </div>
      </div>
    </footer>
  );
}
