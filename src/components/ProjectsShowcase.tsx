"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsShowcase() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        const elements = section.querySelectorAll(".proj-heading, .proj-card");
        elements.forEach((el, i) => {
            (el as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative py-24 sm:py-32 bg-canvas dark:bg-dark-canvas px-6 sm:px-10 lg:px-16"
        >
            <div className="max-w-page mx-auto">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 sm:mb-20">
                    <div className="max-w-2xl">
                        <span className="proj-heading reveal-up block text-signal-blue dark:text-signal-blue-dark text-[12px] font-semibold font-text tracking-[0.08em] uppercase mb-4">
                            Selected Work
                        </span>
                        <h2 className="proj-heading reveal-up font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-obsidian dark:text-dark-text tracking-[-0.02em] leading-[1.08]">
                            Systems I&apos;ve <span className="text-signal-blue dark:text-signal-blue-dark">built</span>
                        </h2>
                    </div>
                    <p className="proj-heading reveal-up text-obsidian/60 dark:text-dark-text/60 text-sm sm:text-[15px] max-w-xs leading-relaxed">
                        From AI assistants to full-stack platforms — each project is a
                        system designed to solve real problems.
                    </p>
                </div>

                {/* Projects Grid — grayscale by default, project artwork colorizes on hover */}
                <div className="space-y-5">
                    {PROJECTS.map((project, i) => {
                        return (
                            <Link
                                key={project.id}
                                href={`/projects/${project.id}`}
                                className={`proj-card reveal-scale group relative rounded-card border border-fog dark:border-dark-border overflow-hidden transition-colors duration-300 hover:border-obsidian/30 no-underline block cursor-pointer ${i % 2 === 0 ? "bg-paper dark:bg-dark-surface" : "bg-canvas dark:bg-dark-canvas"
                                    }`}
                            >
                                {/* Project artwork — muted by default, reveals full color on hover */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`/projects/bg-${project.id}.png`}
                                    alt=""
                                    className="pointer-events-none absolute -right-10 -bottom-10 w-56 h-56 sm:w-64 sm:h-64 rounded-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-500 ease-out"
                                />

                                <div className="relative z-10 p-8 sm:p-10 lg:p-12">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12">
                                        {/* Left: Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="text-obsidian/30 dark:text-dark-text/30 font-mono text-sm font-semibold">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <h3 className="font-display font-semibold text-xl sm:text-2xl text-obsidian dark:text-dark-text tracking-[-0.01em]">
                                                    {project.title}
                                                </h3>
                                            </div>

                                            <p className="text-obsidian/60 dark:text-dark-text/60 text-sm sm:text-[15px] leading-relaxed mb-6 max-w-2xl">
                                                {project.longDescription}
                                            </p>

                                            {/* Tech Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.slice(0, 6).map((tech, j) => (
                                                    <span
                                                        key={j}
                                                        className="px-3 py-1 rounded-pill bg-mist dark:bg-dark-mist text-charcoal dark:text-dark-text-secondary text-[11px] font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech.length > 6 && (
                                                    <span className="px-3 py-1 rounded-pill bg-mist dark:bg-dark-mist text-charcoal/60 dark:text-dark-text-secondary/60 text-[11px] font-medium">
                                                        +{project.tech.length - 6}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right: Case Study Indicator */}
                                        <div className="flex items-center gap-2 text-obsidian/40 dark:text-dark-text/40 group-hover:text-signal-blue transition-colors duration-300">
                                            <span className="hidden lg:block text-[11px] font-semibold tracking-[0.05em] uppercase">
                                                View Case Study
                                            </span>
                                            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
