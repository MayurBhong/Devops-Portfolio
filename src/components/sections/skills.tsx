"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Box,
  FileCode2,
  GitBranch,
  Activity,
  Terminal,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import { Reveal, SectionHeading } from "@/components/reveal";
import { skillCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Box,
  FileCode2,
  GitBranch,
  Activity,
  Terminal,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="02 · Skills"
          title="Toolbox for shipping cloud-native systems"
          description="Proficient in AWS cloud services, DevOps tools, infrastructure automation, containerization, orchestration, and CI/CD pipeline implementation."
        />

        {/* ───────── Mobile: tab switcher + radial gauge dashboard ───────── */}
        <div className="mt-12 sm:hidden">
          <MobileSkillsDashboard />
        </div>

        {/* ───────── sm and up: original grid, unchanged ───────── */}
        <div className="mt-16 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? Terminal;
            return (
              <Reveal key={cat.category} delay={(i % 3) * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal/10 text-signal">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-sm font-semibold">{cat.category}</h3>
                  </div>

                  <div className="relative mt-6 space-y-4">
                    {cat.skills.map((skill, j) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-fg-muted">{skill.name}</span>
                          <span className="font-display text-[11px] text-accent">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-fg/5">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-accent to-signal"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: j * 0.08, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MobileSkillsDashboard() {
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];
  const Icon = iconMap[cat.icon] ?? Terminal;
  const topSkill = [...cat.skills].sort((a, b) => b.level - a.level)[0];

  return (
    <div>
      {/* scrollable category tab bar with sliding pill */}
      <div className="flex gap-2 overflow-x-auto pb-1 pl-1 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {skillCategories.map((c, i) => {
          const TabIcon = iconMap[c.icon] ?? Terminal;
          const isActive = active === i;
          return (
            <button
              key={c.category}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "cursor-pointer-target relative flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 font-display text-[11px] transition-colors",
                isActive
                  ? "border-accent/50 text-accent"
                  : "border-border text-fg-muted"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="skill-tab-active"
                  className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <TabIcon className="h-3.5 w-3.5" />
              {c.category}
            </button>
          );
        })}
      </div>

      {/* strongest-skill spotlight */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-signal/30 bg-signal/5 px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-signal/10 text-signal">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-[10px] uppercase tracking-wide text-signal">
                Strongest in {cat.category}
              </p>
              <p className="truncate text-sm font-medium">{topSkill.name}</p>
            </div>
            <span className="ml-auto font-display text-lg font-bold text-gradient">
              {topSkill.level}%
            </span>
          </div>

          {/* radial gauge grid */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            {cat.skills.map((skill, j) => (
              <RadialGauge key={skill.name} name={skill.name} level={skill.level} delay={j * 0.08} />
            ))}
          </div>

          <div className="relative mt-2 flex items-center gap-2 pl-1 text-[11px] text-fg-muted">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon className="h-3 w-3" />
            </span>
            {cat.skills.length} skills tracked in this category
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function RadialGauge({ name, level, delay }: { name: string; level: number; delay: number }) {
  const size = 96;
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card/40 p-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-fg/5"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            stroke="url(#gauge-gradient)"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, delay, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gauge-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgb(var(--accent))" />
              <stop offset="100%" stopColor="rgb(var(--signal))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold">
          {level}%
        </div>
      </div>
      <p className="mt-2 text-center text-xs leading-tight text-fg-muted">{name}</p>
    </div>
  );
}