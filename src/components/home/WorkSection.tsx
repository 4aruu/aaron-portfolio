import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FEATURED, type Project } from "@/data/projects";
import SectionHead from "./SectionHead";
import FlowDiagram from "./FlowDiagram";

function CaseStudy({ project, n }: { project: Project; n: number }) {
  const titleId = `case-${project.id}`;
  return (
    <article aria-labelledby={titleId} className="surface reveal overflow-hidden">
      <div className="grid gap-10 p-6 md:grid-cols-12 md:gap-8 md:p-10">
        <div className={n % 2 === 0 ? "md:order-2 md:col-span-7" : "md:col-span-7"}>
          <p className="t-meta text-ink-3">
            {String(n).padStart(2, "0")} · {project.period} · {project.context}
          </p>
          <h3 id={titleId} className="t-h3 mt-3">
            {project.title}
          </h3>
          <p className="t-h4 mt-2 max-w-[40ch] font-normal text-ink-2">{project.tagline}</p>
          <p className="t-body prose-w mt-6 text-ink-2">{project.longDescription}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/projects/${project.id}`} className="btn btn-secondary">
              Read the case study
              <ArrowRight size={16} aria-hidden />
            </Link>
            {project.live && (
              <a href={project.live} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Open live app
                <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {project.github && (
              <a href={project.github} className="link t-secondary inline-flex min-h-[44px] items-center gap-1 px-1" target="_blank" rel="noopener noreferrer">
                Source on GitHub
                <ArrowUpRight size={14} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>

        <div className={n % 2 === 0 ? "flex flex-col gap-6 md:order-1 md:col-span-5" : "flex flex-col gap-6 md:col-span-5"}>
          {project.metrics[0] && (
            <div>
              <p className="t-metric tabular-nums">{project.metrics[0].value}</p>
              <p className="t-secondary mt-2 max-w-[32ch] text-ink-2">{project.metrics[0].label}</p>
            </div>
          )}
          {project.metrics.length > 1 && (
            <dl className="hairline-rows m-0 border-b border-t border-line/[0.09]">
              {project.metrics.slice(1).map((m) => (
                <div key={m.label} className="flex items-baseline gap-4 py-4">
                  <dt className="t-h2 min-w-[4.5ch] shrink-0 tabular-nums text-ink">{m.value}</dt>
                  <dd className="t-secondary m-0 text-ink-2">{m.label}</dd>
                </div>
              ))}
            </dl>
          )}
          {project.decision && (
            <div className="rounded-lg border border-line/[0.09] bg-l0 p-5">
              <p className="t-label">Decision</p>
              <p className="t-body mt-2 font-medium text-ink">{project.decision.title}</p>
              <p className="t-secondary mt-2 text-ink-2">{project.decision.body}</p>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-line/[0.09] p-6 md:px-10 md:py-8">
        {project.flow.length > 0 && (
          <>
            <p className="t-label mb-3">How it works</p>
            <FlowDiagram steps={project.flow} label={`${project.title} pipeline`} />
          </>
        )}
        <p className="t-meta mt-6 text-ink-3">{project.tech.join(" · ")}</p>
      </div>
    </article>
  );
}

export default function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <div className="page">
        <SectionHead
          id="work-title"
          index="02 / Work"
          title="Selected work"
          lead="Three systems, each with the decision that shaped it. Smaller and earlier projects are on the timeline below."
        />

        <div className="space-y-8">
          {FEATURED.map((p, i) => (
            <CaseStudy key={p.id} project={p} n={i + 1} />
          ))}
        </div>

      </div>
    </section>
  );
}
