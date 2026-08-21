"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Word-by-word reveal for the main statement
            const words = sectionRef.current?.querySelectorAll(".phil-word");
            if (words) {
                gsap.from(words, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 65%",
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.04,
                });
            }

            // Fade in the contrast statement
            gsap.from(".phil-contrast", {
                scrollTrigger: {
                    trigger: ".phil-contrast",
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const splitWords = (text: string, className?: string) =>
        text.split(" ").map((word, i) => (
            <span key={i} className={`phil-word inline-block mr-[0.3em] ${className || ""}`}>
                {word}
            </span>
        ));

    return (
        <section
            ref={sectionRef}
            className="relative py-20 sm:py-32 lg:py-44 px-5 sm:px-10 lg:px-16 bg-canvas dark:bg-dark-canvas overflow-hidden"
        >
            <div className="relative z-10 max-w-content mx-auto">
                {/* Neutral statement */}
                <div className="mb-16 sm:mb-20">
                    <p className="text-obsidian/45 dark:text-dark-text/45 text-base sm:text-lg leading-relaxed max-w-2xl">
                        {splitWords("Most developers focus on shipping features that work today.")}
                    </p>
                </div>

                {/* Power statement */}
                <div className="phil-contrast">
                    <p className="text-obsidian dark:text-dark-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-[-0.02em] leading-[1.12] max-w-4xl">
                        {splitWords("I architect systems that")}
                        <span className="phil-word inline-block mr-[0.3em] text-signal-blue dark:text-signal-blue-dark">
                            endure
                        </span>
                        {splitWords("— fault-tolerant, context-aware, and built for what comes next.")}
                    </p>
                </div>

                {/* Divider */}
                <div className="mt-20 sm:mt-28 flex items-center gap-4">
                    <div className="h-px flex-1 bg-fog" />
                    <span className="text-[10px] font-mono text-obsidian/40 dark:text-dark-text/40 tracking-[0.3em] uppercase">
                        Process
                    </span>
                    <div className="h-px flex-1 bg-fog" />
                </div>
            </div>
        </section>
    );
}
