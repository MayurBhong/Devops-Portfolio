"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { socialLinks, siteConfig, navLinks } from "@/lib/data";

const iconMap = { Github: FaGithub, Linkedin: FaLinkedin, Youtube: FaYoutube, Mail };

export function Footer() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ───────── Mobile: live-status card + circular back-to-top ───────── */}
        <div className="sm:hidden">
          <MobileFooter />
        </div>

        {/* ───────── sm and up: original layout, unchanged ───────── */}
        <div className="hidden sm:block">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div className="font-display text-sm font-bold text-accent">{siteConfig.name}</div>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-fg-muted">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="cursor-pointer-target hover:text-accent">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="cursor-pointer-target flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2 border-t border-border pt-6 text-center text-xs text-fg-muted sm:flex-row sm:justify-between">
            <span>
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </span>
          </div>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}

function MobileFooter() {
  return (
    <div>
      {/* brand + live local-time status card */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card/40 p-4">
        <div>
          <div className="font-display text-sm font-bold text-accent">{siteConfig.name}</div>
          <p className="mt-0.5 text-[11px] text-fg-muted">{siteConfig.location}</p>
        </div>
        <LiveStatusBadge />
      </div>

      {/* nav links as wrap chips */}
      <nav className="mt-5 flex flex-wrap gap-2">
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="cursor-pointer-target rounded-full border border-border px-3 py-1.5 font-display text-[11px] text-fg-muted transition-colors active:border-accent/40 active:text-accent"
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* social icons */}
      <div className="mt-5 flex items-center gap-3">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon as keyof typeof iconMap];
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="cursor-pointer-target flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors active:border-accent/40 active:text-accent"
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>

      <div className="mt-6 border-t border-border pt-5 text-center text-[11px] text-fg-muted">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </div>
  );
}

function LiveStatusBadge() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-end gap-1">
      <span className="flex items-center gap-1.5 rounded-full bg-signal/10 px-2.5 py-1 text-[10px] text-signal">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
        </span>
        Available
      </span>
      {time && (
        <span className="font-display text-[10px] text-fg-muted">{time} IST</span>
      )}
    </div>
  );
}

function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setProgress(v);
      setVisible(window.scrollY > 400);
    });
    return () => unsub();
  }, [scrollYProgress]);

  const size = 48;
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          className="cursor-pointer-target fixed bottom-6 right-5 z-[90] flex items-center justify-center sm:hidden"
        >
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="rgb(var(--bg-elevated))"
              stroke="currentColor"
              strokeWidth={stroke}
              className="text-border"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgb(var(--accent))"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
            />
          </svg>
          <ArrowUp className="absolute h-4 w-4 text-accent" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}