"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.2 });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[80] h-1 origin-left bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500"
      style={{ scaleX }}
    />
  );
}
