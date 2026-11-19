import { TERRITORIES } from "@/data/territories";
import TerritoryMap from "../figures/TerritoryMap";

/* Plate I · The four territories. */
export default function Plate01() {
  return (
    <section id="territories" className="plate p01 plate-dark" aria-labelledby="p01-title">
      <div className="p01-text">
        <p className="plate-kicker">Plate I</p>
        <h2 id="p01-title" className="plate-title">The four territories</h2>
        <p className="p01-lede">
          Where my interests sit and how they connect to what I have built. Hover or tap a place to see the plate where it does real work.
        </p>
        <ul className="p01-legend">
          {TERRITORIES.map((t) => (
            <li key={t.name}>
              <span>{t.name}</span>
              <span className="p01-count">
                {t.places.length} places
              </span>
            </li>
          ))}
        </ul>
      </div>
      <TerritoryMap />
    </section>
  );
}
