import { PROFILE } from "@/data/profile";
import CopyAddress from "../colophon/CopyAddress";
import BackToStart from "../colophon/BackToStart";

/* Plate VIII · Colophon. Contact first, then how the atlas was made. */
export default function Plate08() {
  return (
    <section id="contact" className="plate plate-dark p08" aria-labelledby="p08-title">
      <div className="p08-main">
        <p className="plate-kicker">Plate VIII · Colophon</p>
        <h2 id="p08-title" className="p08-title">
          Write to me.
        </h2>
        <div className="p08-address">
          <a id="p08-email" href={`mailto:${PROFILE.email}`} className="p08-email">
            {PROFILE.email}
          </a>
          <CopyAddress email={PROFILE.email} />
        </div>
        <p className="p08-note">Open to engineering roles in Kuwait and Dubai. Based in Kuwait.</p>
      </div>

      <ul className="p08-links" aria-label="Elsewhere">
        <li>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden>↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
        <li>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <span aria-hidden>↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
        <li>
          <a href={PROFILE.resume} download>
            Résumé, PDF <span aria-hidden>↓</span>
          </a>
        </li>
      </ul>

      <footer className="p08-colophon">
        <p>
          Set in Young Serif, Schibsted Grotesk and Martian Mono. Built with Next.js and GSAP. The drawings show real
          systems; the timetable on Plate V uses sample course codes. © {new Date().getFullYear()} {PROFILE.name}.
        </p>
        <BackToStart />
      </footer>
    </section>
  );
}
