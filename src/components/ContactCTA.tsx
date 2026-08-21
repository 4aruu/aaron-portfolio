"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
    Briefcase,
    FolderOpen,
    FileDown,
    Calendar,
    ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CTAS = [
    {
        label: "Let's Work Together",
        href: "mailto:aaronjacobsunil@gmail.com?subject=Let's%20Work%20Together",
        icon: Briefcase,
        primary: true,
    },
    {
        label: "View Projects",
        href: "#projects",
        icon: FolderOpen,
        primary: false,
    },
    {
        label: "Download Resume",
        href: "/resume.pdf",
        icon: FileDown,
        primary: false,
        download: true,
    },
    {
        label: "Book a Call",
        href: "mailto:aaronjacobsunil@gmail.com?subject=Booking%20a%20Call",
        icon: Calendar,
        primary: false,
    },
];

export default function ContactCTA() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".cta-element", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleClick = (href: string) => {
        if (href.startsWith("#")) {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-20 sm:py-32 lg:py-40 px-5 sm:px-10 lg:px-16 overflow-hidden"
        >
            <div className="relative z-10 max-w-[900px] mx-auto text-center">
                {/* Heading */}
                <span className="cta-element block text-signal-blue dark:text-signal-blue-dark text-[12px] font-semibold font-text tracking-[0.2em] uppercase mb-6">
                    Get In Touch
                </span>
                <h2 className="cta-element font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-obsidian dark:text-dark-text tracking-[-0.02em] leading-[1.08] mb-6">
                    Let&apos;s build something{" "}
                    <span className="text-signal-blue dark:text-signal-blue-dark">exceptional</span>
                </h2>
                <p className="cta-element text-obsidian/60 dark:text-dark-text/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-14">
                    Whether you need a developer, an architect, or just want to talk about
                    systems — I&apos;m always open to new conversations and collaborations.
                </p>

                {/* CTA Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
                    {CTAS.map((cta) => {
                        const Icon = cta.icon;
                        const Tag = cta.href.startsWith("#") ? "button" : "a";
                        const extraProps = cta.href.startsWith("#")
                            ? { onClick: () => handleClick(cta.href) }
                            : {
                                href: cta.href,
                                target: cta.href.startsWith("mailto") ? undefined : "_blank",
                                rel: "noopener noreferrer",
                                download: cta.download || undefined,
                            };

                        return (
                            <Tag
                                key={cta.label}
                                {...(extraProps as React.HTMLAttributes<HTMLElement>)}
                                className={`cta-element group flex items-center justify-between gap-4 px-7 py-5 rounded-card cursor-pointer no-underline transition-colors duration-300 ${cta.primary
                                        ? "bg-signal-blue dark:bg-signal-blue-dark text-white border-none"
                                        : "bg-canvas dark:bg-dark-canvas text-obsidian dark:text-dark-text border border-fog dark:border-dark-border hover:border-obsidian/25"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        size={18}
                                        className={
                                            cta.primary ? "text-white/80" : "text-signal-blue/70 dark:text-signal-blue-dark/70"
                                        }
                                    />
                                    <span
                                        className={`text-sm font-semibold tracking-tight ${cta.primary ? "" : ""
                                            }`}
                                    >
                                        {cta.label}
                                    </span>
                                </div>
                                <ArrowUpRight
                                    size={16}
                                    className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${cta.primary ? "text-white/60" : "text-obsidian/30 dark:text-dark-text/30"
                                        }`}
                                />
                            </Tag>
                        );
                    })}
                </div>

                {/* Direct email */}
                <div className="cta-element mt-12 pt-8 border-t border-fog dark:border-dark-border">
                    <p className="text-obsidian/40 dark:text-dark-text/40 text-sm mb-2">
                        Or reach out directly
                    </p>
                    <a
                        href="mailto:aaronjacobsunil@gmail.com"
                        className="text-signal-blue dark:text-signal-blue-dark text-sm font-mono inline-block no-underline hover:underline"
                    >
                        aaronjacobsunil@gmail.com
                    </a>
                </div>
            </div>
        </section>
    );
}
