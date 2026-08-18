"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GraduationCap, Award, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
    {
        degree: "B.Tech in Information Technology",
        institution: "APJ Abdul Kalam Technological University (KTU)",
        location: "Kottayam, India",
        period: "2022 – 2026",
        detail: "CGPA: 7.5 (up to Sem 7) · Final semester result pending",
        color: "#C084FC",
    },
    {
        degree: "Higher Secondary Education (CBSE)",
        institution: "CBSE Board",
        location: "Kuwait",
        period: "2022",
        detail: "12th: 78%  ·  10th: 73.2%",
        color: "#2DD4BF",
    },
];

const CERTIFICATIONS = [
    {
        title: "ChatGPT Prompt Engineering for Developers",
        issuer: "DeepLearning.AI",
        badge: "🤖",
        color: "#FF6B9D",
    },
    {
        title: "Fundamentals of Cloud Computing",
        issuer: "NPTEL",
        badge: "☁️",
        detail: "Elite · 75%",
        color: "#FBBF24",
    },
];

export default function Education() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".edu-heading", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.08,
            });

            gsap.from(".edu-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.12,
            });

            gsap.from(".cert-badge", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                },
                scale: 0.85,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
                stagger: 0.1,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="education"
            ref={sectionRef}
            className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight/30 to-transparent pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header */}
                <div className="max-w-2xl mb-14">
                    <span className="edu-heading block text-champagne text-xs font-mono tracking-[0.2em] uppercase mb-4">
                        Education &amp; Credentials
                    </span>
                    <h2 className="edu-heading font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-[-0.03em] leading-[1.1]">
                        The{" "}
                        <span className="font-cursive text-shimmer text-[1.15em]">foundation</span>{" "}
                        beneath the code
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                    {/* Education Cards */}
                    {EDUCATION.map((edu, i) => (
                        <div
                            key={i}
                            className="edu-card bg-obsidian rounded-card border border-white/[0.06] p-7 sm:p-8 hover:border-champagne/20 transition-all duration-500 group relative overflow-hidden"
                        >
                            {/* Orb */}
                            <div
                                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[70px] opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-500"
                                style={{ background: edu.color }}
                            />

                            <div className="flex items-start gap-4 mb-5">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{ background: `${edu.color}18` }}
                                >
                                    <GraduationCap size={18} style={{ color: edu.color }} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-heading font-bold text-base sm:text-lg text-ivory tracking-tight leading-tight">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-ivory/50 text-sm mt-1">{edu.institution}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
                                <span className="text-ivory/30 text-[12px] font-mono">{edu.period}</span>
                                <span className="text-ivory/20 text-[12px] font-mono">{edu.location}</span>
                            </div>

                            <p
                                className="text-[13px] font-mono px-3 py-2 rounded-lg"
                                style={{ background: `${edu.color}10`, color: edu.color }}
                            >
                                {edu.detail}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Certifications */}
                <div className="bg-obsidian rounded-card border border-white/[0.06] p-7 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-champagne/10 flex items-center justify-center touch-target-exempt">
                            <Award size={17} className="text-champagne" />
                        </div>
                        <h3 className="font-heading font-bold text-base text-ivory tracking-tight">
                            Certifications
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {CERTIFICATIONS.map((cert, i) => (
                            <div
                                key={i}
                                className="cert-badge flex items-start gap-4 p-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-champagne/20 hover:bg-white/[0.04] transition-all duration-300 group cursor-default"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 touch-target-exempt"
                                    style={{ background: `${cert.color}15` }}
                                >
                                    {cert.badge}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-ivory/80 text-sm font-medium leading-snug">
                                        {cert.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                        <span className="text-ivory/30 text-[11px] font-mono">
                                            {cert.issuer}
                                        </span>
                                        {cert.detail && (
                                            <>
                                                <span className="text-ivory/20 text-[11px]">·</span>
                                                <span
                                                    className="text-[11px] font-mono font-semibold"
                                                    style={{ color: cert.color }}
                                                >
                                                    {cert.detail}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <BookOpen
                                    size={14}
                                    className="flex-shrink-0 ml-auto opacity-0 group-hover:opacity-40 transition-opacity duration-300 mt-1 touch-target-exempt"
                                    style={{ color: cert.color }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
