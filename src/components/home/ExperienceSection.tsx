import { EXPERIENCE } from "@/data/profile";
import SectionHead from "./SectionHead";
import AwsDiagram from "./AwsDiagram";

export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="page">
        <SectionHead
          id="experience-title"
          index="01 / Experience"
          title="Experience"
          lead="Two internships: one building infrastructure on AWS, one shipping a chatbot that real students use."
        />

        <ol className="m-0 list-none space-y-12 p-0">
          {EXPERIENCE.map((job) => (
            <li key={job.org} className="reveal grid gap-8 md:grid-cols-12">
              <div className="md:col-span-2">
                <p className="t-meta text-ink-2">{job.period}</p>
                <p className="t-meta mt-1 text-ink-3">{job.place}</p>
              </div>

              <div className="md:col-span-5">
                <h3 className="t-h4 text-ink">{job.role}</h3>
                <p className="t-secondary mt-1 text-ink-2">{job.org}</p>
                <p className="t-body mt-4 text-ink">{job.summary}</p>
                <ul className="t-secondary mt-4 list-none space-y-3 p-0 text-ink-2">
                  {job.points.map((pt) => (
                    <li key={pt} className="relative pl-4">
                      <span aria-hidden className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-ink-3" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="t-meta mt-5 text-ink-3">{job.stack.join(" · ")}</p>
              </div>

              {job.facts && (
                <dl className="surface hairline-rows m-0 self-start md:col-span-5">
                  {job.facts.map((f) => (
                    <div key={f.k} className="grid grid-cols-[128px_1fr] gap-4 px-5 py-4">
                      <dt className="t-label pt-0.5">{f.k}</dt>
                      <dd className="t-body m-0 text-ink">{f.v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {job.diagram === "aws-multi-az" && (
                <div className="md:col-span-5">
                  <AwsDiagram />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
