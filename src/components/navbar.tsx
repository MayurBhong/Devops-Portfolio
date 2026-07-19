"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#about");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // lock body scroll while the mobile menu is open, so nothing behind it
  // can intercept the tap and there's no scroll-fighting on iOS Safari
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  return (
    <header
      style={{ zIndex: 9999 }}
      className={cn(
        "fixed inset-x-0 top-0 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass-strong shadow-lg shadow-black/5" : "bg-transparent"
          )}
        >
          <button
            type="button"
            onClick={() => goTo("#hero")}
            className="cursor-pointer-target font-display text-sm font-bold text-accent"
          >
            {siteConfig.name}
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => goTo(link.href)}
                className={cn(
                  "cursor-pointer-target relative rounded-full px-4 py-2 font-display text-xs tracking-wide transition-colors",
                  active === link.href ? "text-accent" : "text-fg-muted hover:text-fg"
                )}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => goTo("#contact")}
            >
              Let&apos;s talk
            </Button>
            <button
              type="button"
              className="cursor-pointer-target flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="glass-strong mt-2 rounded-2xl lg:hidden">
            <div className="flex flex-col p-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => goTo(link.href)}
                  className={cn(
                    "cursor-pointer-target w-full rounded-xl px-4 py-3 text-left font-display text-sm active:scale-[0.98]",
                    active === link.href ? "bg-accent/10 text-accent" : "text-fg-muted"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
