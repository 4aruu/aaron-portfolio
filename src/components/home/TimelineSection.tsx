import Link from "next/link";
import SectionHead from "./SectionHead";
import Statement from "./Statement";
import { TIMELINE, type Milestone } from "@/data/profile";
import TimelineReveal from "@/components/atlas/motion/TimelineReveal";

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

export default function TimelineSection() {
  return (
    <section id="timeline" aria-labelledby="timeline-title" className="section">
      <div className="page">
        <div className="mb-16 md:mb-24">
          <Statement text="In *August 2024* I wrote my first web page by hand. Two years later I passed *SAA-C03* and built a web tier on AWS that heals itself." />
        </div>
        <SectionHead
          id="timeline-title"
          index="03 / Timeline"
          title="From school to now"
          lead="Everything I have built, in order. The line under each project shows what was new at that step."
        />

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
      </div>
    </section>
  );
}
