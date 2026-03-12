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
            className="relative py-32 sm:py-40 lg:py-52 px-6 sm:px-10 lg:px-16 overflow-hidden"
        >
            {/* Decorative gradient blobs */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-champagne/[0.03] blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-champagne/[0.02] blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-[900px] mx-auto text-center">
                {/* Heading */}
                <span className="cta-element block text-champagne text-xs font-mono tracking-[0.2em] uppercase mb-6">
                    Get In Touch
                </span>
                <h2 className="cta-element font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-ivory tracking-[-0.03em] leading-[1.1] mb-6">
                    Let&apos;s build something{" "}
                    <span className="font-cursive text-shimmer text-[1.15em]">exceptional</span>
                </h2>
                <p className="cta-element text-ivory/40 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-14 font-light">
                    Whether you need a developer, an architect, or just want to talk about
                    systems — I&apos;m always open to new conversations and collaborations.
                </p>

                {/* CTA Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
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
                                className={`cta-element btn-magnetic group flex items-center justify-between gap-4 px-7 py-5 rounded-2xl cursor-pointer no-underline transition-all duration-400 ${cta.primary
                                        ? "bg-champagne text-obsidian border-none shadow-[0_8px_40px_rgba(201,168,76,0.2)]"
                                        : "bg-white/[0.03] text-ivory border border-white/[0.08] hover:border-champagne/25 hover:bg-white/[0.05]"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        size={18}
                                        className={
                                            cta.primary ? "text-obsidian/70" : "text-champagne/60"
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
                                    className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${cta.primary ? "text-obsidian/50" : "text-ivory/30"
                                        }`}
                                />
                            </Tag>
                        );
                    })}
                </div>

                {/* Direct email */}
                <div className="cta-element mt-12 pt-8 border-t border-white/[0.06]">
                    <p className="text-ivory/30 text-sm font-light mb-2">
                        Or reach out directly
                    </p>
                    <a
                        href="mailto:aaronjacobsunil@gmail.com"
                        className="text-champagne text-sm font-mono link-lift inline-block no-underline hover:text-champagne-light transition-colors duration-300"
                    >
                        aaronjacobsunil@gmail.com
                    </a>
                </div>
            </div>
        </section>
    );
}
