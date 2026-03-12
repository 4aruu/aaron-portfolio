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
            // Hero entrance
            gsap.from(".detail-hero-content > *", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
            });

            // Sections reveal
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
        <div ref={pageRef} className="min-h-screen bg-obsidian text-ivory">
            {/* ═══ Hero ═══ */}
            <section className={`relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-6 sm:px-10 lg:px-16 border-b border-white/[0.04] overflow-hidden proj-hero-${project.gradientClass}`}>

                {/* Gradient accent */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none" style={{ background: `${project.accentColor}10` }} />

                {/* Floating orbs */}
                <div className="floating-orb absolute top-20 left-[10%] w-32 h-32 rounded-full blur-[100px] opacity-20" style={{ background: project.accentColor }} />
                <div className="floating-orb absolute bottom-10 right-[15%] w-24 h-24 rounded-full blur-[80px] opacity-15" style={{ background: project.accentColor, animationDelay: '2s' }} />

                <div className="detail-hero-content relative z-10 max-w-[1100px] mx-auto">
                    {/* Back link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-ivory/40 text-sm font-light hover:text-champagne transition-colors duration-300 mb-10 no-underline link-lift"
                    >
                        <ArrowLeft size={14} />
                        Back to Home
                    </Link>

                    {/* Number + Title */}
                    <div className="flex items-start gap-5 mb-6">
                        <span className="text-champagne/20 font-mono text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none mt-1">
                            {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.1]">
                                <span className="font-cursive text-shimmer text-[1.1em]">{project.title}</span>
                            </h1>
                            <p className="text-ivory/40 text-base sm:text-lg font-light mt-3 max-w-2xl leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2 mt-8">
                        {project.tech.map((t, i) => (
                            <span
                                key={i}
                                className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-ivory/50 text-[11px] font-mono font-medium"
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
                                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-ivory/60 text-sm font-medium hover:border-champagne/30 hover:text-champagne transition-all duration-300 no-underline link-lift"
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
                                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-champagne text-obsidian text-sm font-semibold hover:bg-champagne-light transition-all duration-300 no-underline"
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
                <section className="detail-section reveal-up border-b border-white/[0.04]">
                    <div className="max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-14">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                            {project.highlights.map((h, i) => (
                                <div key={i} className="text-center sm:text-left">
                                    <p className="text-xl sm:text-2xl font-heading font-bold tracking-tight" style={{ color: project.accentColor }}>
                                        {h.value}
                                    </p>
                                    <p className="text-ivory/30 text-[11px] font-mono tracking-[0.1em] uppercase mt-1">
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
                <div className="max-w-[1100px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Problem */}
                        {project.problem && (
                            <div>
                                <h2 className="text-xs font-mono tracking-[0.2em] uppercase mb-5" style={{ color: project.accentColor }}>
                                    <span className="font-cursive text-lg tracking-normal normal-case">The Problem</span>
                                </h2>
                                <p className="text-ivory/60 text-base leading-relaxed font-light">
                                    {project.problem}
                                </p>
                            </div>
                        )}

                        {/* Solution */}
                        <div>
                            <h2 className="text-xs font-mono tracking-[0.2em] uppercase mb-5" style={{ color: project.accentColor }}>
                                <span className="font-cursive text-lg tracking-normal normal-case">The Solution</span>
                            </h2>
                            <p className="text-ivory/60 text-base leading-relaxed font-light">
                                {project.longDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Architecture ═══ */}
            {project.architecture && (
                <section className="detail-section reveal-up py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-midnight/50">
                    <div className="max-w-[1100px] mx-auto">
                        <h2 className="text-xs font-mono tracking-[0.2em] uppercase mb-8" style={{ color: project.accentColor }}>
                            <span className="font-cursive text-lg tracking-normal normal-case">System Architecture</span>
                        </h2>

                        <div className="relative rounded-card bg-obsidian border border-white/[0.06] p-8 sm:p-10 lg:p-12 overflow-hidden">
                            {/* Decorative corner accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-champagne/[0.03] rounded-bl-[100px] pointer-events-none" />

                            <p className="relative z-10 text-ivory/50 text-base sm:text-lg leading-[1.8] font-light max-w-3xl">
                                {project.architecture}
                            </p>

                            {/* Pipeline visualization */}
                            <div className="relative z-10 mt-10 flex flex-wrap items-center gap-3">
                                {project.tech.slice(0, 5).map((t, i) => (
                                    <span key={i} className="flex items-center gap-2">
                                        <span className="px-3 py-1.5 rounded-lg bg-champagne/[0.08] border border-champagne/[0.15] text-champagne text-[11px] font-mono font-medium">
                                            {t}
                                        </span>
                                        {i < Math.min(4, project.tech.length - 1) && (
                                            <ChevronRight
                                                size={12}
                                                className="text-champagne/30"
                                            />
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
                    <div className="max-w-[1100px] mx-auto">
                        <h2 className="text-xs font-mono tracking-[0.2em] uppercase mb-10" style={{ color: project.accentColor }}>
                            <span className="font-cursive text-lg tracking-normal normal-case">Key Features</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {project.features.map((feature, i) => (
                                <div
                                    key={i}
                                    className="group rounded-card bg-white/[0.02] border border-white/[0.04] p-6 transition-all duration-400 hover:border-champagne/20 hover:bg-white/[0.04]"
                                >
                                    <span className="text-champagne/30 font-mono text-[11px] font-semibold block mb-3">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <p className="text-ivory/60 text-sm leading-relaxed font-light">
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
                <section className="detail-section reveal-up py-16 sm:py-24 px-6 sm:px-10 lg:px-16 bg-midnight/50">
                    <div className="max-w-[1100px] mx-auto">
                        <h2 className="text-xs font-mono tracking-[0.2em] uppercase mb-6" style={{ color: project.accentColor }}>
                            <span className="font-cursive text-lg tracking-normal normal-case">My Role</span>
                        </h2>
                        <p className="text-ivory/50 text-lg sm:text-xl leading-relaxed font-light max-w-3xl">
                            {project.role}
                        </p>
                    </div>
                </section>
            )}

            {/* ═══ Previous / Next Navigation ═══ */}
            <section className="border-t border-white/[0.04] py-12 sm:py-16 px-6 sm:px-10 lg:px-16">
                <div className="max-w-[1100px] mx-auto flex items-stretch justify-between gap-6">
                    {prev ? (
                        <Link
                            href={`/projects/${prev.id}`}
                            className="group flex-1 max-w-[45%] rounded-card bg-white/[0.02] border border-white/[0.04] p-6 sm:p-8 transition-all duration-400 hover:border-champagne/20 no-underline"
                        >
                            <span className="flex items-center gap-2 text-ivory/30 text-[11px] font-mono tracking-[0.15em] uppercase mb-3">
                                <ArrowLeft size={12} />
                                Previous
                            </span>
                            <h3 className="font-heading font-bold text-base sm:text-lg text-ivory group-hover:text-champagne transition-colors duration-300 tracking-tight">
                                {prev.title}
                            </h3>
                        </Link>
                    ) : (
                        <div className="flex-1" />
                    )}

                    {next ? (
                        <Link
                            href={`/projects/${next.id}`}
                            className="group flex-1 max-w-[45%] rounded-card bg-white/[0.02] border border-white/[0.04] p-6 sm:p-8 transition-all duration-400 hover:border-champagne/20 no-underline text-right"
                        >
                            <span className="flex items-center justify-end gap-2 text-ivory/30 text-[11px] font-mono tracking-[0.15em] uppercase mb-3">
                                Next
                                <ArrowRight size={12} />
                            </span>
                            <h3 className="font-heading font-bold text-base sm:text-lg text-ivory group-hover:text-champagne transition-colors duration-300 tracking-tight">
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
