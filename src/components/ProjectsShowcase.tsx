"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";



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
            // Stagger via transition-delay
            (el as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16"
        >
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 sm:mb-20">
                    <div className="max-w-2xl">
                        <span className="proj-heading reveal-up block text-champagne text-xs font-mono tracking-[0.2em] uppercase mb-4">
                            Selected Work
                        </span>
                        <h2 className="proj-heading reveal-up font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-[-0.03em] leading-[1.1]">
                            Systems I&apos;ve{" "}
                            <span className="font-cursive text-shimmer text-[1.15em]">built</span>
                        </h2>
                    </div>
                    <p className="proj-heading reveal-up text-ivory/40 text-sm font-light max-w-xs leading-relaxed">
                        From AI assistants to full-stack platforms — each project is a
                        system designed to solve real problems.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="space-y-6">
                    {PROJECTS.map((project, i) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className={`proj-card reveal-up group relative bg-obsidian rounded-card border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-champagne/20 no-underline block cursor-pointer proj-bg-${project.gradientClass}`}
                        >
                            {/* Floating exotic orb */}
                            <div
                                className="floating-orb absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-30 pointer-events-none"
                                style={{ background: project.accentColor }}
                            />

                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-champagne/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10 p-8 sm:p-10 lg:p-12">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12">
                                    {/* Left: Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-champagne/30 font-mono text-sm font-semibold">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <h3
                                            className="font-heading font-bold text-xl sm:text-2xl text-ivory tracking-tight transition-colors duration-400"
                                            style={{ '--accent': project.accentColor } as React.CSSProperties}
                                        >
                                                {project.title}
                                            </h3>
                                        </div>

                                        <p className="text-ivory/50 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl font-light">
                                            {project.longDescription}
                                        </p>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.slice(0, 6).map((tech, j) => (
                                                <span
                                                    key={j}
                                                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-ivory/40 text-[11px] font-mono font-medium transition-all duration-300 group-hover:border-champagne/20 group-hover:text-ivory/50"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.tech.length > 6 && (
                                                <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-ivory/30 text-[11px] font-mono font-medium">
                                                    +{project.tech.length - 6}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right: Case Study Indicator */}
                                    <div className="flex items-center gap-2 text-ivory/20 group-hover:text-champagne transition-colors duration-400">
                                        <span className="hidden lg:block text-[11px] font-mono tracking-[0.1em] uppercase">
                                            View Case Study
                                        </span>
                                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom accent line */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-champagne/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
