"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950">
      <div className="text-center">
        <motion.div
          className="mx-auto mb-4 h-16 w-16 rounded-full border-2 border-blue-500/25 border-t-blue-400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        />
        <motion.p
          className="text-sm tracking-[0.28em] text-slate-300"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          LOADING PORTFOLIO
        </motion.p>
      </div>
    </div>
  );
}
