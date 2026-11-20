import Gazetteer from "../gazetteer/Gazetteer";
import { CREDENTIALS } from "@/data/profile";

/* Plate VII · Gazetteer. Every tool here was used in something the atlas shows. */
export default function Plate07() {
  return (
    <section id="toolkit" className="plate plate-ruled p07" aria-labelledby="p07-title">
      <div className="p07-text">
        <p className="plate-kicker">Plate VII · Gazetteer</p>
        <h2 id="p07-title" className="plate-title">
          Index of tools, by where they appear
        </h2>
        <p className="plate-lede">
          Only tools used in a project or at work. Each entry links to the plates where it does its job; on a wide
          screen, pointing at one lights those plates in the index rail.
        </p>
        <div className="p07-creds">
          <h3 className="p07-creds-title">Credentials</h3>
          <ul>
            {CREDENTIALS.map((c) => (
              <li key={c.title}>
                <span className="p07-cred-name">{c.title}</span>
                <span className="p07-cred-meta">
                  {c.issuer} · {c.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p07-index">
        <Gazetteer />
      </div>
    </section>
  );
}
