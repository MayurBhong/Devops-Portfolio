"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cloud, Container, GitBranch, Server, ChevronDown, Terminal } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/reveal";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: Cloud,
    title: "Cloud Architecture",
    desc: "Designing resilient, cost-aware AWS infrastructure across multi-account setups.",
  },
  {
    icon: Container,
    title: "Containerization",
    desc: "Docker & Kubernetes platforms that scale from prototype to production traffic.",
  },
  {
    icon: GitBranch,
    title: "CI/CD Automation",
    desc: "Pipelines that turn a merged PR into a deployed, monitored release automatically.",
  },
  {
    icon: Server,
    title: "Reliability",
    desc: "Observability and incident response practices that keep MTTR low and teams calm.",
  },
];

const bioLines = [
  {
    command: "whoami",
    output: `Based in ${siteConfig.location}, I'm a recent graduate and ${siteConfig.role} who spent college building AWS labs, Kubernetes clusters, and CI/CD pipelines on the side not just studying them.`,
  },
  {
    command: "cat philosophy.md",
    output:
      "I care about infrastructure as code, security by default, and understanding systems deeply rather than just following tutorials. Looking for a first full-time role where I can keep learning fast.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="01 · About"
          title="Fresh graduate, ready to build reliable cloud systems"
          description="I turn what I've learned about AWS, containers, and automation into real, working infrastructure eager to bring that energy to a team as my first full-time role."
        />

        {/* ───────── Mobile: terminal bio + expandable pillar accordion ───────── */}
        <div className="mt-12 space-y-5 sm:hidden">
          <TerminalBio />
          <PillarAccordion />
        </div>

        {/* ───────── sm and up: original layout, unchanged ───────── */}
        <div className="mt-16 hidden gap-10 sm:grid lg:grid-cols-5 lg:items-start">
          <Reveal className="lg:col-span-2">
            <div className="glass relative overflow-hidden rounded-3xl p-8">
              <p className="leading-relaxed text-fg-muted">
                Based in {siteConfig.location}, I&apos;m a recent graduate and {siteConfig.role}
                who spent college building AWS labs, Kubernetes clusters, and CI/CD pipelines
                on the side not just studying them. I&apos;m looking for a first full-time
                role where I can keep learning fast and contribute from day one.
              </p>
              <p className="mt-4 leading-relaxed text-fg-muted">
                I care about infrastructure as code, security by default, and understanding
                systems deeply rather than just following tutorials. I&apos;ve completed one
                internship, several self-driven cloud projects, and hold foundational AWS and
                Kubernetes certifications to back it up.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Terraform", "AWS", "Kubernetes", "Python", "Linux"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-3 py-1 font-display text-[11px] text-fg-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-border bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-sm font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalBio() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [typedLines, setTypedLines] = useState<string[]>(["", ""]);
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || done) return;

    if (lineIndex >= bioLines.length) {
      setDone(true);
      return;
    }

    const full = bioLines[lineIndex].output;
    let i = 0;
    const interval = setInterval(() => {
      i += 3;
      setTypedLines((prev) => {
        const next = [...prev];
        next[lineIndex] = full.slice(0, i);
        return next;
      });
      if (i >= full.length) {
        clearInterval(interval);
        setTimeout(() => setLineIndex((li) => li + 1), 250);
      }
    }, 14);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, lineIndex]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-border bg-[#0a0e14] shadow-xl"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border/60 bg-black/30 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 flex items-center gap-1.5 font-display text-[11px] text-fg-muted">
          <Terminal className="h-3 w-3" /> bio.sh - zsh
        </span>
      </div>

      <div className="space-y-4 p-5 font-display text-xs leading-relaxed">
        {bioLines.map((line, i) => (
          <div key={line.command} className={cn(i > lineIndex ? "opacity-0" : "opacity-100", "transition-opacity duration-300")}>
            <div className="flex items-center gap-2 text-signal">
              <span>$</span>
              <span>{line.command}</span>
            </div>
            <p className="mt-1.5 whitespace-pre-line text-fg-muted">
              {typedLines[i]}
              {i === lineIndex && !done && (
                <span className="ml-0.5 inline-block h-3 w-1.5 animate-blink bg-signal align-middle" />
              )}
            </p>
          </div>
        ))}

        {done && (
          <div className="flex items-center gap-2 text-accent">
            <span>$</span>
            <span className="animate-blink">_</span>
          </div>
        )}
      </div>
    </div>
  );
}

function PillarAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      {pillars.map((p, i) => {
        const isOpen = open === i;
        return (
          <div key={p.title} className={i !== 0 ? "border-t border-border" : ""}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="cursor-pointer-target flex w-full items-center gap-3 bg-card/40 px-4 py-4 text-left"
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                  isOpen ? "bg-accent text-accent-fg" : "bg-accent/10 text-accent"
                )}
              >
                <p.icon className="h-4 w-4" />
              </span>
              <span className="flex-1 font-display text-sm font-semibold">{p.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-fg-muted"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden bg-card/20"
            >
              <p className="px-4 pb-4 pl-[52px] text-sm leading-relaxed text-fg-muted">
                {p.desc}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}