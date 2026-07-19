"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll } from "framer-motion";
import { GraduationCap, MapPin, Award } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/reveal";
import { education } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="03 · Education" title="Academic Foundation" />

        {/* ───────── Mobile: scroll-linked progress path + count-up stats ───────── */}
        <div className="sm:hidden">
          <MobileEducationPath />
        </div>

        {/* ───────── sm and up: original layout, unchanged ───────── */}
        <div className="mt-16 hidden space-y-5 sm:block">
          {education.map((item, i) => (
            <Reveal key={item.degree} delay={i * 0.08}>
              <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:flex-row sm:items-start sm:gap-6 sm:p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <h3 className="font-display text-sm font-semibold leading-snug sm:text-base">
                      {item.degree}
                    </h3>
                    <span className="section-label shrink-0">{item.period}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-fg-muted">
                    <span>{item.institution}</span>
                    <span className="text-border">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {item.location}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-fg-muted">
                    {item.cgpa && (
                      <span>
                        CGPA: <strong className="text-fg">{item.cgpa}</strong>
                      </span>
                    )}
                    {item.percentage && (
                      <span>
                        Score: <strong className="text-fg">{item.percentage}%</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileEducationPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  return (
    <div ref={containerRef} className="relative mt-12 pl-9">
      {/* static track */}
      <div className="absolute left-[15px] top-1 bottom-1 w-[3px] rounded-full bg-border" />
      {/* animated fill, scroll-linked */}
      <motion.div
        className="absolute left-[15px] top-1 w-[3px] origin-top rounded-full bg-gradient-to-b from-accent via-signal to-accent"
        style={{ scaleY: scrollYProgress, height: "calc(100% - 0.5rem)" }}
      />

      <div className="space-y-8">
        {education.map((item, i) => (
          <EducationNode key={item.degree} item={item} index={i} isLatest={i === 0} />
        ))}
      </div>
    </div>
  );
}

function EducationNode({
  item,
  index,
  isLatest,
}: {
  item: (typeof education)[number];
  index: number;
  isLatest: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative">
      {/* milestone node marker */}
      <motion.div
        className="absolute -left-9 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent/50 bg-bg text-accent"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <GraduationCap className="h-4 w-4" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5"
      >
        {isLatest && (
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 font-display text-[10px] text-accent">
            <Award className="h-3 w-3" /> Latest
          </span>
        )}

        <span className="section-label">{item.period}</span>
        <h3 className="mt-1.5 pr-16 font-display text-sm font-semibold leading-snug">
          {item.degree}
        </h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-fg-muted">
          <span>{item.institution}</span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {item.location}
          </span>
        </div>

        {(item.cgpa || item.percentage) && (
          <div className="mt-4 flex gap-3 border-t border-border pt-4">
            {item.cgpa && (
              <div className="flex-1 rounded-xl bg-fg/5 px-3 py-2.5 text-center">
                <div className="font-display text-lg font-bold text-gradient">
                  <CountUp value={item.cgpa} decimals={2} start={inView} />
                </div>
                <div className="mt-0.5 text-[10px] text-fg-muted">CGPA</div>
              </div>
            )}
            {item.percentage && (
              <div className="flex-1 rounded-xl bg-fg/5 px-3 py-2.5 text-center">
                <div className="font-display text-lg font-bold text-gradient">
                  <CountUp value={item.percentage} decimals={2} suffix="%" start={inView} />
                </div>
                <div className="mt-0.5 text-[10px] text-fg-muted">Score</div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function CountUp({
  value,
  decimals = 0,
  suffix = "",
  start,
  duration = 1.1,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  start: boolean;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    let startTime: number | null = null;

    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value, duration]);

  return (
    <>
      {display.toFixed(decimals)}
      {suffix}
    </>
  );
}