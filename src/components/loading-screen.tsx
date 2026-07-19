"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return p + Math.random() * 22;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="font-display text-sm tracking-[0.3em] text-fg-muted">
            BOOTSTRAPPING
          </div>
          <div className="mt-6 font-display text-4xl font-bold text-gradient">
            {Math.min(100, Math.round(progress))}%
          </div>
          <div className="mt-6 h-px w-48 overflow-hidden bg-border">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
          <div className="mt-4 font-display text-[11px] text-fg-muted">
            $ terraform apply --auto-approve
            <span className="animate-blink">_</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[75] h-[3px] origin-left bg-gradient-to-r from-accent to-signal"
      style={{ scaleX }}
    />
  );
}
