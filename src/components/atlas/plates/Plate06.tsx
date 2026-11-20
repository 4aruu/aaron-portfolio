import Link from "next/link";
import { TIMELINE, type Milestone } from "@/data/profile";
import TimelineReveal from "../motion/TimelineReveal";

/* Where a card leads, in plain words, and the line it rolls over to on hover:
   something that reads like a small win. */
function linkCopy(m: Milestone) {
  const href = m.href ?? "";
  if (m.external) return { label: "Source on GitHub", win: "Dig into the code", arrow: "↗" };
  if (href.startsWith("/projects")) return { label: "Read the case study", win: "See how I built it", arrow: "→" };
  if (href === "#contact") return { label: "Get in touch", win: "Let’s build something", arrow: "→" };
  return { label: "See the role", win: "See what I delivered", arrow: "→" };
}

/* The card's one link. Its ::after stretches over the whole card, so the card
   is a single click target and a single tab stop. Screen readers hear the
   plain label plus the card title; the win line is hidden from them. */
function CardLink({ m }: { m: Milestone }) {
  if (!m.href) return null;
  const { label, win, arrow } = linkCopy(m);
  const body = (
    <>
      <span className="win-roll">
        <span className="win-a">
          {label}
          <span className="sr-only">: {m.title}</span>
        </span>
        <span className="win-b" aria-hidden>
          {win}
        </span>
      </span>
      <span className={arrow === "↗" ? "win-arrow is-diag" : "win-arrow"} aria-hidden>
        <span>{arrow}</span>
      </span>
      {m.external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  if (m.external) {
    return (
      <a href={m.href} className="tl-go" target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }
  if (m.href.startsWith("/")) {
    return (
      <Link href={m.href} className="tl-go">
        {body}
      </Link>
    );
  }
  return (
    <a href={m.href} className="tl-go">
      {body}
    </a>
  );
}

/* Plate VI · The route. School to now, oldest first; every stop is from the
   résumé or a GitHub push date. */
export default function Plate06() {
  return (
    <section id="timeline" className="plate plate-ruled p06" aria-labelledby="p06-title">
      <header className="p06-head">
        <p className="plate-kicker">Plate VI · The route</p>
        <h2 id="p06-title" className="plate-title">
          From a school in Kuwait to SAA-C03
        </h2>
        <p className="plate-lede">
          Every stop is real, in order. The tags under each project show what was new at that step.
        </p>
      </header>

      <ol className="tl m-0 list-none p-0">
        {TIMELINE.map((m, i) => (
            <li
              key={`${m.when}-${m.title}`}
              className="tl-item"
              data-kind={m.kind}
              style={{ "--row": i + 1 } as React.CSSProperties}
            >
              <span className="tl-dot" aria-hidden />
              <article className={m.href ? "surface tl-card win-host has-link" : "surface tl-card"}>
                {/* what kind of step, and when */}
                <header className="tl-card-head">
                  <span className="tl-kind">{m.kind === "Now" ? "Now" : m.kind}</span>
                  {m.kind !== "Now" && <time className="tl-when">{m.when}</time>}
                </header>
                {/* what it was, and where */}
                <h3 className="tl-title">{m.title}</h3>
                {m.place && <p className="tl-place">{m.place}</p>}
                <p className="tl-body">{m.body}</p>
                {/* what it used, and where to go next */}
                {(m.stack || m.href) && (
                  <footer className="tl-card-foot">
                    {m.stack && (
                      <ul className="tl-stack" aria-label="Built with">
                        {m.stack.split(" · ").map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                    <CardLink m={m} />
                  </footer>
                )}
              </article>
            </li>
          ))}
      </ol>
      <TimelineReveal />
    </section>
  );
}
