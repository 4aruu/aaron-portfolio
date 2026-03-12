"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══ SVG Animation 1: Rotating Geometric ═══ */
function RotatingGeometric() {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".geo-ring-1", {
                rotation: 360,
                transformOrigin: "center center",
                duration: 20,
                repeat: -1,
                ease: "none",
            });
            gsap.to(".geo-ring-2", {
                rotation: -360,
                transformOrigin: "center center",
                duration: 30,
                repeat: -1,
                ease: "none",
            });
        }, svgRef);
        return () => ctx.revert();
    }, []);

    return (
        <svg ref={svgRef} viewBox="0 0 200 200" className="w-full h-full opacity-20">
            <g className="geo-ring-1">
                <circle cx="100" cy="100" r="60" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="#C9A84C" strokeWidth="0.3" strokeDasharray="4 8" />
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <circle
                        key={angle}
                        cx={100 + 60 * Math.cos((angle * Math.PI) / 180)}
                        cy={100 + 60 * Math.sin((angle * Math.PI) / 180)}
                        r="3"
                        fill="#C9A84C"
                        opacity="0.6"
                    />
                ))}
            </g>
            <g className="geo-ring-2">
                <circle cx="100" cy="100" r="85" fill="none" stroke="#C9A84C" strokeWidth="0.3" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <line
                        key={angle}
                        x1={100 + 80 * Math.cos((angle * Math.PI) / 180)}
                        y1={100 + 80 * Math.sin((angle * Math.PI) / 180)}
                        x2={100 + 90 * Math.cos((angle * Math.PI) / 180)}
                        y2={100 + 90 * Math.sin((angle * Math.PI) / 180)}
                        stroke="#C9A84C"
                        strokeWidth="0.5"
                    />
                ))}
            </g>
            <circle cx="100" cy="100" r="4" fill="#C9A84C" opacity="0.8" />
        </svg>
    );
}

/* ═══ SVG Animation 2: Scanning Laser ═══ */
function ScanningLaser() {
    return (
        <div className="relative w-full h-full overflow-hidden opacity-20">
            {/* Grid dots */}
            <div className="absolute inset-4 grid grid-cols-8 grid-rows-6 gap-2">
                {Array.from({ length: 48 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-1 h-1 rounded-full bg-champagne/30 place-self-center"
                    />
                ))}
            </div>
            {/* Scanning line */}
            <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-champagne to-transparent scan-line" />
        </div>
    );
}

/* ═══ SVG Animation 3: Waveform ═══ */
function Waveform() {
    return (
        <svg viewBox="0 0 300 100" className="w-full h-full opacity-20" preserveAspectRatio="none">
            <path
                className="waveform-path"
                d="M0 50 Q15 20 30 50 Q45 80 60 50 Q75 20 90 50 Q105 80 120 50 Q135 15 150 50 Q165 85 180 50 Q195 20 210 50 Q225 80 240 50 Q255 20 270 50 Q285 80 300 50"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1.5"
                strokeDasharray="1000"
                strokeDashoffset="1000"
            />
            <path
                d="M0 50 Q15 35 30 50 Q45 65 60 50 Q75 35 90 50 Q105 65 120 50 Q135 30 150 50 Q165 70 180 50 Q195 35 210 50 Q225 65 240 50 Q255 35 270 50 Q285 65 300 50"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="0.5"
                opacity="0.4"
            />
        </svg>
    );
}

/* ═══ Protocol Steps Data ═══ */
const STEPS = [
    {
        number: "01",
        title: "ARCHITECT",
        description:
            "Map data flows, define API contracts, and design for failure before writing a single line of code. Every system starts with a blueprint.",
        visual: RotatingGeometric,
    },
    {
        number: "02",
        title: "EXECUTE",
        description:
            "Build with type-safe backends, responsive frontends, and containerized deployments. Precision in every layer, from database to UI.",
        visual: ScanningLaser,
    },
    {
        number: "03",
        title: "ITERATE",
        description:
            "Deploy, monitor, measure. Continuously evolve through real-world feedback. Systems improve because the architecture allows it.",
        visual: Waveform,
    },
];

export default function Protocol() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

            cards.forEach((card, i) => {
                if (i < cards.length - 1) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top top",
                        endTrigger: cards[i + 1],
                        end: "top top",
                        pin: true,
                        pinSpacing: false,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            gsap.set(card, {
                                scale: 1 - progress * 0.08,
                                filter: `blur(${progress * 12}px)`,
                                opacity: 1 - progress * 0.4,
                            });
                        },
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} id="protocol">
            {STEPS.map((step, i) => {
                const Visual = step.visual;
                return (
                    <div
                        key={i}
                        ref={(el) => { cardsRef.current[i] = el; }}
                        className="stack-card relative min-h-screen w-full flex items-center justify-center px-6 sm:px-10 lg:px-16"
                        style={{
                            background:
                                i === 0
                                    ? "#0D0D12"
                                    : i === 1
                                        ? "#101218"
                                        : "#14161E",
                        }}
                    >
                        {/* Background Visual */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[400px] h-[400px] sm:w-[500px] sm:h-[500px]">
                                <Visual />
                            </div>
                        </div>

                        <div className="relative z-10 max-w-[800px] w-full">
                            {/* Step Number */}
                            <div className="font-mono text-champagne/30 text-7xl sm:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
                                {step.number}
                            </div>

                            {/* Title */}
                            <h3 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-ivory tracking-[-0.02em] mb-6">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-ivory/50 text-base sm:text-lg leading-relaxed max-w-xl font-light">
                                {step.description}
                            </p>

                            {/* Step indicator */}
                            <div className="flex items-center gap-3 mt-12">
                                {STEPS.map((_, j) => (
                                    <div
                                        key={j}
                                        className={`h-0.5 rounded-full transition-all duration-500 ${j === i
                                                ? "w-12 bg-champagne"
                                                : j < i
                                                    ? "w-6 bg-champagne/30"
                                                    : "w-6 bg-ivory/10"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
