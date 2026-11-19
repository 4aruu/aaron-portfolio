"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PROFILE } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Work" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#toolkit", label: "Toolkit" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-[10] w-full border-b border-line/[0.09] bg-l0">
      <div className="scroll-progress" aria-hidden />
      <div className="page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="link-quiet inline-flex min-h-[44px] items-center font-medium text-ink">
          {PROFILE.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-quiet t-secondary inline-flex min-h-[44px] items-center">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a href={PROFILE.resume} className="btn btn-secondary" download>
            Download résumé
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line/[0.18] text-ink"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
        </div>
      </div>

      <div id={panelId} hidden={!open} className="border-t border-line/[0.09] bg-l0 md:hidden">
        <nav aria-label="Primary mobile" className="page py-4">
          <ul className="hairline-rows">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="flex min-h-[48px] items-center text-ink no-underline"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={PROFILE.resume} className="btn btn-secondary mt-4 w-full" download>
            Download résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
