"use client";

import { experiences } from "@/lib/portfolio-data";
import { SectionShell } from "@/components/ui/section-shell";
import { motion } from "framer-motion";

export function ExperienceSection() {
  return (
    <SectionShell id="experience" eyebrow="Experience" title="A timeline of product-focused engineering delivery.">
      <div className="border-l border-white/20 pl-6">
        {experiences.map((item) => (
          <motion.article
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative mb-8"
          >
            <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_20px_#60a5fa]" />
            <p className="text-sm font-semibold text-blue-300">{item.period}</p>
            <h3 className="mt-1 text-lg font-semibold text-white">
              {item.role} - {item.company}
            </h3>
            <p className="mt-2 text-sm text-slate-300">{item.summary}</p>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
