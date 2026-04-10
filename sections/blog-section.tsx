"use client";

import { blogPosts } from "@/lib/portfolio-data";
import { SectionShell } from "@/components/ui/section-shell";

export function BlogSection() {
  return (
    <SectionShell id="blog" eyebrow="Blog" title="Insights on architecture, performance, and delivery.">
      <div className="grid gap-5 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold text-white">{post.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{post.excerpt}</p>
            <a href={post.href} className="mt-4 inline-block text-sm font-semibold text-blue-300 hover:text-blue-200">
              Read more
            </a>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
