"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Layers, Sparkles } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa6";
import { SectionHeading } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects, type Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="04 · Projects"
          title="Personal & academic projects that prove I can build"
          description="Self-driven and coursework projects where I applied AWS, Kubernetes, and IaC hands-on built to learn, deployed to prove it works."
        />

        {/* ───────── Mobile: tech ticker + centered spotlight modal ───────── */}
        <div className="mt-10 sm:hidden">
          <MobileProjectsExplorer />
        </div>

        {/* ───────── sm and up: original grid, unchanged ───────── */}
        <div className="mt-16 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={(i % 3) * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileProjectsExplorer() {
  const [selected, setSelected] = useState<Project | null>(null);

  // deduped tech list across every project, for the decorative ticker strip
  const allTech = useMemo(() => {
    const seen = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => seen.add(t)));
    return Array.from(seen);
  }, []);
  const tickerTech = [...allTech, ...allTech]; // duplicated for seamless loop

  return (
    <div>
      {/* tech-stack ticker — replaces the old filter chips */}
      <div className="relative overflow-hidden rounded-full border border-border bg-card/30 py-2.5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bg to-transparent" />
        <motion.div
          className="flex w-max gap-2 px-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: allTech.length * 2.2, repeat: Infinity, ease: "linear" }}
        >
          {tickerTech.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-fg/5 px-3 py-1 font-display text-[11px] text-fg-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* project count badge */}
      <div className="mt-5 flex items-center gap-2 px-1">
        <Sparkles className="h-3.5 w-3.5 text-accent" />
        <span className="font-display text-[11px] text-fg-muted">
          {projects.length} {projects.length === 1 ? "project" : "projects"} shipped so far
        </span>
      </div>

      {/* project list */}
      <div className="mt-4 space-y-3">
        {projects.map((project) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setSelected(project)}
            className="cursor-pointer-target flex w-full items-center gap-3 rounded-2xl border border-border bg-card/40 p-3 text-left transition-colors active:border-accent/40"
          >
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-display text-sm font-semibold">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                )}
              </div>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-fg-muted">
                <Layers className="h-3 w-3" /> {project.tech.length} technologies
              </p>
            </div>
            <span className="shrink-0 font-display text-[10px] text-fg-muted">View →</span>
          </button>
        ))}
      </div>

      {/* centered spotlight modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="relative max-h-[85vh] w-full max-w-sm overflow-y-auto rounded-3xl border border-accent/30 bg-bg-elevated shadow-2xl shadow-accent/10"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-signal to-accent" />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="cursor-pointer-target absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
                {selected.featured && (
                  <Badge variant="accent" className="absolute left-3 top-3">
                    Featured
                  </Badge>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-semibold">{selected.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {selected.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {selected.tech.map((t) => (
                    <Badge key={t} variant="signal">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="mt-6">
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer-target flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-display font-medium text-accent-fg"
                  >
                    <Github className="h-4 w-4" /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}