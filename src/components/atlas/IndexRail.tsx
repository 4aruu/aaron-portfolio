import { PLATES } from "@/data/plates";

interface Props {
  current: number | null;
  onHome: boolean;
}

/* The fixed column of plate numerals. Each link carries its title, shown as a
   flag on hover or focus and always part of the link's accessible name. */
export default function IndexRail({ current, onHome }: Props) {
  return (
    <nav className="atlas-rail" aria-label="Plates">
      <ol>
        {PLATES.map((p, i) => (
          <li key={p.anchor}>
            <a
              href={onHome ? `#${p.anchor}` : `/#${p.anchor}`}
              className="atlas-rail-link"
              data-num={p.numeral}
              aria-current={i === current ? "location" : undefined}
            >
              <span className="atlas-rail-num">{p.numeral}</span>
              <span className="atlas-rail-flag">{p.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
