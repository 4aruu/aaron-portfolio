"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Live paper-tear canvas ─────────────────────────────────
   Horizontal strips of the background offset sinusoidally at
   independent phases — creates the sensation of a page being
   slowly, organically torn apart and reforming.
   Very low opacity so typography remains the focus.
──────────────────────────────────────────────────────────── */
function TearCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let raf: number;
        let t = 0;

        const isDark = () =>
            window.matchMedia("(prefers-color-scheme: dark)").matches;

        const resize = () => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        /* Each strip carries its own phase seed for organic variation */
        const STRIPS = 80;
        const seeds  = Array.from({ length: STRIPS }, () => Math.random() * Math.PI * 2);

        const draw = () => {
            t += 0.0025; // very slow drift

            const w = canvas.width;
            const h = canvas.height;
            const stripH = h / STRIPS;

            ctx.clearRect(0, 0, w, h);

            const dark = isDark();

            for (let i = 0; i < STRIPS; i++) {
                const phase = t + seeds[i] + i * 0.12;

                /* horizontal tear offset — two sine waves at different
                   frequencies give it an organic, non-mechanical feel */
                const xOff =
                    Math.sin(phase)           * 2.8 +
                    Math.sin(phase * 2.1 + 1) * 1.2;

                /* opacity pulses gently — strips catch light differently */
                const alpha =
                    (Math.abs(Math.sin(phase * 0.6 + seeds[i])) * 0.032 + 0.006);

                const y = i * stripH;

                if (dark) {
                    /* warm near-black strips — slightly lighter than bg #0f0e0d */
                    ctx.fillStyle = `rgba(232, 228, 222, ${alpha * 0.7})`;
                } else {
                    /* warm charcoal strips on parchment */
                    ctx.fillStyle = `rgba(44, 42, 39, ${alpha})`;
                }

                /* Draw the strip with a small horizontal tear offset */
                ctx.fillRect(xOff - 2, y, w + 4, stripH + 0.5);
            }

            raf = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full"
        />
    );
}

/* ─── Philosophy section ─────────────────────────────────── */
export default function Philosophy() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
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
            {/* Live tearing canvas — sits behind all content */}
            <TearCanvas />

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
                    <div className="h-px flex-1 bg-fog dark:bg-dark-border" />
                    <span className="text-[10px] font-mono text-obsidian/40 dark:text-dark-text/40 tracking-[0.3em] uppercase">
                        Process
                    </span>
                    <div className="h-px flex-1 bg-fog dark:bg-dark-border" />
                </div>
            </div>
        </section>
    );
}
