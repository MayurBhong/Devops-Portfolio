"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, ChevronRight, ArrowRight } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/reveal";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="05 · Experience"
          title="Early hands-on experience, building toward a full-time role"
        />

        {/* ───────── Mobile: premium swipeable card deck (below sm) ───────── */}
        <div className="mt-12 sm:hidden">
          <MobileExperienceCarousel />
        </div>

        {/* ───────── sm and up: original vertical timeline, unchanged ───────── */}
        <div className="relative mt-16 hidden sm:block">
          <div className="absolute left-1/2 top-2 h-full w-px bg-border" />
          <div className="space-y-10">
            {experience.map((item, i) => (
              <div
                key={item.company}
                className={`relative flex flex-col sm:flex-row ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="flex sm:w-1/2 sm:justify-center">
                  <Reveal delay={0.1}>
                    <motion.div
                      className="relative z-10 mt-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-bg text-accent"
                      whileInView={{ scale: [0.6, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <Briefcase className="h-4 w-4" />
                    </motion.div>
                  </Reveal>
                </div>

                <Reveal
                  delay={0.15}
                  className={`ml-6 flex-1 sm:ml-0 sm:w-1/2 ${
                    i % 2 === 1 ? "sm:pr-10 sm:text-right" : "sm:pl-10"
                  }`}
                >
                  <div className="rounded-2xl border border-border bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                    <span className="section-label">{item.period}</span>
                    <h3 className="mt-2 font-display text-lg font-semibold">{item.role}</h3>
                    <div
                      className={`mt-1 flex items-center gap-1.5 text-sm text-fg-muted ${
                        i % 2 === 1 ? "sm:justify-end" : ""
                      }`}
                    >
                      <span>{item.company}</span>
                      <span className="text-border">•</span>
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{item.location}</span>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-fg-muted">
                      {item.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileExperienceCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const cardWidth = el.firstElementChild
        ? (el.firstElementChild as HTMLElement).offsetWidth + 16
        : 1;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActive(Math.min(experience.length - 1, Math.max(0, index)));
      if (el.scrollLeft > 12) setShowHint(false);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-1 pr-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {experience.map((item, i) => (
          <div
            key={item.company}
            className={cn(
              "relative w-[86%] shrink-0 snap-center overflow-hidden rounded-3xl border border-border bg-card/50 p-6 transition-all duration-500",
              active === i
                ? "scale-[1.0] border-accent/50 shadow-xl shadow-accent/10"
                : "scale-[0.96] opacity-70"
            )}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-signal to-accent" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />

            <div className="relative flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <Briefcase className="h-5 w-5" />
              </span>
              <span className="rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-display text-[11px] text-signal">
                {item.period}
              </span>
            </div>

            <div className="relative mt-5 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-gradient">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-base font-semibold leading-snug">
                {item.role}
              </h3>
            </div>

            <div className="relative mt-2 flex flex-wrap items-center gap-1.5 text-xs text-fg-muted">
              <span className="font-medium text-fg">{item.company}</span>
              <span className="text-border">•</span>
              <MapPin className="h-3 w-3" />
              <span>{item.location}</span>
            </div>

            <ul className="relative mt-4 space-y-2.5">
              {item.points.map((pt) => (
                <li key={pt} className="flex gap-2 text-xs leading-relaxed text-fg-muted">
                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {experience.map((item, i) => (
          <button
            key={item.company}
            type="button"
            aria-label={`Go to experience ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={cn(
              "cursor-pointer-target h-1.5 rounded-full transition-all duration-300",
              active === i ? "w-6 bg-accent" : "w-1.5 bg-border"
            )}
          />
        ))}
      </div>

      <motion.div
        animate={{ opacity: showHint ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-fg-muted"
      >
        <span>Swipe to explore</span>
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.span>
      </motion.div>
    </div>
  );
}