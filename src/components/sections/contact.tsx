"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, ArrowLeft, ArrowRight, Copy, Check } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { Reveal, SectionHeading } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { socialLinks, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap = { Github: FaGithub, Linkedin: FaLinkedin, Youtube: FaYoutube, Mail };

export function Contact() {
  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="07 · Contact"
          title="Let's build something reliable together"
          description="Open to full-time entry-level DevOps/Cloud roles and internship-to-full-time opportunities."
        />

        {/* ───────── Mobile: step-by-step form wizard + quick-action socials ───────── */}
        <div className="mt-10 sm:hidden">
          <MobileContactWizard />
        </div>

        {/* ───────── sm and up: original layout, unchanged ───────── */}
        <div className="mt-16 hidden gap-8 lg:grid lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="glass h-full rounded-2xl p-8">
              <h3 className="font-display text-base font-semibold">Get in touch</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                Fastest way to reach me is email I usually reply within a day.
              </p>

              <div className="mt-6 space-y-3">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon as keyof typeof iconMap];
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer-target group flex items-center gap-3 rounded-xl border border-border p-3 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-fg/5 text-fg-muted transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 rounded-xl border border-dashed border-border p-4 text-xs text-fg-muted">
                <span className="font-display text-signal">status:</span> Currently based in{" "}
                {siteConfig.location}, open to remote &amp; hybrid roles.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-display text-xs text-fg-muted">
            Name
          </label>
          <Input id="name" name="name" placeholder="Mayur Bhong" required />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-display text-xs text-fg-muted">
            Email
          </label>
          <Input id="email" name="email" type="email" placeholder="mayur@company.com" required />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="subject" className="font-display text-xs text-fg-muted">
          Subject
        </label>
        <Input id="subject" name="subject" placeholder="Infrastructure & DevOps Engineer role" required />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="message" className="font-display text-xs text-fg-muted">
          Message
        </label>
        <Textarea id="message" name="message" placeholder="Tell me about the role or project..." required />
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={status !== "idle"}>
        {status === "idle" && (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
        {status === "sending" && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="h-4 w-4 rounded-full border-2 border-accent-fg border-t-transparent"
          />
        )}
        {status === "sent" && (
          <>
            <CheckCircle2 className="h-4 w-4" /> Message Sent
          </>
        )}
      </Button>
    </form>
  );
}

const steps = [
  { key: "name", label: "What's your name?", placeholder: "Mayur Bhong", type: "text" },
  { key: "email", label: "What's your email?", placeholder: "mayur@company.com", type: "email" },
  { key: "subject", label: "What's this about?", placeholder: "Infrastructure & DevOps role", type: "text" },
  { key: "message", label: "Your message", placeholder: "Tell me about the role or project...", type: "textarea" },
] as const;

function MobileContactWizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [copied, setCopied] = useState(false);

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const validate = () => {
    const val = values[current.key].trim();
    if (!val) return false;
    if (current.key === "email") return /\S+@\S+\.\S+/.test(val);
    return true;
  };

  const goNext = () => {
    if (!validate()) {
      setError(true);
      return;
    }
    setError(false);
    if (isLast) {
      setStatus("sending");
      setTimeout(() => setStatus("sent"), 1100);
    } else {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    setError(false);
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-3xl border border-signal/30 bg-signal/5 px-6 py-12 text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-signal/10 text-signal"
        >
          <CheckCircle2 className="h-8 w-8" />
        </motion.span>
        <h3 className="mt-5 font-display text-base font-semibold">Message sent!</h3>
        <p className="mt-2 text-sm text-fg-muted">
          Thanks {values.name.split(" ")[0] || "there"} I&apos;ll get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* quick-action social row with copy-to-clipboard email */}
      <div className="flex gap-2 overflow-x-auto pb-1 pl-1 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon as keyof typeof iconMap];
          if (link.icon === "Mail") {
            return (
              <button
                key={link.label}
                type="button"
                onClick={copyEmail}
                className="cursor-pointer-target flex shrink-0 items-center gap-2 rounded-full border border-border px-3.5 py-2 font-display text-[11px] text-fg-muted active:border-accent/40"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-signal" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy email
                  </>
                )}
              </button>
            );
          }
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer-target flex shrink-0 items-center gap-2 rounded-full border border-border px-3.5 py-2 font-display text-[11px] text-fg-muted active:border-accent/40"
            >
              <Icon className="h-3.5 w-3.5" /> {link.label}
            </a>
          );
        })}
      </div>

      {/* progress segments */}
      <div className="mt-6 flex gap-1.5 px-1">
        {steps.map((s, i) => (
          <div key={s.key} className="h-1 flex-1 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-signal"
              initial={false}
              animate={{ width: i <= step ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>
      <p className="mt-2 px-1 font-display text-[10px] text-fg-muted">
        Step {step + 1} of {steps.length}
      </p>

      {/* step card */}
      <div className="relative mt-4 min-h-[220px] overflow-hidden rounded-2xl border border-border bg-card/40 p-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.key}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-display text-base font-semibold">{current.label}</h3>

            <div className="mt-4">
              {current.type === "textarea" ? (
                <Textarea
                  value={values[current.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [current.key]: e.target.value }))}
                  placeholder={current.placeholder}
                  className={cn(error && "border-red-500/60")}
                />
              ) : (
                <Input
                  type={current.type}
                  value={values[current.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [current.key]: e.target.value }))}
                  placeholder={current.placeholder}
                  className={cn(error && "border-red-500/60")}
                />
              )}
              {error && (
                <p className="mt-1.5 text-xs text-red-400">
                  {current.key === "email" ? "Enter a valid email." : "This field can't be empty."}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* navigation */}
      <div className="mt-5 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="cursor-pointer-target flex items-center gap-1.5 rounded-xl border border-border px-4 py-3 font-display text-xs text-fg-muted"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        )}
        <Button onClick={goNext} disabled={status === "sending"} className="flex-1">
          {status === "sending" ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="h-4 w-4 rounded-full border-2 border-accent-fg border-t-transparent"
            />
          ) : isLast ? (
            <>
              <Send className="h-4 w-4" /> Send Message
            </>
          ) : (
            <>
              Next <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}