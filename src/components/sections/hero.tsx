"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, FolderGit2, Mail } from "lucide-react";
import { NetworkBackground } from "@/components/network-background";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const typed = useTypingEffect(siteConfig.typingWords);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-grid pt-24"
    >
      <div className="absolute inset-0">
        <NetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="accent" className="mb-6">
            ● Open to entry-level opportunities
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="text-fg">{siteConfig.fullName}</span>
          <span className="mt-2 block text-2xl font-medium text-fg-muted sm:text-3xl">
            builds infra that ships itself.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex h-8 items-center font-display text-lg text-signal sm:text-xl"
        >
          <span>&gt;_ {typed}</span>
          <span className="ml-0.5 h-6 w-[2px] animate-blink bg-signal" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
        >
          {siteConfig.tagline} Fresh B.Tech graduate skilled in AWS cloud architecture, containerized
          platforms, and CI/CD pipelines that let teams deploy with confidence, not fear.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Button size="lg" onClick={() => scrollTo("#projects")}>
            <FolderGit2 className="h-4 w-4" /> View Projects
          </Button>
        
          <Button size="lg" variant="ghost" onClick={() => scrollTo("#contact")}>
            <Mail className="h-4 w-4" /> Contact Me
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6"
        >
          {[
            ["10+", "Hands-on cloud projects"],
            ["5", "AWS certifications"],
            ["3", "Internship completed"],
          ].map(([stat, label]) => (
            <div key={label}>
              <div className="font-display text-2xl font-bold text-gradient">{stat}</div>
              <div className="mt-1 text-xs text-fg-muted">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("#about")}
        aria-label="Scroll to about section"
        className="cursor-pointer-target absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-fg-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}
