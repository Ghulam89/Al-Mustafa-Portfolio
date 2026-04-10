"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { counters } from "@/lib/portfolio-data";
import { SectionShell } from "@/components/ui/section-shell";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="Crafting robust products with design-driven engineering."
      description="I blend product strategy, polished UI execution, and scalable backend architecture to ship high-impact digital solutions."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 lg:col-span-7"
        >
          <Image
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
            alt="Developer workspace"
            width={900}
            height={580}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-5">
            <p className="text-sm font-medium text-slate-200">
              Shipping elegant user experiences with resilient backend systems.
            </p>
          </div>
        </motion.div>

        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="leading-relaxed text-slate-300">
              I am a full stack MERN developer focused on building elegant interfaces, efficient APIs, and resilient
              deployment pipelines. My work emphasizes clean architecture, performance, and user-first outcomes.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/15 to-violet-500/10 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-blue-300">Core Philosophy</p>
            <p className="mt-3 text-slate-200">
              Strategy first. Craft second. Scale always.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {counters.map((counter) => (
              <motion.div
                key={counter.label}
                whileInView={{ opacity: [0, 1], y: [18, 0] }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <p className="text-2xl font-semibold text-white">{counter.value}+</p>
                <p className="mt-1 text-xs text-slate-300">{counter.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-12">
          <p className="text-center text-sm italic text-slate-400">
            “Great products are engineered like systems and experienced like stories.”
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
