import { CREDENTIALS, SKILLS } from "@/data/profile";
import SectionHead from "./SectionHead";

export default function ToolkitSection() {
  return (
    <section id="toolkit" aria-labelledby="toolkit-title" className="section">
      <div className="page">
        <SectionHead
          id="toolkit-title"
          index="04 / Toolkit"
          title="Toolkit and credentials"
          lead="Grouped by what I have used in shipped projects and at work."
        />

        <ul className="bento m-0 grid list-none gap-4 p-0 md:grid-cols-6">
          {SKILLS.map((g, i) => (
            <li
              key={g.area}
              className={`surface reveal p-6 ${i < 2 ? "md:col-span-3" : "md:col-span-2"} ${i === 0 ? "bento-lead" : ""}`}
            >
              <p className="section-index">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="t-h4 mt-3 text-ink">{g.area}</h3>
              <p className="t-secondary mt-3 text-ink-2">{g.items}</p>
            </li>
          ))}
        </ul>

        <ul className="mt-8 grid list-none gap-4 p-0 md:grid-cols-2">
          {CREDENTIALS.map((c) => (
            <li key={c.title} className="surface reveal p-5">
              <p className="t-meta text-ink-3">{c.issuer}</p>
              <p className="t-body mt-2 font-medium text-ink">{c.title}</p>
              <p className="t-secondary mt-2 text-ink-2">{c.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
