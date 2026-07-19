"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, BadgeCheck, RotateCw } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/reveal";
import { certifications, type Certification } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="06 · Certifications"
          title="Validated, hands-on expertise"
          description="Professional-level certifications across AWS and the cloud-native ecosystem."
        />

        {/* ───────── Mobile: premium flip-card badge shelf (below sm) ───────── */}
        <div className="mt-12 sm:hidden">
          <MobileCertCarousel />
        </div>

        {/* ───────── sm and up: original grid, unchanged ───────── */}
        <div className="mt-16 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={(i % 3) * 0.1}>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer-target group flex h-full items-start gap-4 rounded-2xl border border-border bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="relative h-12 w-12 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Image src={cert.logo} alt={cert.issuer} fill />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-sm font-semibold leading-snug">
                    {cert.name}
                  </h3>
                  <p className="mt-1 text-xs text-fg-muted">{cert.issuer}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] text-signal">
                      <BadgeCheck className="h-3.5 w-3.5" /> {cert.date}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-fg-muted transition-colors group-hover:text-accent" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileCertCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.firstElementChild
        ? (el.firstElementChild as HTMLElement).offsetWidth + 16
        : 1;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActive(Math.min(certifications.length - 1, Math.max(0, index)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
  };

  const toggleFlip = (i: number) =>
    setFlipped((f) => ({ ...f, [i]: !f[i] }));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between px-1">
        <span className="font-display text-[11px] text-fg-muted">
          {String(active + 1).padStart(2, "0")} / {String(certifications.length).padStart(2, "0")}
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-fg-muted">
          <RotateCw className="h-3 w-3" /> Tap a badge to flip
        </span>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-1 pr-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ perspective: 1200 }}
      >
        {certifications.map((cert, i) => (
          <FlipCertCard
            key={cert.name}
            cert={cert}
            index={i}
            isActive={active === i}
            isFlipped={!!flipped[i]}
            onFlip={() => toggleFlip(i)}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {certifications.map((cert, i) => (
          <button
            key={cert.name}
            type="button"
            aria-label={`Go to certification ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={cn(
              "cursor-pointer-target h-1.5 rounded-full transition-all duration-300",
              active === i ? "w-6 bg-signal" : "w-1.5 bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function FlipCertCard({
  cert,
  index,
  isActive,
  isFlipped,
  onFlip,
}: {
  cert: Certification;
  index: number;
  isActive: boolean;
  isFlipped: boolean;
  onFlip: () => void;
}) {
  return (
    <div
      className={cn(
        "shrink-0 snap-center transition-all duration-500",
        isActive ? "scale-100 opacity-100" : "scale-[0.94] opacity-60"
      )}
      style={{ width: "78%", maxWidth: 280, perspective: 1000 }}
    >
      <button
        type="button"
        onClick={onFlip}
        aria-label={`Flip ${cert.name} badge`}
        className="cursor-pointer-target relative block h-72 w-full text-left"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* ── FRONT ── */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-border bg-card/50 p-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-signal via-accent to-signal" />
            <div className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-signal/10 blur-2xl" />

            {/* shimmer sweep */}
            <motion.div
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-120%", "220%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 + index * 0.4 }}
            />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-signal/30 bg-signal/10">
              <div className="relative h-11 w-11">
                <Image src={cert.logo} alt={cert.issuer} fill />
              </div>
            </div>

            <h3 className="relative mt-5 text-center font-display text-sm font-semibold leading-snug">
              {cert.name}
            </h3>
            <p className="relative mt-1.5 text-center text-xs text-fg-muted">{cert.issuer}</p>

            <span className="relative mt-4 flex items-center gap-1 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-[11px] text-signal">
              <BadgeCheck className="h-3.5 w-3.5" /> {cert.date}
            </span>

            <span className="relative mt-4 flex items-center gap-1 text-[10px] text-fg-muted">
              <RotateCw className="h-3 w-3" /> Tap for details
            </span>
          </div>

          {/* ── BACK ── */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-accent/40 bg-card/70 p-6"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-signal to-accent" />
            <BadgeCheck className="h-8 w-8 text-accent" />
            <h3 className="mt-4 text-center font-display text-sm font-semibold leading-snug">
              {cert.name}
            </h3>
            <p className="mt-2 text-center text-xs leading-relaxed text-fg-muted">
              Issued by {cert.issuer} in {cert.date}. Tap below to view the verified
              credential.
            </p>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer-target mt-5 flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-display font-medium text-accent-fg"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Verify Credential
            </a>
          </div>
        </motion.div>
      </button>
    </div>
  );
}