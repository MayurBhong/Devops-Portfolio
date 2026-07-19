"use client";

import Image from "next/image";
import { FaGithub as Github } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/data";

export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* desktop-only hover overlay — pointer-events-none so it never
              intercepts taps on touch devices where hover never leaves */}
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center gap-3 bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 md:flex">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source on GitHub`}
              className="cursor-pointer-target pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-transform hover:scale-110 hover:bg-accent hover:text-accent-fg"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
          {project.featured && (
            <Badge variant="accent" className="absolute left-3 top-3">
              Featured
            </Badge>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-base font-semibold">{project.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge key={t} variant="signal">
                {t}
              </Badge>
            ))}
          </div>

          {/* always-visible tap targets — the real way to open links on mobile */}
          <div className="mt-5 border-t border-border pt-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer-target flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-xs font-display text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              <Github className="h-3.5 w-3.5" /> Code
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}