"use client";

const STACK = [
    { name: "React", slug: "react" },
    { name: "Next.js", slug: "nextdotjs" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Python", slug: "python" },
    { name: "FastAPI", slug: "fastapi" },
    { name: "Node.js", slug: "nodedotjs" },
    { name: "Express", slug: "express" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "MySQL", slug: "mysql" },
    { name: "MongoDB", slug: "mongodb" },
    { name: "Docker", slug: "docker" },
    { name: "Java", slug: "openjdk" },
    { name: "Tailwind CSS", slug: "tailwindcss" },
    { name: "Git", slug: "git" },
];

// Monochrome brand icons via Simple Icons CDN, tinted to the obsidian token
// so the tiles stay inside the grayscale system — no brand colors.
const iconUrl = (slug: string) => `https://cdn.simpleicons.org/${slug}/1d1d1f`;

function Tile({ name, slug }: { name: string; slug: string }) {
    return (
        <div className="flex items-center gap-3 shrink-0 bg-paper dark:bg-dark-surface border border-fog dark:border-dark-border rounded-card px-5 py-3.5 mx-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iconUrl(slug)} alt="" width={20} height={20} className="opacity-70" />
            <span className="text-obsidian/70 dark:text-dark-text/70 text-[13px] font-medium whitespace-nowrap">
                {name}
            </span>
        </div>
    );
}

export default function TechMarquee() {
    // Duplicate the row so the loop is seamless.
    const row = [...STACK, ...STACK];

    return (
        <section className="relative py-14 sm:py-20 bg-canvas dark:bg-dark-canvas border-y border-fog dark:border-dark-border overflow-hidden">
            <div className="marquee-track flex w-max">
                <div className="flex">
                    {row.map((item, i) => (
                        <Tile key={`${item.slug}-${i}`} {...item} />
                    ))}
                </div>
                <div className="flex" aria-hidden="true">
                    {row.map((item, i) => (
                        <Tile key={`${item.slug}-dup-${i}`} {...item} />
                    ))}
                </div>
            </div>

            {/* Edge fade so tiles don't hard-cut at the viewport edge */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-canvas to-transparent dark:from-dark-canvas" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-canvas to-transparent dark:from-dark-canvas" />
        </section>
    );
}
