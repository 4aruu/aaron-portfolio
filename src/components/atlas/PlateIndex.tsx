"use client";

import { useEffect, useRef } from "react";
import { PLATES } from "@/data/plates";
import { PROFILE } from "@/data/profile";
import ThemeToggle from "@/components/home/ThemeToggle";

interface Props {
  open: boolean;
  current: number | null;
  onHome: boolean;
  /* restoreFocus is false when the visitor picked a plate: focus then belongs
     with the plate they jumped to, not back on the Index button. */
  onClose: (restoreFocus: boolean) => void;
}

/* The atlas's contents page, as a modal <dialog>: the browser traps focus,
   closes it on Escape and makes the page behind it inert. */
export default function PlateIndex({ open, current, onHome, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const navigating = useRef(false);
  const close = () => ref.current?.close();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      id="plate-index"
      className="atlas-index"
      aria-labelledby="plate-index-title"
      onClose={() => {
        onClose(!navigating.current);
        navigating.current = false;
      }}
      onClick={(e) => {
        // A click on the backdrop (the dialog itself, outside the panel) closes it.
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="atlas-index-panel">
        <div className="atlas-index-top">
          <h2 id="plate-index-title" className="atlas-index-title">
            Plate index
          </h2>
          <button type="button" className="atlas-index-close" onClick={close}>
            Close
          </button>
        </div>
        <ol className="atlas-index-list">
          {PLATES.map((p, i) => (
            <li key={p.anchor}>
              <a
                href={onHome ? `#${p.anchor}` : `/#${p.anchor}`}
                aria-current={i === current ? "location" : undefined}
                onClick={() => {
                  navigating.current = true;
                  close();
                }}
              >
                <span className="atlas-index-num">{p.numeral}</span>
                <span className="atlas-index-name">{p.title}</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="atlas-index-foot">
          <ThemeToggle />
          <a href={PROFILE.resume} className="atlas-index-resume" download>
            Résumé (PDF)
          </a>
        </div>
      </div>
    </dialog>
  );
}
