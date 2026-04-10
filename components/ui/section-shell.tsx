"use client";

import { motion } from "framer-motion";

type Props = {
  id: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionShell({ id, title, eyebrow, description, children, className }: Props) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-110px" }}
      transition={{ duration: 0.5 }}
      className={`mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20 ${className ?? ""}`}
    >
      {(eyebrow || title || description) && (
        <div className="mb-10 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-3 text-slate-600 dark:text-slate-300">{description}</p>
          ) : null}
        </div>
      )}
      {children}
    </motion.section>
  );
}
