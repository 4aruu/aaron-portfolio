import Link from "next/link";
import { PROJECTS } from "@/data/projects";

/* Plate IV · NutriSwap, as a specimen sheet. */
const RULES = [
  { when: "Both recorded as absent", then: "Shown" },
  { when: "Present or possible in either", then: "Hidden" },
  { when: "Unknown in either", then: "Hidden, never guessed" },
];
const PIPE = ["PostgreSQL · Aiven", "FastAPI · Render", "231 foods, one fetch", "React filters it"];

export default function Plate04() {
  const p = PROJECTS.find((x) => x.id === "nutriswap")!;
  return (
    <section id="nutriswap" className="plate p04 plate-ruled" aria-labelledby="p04-title">
      <div className="p04-text">
        <p className="plate-kicker">Plate IV · NutriSwap · specimen sheet</p>
        <h2 id="p04-title" className="p04-title">
          <span className="p04-num">231</span>
          <span className="p04-num-label">dishes, Kerala cuisine first</span>
        </h2>
        <p className="plate-lede">
          Each with nutrition, allergen and sustainability data. Pick a health goal, mark what you avoid, get a healthier swap.
        </p>
        <div className="p04-links">
          {p.live && (
            <a href={p.live} className="atlas-btn" target="_blank" rel="noopener noreferrer">
              Open the live app <span aria-hidden>↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          <Link href="/projects/nutriswap" className="atlas-link">
            Read the case study <span aria-hidden>→</span>
          </Link>
          {p.github && (
            <a href={p.github} className="atlas-link" target="_blank" rel="noopener noreferrer">
              Source <span aria-hidden>↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
      <div className="p04-spec">
        <table className="p04-table">
          <caption>
            <span className="plate-decision-k">Decision · fail closed on allergens</span>
            When you avoid an allergen, a dish is shown only when both the recipe and its preparation are recorded as free of it. Unknown counts as unsafe.
          </caption>
          <thead>
            <tr>
              <th scope="col">Recipe and preparation</th>
              <th scope="col">Dish is</th>
            </tr>
          </thead>
          <tbody>
            {RULES.map((r) => (
              <tr key={r.when}>
                <td>{r.when}</td>
                <td>{r.then}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ol className="p04-pipe" aria-label="How a search is served">
          {PIPE.map((x, i) => (
            <li key={x} className={i === 2 ? "is-key" : undefined}>
              {x}
            </li>
          ))}
        </ol>
        <p className="p04-ci">
          Every push runs tests and a production build in GitHub Actions; a second pipeline scans the image with Trivy and the running app with OWASP ZAP.
        </p>
      </div>
    </section>
  );
}
