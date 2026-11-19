import { PROFILE } from "@/data/profile";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line/[0.09]">
      <div className="page flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <p className="t-meta text-ink-3">
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-6 p-0">
          <li>
            <a className="link-quiet t-secondary inline-flex min-h-[44px] items-center" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className="link-quiet t-secondary inline-flex min-h-[44px] items-center" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="link-quiet t-secondary inline-flex min-h-[44px] items-center" href={PROFILE.resume} download>
              Résumé (PDF)
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
