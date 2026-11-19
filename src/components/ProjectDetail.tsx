import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import SiteHeader from "@/components/home/SiteHeader";
import SiteFooter from "@/components/home/SiteFooter";
import FlowDiagram from "@/components/home/FlowDiagram";

interface Props {
  projectId: string;
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line/[0.09] py-12 md:grid-cols-12 md:gap-8 md:py-16">
      <h2 className="t-label md:col-span-3 md:pt-1">{label}</h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

export default function ProjectDetail({ projectId }: Props) {
  const idx = PROJECTS.findIndex((p) => p.id === projectId);
  const project = PROJECTS[idx];
  if (!project) return null;
  const prev = idx > 0 ? PROJECTS[idx - 1] : null;
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;

  return (
    <>
      <SiteHeader />
      <main id="main" className="page pb-16">
        <div className="pt-8 md:pt-12">
          <Link href="/#work" className="link-quiet t-secondary inline-flex min-h-[44px] items-center gap-2">
            <ArrowLeft size={16} aria-hidden />
            All work
          </Link>
        </div>

        <header className="grid gap-10 pb-12 pt-6 md:grid-cols-12 md:gap-8 md:pb-16">
          <div className="md:col-span-8">
            <p className="t-meta text-ink-3">
              {project.period} · {project.context}
            </p>
            <h1 className="t-display mt-3">{project.title}</h1>
            <p className="t-h4 prose-w mt-4 font-normal text-ink-2">{project.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Open live app
                  <ArrowUpRight size={16} aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Source on GitHub
                  <ArrowUpRight size={16} aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>

          {project.highlights.length > 0 && (
            <dl className="surface hairline-rows m-0 self-end md:col-span-4">
              {project.highlights.map((h) => (
                <div key={h.label} className="grid grid-cols-[112px_1fr] gap-4 px-5 py-4">
                  <dt className="t-label pt-0.5">{h.label}</dt>
                  <dd className="t-secondary m-0 text-ink">{h.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        {project.problem && (
          <Block label="Problem">
            <p className="t-body prose-w text-ink">{project.problem}</p>
          </Block>
        )}

        <Block label="What it does">
          <p className="t-body prose-w text-ink">{project.longDescription}</p>
          {project.features.length > 0 && (
            <ul className="t-secondary prose-w mt-6 list-none space-y-3 p-0 text-ink-2">
              {project.features.map((f) => (
                <li key={f} className="relative pl-4">
                  <span aria-hidden className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-ink-3" />
                  {f}
                </li>
              ))}
            </ul>
          )}
        </Block>

        {(project.architecture || project.flow.length > 0) && (
          <Block label="Architecture">
            {project.flow.length > 0 && (
              <div className="surface mb-6 p-5">
                <FlowDiagram steps={project.flow} label={`${project.title} pipeline`} />
              </div>
            )}
            {project.architecture && <p className="t-body prose-w text-ink-2">{project.architecture}</p>}
          </Block>
        )}

        {project.decision && (
          <Block label="Key decision">
            <p className="t-h4 text-ink">{project.decision.title}</p>
            <p className="t-body prose-w mt-3 text-ink-2">{project.decision.body}</p>
          </Block>
        )}

        {project.metrics.length > 0 && (
          <Block label="Results">
            <dl className="m-0 grid gap-6 sm:grid-cols-2">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="t-h2 tabular-nums text-ink">{m.value}</dt>
                  <dd className="t-secondary m-0 mt-1 text-ink-2">{m.label}</dd>
                </div>
              ))}
            </dl>
          </Block>
        )}

        {project.role && (
          <Block label="My role">
            <p className="t-body prose-w text-ink">{project.role}</p>
          </Block>
        )}

        <Block label="Stack">
          <p className="t-body text-ink">{project.tech.join(" · ")}</p>
        </Block>

        <nav aria-label="More projects" className="grid gap-4 border-t border-line/[0.09] pt-12 sm:grid-cols-2">
          {prev ? (
            <Link href={`/projects/${prev.id}`} className="surface group block p-5 text-ink no-underline transition-colors duration-150 hover:border-line/[0.18]">
              <span className="t-label inline-flex items-center gap-2">
                <ArrowLeft size={14} aria-hidden />
                Previous
              </span>
              <span className="t-body mt-2 block font-medium group-hover:text-accent">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.id}`} className="surface group block p-5 text-right text-ink no-underline transition-colors duration-150 hover:border-line/[0.18]">
              <span className="t-label inline-flex items-center gap-2">
                Next
                <ArrowRight size={14} aria-hidden />
              </span>
              <span className="t-body mt-2 block font-medium group-hover:text-accent">{next.title}</span>
            </Link>
          )}
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
