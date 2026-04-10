"use client";

import { testimonials } from "@/lib/portfolio-data";
import { SectionShell } from "@/components/ui/section-shell";

export function TestimonialsSection() {
  return (
    <SectionShell id="testimonials" eyebrow="Testimonials" title="Trusted by founders and product teams.">
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((item) => (
          <blockquote key={item.author} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-slate-200">&ldquo;{item.quote}&rdquo;</p>
            <footer className="mt-4 text-sm font-semibold text-white">{item.author}</footer>
          </blockquote>
        ))}
      </div>
    </SectionShell>
  );
}
