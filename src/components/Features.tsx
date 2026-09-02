"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Cpu, Zap, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   CARD 1 — Diagnostic Shuffler
   ═══════════════════════════════════════════ */
function ShufflerCard() {
    const labels = [
        { title: "Fault-Tolerant Fallover", sub: "Zero downtime recovery" },
        { title: "Context-Aware Processing", sub: "GenAI + deterministic models" },
        { title: "Adaptive Load Balancing", sub: "Smart resource distribution" },
    ];

    const [order, setOrder] = useState([0, 1, 2]);

    useEffect(() => {
        const interval = setInterval(() => {
            setOrder((prev) => {
                const newOrder = [...prev];
                const last = newOrder.pop()!;
                newOrder.unshift(last);
                return newOrder;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-paper dark:bg-dark-surface rounded-card border border-fog dark:border-dark-border p-7 sm:p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-signal-blue/10 dark:bg-signal-blue-dark/10 flex items-center justify-center">
                    <Cpu size={18} className="text-signal-blue dark:text-signal-blue-dark" />
                </div>
                <h3 className="font-display font-semibold text-obsidian dark:text-dark-text text-base tracking-tight">
                    Hybrid Intelligence
                </h3>
            </div>
            <p className="text-obsidian/50 dark:text-dark-text/50 text-[13px] leading-relaxed mb-6">
                Systems that fuse GenAI with deterministic models for zero-downtime
                reliability.
            </p>

            {/* Shuffler Stack */}
            <div className="relative flex-1 min-h-[160px]">
                {order.map((idx, position) => {
                    const label = labels[idx];
                    const isTop = position === 0;
                    return (
                        <div
                            key={idx}
                            className="shuffler-card absolute inset-x-0"
                            style={{
                                top: `${position * 16}px`,
                                zIndex: 10 - position,
                                opacity: isTop ? 1 : 0.6 - position * 0.2,
                                transform: `scale(${1 - position * 0.04})`,
                            }}
                        >
                            <div
                                className={`rounded-xl border p-4 ${isTop
                                        ? "bg-paper dark:bg-dark-surface border-signal-blue/30 dark:border-signal-blue-dark/30 border-l-[3px]"
                                        : "bg-canvas dark:bg-dark-canvas border-fog dark:border-dark-border"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div
                                            className={`text-sm font-semibold ${isTop ? "text-signal-blue dark:text-signal-blue-dark" : "text-obsidian/60 dark:text-dark-text/60"
                                                }`}
                                        >
                                            {label.title}
                                        </div>
                                        <div className="text-[11px] text-obsidian/40 dark:text-dark-text/40 mt-0.5 font-mono">
                                            {label.sub}
                                        </div>
                                    </div>
                                    {isTop && (
                                        <div className="w-2 h-2 rounded-full bg-[#6aab82] dark:bg-[#4a7c59]" />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   CARD 2 — Telemetry Typewriter
   ═══════════════════════════════════════════ */
function TypewriterCard() {
    const messages = [
        "> Initializing FastAPI backend...",
        "> Vector database connected.",
        "> Query optimized: -340% latency",
        "> Response time: 12ms ✓",
        "> System healthy. All nodes operational.",
        "> Cache hit ratio: 94.2%",
        "> WebSocket connections: 128 active",
    ];

    const [lines, setLines] = useState<string[]>([]);
    const [currentMsg, setCurrentMsg] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [typing, setTyping] = useState(true);
    const feedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!typing) return;
        const msg = messages[currentMsg];
        if (charIndex < msg.length) {
            const timeout = setTimeout(
                () => setCharIndex((c) => c + 1),
                30 + Math.random() * 40
            );
            return () => clearTimeout(timeout);
        } else {
            // Line complete
            const timeout = setTimeout(() => {
                setLines((prev) => [...prev.slice(-5), msg]);
                setCurrentMsg((c) => (c + 1) % messages.length);
                setCharIndex(0);
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, currentMsg, typing, messages]);

    useEffect(() => {
        if (feedRef.current) {
            feedRef.current.scrollTop = feedRef.current.scrollHeight;
        }
    }, [lines, charIndex]);

    return (
        <div className="bg-paper dark:bg-dark-surface rounded-card border border-fog dark:border-dark-border p-7 sm:p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-signal-blue/10 dark:bg-signal-blue-dark/10 flex items-center justify-center">
                    <Zap size={18} className="text-signal-blue dark:text-signal-blue-dark" />
                </div>
                <h3 className="font-display font-semibold text-obsidian dark:text-dark-text text-base tracking-tight">
                    Real-time Systems
                </h3>
            </div>
            <p className="text-obsidian/50 dark:text-dark-text/50 text-[13px] leading-relaxed mb-5">
                Backend architectures built for instant, precise response.
            </p>

            {/* Live Feed Label */}
            <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6aab82] dark:bg-[#4a7c59]" />
                <span className="text-[10px] font-mono text-obsidian/50 dark:text-dark-text/50 tracking-[0.15em] uppercase">
                    Live Feed
                </span>
            </div>

            {/* Terminal */}
            <div
                ref={feedRef}
                className="flex-1 bg-obsidian/5 rounded-xl p-4 font-mono text-[12px] leading-relaxed overflow-hidden min-h-[140px] border border-fog dark:border-dark-border"
            >
                {lines.map((line, i) => (
                    <div key={i} className="text-obsidian/50 dark:text-dark-text/50 mb-1">
                        {line}
                    </div>
                ))}
                <div className="text-signal-blue dark:text-signal-blue-dark">
                    {messages[currentMsg].slice(0, charIndex)}
                    <span className="cursor-blink text-signal-blue dark:text-signal-blue-dark ml-[1px]">▊</span>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   CARD 3 — Cursor Protocol Scheduler
   ═══════════════════════════════════════════ */
function SchedulerCard() {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const schedule = [
        { day: 1, label: "Train" },
        { day: 3, label: "Deploy" },
        { day: 5, label: "Ship" },
    ];

    const [activeDays, setActiveDays] = useState<number[]>([]);
    const [cursorPos, setCursorPos] = useState({ x: -30, y: 50, visible: false });
    const [pressing, setPressing] = useState(-1);
    const [saved, setSaved] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);

    const runAnimation = useCallback(() => {
        setActiveDays([]);
        setSaved(false);
        setCursorPos({ x: -30, y: 20, visible: true });

        const baseDelay = 400;
        const stepTimers: ReturnType<typeof setTimeout>[] = [];

        schedule.forEach((item, idx) => {
            const delay = baseDelay + idx * 1200;

            // Move to cell
            stepTimers.push(
                setTimeout(() => {
                    const cellX = 18 + item.day * (100 / 7);
                    setCursorPos({ x: cellX, y: 55, visible: true });
                }, delay)
            );

            // Press
            stepTimers.push(
                setTimeout(() => {
                    setPressing(item.day);
                }, delay + 400)
            );

            // Activate
            stepTimers.push(
                setTimeout(() => {
                    setPressing(-1);
                    setActiveDays((prev) => [...prev, item.day]);
                }, delay + 600)
            );
        });

        // Move to Save
        const saveDelay = baseDelay + schedule.length * 1200 + 200;
        stepTimers.push(
            setTimeout(() => {
                setCursorPos({ x: 70, y: 90, visible: true });
            }, saveDelay)
        );

        stepTimers.push(
            setTimeout(() => {
                setSaved(true);
            }, saveDelay + 500)
        );

        stepTimers.push(
            setTimeout(() => {
                setCursorPos((prev) => ({ ...prev, visible: false }));
            }, saveDelay + 1000)
        );

        // Restart
        stepTimers.push(
            setTimeout(() => {
                runAnimation();
            }, saveDelay + 2500)
        );

        return () => stepTimers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        const cleanup = runAnimation();
        return cleanup;
    }, [runAnimation]);

    return (
        <div className="bg-paper dark:bg-dark-surface rounded-card border border-fog dark:border-dark-border p-7 sm:p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-signal-blue/10 dark:bg-signal-blue-dark/10 flex items-center justify-center">
                    <Shield size={18} className="text-signal-blue dark:text-signal-blue-dark" />
                </div>
                <h3 className="font-display font-semibold text-obsidian dark:text-dark-text text-base tracking-tight">
                    Context-Locked AI
                </h3>
            </div>
            <p className="text-obsidian/50 dark:text-dark-text/50 text-[13px] leading-relaxed mb-5">
                AI that stays within defined knowledge boundaries. No hallucinations.
            </p>

            {/* Scheduler Grid */}
            <div ref={gridRef} className="relative flex-1 min-h-[160px]">
                {/* Animated cursor */}
                <svg
                    className="absolute z-20 transition-all duration-700 ease-out pointer-events-none"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{
                        left: `${cursorPos.x}%`,
                        top: `${cursorPos.y}%`,
                        opacity: cursorPos.visible ? 0.9 : 0,
                        transform: `translate(-50%, -50%)`,
                    }}
                >
                    <path
                        d="M5 3l14 8-6 2-3 6z"
                        fill="#4a7c59"
                        stroke="#0D0D12"
                        strokeWidth="1"
                    />
                </svg>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {days.map((day, i) => (
                        <div
                            key={i}
                            className="text-center text-[10px] font-mono text-obsidian/40 dark:text-dark-text/40"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Day Cells */}
                <div className="grid grid-cols-7 gap-1.5">
                    {days.map((_, i) => {
                        const isActive = activeDays.includes(i);
                        const isPressing = pressing === i;
                        const schedItem = schedule.find((s) => s.day === i);
                        return (
                            <div
                                key={i}
                                className={`aspect-square rounded-lg flex items-center justify-center border transition-all duration-300 ${isActive
                                        ? "bg-signal-blue/15 dark:bg-signal-blue-dark/15 border-signal-blue/40 dark:border-signal-blue-dark/40"
                                        : "bg-canvas dark:bg-dark-canvas border-fog dark:border-dark-border"
                                    } ${isPressing ? "scale-[0.9]" : "scale-100"}`}
                            >
                                {isActive && schedItem && (
                                    <span className="text-[8px] font-mono text-signal-blue dark:text-signal-blue-dark font-semibold">
                                        {schedItem.label}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Save Button */}
                <div className="mt-4 flex justify-end">
                    <div
                        className={`px-4 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-all duration-300 ${saved
                                ? "bg-signal-blue/15 dark:bg-signal-blue-dark/15 text-signal-blue dark:text-signal-blue-dark border border-signal-blue/30 dark:border-signal-blue-dark/30"
                                : "bg-white/[0.03] text-obsidian/40 dark:text-dark-text/40 border border-white/[0.06]"
                            }`}
                    >
                        {saved ? "✓ Saved" : "Save"}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   FEATURES SECTION
   ═══════════════════════════════════════════ */
export default function Features() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".feature-heading", {
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

            gsap.from(".feature-card", {
                scrollTrigger: {
                    trigger: ".feature-card",
                    start: "top 85%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.15,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="features"
            ref={sectionRef}
            className="relative py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 bg-canvas dark:bg-dark-canvas"
        >
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="max-w-2xl mb-16 sm:mb-20">
                    <span className="feature-heading block text-signal-blue dark:text-signal-blue-dark text-xs font-mono tracking-[0.2em] uppercase mb-4">
                        Core Capabilities
                    </span>
                    <h2 className="feature-heading font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-obsidian dark:text-dark-text tracking-[-0.02em] leading-[1.08]">
                        Systems designed to{" "}
                        <span className="text-signal-blue dark:text-signal-blue-dark">think</span>,
                        not just run.
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="feature-card">
                        <ShufflerCard />
                    </div>
                    <div className="feature-card">
                        <TypewriterCard />
                    </div>
                    <div className="feature-card">
                        <SchedulerCard />
                    </div>
                </div>
            </div>
        </section>
    );
}
