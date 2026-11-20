"use client";

import Link from "next/link";
import type { RefObject } from "react";
import { PLATES, LAST_NUMERAL } from "@/data/plates";
import { PROFILE } from "@/data/profile";
import ThemeToggle from "@/components/home/ThemeToggle";

interface Props {
  current: number | null;
  indexOpen: boolean;
  onOpenIndex: () => void;
  openerRef: RefObject<HTMLButtonElement | null>;
}

export default function RunningHead({ current, indexOpen, onOpenIndex, openerRef }: Props) {
  const plate = current === null ? null : PLATES[current];
  return (
    <header className="atlas-head">
      <div className="scroll-progress" aria-hidden />
      <Link href="/" className="atlas-head-title">
        <span className="atlas-head-full">The Systems Atlas · Vol. 01</span>
        <span className="atlas-head-short" aria-hidden>
          AJS
        </span>
        <span className="sr-only"> (home)</span>
      </Link>
      {plate && (
        <p className="atlas-head-plate" aria-live="off">
          Plate {plate.numeral} · {plate.title}
        </p>
      )}
      {plate && (
        <p className="atlas-head-count" aria-hidden>
          <b>{plate.numeral}</b> / {LAST_NUMERAL}
        </p>
      )}
      <div className="atlas-head-actions">
        <ThemeToggle />
        <a href={PROFILE.resume} className="atlas-head-btn atlas-head-resume" download>
          Résumé
        </a>
        <button
          ref={openerRef}
          type="button"
          className="atlas-head-btn"
          aria-haspopup="dialog"
          aria-expanded={indexOpen}
          aria-controls="plate-index"
          onClick={onOpenIndex}
        >
          Index
        </button>
      </div>
    </header>
  );
}
