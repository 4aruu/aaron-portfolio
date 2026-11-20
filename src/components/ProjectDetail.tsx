import Link from "next/link";
import { PROJECTS, type Project } from "@/data/projects";
import AtlasChrome from "@/components/atlas/AtlasChrome";
import { PLATES } from "@/data/plates";
import SiteFooter from "@/components/home/SiteFooter";

interface Props {
  projectId: string;
}

/*
 * A case study, read in the order a reviewer asks:
 *   1. What is it, and what came of it?   → the opener and "By the numbers"
 *   2. The facts at a glance              → one ruled strip
 *   3. The story                          → the problem, what it does
 *   4. How it works                       → the pipeline, the architecture, the decision
 *   5. Credits                            → my role, the stack
 * Sections are numbered from the project's plate (III.1, III.2…) so the page
 * reads as part of the atlas.
 */

function Chapter({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  const id = `ch-${n}`;
  return (
    <section className="cs-chapter" aria-labelledby={id}>
      <header className="cs-chapter-head">
        <span className="cs-chapter-n" aria-hidden>
          {n}
        </span>
        <h2 id={id} className="cs-chapter-title">
          {title}
        </h2>
      </header>
      <div className="cs-chapter-body">{children}</div>
    </section>
  );
}

function Sec({ tag, title, children, wide = false }: { tag: string; title: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "cs-sec is-wide" : "cs-sec"}>
      <h3 className="cs-sec-title">
        <span className="cs-sec-tag">{tag}</span> {title}
      </h3>
      {children}
    </div>
  );
}

/* Next / previous. On hover or focus the label rolls over to a line that
   reads like a small win, and the arrow loops. Screen readers always hear the
   plain label: the rolled-in line is hidden from them. */
function TurnLink({ p, dir }: { p: Project; dir: "next" | "prev" }) {
  const isNext = dir === "next";
  return (
    <Link href={`/projects/${p.id}`} className={isNext ? "cs-turn is-next" : "cs-turn is-prev"} rel={dir}>
      <span className="cs-turn-label">
        <span className="cs-turn-roll">
          <span className="cs-turn-a">{isNext ? "Next case study" : "Previous case study"}</span>
          <span className="cs-turn-b" aria-hidden>
            {isNext ? "Onward — you’re on a roll" : "Back for another look"}
          </span>
        </span>
        <span className="cs-turn-arrow" aria-hidden>
          <span>{isNext ? "→" : "←"}</span>
        </span>
      </span>
      <span className="cs-turn-title">{p.title}</span>
      <span className="cs-turn-sub">{p.tagline}</span>
    </Link>
  );
}

