'use client';

import { useEffect, useRef } from 'react';
import { SKILLS } from '@/data/skills';

export default function Skills() {
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

        const tags = sectionRef.current?.querySelectorAll('.skill-tag');
        tags?.forEach((tag, i) => {
            (tag as HTMLElement).style.transitionDelay = `${i * 0.02}s`;
            observer.observe(tag);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen bg-canvas dark:bg-dark-canvas pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16"
        >
            <div className="max-w-content mx-auto">
                <span className="reveal-up block text-signal-blue dark:text-signal-blue-dark text-xs font-semibold font-text tracking-[0.15em] uppercase mb-5">
                    Toolkit
                </span>
                <h1 className="reveal-up font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-obsidian dark:text-dark-text tracking-[-0.02em] mb-4">
                    Skills
                </h1>
                <p className="reveal-up text-obsidian/60 dark:text-dark-text-secondary text-base sm:text-lg mb-14 max-w-xl">
                    Languages, frameworks, and tools I work with.
                </p>

                <div className="flex flex-wrap gap-3">
                    {SKILLS.map((skill, i) => (
                        <span
                            key={i}
                            className="skill-tag reveal-up px-4 py-2 rounded-pill bg-paper dark:bg-dark-surface border border-fog dark:border-dark-border text-obsidian/75 dark:text-dark-text-secondary text-sm font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
