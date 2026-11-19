import { PROFILE } from "@/data/profile";
import Fig0 from "../figures/Fig0";

/* Plate 00 · Frontispiece. Complete as server HTML: nothing here waits for JavaScript. */
export default function Plate00() {
  return (
    <section id="frontispiece" className="plate p00" aria-labelledby="p00-title">
      <div className="p00-text">
        <p className="plate-kicker">Plate 00 · Frontispiece</p>
        <h1 id="p00-title" className="p00-name">
          <span>Aaron</span> <span>Jacob</span> <span className="p00-name-indent">Sunil</span>
        </h1>
        <p className="p00-lede">
          A working atlas of the systems I build: AI that answers only from what it is given, and the cloud infrastructure that keeps it standing.
        </p>
        <div className="p00-actions">
          <a href={`mailto:${PROFILE.email}`} className="atlas-btn atlas-btn-primary">
            Write to me <span className="atlas-btn-arrow" aria-hidden>→</span>
          </a>
          <a href="#territories" className="atlas-btn">
            Open the atlas <span aria-hidden>↓</span>
          </a>
        </div>
        <p className="p00-id">Cloud &amp; AI engineer · AWS Certified Solutions Architect – Associate · based in Kuwait</p>
      </div>
      <Fig0 />
    </section>
  );
}
