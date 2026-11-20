"use client";

import { useState } from "react";
import { GAZETTEER, TERRITORY_ORDER, type Territory } from "@/data/gazetteer";
import { PLATES } from "@/data/plates";

const ANCHOR = new Map(PLATES.map((p) => [p.numeral, p]));

/*
 * The index of tools, with filters by territory. Hovering or focusing an entry
 * lights its plates in the index rail; that part is CSS (see .gz-entry and
 * the rail rules in globals.css), so it costs no JavaScript.
 */
export default function Gazetteer() {
  const [filter, setFilter] = useState<Territory | "All">("All");
  const shown = (filter === "All" ? GAZETTEER : GAZETTEER.filter((e) => e.territory === filter))
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

  return (
    <>
      <div className="gz-filters" role="group" aria-label="Filter tools by territory">
        {(["All", ...TERRITORY_ORDER] as const).map((t) => (
          <button key={t} type="button" className="gz-filter" aria-pressed={filter === t} onClick={() => setFilter(t)}>
            {t}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {filter === "All" ? `All ${shown.length} tools` : `${shown.length} ${filter} tools`}
      </p>

      <ul className="gz-list" aria-label="Tools">
        {shown.map((e) => (
          <li key={e.name} className="gz-entry" data-lights={e.plates.join(" ")}>
            <span className="gz-name">{e.name}</span>
            <span className="gz-plates">
              {e.plates.map((n) => {
                const p = ANCHOR.get(n);
                if (!p) return null;
                return (
                  <a key={n} href={`#${p.anchor}`} className="gz-plate">
                    <span aria-hidden>{n}</span>
                    <span className="sr-only">
                      {e.name} on Plate {n}, {p.title}
                    </span>
                  </a>
                );
              })}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
