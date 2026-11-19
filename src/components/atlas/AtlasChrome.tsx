"use client";

import { useEffect, useRef, useState } from "react";
import { PLATES } from "@/data/plates";
import RunningHead from "./RunningHead";
import IndexRail from "./IndexRail";
import PlateIndex from "./PlateIndex";

interface Props {
  children: React.ReactNode;
  /* On pages outside the homepage the current plate is fixed (or none). */
  fixedPlate?: number | null;
  onHome?: boolean;
}

/* The plate whose top has passed 40% of the viewport is the one being read. */
function useCurrentPlate(enabled: boolean) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let idx = 0;
      PLATES.forEach((p, i) => {
        const el = document.getElementById(p.anchor);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setCurrent(idx);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);
  return current;
}

export default function AtlasChrome({ children, fixedPlate = null, onHome = false }: Props) {
  const observed = useCurrentPlate(onHome);
  const current = onHome ? observed : fixedPlate;
  const [indexOpen, setIndexOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);

  return (
    <>
      <a href="#main" className="atlas-skip">
        Skip to content
      </a>
      <RunningHead current={current} onOpenIndex={() => setIndexOpen(true)} indexOpen={indexOpen} openerRef={opener} />
      <IndexRail current={current} onHome={onHome} />
      <PlateIndex
        open={indexOpen}
        current={current}
        onHome={onHome}
        onClose={(restoreFocus) => {
          setIndexOpen(false);
          if (restoreFocus) opener.current?.focus();
        }}
      />
      <div className="atlas-frame">{children}</div>
    </>
  );
}
