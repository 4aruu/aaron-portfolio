import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import WeekGrid from "../figures/WeekGrid";

/* Plate V · InfoBot. */
export default function Plate05() {
  const p = PROJECTS.find((x) => x.id === "infobot")!;
  return (
    <section id="infobot" className="plate p05" aria-labelledby="p05-title">
      <WeekGrid />
      <div className="p05-text">
        <p className="plate-kicker">Plate V · InfoBot · Feb – Apr 2025</p>
        <h2 id="p05-title" className="plate-title">Two weeks of scheduling, in under two minutes</h2>
        <p className="plate-lede">
          A campus assistant for timetables, syllabi and study materials. Its generator builds timetables for three semesters at once inside the college’s fixed periods and breaks.
        </p>
        <p className="plate-rule-note">
          <strong>Decision: keep the rules in data.</strong> Period times, breaks and hours per subject are input, so a new schedule means new data, not new code.
        </p>
        <p className="plate-meta">Python · FastAPI · React · MySQL</p>
        <div className="p04-links">
          <Link href="/projects/infobot" className="atlas-link">
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
    </section>
  );
}
