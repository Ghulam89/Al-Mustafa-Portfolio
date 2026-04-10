"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[70] hidden h-52 w-52 rounded-full bg-blue-500/20 blur-3xl md:block"
      animate={{ x: position.x - 104, y: position.y - 104 }}
      transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.35 }}
    />
  );
}
