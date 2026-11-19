"use client";

import { useEffect, useRef, useState } from "react";
import { TERRITORIES } from "@/data/territories";
import { PLATES } from "@/data/plates";

const plateFor = (anchor: string) => PLATES.find((p) => p.anchor === anchor);
const keyOf = (t: number, p: number) => `${t}-${p}`;

/*
 * Fig. 1. Each place is a button: hover (on devices that hover), tap, Enter or
 * Space opens its note; Escape closes it and returns focus. One note at a time.
 * Below 768px the map becomes a plain list grouped by territory.
 */
export default function TerritoryMap() {
  const [open, setOpen] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (min-width: 768px)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const b = buttons.current[open];
      setOpen(null);
      b?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <figure className="tmap" aria-label="Figure 1: map of interests grouped into four territories" onMouseLeave={() => canHover && setOpen(null)}>
      {TERRITORIES.map((t, ti) => (
        <div key={t.name} className={t.experimental ? "tmap-territory is-experimental" : "tmap-territory"}>
          <div
            className="tmap-area"
            aria-hidden
            style={{ left: `${t.area.x}%`, top: `${t.area.y}%`, width: `${t.area.w}%`, height: `${t.area.h}%`, borderRadius: t.area.radius }}
          />
          <h3 className="tmap-label" style={{ left: `${t.label.x}%`, top: `${t.label.y}%` }}>
            {t.name}
          </h3>
          <ul className="tmap-places">
            {t.places.map((p, pi) => {
              const k = keyOf(ti, pi);
              const isOpen = open === k;
              const plate = plateFor(p.plate);
              const noteId = `tmap-note-${k}`;
              return (
                <li key={p.name} className="tmap-place" style={{ left: `${p.x}%`, top: `${p.y}%` }} data-side={p.x > 55 ? "left" : "right"} data-v={p.y > 58 ? "up" : "down"}>
                  <button
                    ref={(el) => {
                      buttons.current[k] = el;
                    }}
                    type="button"
                    className="tmap-spot"
                    aria-expanded={isOpen}
                    aria-controls={noteId}
                    onClick={() => setOpen(isOpen ? null : k)}
                    onMouseEnter={() => canHover && setOpen(k)}
                  >
                    <span className="tmap-dot" aria-hidden />
                    {p.name}
                  </button>
                  <div id={noteId} className="tmap-note" role="note" hidden={!isOpen}>
                    <span className="tmap-note-t">{t.name}</span>
                    <span className="tmap-note-name">{p.name}</span>
                    <span className="tmap-note-body">{p.note}</span>
                    {plate && (
                      <a href={`#${plate.anchor}`} className="tmap-note-link">
                        See it on Plate {plate.numeral} · {plate.title} <span aria-hidden>→</span>
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </figure>
  );
}
