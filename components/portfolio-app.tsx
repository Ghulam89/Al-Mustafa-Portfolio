"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { CommandPalette } from "@/components/ui/command-palette";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { HeroSection } from "@/sections/hero-section";
import { AboutSection } from "@/sections/about-section";
import { SkillsSection } from "@/sections/skills-section";
import { ProjectsSection } from "@/sections/projects-section";
import { ExperienceSection } from "@/sections/experience-section";
import { ServicesSection } from "@/sections/services-section";
import { TestimonialsSection } from "@/sections/testimonials-section";
import { BlogSection } from "@/sections/blog-section";
import { ContactSection } from "@/sections/contact-section";
import { FooterSection } from "@/sections/footer-section";

export function PortfolioApp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1050);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950">
      <div className="noise-mask pointer-events-none fixed inset-0 z-[1]" />
      <div className="pointer-events-none fixed -left-36 top-1/3 z-[1] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none fixed -right-28 top-2/3 z-[1] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <CommandPalette />

      <AnimatePresence>{loading ? <LoadingScreen /> : null}</AnimatePresence>

      <motion.main
        className="relative z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ServicesSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
        <FooterSection />
      </motion.main>
    </div>
  );
}
