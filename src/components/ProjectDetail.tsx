"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PROJECTS } from "@/data/projects";
import {
    ArrowLeft,
    ArrowRight,
    Github,
    ExternalLink,
    ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    projectId: string;
}

export default function ProjectDetail({ projectId }: Props) {
    const pageRef = useRef<HTMLDivElement>(null);

    const idx = PROJECTS.findIndex((p) => p.id === projectId);
    const project = PROJECTS[idx];
    const prev = idx > 0 ? PROJECTS[idx - 1] : null;
    const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.from(".detail-hero-content > *", {
                y: 32,
                opacity: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.08,
            });

            const sections = pageRef.current?.querySelectorAll(".detail-section");
            sections?.forEach((section) => {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add("revealed");
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    { threshold: 0.1 }
                );
                observer.observe(section);
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    if (!project) return null;

    return (
        <div ref={pageRef} className="min-h-screen bg-canvas dark:bg-dark-canvas text-obsidian dark:text-dark-text">
            {/* ═══ Hero ═══ */}
            <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-6 sm:px-10 lg:px-16 border-b border-fog dark:border-dark-border bg-paper dark:bg-dark-surface">
                <div className="detail-hero-content relative z-10 max-w-content mx-auto">
                    {/* Back link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-obsidian/50 dark:text-dark-text/50 text-sm hover:text-signal-blue transition-colors duration-200 mb-10 no-underline"
                    >
                        <ArrowLeft size={14} />
                        Back to Home
                    </Link>

                    {/* Number + Title */}
                    <div className="flex items-start gap-5 mb-6">
                        <span className="text-obsidian/20 dark:text-dark-text/20 font-mono text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none mt-1">
                            {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                            <h1 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.08] text-obsidian dark:text-dark-text">
                                {project.title}
                            </h1>
                            <p className="text-obsidian/60 dark:text-dark-text/60 text-base sm:text-lg mt-3 max-w-2xl leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2 mt-8">
                        {project.tech.map((t, i) => (
                            <span
                                key={i}
                                className="px-3 py-1.5 rounded-pill bg-mist dark:bg-dark-mist text-charcoal dark:text-dark-text-secondary text-[11px] font-mono font-medium"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-4 mt-8">
                        {project.github && project.github !== "#" && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-neutral-pill inline-flex items-center gap-2.5 text-sm no-underline"
                            >
                                <Github size={15} />
                                View Source
                            </a>
                        )}
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary-pill inline-flex items-center gap-2.5 text-sm no-underline"
                            >
                                <ExternalLink size={15} />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* ═══ Highlights Strip ═══ */}
            {project.highlights.length > 0 && (
                <section className="detail-section reveal-up border-b border-fog dark:border-dark-border bg-paper dark:bg-dark-surface">
                    <div className="max-w-content mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-14">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                            {project.highlights.map((h, i) => (
                                <div key={i} className="text-center sm:text-left">
                                    <p className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-signal-blue dark:text-signal-blue-dark">
                                        {h.value}
                                    </p>
                                    <p className="text-obsidian/40 dark:text-dark-text/40 text-[11px] font-mono tracking-[0.1em] uppercase mt-1">
                                        {h.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ Overview ═══ */}
            <section className="detail-section reveal-up py-16 sm:py-24 px-6 sm:px-10 lg:px-16">
                <div className="max-w-content mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {project.problem && (
                            <div>
                                <h2 className="text-signal-blue dark:text-signal-blue-dark text-xs font-semibold font-text tracking-[0.15em] uppercase mb-5">
                                    The Problem
                                </h2>
                                <p className="text-obsidian/70 dark:text-dark-text/70 text-base leading-relaxed">
                                    {project.problem}
                                </p>
                            </div>
                        )}

                        <div>
                            <h2 className="text-signal-blue dark:text-signal-blue-dark text-xs font-semibold font-text tracking-[0.15em] uppercase mb-5">
                                The Solution
                            </h2>
                            <p className="text-obsidian/70 dark:text-dark-text/70 text-base leading-relaxed">
                                {project.longDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Architecture ═══ */}
            {project.architecture && (
                <section className="detail-section reveal-up py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-paper dark:bg-dark-surface border-y border-fog dark:border-dark-border">
                    <div className="max-w-content mx-auto">
                        <h2 className="text-signal-blue dark:text-signal-blue-dark text-xs font-semibold font-text tracking-[0.15em] uppercase mb-8">
                            System Architecture
                        </h2>

                        <div className="relative rounded-card bg-canvas dark:bg-dark-canvas border border-fog dark:border-dark-border p-8 sm:p-10 lg:p-12">
                            <p className="text-obsidian/70 dark:text-dark-text/70 text-base sm:text-lg leading-[1.8] max-w-3xl">
                                {project.architecture}
                            </p>

                            {/* Pipeline visualization */}
                            <div className="relative z-10 mt-10 flex flex-wrap items-center gap-3">
                                {project.tech.slice(0, 5).map((t, i) => (
                                    <span key={i} className="flex items-center gap-2">
                                        <span className="px-3 py-1.5 rounded-link bg-paper dark:bg-dark-surface border border-fog dark:border-dark-border text-obsidian/70 dark:text-dark-text/70 text-[11px] font-mono font-medium">
                                            {t}
                                        </span>
                                        {i < Math.min(4, project.tech.length - 1) && (
                                            <ChevronRight size={12} className="text-obsidian/25 dark:text-dark-text/25" />
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ Features ═══ */}
            {project.features.length > 0 && (
                <section className="detail-section reveal-up py-16 sm:py-24 px-6 sm:px-10 lg:px-16">
                    <div className="max-w-content mx-auto">
                        <h2 className="text-signal-blue dark:text-signal-blue-dark text-xs font-semibold font-text tracking-[0.15em] uppercase mb-10">
                            Key Features
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {project.features.map((feature, i) => (
                                <div
                                    key={i}
                                    className="group rounded-card bg-paper dark:bg-dark-surface border border-fog dark:border-dark-border p-6 transition-colors duration-300 hover:border-obsidian/25"
                                >
                                    <span className="text-obsidian/25 dark:text-dark-text/25 font-mono text-[11px] font-semibold block mb-3">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <p className="text-obsidian/70 dark:text-dark-text/70 text-sm leading-relaxed">
                                        {feature}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ My Role ═══ */}
            {project.role && (
                <section className="detail-section reveal-up py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-paper dark:bg-dark-surface border-y border-fog dark:border-dark-border">
                    <div className="max-w-content mx-auto">
                        <h2 className="text-signal-blue dark:text-signal-blue-dark text-xs font-semibold font-text tracking-[0.15em] uppercase mb-6">
                            My Role
                        </h2>
                        <p className="text-obsidian/70 dark:text-dark-text/70 text-lg sm:text-xl leading-relaxed max-w-3xl">
                            {project.role}
                        </p>
                    </div>
                </section>
            )}

            {/* ═══ Previous / Next Navigation ═══ */}
            <section className="border-t border-fog dark:border-dark-border py-12 sm:py-16 px-6 sm:px-10 lg:px-16">
                <div className="max-w-content mx-auto flex items-stretch justify-between gap-6">
                    {prev ? (
                        <Link
                            href={`/projects/${prev.id}`}
                            className="group flex-1 max-w-[45%] rounded-card bg-paper dark:bg-dark-surface border border-fog dark:border-dark-border p-6 sm:p-8 transition-colors duration-300 hover:border-obsidian/25 no-underline"
                        >
                            <span className="flex items-center gap-2 text-obsidian/40 dark:text-dark-text/40 text-[11px] font-mono tracking-[0.15em] uppercase mb-3">
                                <ArrowLeft size={12} />
                                Previous
                            </span>
                            <h3 className="font-display font-semibold text-base sm:text-lg text-obsidian dark:text-dark-text group-hover:text-signal-blue transition-colors duration-200 tracking-tight">
                                {prev.title}
                            </h3>
                        </Link>
                    ) : (
                        <div className="flex-1" />
                    )}

                    {next ? (
                        <Link
                            href={`/projects/${next.id}`}
                            className="group flex-1 max-w-[45%] rounded-card bg-paper dark:bg-dark-surface border border-fog dark:border-dark-border p-6 sm:p-8 transition-colors duration-300 hover:border-obsidian/25 no-underline text-right"
                        >
                            <span className="flex items-center justify-end gap-2 text-obsidian/40 dark:text-dark-text/40 text-[11px] font-mono tracking-[0.15em] uppercase mb-3">
                                Next
                                <ArrowRight size={12} />
                            </span>
                            <h3 className="font-display font-semibold text-base sm:text-lg text-obsidian dark:text-dark-text group-hover:text-signal-blue transition-colors duration-200 tracking-tight">
                                {next.title}
                            </h3>
                        </Link>
                    ) : (
                        <div className="flex-1" />
                    )}
                </div>
            </section>
        </div>
    );
}
