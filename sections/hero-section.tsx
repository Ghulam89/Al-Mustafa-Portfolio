"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTypingText } from "@/hooks/use-typing-text";
import { heroPortraitSrc, typingSkills } from "@/lib/portfolio-data";
import { gradients } from "@/styles/theme";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TechMarquee } from "@/components/ui/tech-marquee";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((module) => module.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 -z-10 bg-slate-100 dark:bg-slate-950" aria-hidden />
    ),
  },
);

export function HeroSection() {
  const typingText = useTypingText(typingSkills, 80, 1200);

  return (
    <section className="relative flex min-h-screen items-center overflow-x-hidden px-6 pb-8 pt-32 sm:px-8 sm:pt-28">
      <HeroScene />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,transparent_45%,transparent_100%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.25)_0%,transparent_50%,transparent_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl xl:max-w-6xl">
        <div className="grid grid-cols-1  sm:mt-6 mt-0 items-center gap-12 lg:grid-cols-12 lg:gap-y-12 lg:gap-x-16 xl:gap-x-24">
          {/* Left — stacked headline like reference: Hi → name pill → gradient title */}
          <div className="order-2 lg:order-1 lg:col-span-7 lg:min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-sky-600 sm:text-sm dark:text-sky-300/90"
            >
              Full Stack MERN Developer
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              <h1 className="max-w-3xl font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-white">
                <span className="block text-4xl sm:text-5xl md:text-6xl">Hi, I&apos;m</span>
                <span className="mt-3 inline-block rounded-xl border border-pink-400/55 bg-white/80 px-3.5 py-2 text-4xl text-slate-900 shadow-[0_0_0_1px_rgba(244,114,182,0.15),0_0_28px_rgba(236,72,153,0.18),0_0_56px_rgba(168,85,247,0.12)] sm:text-4xl md:px-4 md:py-2.5 md:text-5xl dark:border-pink-400/45 dark:bg-slate-950/40 dark:text-white dark:shadow-[0_0_0_1px_rgba(244,114,182,0.25),0_0_32px_rgba(236,72,153,0.22),0_0_64px_rgba(168,85,247,0.18)]">
                  Ghulam Mustafa
                </span>
                <span className={`mt-3 block text-3xl sm:text-5xl md:text-6xl ${gradients.text}`}>
                  Full Stack Developer
                </span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400"
            >
              I design premium digital experiences and scalable cloud-native systems with modern frontend,
              backend, and DevOps craftsmanship.
            </motion.p>
            <p className="mt-5 text-base text-slate-700 dark:text-slate-400">
              Building with{" "}
              <span className="font-semibold text-violet-600 dark:text-fuchsia-300/95">{typingText}</span>
              <span className="ml-0.5 animate-pulse text-violet-600 dark:text-fuchsia-300">|</span>
            </p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <MagneticButton
                href="#projects"
                className={`rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:scale-[1.03] hover:shadow-violet-500/35 ${gradients.primary}`}
              >
                View Work
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="rounded-xl border border-slate-400/70 bg-transparent px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100/80 dark:border-slate-500/60 dark:text-white dark:hover:bg-white/6"
              >
                Hire Me
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — large purple ambient glow, gradient frame (fuchsia→blue), pop-out portrait */}
          <div className="order-1 flex w-full justify-center overflow-visible max-sm:pt-2 lg:order-2 lg:col-span-5 lg:justify-end lg:pt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[min(460px,78vw)] w-full max-w-[300px] overflow-visible sm:h-[460px] sm:max-w-[340px] lg:h-[min(500px,54vh)] lg:max-w-[min(400px,100%)] lg:pt-6 xl:h-[520px] xl:max-w-[min(420px,100%)]"
            >
              {/* Background glow — strong top / right (reference) */}
              <div
                className="pointer-events-none absolute -right-20 -top-10 bottom-[-8%] left-[-15%] z-0 rounded-[2.5rem] bg-[radial-gradient(ellipse_75%_70%_at_78%_12%,rgba(192,38,211,0.5)_0%,rgba(124,58,237,0.28)_42%,rgba(59,130,246,0.1)_62%,transparent_78%)] blur-3xl dark:bg-[radial-gradient(ellipse_75%_70%_at_78%_12%,rgba(217,70,239,0.48)_0%,rgba(168,85,247,0.35)_40%,rgba(56,189,248,0.12)_58%,transparent_76%)]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -left-12 top-[5%] z-0 h-[55%] w-[70%] rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.22),rgba(168,85,247,0.12)_50%,transparent_68%)] blur-2xl dark:opacity-100"
                aria-hidden
              />

              {/* Neon gradient ring — under portrait so arms/shoulders can sit in front (reference) */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 top-14 z-10 rounded-[1rem] bg-linear-to-br from-fuchsia-300/95 via-violet-400/85 to-sky-400/95 p-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_40px_-4px_rgba(192,132,252,0.5),0_0_72px_-12px_rgba(56,189,248,0.3)] dark:from-fuchsia-400/75 dark:via-violet-500/65 dark:to-sky-400/70 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_48px_-4px_rgba(168,85,247,0.55),0_0_96px_-16px_rgba(56,189,248,0.2),inset_0_0_1px_0_rgba(236,72,153,0.35)]"
                aria-hidden
              >
                {/* Clear / glass center — stars + glow show through in dark */}
                <div className="h-full w-full rounded-[calc(1.75rem-2px)] bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_0_0_1px_rgba(255,255,255,0.45)] dark:bg-transparent dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
              </div>

              {/* Portrait above frame, horizontally centered, wider than ring so sides can break past border */}
              <figure className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-[min(122%,26rem)] -translate-x-1/2 -top-1 sm:-top-11 sm:w-[min(128%,28rem)] md:-top-14">
                <Image
                  src={heroPortraitSrc}
                  alt="Ghulam Mustafa — Full Stack MERN Developer"
                  fill
                  className="object-cover max-sm:object-[center_top] sm:object-[center_16%]"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 42vw, 448px"
                  priority
                />
              </figure>
            </motion.div>
          </div>
        </div>

        <TechMarquee />
      </div>
    </section>
  );
}
