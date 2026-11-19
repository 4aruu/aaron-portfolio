import { ArrowRight, Download, Mail } from "lucide-react";
import { PROFILE } from "@/data/profile";
import SystemMap from "./SystemMap";

const HEADLINE = "I build AI systems and the cloud they run on.";

const FACTS: { k: string; v: string }[] = [
  { k: "Certified", v: "AWS Solutions Architect – Associate" },
  { k: "Recent", v: "Multi-AZ web tier · voice RAG assistant" },
  { k: "Based in", v: "Kuwait, open to relocation" },
  { k: "Looking for", v: "Cloud and AI roles: UAE, Kuwait, India" },
];

export default function Hero() {
  const words = HEADLINE.split(" ");
  return (
    <section id="frontispiece" aria-labelledby="hero-title" className="hero relative overflow-hidden">
      <div className="hero-grid" aria-hidden />

      <div className="page relative pb-8 pt-16 text-center md:pb-12 md:pt-24">
        <a href="#timeline" className="hero-notice enter">
          <span className="hero-notice-dot" aria-hidden />
          AWS SAA-C03 passed on Oct 13, 2026
          <ArrowRight size={14} aria-hidden />
        </a>

        <h1 id="hero-title" className="t-hero mx-auto mt-8 max-w-[14ch]" aria-label={HEADLINE}>
          {words.map((w, i) => (
            <span key={i} aria-hidden className="hero-word" style={{ animationDelay: `${120 + i * 45}ms` }}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <p className="t-lead enter enter-d4 mx-auto mt-6 max-w-[58ch] text-ink-2">
          IT graduate (KTU, 2026) and AWS Certified Solutions Architect – Associate. I designed a
          self-healing, multi-AZ web tier on AWS and helped build a voice assistant that answers from a
          team&apos;s own documents on local hardware.
        </p>

        <div className="enter enter-d5 mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
            <Mail size={16} aria-hidden />
            Email me
          </a>
          <a href={PROFILE.resume} className="btn btn-secondary" download>
            <Download size={16} aria-hidden />
            Download résumé
          </a>
        </div>

        <div id="territories" className="mt-16 md:mt-20">
          <SystemMap />
        </div>

        <dl className="hero-facts enter enter-d6 m-0 mt-10 grid gap-px overflow-hidden rounded-xl border border-line/[0.09] bg-line/[0.09] text-left sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.k} className="bg-l1 px-5 py-4">
              <dt className="t-label">{f.k}</dt>
              <dd className="t-secondary m-0 mt-1 text-ink">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
