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
            className="relative py-32 sm:py-40 lg:py-52 px-6 sm:px-10 lg:px-16 bg-midnight overflow-hidden"
        >
            {/* Parallax Background Texture */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover opacity-[0.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight" />
            </div>

            <div className="relative z-10 max-w-[1100px] mx-auto">
                {/* Neutral statement */}
                <div className="mb-16 sm:mb-20">
                    <p className="text-ivory/30 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                        {splitWords("Most developers focus on shipping features that work today.")}
                    </p>
                </div>

                {/* Power statement */}
                <div className="phil-contrast">
                    <p className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-[-0.03em] leading-[1.15] max-w-4xl">
                        {splitWords("I architect systems that")}
                        <span className="phil-word inline-block mr-[0.3em] font-cursive text-shimmer text-[1.15em]">
                            endure
                        </span>
                        {splitWords("— fault-tolerant, context-aware, and built for what comes next.")}
                    </p>
                </div>

                {/* Subtle divider line */}
                <div className="mt-20 sm:mt-28 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-champagne/30 to-transparent" />
                    <span className="text-[10px] font-mono text-champagne/40 tracking-[0.3em] uppercase">
                        Process
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-l from-champagne/30 to-transparent" />
                </div>
            </div>
        </section>
    );
}
