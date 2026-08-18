"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
    {
        role: "Full Stack Developer Intern",
        company: "Sreenarayanaguru Open University",
        period: "May 2025 – Jun 2025",
        location: "Kollam, Kerala",
        type: "Internship",
        color: "#C9A84C",
        bullets: [
            "Built a bilingual (English/Malayalam) academic chatbot with voice and text interaction, deployed for 500+ university users.",
            "Improved backend response times by implementing query caching and optimizing database access patterns.",
            "Integrated JWT-based authentication modules in coordination with the university IT team.",
        ],
        tags: ["Python", "FastAPI", "React", "JWT", "MySQL"],
    },
];

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".exp-heading", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.1,
            });

            gsap.from(".exp-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.15,
            });

            gsap.from(".exp-timeline-line", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                },
                scaleY: 0,
                transformOrigin: "top center",
                duration: 1.2,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden"
        >
            {/* Subtle background accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-champagne/[0.02] blur-[180px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="max-w-2xl mb-16 sm:mb-20">
                    <span className="exp-heading block text-champagne text-xs font-mono tracking-[0.2em] uppercase mb-4">
                        Work Experience
                    </span>
                    <h2 className="exp-heading font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-[-0.03em] leading-[1.1]">
                        Where I&apos;ve{" "}
                        <span className="font-cursive text-shimmer text-[1.15em]">shipped</span>{" "}
                        real work
                    </h2>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line — hidden on mobile, shown from md */}
                    <div className="exp-timeline-line absolute left-0 md:left-[2rem] top-0 bottom-0 w-px bg-gradient-to-b from-champagne/40 via-champagne/10 to-transparent hidden md:block" />

                    <div className="space-y-8">
                        {EXPERIENCES.map((exp, i) => (
                            <div key={i} className="exp-card relative flex flex-col md:flex-row gap-6 md:gap-10 md:pl-16">
                                {/* Timeline dot — desktop */}
                                <div
                                    className="hidden md:flex absolute left-0 top-8 w-[4rem] items-center justify-center"
                                >
                                    <div
                                        className="w-3 h-3 rounded-full border-2 border-champagne shadow-[0_0_12px_rgba(201,168,76,0.5)] bg-obsidian"
                                        style={{ borderColor: exp.color, boxShadow: `0 0 12px ${exp.color}60` }}
                                    />
                                </div>

                                {/* Card */}
                                <div className="flex-1 bg-obsidian rounded-card border border-white/[0.06] p-7 sm:p-8 lg:p-10 hover:border-champagne/20 transition-all duration-500 group relative overflow-hidden">
                                    {/* Floating orb */}
                                    <div
                                        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[80px] opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-30"
                                        style={{ background: exp.color }}
                                    />

                                    {/* Type badge */}
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                                style={{ background: `${exp.color}18` }}
                                            >
                                                <Briefcase size={18} style={{ color: exp.color }} />
                                            </div>
                                            <div>
                                                <h3 className="font-heading font-bold text-lg sm:text-xl text-ivory tracking-tight">
                                                    {exp.role}
                                                </h3>
                                                <p className="text-champagne/80 text-sm font-medium mt-0.5">
                                                    {exp.company}
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className="text-[11px] font-mono font-semibold px-3 py-1.5 rounded-full border flex-shrink-0"
                                            style={{
                                                color: exp.color,
                                                borderColor: `${exp.color}40`,
                                                background: `${exp.color}10`,
                                            }}
                                        >
                                            {exp.type}
                                        </span>
                                    </div>

                                    {/* Meta */}
                                    <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
                                        <div className="flex items-center gap-1.5 text-ivory/40 text-[13px]">
                                            <Calendar size={13} className="flex-shrink-0" />
                                            <span>{exp.period}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-ivory/40 text-[13px]">
                                            <MapPin size={13} className="flex-shrink-0" />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>

                                    {/* Bullets */}
                                    <ul className="space-y-3 mb-7">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                <ChevronRight
                                                    size={14}
                                                    className="flex-shrink-0 mt-[3px]"
                                                    style={{ color: exp.color }}
                                                />
                                                <span className="text-ivory/60 text-sm leading-relaxed">
                                                    {bullet}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tags.map((tag, j) => (
                                            <span
                                                key={j}
                                                className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-ivory/40 text-[11px] font-mono font-medium group-hover:border-champagne/20 group-hover:text-ivory/50 transition-all duration-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