export default function ProjectDetail({ projectId }: Props) {
  const idx = PROJECTS.findIndex((p) => p.id === projectId);
  const project = PROJECTS[idx];
  if (!project) return null;
  const prev = idx > 0 ? PROJECTS[idx - 1] : null;
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;

  // Lumira, NutriSwap and InfoBot have plates of their own; the others do not.
  const plate = PLATES.findIndex((pl) => pl.anchor === project.id);
  const num = plate >= 0 ? PLATES[plate].numeral : null;
  const tag = (i: number) => (num ? `${num}.${i}` : `§${i}`);
  let s = 0;
  const nextTag = () => tag(++s);

  const glance = [
    { k: "Period", v: project.period },
    { k: "Team", v: project.context },
    ...project.highlights.map((h) => ({ k: h.label, v: h.value })),
  ];

  return (
    <AtlasChrome fixedPlate={plate >= 0 ? plate : null}>
      <main id="main" className="cs">
        <Link href={plate >= 0 ? `/#${project.id}` : "/#timeline"} className="cs-back">
          <span aria-hidden>←</span> {num ? `Plate ${num} · ` : ""}Back to the atlas
        </Link>

        {/* 1 · the opener: what it is, and what came of it */}
        <header className="cs-open">
          <div className="cs-open-text">
            <p className="plate-kicker">Case study{num ? ` · Plate ${num}` : ""}</p>
            <h1 className="cs-title">{project.title}</h1>
            <p className="cs-lede">{project.tagline}</p>
            <div className="cs-actions">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="atlas-btn atlas-btn-primary">
                  Open the live app <span className="atlas-btn-arrow" aria-hidden>↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={project.live ? "atlas-btn" : "atlas-btn atlas-btn-primary"}>
                  Source on GitHub <span className={project.live ? undefined : "atlas-btn-arrow"} aria-hidden>↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
          {project.metrics.length > 0 && (
            <aside className="cs-numbers" aria-labelledby="cs-numbers-title">
              <h2 id="cs-numbers-title" className="cs-numbers-title">
                By the numbers
              </h2>
              <dl>
                {project.metrics.map((m) => (
                  <div key={m.label} className="cs-number">
                    <dt className="cs-number-v">{m.value}</dt>
                    <dd className="cs-number-l">{m.label}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}
        </header>

        {/* 2 · the facts at a glance */}
        <dl className="cs-glance" aria-label="At a glance">
          {glance.map((g) => (
            <div key={g.k}>
              <dt>{g.k}</dt>
              <dd>{g.v}</dd>
            </div>
          ))}
        </dl>

        {/* 3 · the story */}
        <Chapter n="01" title="The story">
          {project.problem && (
            <Sec tag={nextTag()} title="The problem" wide>
              <blockquote className="cs-quote">
                <p>{project.problem}</p>
              </blockquote>
            </Sec>
          )}
          <Sec tag={nextTag()} title="What it does" wide>
            <div className="cs-does">
              <p className="cs-body">{project.longDescription}</p>
              {project.features.length > 0 && (
                <ul className="cs-checks" aria-label="Features">
                  {project.features.map((f) => (
                    <li key={f}>
                      <span className="cs-check" aria-hidden>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Sec>
        </Chapter>

        {/* 4 · how it works */}
        {(project.flow.length > 0 || project.architecture || project.decision) && (
          <Chapter n="02" title="How it works">
            {(project.flow.length > 0 || project.architecture) && (
              <Sec tag={nextTag()} title="Architecture" wide>
                {project.flow.length > 0 && (
                  <ol className="cs-pipe" aria-label={`${project.title} pipeline, in order`}>
                    {project.flow.map((step, i) => (
                      <li key={step.label}>
                        <span className="cs-pipe-n" aria-hidden>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="cs-pipe-name">{step.label}</span>
                        {step.detail && <span className="cs-pipe-detail">{step.detail}</span>}
                      </li>
                    ))}
                  </ol>
                )}
                {project.architecture && <p className="cs-body cs-arch">{project.architecture}</p>}
              </Sec>
            )}
            {project.decision && (
              <Sec tag={nextTag()} title="The decision" wide>
                <div className="cs-decision plate-dark">
                  <p className="cs-decision-title">{project.decision.title}</p>
                  <p className="cs-decision-body">{project.decision.body}</p>
                </div>
              </Sec>
            )}
          </Chapter>
        )}

        {/* 5 · credits */}
        <Chapter n={project.flow.length > 0 || project.architecture || project.decision ? "03" : "02"} title="Credits">
          <div className="cs-credits">
            {project.role && (
              <Sec tag={nextTag()} title="My role">
                <p className="cs-body">{project.role}</p>
              </Sec>
            )}
            <Sec tag={nextTag()} title="Stack">
              <ul className="cs-stack">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Sec>
          </div>
        </Chapter>

        <nav aria-label="More case studies" className="cs-turns">
          {prev ? <TurnLink p={prev} dir="prev" /> : <span />}
          {next && <TurnLink p={next} dir="next" />}
        </nav>
      </main>
      <SiteFooter />
    </AtlasChrome>
  );
}
