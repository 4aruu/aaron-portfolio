"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

/*
 * Two-state theme switch.
 * The source of truth is <meta name="color-scheme">: "light dark" follows the
 * system, "light" / "dark" pin a scheme. An inline script in <head> applies the
 * stored value before first paint (no flash), and CSS keys off the meta, so the
 * page still follows the system if JavaScript never runs.
 */
const KEY = "color-scheme";
const systemDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
const meta = () => document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');

function renderedDark(): boolean {
  const content = meta()?.content ?? "light dark";
  if (content === "dark") return true;
  if (content === "light") return false;
  return systemDark();
}

function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const m = meta();
  const observer = new MutationObserver(onChange);
  if (m) observer.observe(m, { attributes: true, attributeFilter: ["content"] });
  // Another tab changed the setting.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    const value = e.newValue;
    if (m) m.content = value === "light" || value === "dark" ? value : "light dark";
  };
  mq.addEventListener("change", onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    mq.removeEventListener("change", onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function apply(target: "light" | "dark") {
  // Store only when the choice differs from the system; otherwise the user is
  // undoing their override, so go back to following the system.
  const differs = (target === "dark") !== systemDark();
  try {
    if (differs) localStorage.setItem(KEY, target);
    else localStorage.removeItem(KEY);
  } catch {
    /* storage blocked: the theme still applies for this page view */
  }
  const m = meta();
  if (m) m.content = differs ? target : "light dark";
}

export default function ThemeToggle() {
  // null on the server: the switch renders without a checked state until hydration.
  const dark = useSyncExternalStore(subscribe, renderedDark, () => null);

  const toggle = () => {
    const target = renderedDark() ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && "startViewTransition" in document) {
      document.startViewTransition(() => apply(target));
    } else {
      apply(target);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark ?? undefined}
      aria-label="Dark theme"
      onClick={toggle}
      className="theme-switch"
    >
      <span className="theme-switch-track" aria-hidden>
        <Sun size={14} className="theme-switch-icon theme-switch-sun" />
        <Moon size={14} className="theme-switch-icon theme-switch-moon" />
        <span className="theme-switch-thumb" />
      </span>
    </button>
  );
}
