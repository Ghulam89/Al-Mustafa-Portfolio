"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/portfolio-data";
import { SectionShell } from "@/components/ui/section-shell";

export function ServicesSection() {
  return (
    <SectionShell id="services" eyebrow="Services" title="How I help teams ship faster with confidence.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <motion.article
            key={service.title}
            whileHover={{ y: -6, scale: 1.01 }}
            className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-lg shadow-black/20 transition"
          >
            <service.icon className="h-6 w-6 text-blue-300" />
            <h3 className="mt-4 text-lg font-semibold text-white">{service.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{service.description}</p>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
