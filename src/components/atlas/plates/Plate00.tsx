import { PROFILE } from "@/data/profile";
import Fig0 from "../figures/Fig0";
import AtlasCube from "../intro/AtlasCube";
import CubeRebuild from "../intro/CubeRebuild";

/* Each line of the name is split into letters so the opening can raise them;
   the heading still reads as one name. */
const Line = ({ word, indent = false }: { word: string; indent?: boolean }) => (
  <span className={indent ? "p00-line p00-name-indent" : "p00-line"}>
    {[...word].map((c, i) => (
      <span key={i} className="c">
        {c}
      </span>
    ))}
  </span>
);

/* Plate 00 · Frontispiece. Complete as server HTML: nothing here waits for
   JavaScript. The cube sits over it and unbuilds into it as you scroll. */
export default function Plate00() {
  return (
    <>
    <AtlasCube />
    <section id="frontispiece" className="plate p00" aria-labelledby="p00-title">
      <div className="p00-text">
        <p className="plate-kicker">Plate 00 · Frontispiece</p>
        <h1 id="p00-title" className="p00-name" tabIndex={-1}>
          <Line word="Aaron" /> <Line word="Jacob" /> <Line word="Sunil" indent />
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
        <CubeRebuild />
      </div>
      <Fig0 />
    </section>
    </>
  );
}
