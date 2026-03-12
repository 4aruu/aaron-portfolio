"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, Briefcase, FileDown } from "lucide-react";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                delay: 0.3,
            });

            tl.from(badgeRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.8,
            })
                .from(
                    line1Ref.current,
                    {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                    },
                    "-=0.4"
                )
                .from(
                    line2Ref.current,
                    {
                        y: 60,
                        opacity: 0,
                        duration: 1.1,
                    },
                    "-=0.6"
                )
                .from(
                    subtitleRef.current,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.5"
                )
                .from(
                    ctaRef.current?.children
                        ? Array.from(ctaRef.current.children)
                        : [],
                    {
                        y: 25,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.08,
                    },
                    "-=0.4"
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
            className="relative w-full min-h-[100dvh] flex items-end overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                />
                {/* Heavy gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 to-transparent" />
                <div className="absolute inset-0 bg-obsidian/20" />
            </div>

            {/* Content — Bottom Left */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 lg:pb-32 pt-32">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <div ref={badgeRef} className="mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/10 border border-champagne/20 text-champagne text-xs font-mono font-medium tracking-wider uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse-dot" />
                            Systems-First Developer
                        </span>
                    </div>

                    {/* Hero Typography */}
                    <div ref={line1Ref}>
                        <span className="hero-title-line1 block font-heading font-bold text-ivory/80 tracking-[-0.04em] text-[clamp(1.5rem,4vw,3rem)] leading-[1.1]">
                            Architecture meets
                        </span>
                    </div>
                    <div ref={line2Ref}>
                        <span className="hero-title-line2 block font-cursive text-shimmer tracking-[-0.03em] text-[clamp(3.5rem,10vw,8rem)] leading-[0.95] mt-1">
                            Intention.
                        </span>
                    </div>

                    {/* Subtitle */}
                    <p
                        ref={subtitleRef}
                        className="mt-8 text-ivory/50 text-base sm:text-lg leading-relaxed max-w-xl font-light"
                    >
                        Crafting intelligent, resilient full-stack applications where every
                        system is fault-tolerant, every interface is intentional, and every
                        line of code is built to endure.
                    </p>

                    {/* CTAs */}
                    <div ref={ctaRef} className="flex flex-wrap gap-4 mt-10">
                        <button
                            onClick={() => scrollToSection("#contact")}
                            className="btn-magnetic group relative bg-champagne text-obsidian px-7 py-3.5 rounded-full text-sm font-semibold tracking-tight flex items-center gap-2.5 cursor-pointer border-none"
                        >
                            <span className="btn-bg bg-champagne-dark rounded-full" />
                            <Briefcase size={16} className="relative z-10" />
                            <span className="relative z-10">Let&apos;s Work Together</span>
                        </button>

                        <button
                            onClick={() => scrollToSection("#projects")}
                            className="btn-magnetic group bg-transparent border border-ivory/20 text-ivory px-7 py-3.5 rounded-full text-sm font-medium tracking-tight flex items-center gap-2.5 cursor-pointer hover:bg-ivory/[0.06] transition-colors duration-300"
                        >
                            View Projects
                        </button>

                        <a
                            href="/resume.pdf"
                            download
                            className="btn-magnetic group bg-transparent border border-ivory/10 text-ivory/60 px-6 py-3.5 rounded-full text-sm font-medium tracking-tight flex items-center gap-2 cursor-pointer hover:text-ivory hover:border-ivory/20 transition-all duration-300 no-underline"
                        >
                            <FileDown size={14} />
                            Resume
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
                <span className="text-[10px] font-mono text-ivory/50 tracking-[0.2em] uppercase">
                    Scroll
                </span>
                <ArrowDown size={14} className="text-ivory/40 animate-bounce" />
            </div>
        </section>
    );
}
