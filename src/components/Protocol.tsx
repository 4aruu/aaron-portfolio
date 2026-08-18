"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Compass, Code2, TrendingUp, type LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STEPS: { number: string; title: string; description: string; icon: LucideIcon }[] = [
    {
        number: "01",
        title: "ARCHITECT",
        description:
            "Map data flows, define API contracts, and design for failure before writing a single line of code. Every system starts with a blueprint.",
        icon: Compass,
    },
    {
        number: "02",
        title: "EXECUTE",
        description:
            "Build with type-safe backends, responsive frontends, and containerized deployments. Precision in every layer, from database to UI.",
        icon: Code2,
    },
    {
        number: "03",
        title: "ITERATE",
        description:
            "Deploy, monitor, measure. Continuously evolve through real-world feedback. Systems improve because the architecture allows it.",
        icon: TrendingUp,
    },
];

export default function Protocol() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".protocol-step").forEach((step) => {
                gsap.from(step, {
                    scrollTrigger: {
                        trigger: step,
                        start: "top 75%",
                    },
                    y: 32,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power2.out",
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} id="protocol" className="bg-paper dark:bg-dark-surface">
            {STEPS.map((step, i) => (
                <div
                    key={i}
                    className={`protocol-step relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t border-fog dark:border-dark-border overflow-hidden ${i % 2 === 0 ? "bg-paper dark:bg-dark-surface" : "bg-canvas dark:bg-dark-canvas"
                        }`}
                >
                    {/* Themed icon filling the empty side */}
                    <step.icon
                        className="pointer-events-none absolute right-8 sm:right-16 lg:right-32 top-1/2 -translate-y-1/2 text-obsidian/10 dark:text-dark-text/10 hidden md:block"
                        size={280}
                        strokeWidth={0.75}
                    />

                    <div className="relative max-w-content mx-auto">
                        <div className="font-mono text-obsidian/25 dark:text-dark-text/25 text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                            {step.number}
                        </div>

                        <h3 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-obsidian dark:text-dark-text tracking-[-0.015em] mb-6">
                            {step.title}
                        </h3>

                        <p className="text-obsidian/60 dark:text-dark-text/60 text-base sm:text-lg leading-relaxed max-w-xl">
                            {step.description}
                        </p>

                        <div className="flex items-center gap-3 mt-12">
                            {STEPS.map((_, j) => (
                                <div
                                    key={j}
                                    className={`h-0.5 rounded-full transition-all duration-500 ${j === i
                                            ? "w-12 bg-signal-blue dark:bg-signal-blue-dark"
                                            : j < i
                                                ? "w-6 bg-signal-blue/30 dark:bg-signal-blue-dark/30"
                                                : "w-6 bg-fog"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
