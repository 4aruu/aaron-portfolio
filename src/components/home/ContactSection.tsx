import { ArrowUpRight, Mail } from "lucide-react";
import { PROFILE } from "@/data/profile";

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="page">
      <div className="cta-band reveal grid gap-10 p-8 md:grid-cols-12 md:gap-8 md:p-14">
        <div className="md:col-span-7">
          <p className="section-index" aria-hidden>
            05 / Contact
          </p>
          <h2 id="contact-title" className="t-section mt-3">
            Hiring for cloud or AI engineering?
          </h2>
          <p className="t-body prose-w mt-4 cta-muted">
            I am looking for my first full-time role in the UAE, Kuwait or India, and I can relocate.
            Email is the fastest way to reach me.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
              <Mail size={16} aria-hidden />
              Email me
            </a>
            <a href={PROFILE.linkedin} className="btn btn-inverse" target="_blank" rel="noopener noreferrer">
              Message on LinkedIn
              <ArrowUpRight size={16} aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <dl className="cta-card hairline-rows m-0 self-end md:col-span-5">
          <div className="grid min-h-[56px] grid-cols-[88px_1fr] items-center gap-4 px-5 py-1.5">
            <dt className="t-label">Email</dt>
            <dd className="t-secondary m-0 break-all">
              <a className="link inline-flex min-h-[44px] items-center" href={`mailto:${PROFILE.email}`}>
                {PROFILE.email}
              </a>
            </dd>
          </div>
          <div className="grid min-h-[56px] grid-cols-[88px_1fr] items-center gap-4 px-5 py-1.5">
            <dt className="t-label">GitHub</dt>
            <dd className="t-secondary m-0">
              <a className="link inline-flex min-h-[44px] items-center" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                github.com/4aruu
              </a>
            </dd>
          </div>
          <div className="grid min-h-[56px] grid-cols-[88px_1fr] items-center gap-4 px-5 py-1.5">
            <dt className="t-label">Based in</dt>
            <dd className="t-secondary m-0">{PROFILE.location}</dd>
          </div>
        </dl>
      </div>
      </div>
    </section>
  );
}
