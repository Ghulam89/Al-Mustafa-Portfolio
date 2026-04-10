"use client";

import { motion } from "framer-motion";
import type { SkillAccent } from "@/lib/portfolio-data";
import { skillCards } from "@/lib/portfolio-data";
import { SectionShell } from "@/components/ui/section-shell";

const accentStyles: Record<
  SkillAccent,
  { icon: string; badge: string; glow: string }
> = {
  blue: {
    icon: "border-sky-500/55 text-sky-100 ring-2 ring-sky-500/25",
    badge: "border-sky-500/50 text-sky-400 bg-sky-500/10",
    glow: "hover:border-sky-400/70 hover:shadow-[0_0_32px_rgba(56,189,248,0.28)] hover:ring-sky-400/30",
  },
  cyan: {
    icon: "border-cyan-500/55 text-cyan-100 ring-2 ring-cyan-500/25",
    badge: "border-cyan-500/50 text-cyan-400 bg-cyan-500/10",
    glow: "hover:border-cyan-400/70 hover:shadow-[0_0_32px_rgba(34,211,238,0.28)] hover:ring-cyan-400/30",
  },
  fuchsia: {
    icon: "border-fuchsia-500/55 text-fuchsia-100 ring-2 ring-fuchsia-500/25",
    badge: "border-fuchsia-500/50 text-fuchsia-400 bg-fuchsia-500/10",
    glow: "hover:border-fuchsia-400/70 hover:shadow-[0_0_32px_rgba(232,121,249,0.28)] hover:ring-fuchsia-400/30",
  },
  emerald: {
    icon: "border-emerald-500/55 text-emerald-100 ring-2 ring-emerald-500/25",
    badge: "border-emerald-500/50 text-emerald-400 bg-emerald-500/10",
    glow: "hover:border-emerald-400/70 hover:shadow-[0_0_32px_rgba(52,211,153,0.28)] hover:ring-emerald-400/30",
  },
  violet: {
    icon: "border-violet-500/55 text-violet-100 ring-2 ring-violet-500/25",
    badge: "border-violet-500/50 text-violet-400 bg-violet-500/10",
    glow: "hover:border-violet-400/70 hover:shadow-[0_0_32px_rgba(167,139,250,0.28)] hover:ring-violet-400/30",
  },
  amber: {
    icon: "border-amber-400/60 text-amber-100 ring-2 ring-amber-400/30",
    badge: "border-amber-500/50 text-amber-400 bg-amber-500/10",
    glow: "hover:border-amber-300/80 hover:shadow-[0_0_36px_rgba(251,191,36,0.4)] hover:ring-amber-300/40",
  },
  rose: {
    icon: "border-rose-500/55 text-rose-100 ring-2 ring-rose-500/25",
    badge: "border-rose-500/50 text-rose-400 bg-rose-500/10",
    glow: "hover:border-rose-400/70 hover:shadow-[0_0_32px_rgba(251,113,133,0.28)] hover:ring-rose-400/30",
  },
  orange: {
    icon: "border-orange-500/55 text-orange-100 ring-2 ring-orange-500/25",
    badge: "border-orange-500/50 text-orange-400 bg-orange-500/10",
    glow: "hover:border-orange-400/70 hover:shadow-[0_0_32px_rgba(251,146,60,0.28)] hover:ring-orange-400/30",
  },
  slate: {
    icon: "border-slate-500/55 text-slate-100 ring-2 ring-slate-500/25",
    badge: "border-slate-500/50 text-slate-400 bg-slate-500/10",
    glow: "hover:border-slate-400/70 hover:shadow-[0_0_28px_rgba(148,163,184,0.25)] hover:ring-slate-400/25",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.02 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function SkillsSection() {
  return (
    <SectionShell
      id="skills"
      eyebrow="Skills"
      title="Technologies I build with."
      description="A focused stack for shipping polished interfaces, APIs, data layers, and cloud delivery."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {skillCards.map((skill, index) => {
          const a = accentStyles[skill.accent];
          const Icon = skill.icon;
          return (
            <motion.article
              key={`${skill.name}-${index}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 22 } }}
              className={`group relative flex min-h-[148px] flex-col items-center justify-between rounded-2xl border border-white/[0.08] bg-[#111] p-4 shadow-lg shadow-black/40 ring-1 ring-white/[0.04] transition-colors duration-300 dark:bg-[#0d0d0d] ${a.glow}`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-[#0a0a0a] ${a.icon}`}
              >
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-3 text-center text-sm font-bold leading-tight text-white sm:text-base">
                {skill.name}
              </h3>
              <span
                className={`mt-3 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide sm:text-xs ${a.badge}`}
              >
                {skill.category}
              </span>
            </motion.article>
          );
        })}
      </div>
    </SectionShell>
  );
}
