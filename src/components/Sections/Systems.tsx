'use client';

import { useEffect, useRef } from 'react';

const SYSTEMS = [
    {
        name: 'Hybrid Intelligence',
        description: 'Systems that combine GenAI for language understanding with deterministic models for reliability. Fault-tolerant by design — automatic fallback ensures zero downtime.',
        examples: ['Nutriswap fallover engine', 'Context-aware AI assistants'],
    },
    {
        name: 'Real-time Architectures',
        description: 'Backend systems built for speed. RESTful APIs, vector databases, and optimized queries that respond instantly to user needs.',
        examples: ['FastAPI backends', 'PostgreSQL with SQLAlchemy', 'Instant search & filtering'],
    },
    {
        name: 'Context-Locking',
        description: 'Preventing AI hallucinations through strict knowledge boundaries. Each user interaction stays isolated and fact-checked within defined domains.',
        examples: ['Exhibition QR scanning', 'Document-scoped AI chat', 'Multi-tenant safety'],
    },
    {
        name: 'Scalable Containerization',
        description: 'Docker-first approach. Frontend, backend, and database all orchestrated together, ensuring consistent deployment across development, staging, and production.',
        examples: ['Docker Compose setups', 'Microservice-ready architecture', 'Cloud-agnostic deployments'],
    },
    {
        name: 'Dynamic UX',
        description: 'Interfaces that respond to user input in real time. Smooth animations, interactive visualizations, and immediate feedback that make systems feel responsive.',
        examples: ['Framer Motion', 'D3 data visualization', 'Real-time filters'],
    },
    {
        name: 'Data-Driven Design',
        description: 'Every feature backed by structured data. Efficient querying, automated timetable generation, and smart recommendations powered by intelligent algorithms.',
        examples: ['Automated scheduling', 'Nutritional intelligence', 'Academic management systems'],
    },
];

export default function Systems() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const cards = sectionRef.current?.querySelectorAll('.system-card');
        cards?.forEach((card, i) => {
            (card as HTMLElement).style.transitionDelay = `${i * 0.06}s`;
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="systems"
            ref={sectionRef}
            className="min-h-screen bg-canvas dark:bg-dark-canvas pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16"
        >
            <div className="max-w-page mx-auto">
                <span className="reveal-up block text-signal-blue dark:text-signal-blue-dark text-xs font-semibold font-text tracking-[0.15em] uppercase mb-5">
                    Approach
                </span>
                <h1 className="reveal-up font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-obsidian dark:text-dark-text tracking-[-0.02em] mb-4">
                    Systems in <span className="text-signal-blue dark:text-signal-blue-dark">motion</span>
                </h1>
                <p className="reveal-up text-obsidian/60 dark:text-dark-text-secondary text-base sm:text-lg mb-14 max-w-xl">
                    How I approach building intelligent, resilient systems.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SYSTEMS.map((system, i) => (
                        <div
                            key={i}
                            className="system-card reveal-up rounded-card bg-paper dark:bg-dark-surface border border-fog dark:border-dark-border p-6 sm:p-7"
                        >
                            <h3 className="font-display font-semibold text-lg text-obsidian dark:text-dark-text tracking-[-0.01em] mb-3">
                                {system.name}
                            </h3>
                            <p className="text-obsidian/60 dark:text-dark-text-secondary text-sm leading-relaxed mb-5">
                                {system.description}
                            </p>
                            <div>
                                <span className="text-obsidian/35 dark:text-dark-text-secondary/60 text-[10px] font-mono tracking-[0.1em] uppercase block mb-2">
                                    Examples
                                </span>
                                <ul className="space-y-1.5">
                                    {system.examples.map((example, j) => (
                                        <li
                                            key={j}
                                            className="text-obsidian/70 dark:text-dark-text-secondary text-[13px] flex items-start gap-2"
                                        >
                                            <span className="text-signal-blue dark:text-signal-blue-dark mt-1">›</span>
                                            {example}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
