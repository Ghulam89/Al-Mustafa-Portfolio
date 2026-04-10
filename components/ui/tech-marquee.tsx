"use client";

const items = [
  "NEXT.JS",
  "REACT",
  "NODE.JS",
  "MONGODB",
  "SQL",
  "AWS",
  "DOCKER",
  "GITHUB ACTIONS",
  "REACT NATIVE",
];

export function TechMarquee() {
  const row = [...items, ...items];
  return (
    <div className="relative mt-2 overflow-hidden border-y border-slate-200/50 py-4 opacity-55 dark:border-white/[0.07] dark:opacity-50">
      <div className="marquee-track-slow flex min-w-max items-center gap-14">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="text-[12px] font-medium tracking-[0.35em] text-slate-500 dark:text-slate-400"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
