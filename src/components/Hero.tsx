"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, Briefcase, FileDown, Network } from "lucide-react";

const TAGLINES = [
    "Intention.",
    "Resilience.",
    "Precision.",
    "Longevity.",
];

function useTypewriterLoop(words: string[]) {
    const [text, setText] = useState(words[0]);
    const [wordIndex, setWordIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            // Respect the same accessibility rule already applied to the marquee:
            // no motion that runs without the visitor triggering it.
            return;
        }

        const current = words[wordIndex % words.length];
        const typingSpeed = deleting ? 45 : 90;
        const holdTime = 1600;

        if (!deleting && text === current) {
            const holdTimeout = setTimeout(() => setDeleting(true), holdTime);
            return () => clearTimeout(holdTimeout);
        }

        if (deleting && text === "") {
            setDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setText((prev) =>
                deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
            );
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [text, deleting, wordIndex, words]);

    return text;
}

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const kickerRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const typedText = useTypewriterLoop(TAGLINES);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power2.out" },
                delay: 0.2,
            });

            tl.from(kickerRef.current, { y: 16, opacity: 0, duration: 0.6 })
                .from(line1Ref.current, { y: 24, opacity: 0, duration: 0.7 }, "-=0.35")
                .from(line2Ref.current, { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
                .from(subtitleRef.current, { y: 16, opacity: 0, duration: 0.6 }, "-=0.4")
                .from(
                    ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
                    { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 },
                    "-=0.35"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative w-full min-h-[100dvh] flex items-center bg-canvas dark:bg-dark-canvas overflow-hidden"
        >
            {/* Static architecture-motif watermark filling the empty right side */}
            <Network
                className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 text-obsidian/10 dark:text-dark-text/10 hidden lg:block"
                size={560}
                strokeWidth={0.75}
            />

            <div className="relative w-full max-w-page mx-auto px-5 sm:px-10 lg:px-16 pt-20 sm:pt-24 pb-16">
                <div className="max-w-content">
                    {/* Kicker */}
                    <div ref={kickerRef} className="mb-5 sm:mb-6">
                        <span className="font-text text-[11px] sm:text-[12px] font-semibold tracking-[0.08em] uppercase text-obsidian/60 dark:text-dark-text/60">
                            Systems-First Developer
                        </span>
                    </div>

                    {/* Hero Typography — left-aligned, single tinted word */}
                    <div ref={line1Ref}>
                        <span className="hero-title-line1 block font-display font-semibold text-obsidian dark:text-dark-text tracking-[-0.015em] text-[clamp(1.75rem,5vw,4rem)] leading-[1.06]">
                            Architecture meets
                        </span>
                    </div>
                    <div ref={line2Ref}>
                        <span className="hero-title-line2 block font-display font-semibold text-signal-blue dark:text-signal-blue-dark tracking-[-0.015em] text-[clamp(2.25rem,7vw,5.5rem)] leading-[1.04] mt-1 min-h-[1.04em]">
                            {typedText}
                            <span className="typewriter-cursor" aria-hidden="true" />
                        </span>
                    </div>

                    {/* Subtitle */}
                    <p
                        ref={subtitleRef}
                        className="mt-6 sm:mt-8 text-obsidian/60 dark:text-dark-text/60 text-[15px] sm:text-[17px] leading-[1.5] max-w-xl font-normal"
                    >
                        Crafting intelligent, resilient full-stack applications where every
                        system is fault-tolerant, every interface is intentional, and every
                        line of code is built to endure.
                    </p>

                    {/* CTAs — stack vertically on mobile, row on sm+ */}
                    <div ref={ctaRef} className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mt-8 sm:mt-10 w-full max-w-[320px] sm:max-w-none">
                        <button
                            onClick={() => scrollToSection("#contact")}
                            className="btn-primary-pill flex items-center justify-center gap-2.5 cursor-pointer text-sm leading-none w-full sm:w-auto"
                        >
                            <Briefcase size={16} className="shrink-0" />
                            <span>Let&apos;s Work Together</span>
                        </button>

                        <button
                            onClick={() => scrollToSection("#projects")}
                            className="btn-neutral-pill flex items-center justify-center gap-2.5 cursor-pointer text-sm leading-none w-full sm:w-auto"
                        >
                            <span>View Projects</span>
                        </button>

                        <a
                            href="/resume.pdf"
                            download
                            className="btn-neutral-pill flex items-center justify-center gap-2 cursor-pointer text-sm leading-none no-underline w-full sm:w-auto"
                        >
                            <FileDown size={14} className="shrink-0" />
                            <span>Resume</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
                <span className="text-[10px] font-mono text-obsidian/60 dark:text-dark-text/60 tracking-[0.2em] uppercase">
                    Scroll
                </span>
                <ArrowDown size={14} className="text-obsidian/50 dark:text-dark-text/50" />
            </div>
        </section>
    );
}
