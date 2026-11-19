import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "./SectionHead";
import Statement from "./Statement";
import { TIMELINE, type Milestone } from "@/data/profile";
import TimelineReveal from "@/components/atlas/motion/TimelineReveal";

function ItemLink({ m }: { m: Milestone }) {
  if (!m.href) return null;
  const label = m.external ? "Source on GitHub" : m.href.startsWith("/projects") ? "Read the case study" : "See details";
  const cls = "link t-secondary mt-1 inline-flex min-h-[44px] items-center gap-1";
  if (m.external) {
    return (
      <a href={m.href} className={cls} target="_blank" rel="noopener noreferrer">
        {label}
        <ArrowUpRight size={14} aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  if (m.href.startsWith("/")) {
    return (
      <Link href={m.href} className={cls}>
        {label}
      </Link>
    );
  }
  return (
    <a href={m.href} className={cls}>
      {label}
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
              <div className="surface p-5">
                <p className="t-meta text-ink-2">
                  <time>{m.when}</time>
                  {m.kind !== "Now" && <span className="text-ink-3"> · {m.kind}</span>}
                </p>
                <h3 className="t-h4 mt-2 text-ink">{m.title}</h3>
                {m.place && <p className="t-secondary mt-1 text-ink-2">{m.place}</p>}
                <p className="t-secondary mt-2 text-ink-2">{m.body}</p>
                {m.stack && <p className="t-meta mt-2 text-ink-3">{m.stack}</p>}
                <ItemLink m={m} />
              </div>
            </li>
          ))}
        </ol>
        <TimelineReveal />
      </div>
    </section>
  );
}
