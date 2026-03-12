"use client";

import { Github, Linkedin, Mail } from "lucide-react";

const NAV_COLUMNS = [
    {
        title: "Navigation",
        links: [
            { label: "About", href: "#features" },
            { label: "Process", href: "#protocol" },
            { label: "Projects", href: "#projects" },
            { label: "Contact", href: "#contact" },
        ],
    },
    {
        title: "Connect",
        links: [
            {
                label: "GitHub",
                href: "https://github.com/4aruu",
                external: true,
            },
            {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/aaron-jacob-sunil",
                external: true,
            },
            {
                label: "Email",
                href: "mailto:aaronjacobsunil@gmail.com",
            },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Resume", href: "/resume.pdf", download: true },
        ],
    },
];

export default function Footer() {
    const handleNavClick = (href: string) => {
        if (href.startsWith("#")) {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="relative bg-obsidian rounded-t-mega border-t border-white/[0.04] mt-[-2rem]">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-8">
                {/* Main Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <h3 className="font-cursive font-bold text-xl text-shimmer tracking-tight mb-3">
                            Aaron Jacob Sunil
                        </h3>
                        <p className="text-ivory/30 text-sm leading-relaxed font-light mb-6 max-w-[240px]">
                            Systems-first developer crafting intelligent, resilient
                            applications.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/4aruu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-ivory/40 hover:text-champagne hover:border-champagne/30 transition-all duration-300 no-underline link-lift"
                                aria-label="GitHub"
                            >
                                <Github size={15} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/aaron-jacob-sunil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-ivory/40 hover:text-champagne hover:border-champagne/30 transition-all duration-300 no-underline link-lift"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={15} />
                            </a>
                            <a
                                href="mailto:aaronjacobsunil@gmail.com"
                                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-ivory/40 hover:text-champagne hover:border-champagne/30 transition-all duration-300 no-underline link-lift"
                                aria-label="Email"
                            >
                                <Mail size={15} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {NAV_COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h4 className="text-ivory/30 text-[11px] font-mono font-semibold tracking-[0.15em] uppercase mb-5">
                                {col.title}
                            </h4>
                            <ul className="list-none space-y-3">
                                {col.links.map((link) => {
                                    const isInternal = link.href.startsWith("#");
                                    return (
                                        <li key={link.label}>
                                            {isInternal ? (
                                                <button
                                                    onClick={() => handleNavClick(link.href)}
                                                    className="text-ivory/50 text-sm font-light hover:text-champagne link-lift cursor-pointer bg-transparent border-none transition-colors duration-300"
                                                >
                                                    {link.label}
                                                </button>
                                            ) : (
                                                <a
                                                    href={link.href}
                                                    target={
                                                        (link as { external?: boolean }).external
                                                            ? "_blank"
                                                            : undefined
                                                    }
                                                    rel={
                                                        (link as { external?: boolean }).external
                                                            ? "noopener noreferrer"
                                                            : undefined
                                                    }
                                                    download={
                                                        (link as { download?: boolean }).download
                                                            ? true
                                                            : undefined
                                                    }
                                                    className="text-ivory/50 text-sm font-light hover:text-champagne link-lift no-underline transition-colors duration-300"
                                                >
                                                    {link.label}
                                                </a>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* System Status */}
                    <div className="flex items-center gap-2.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                        </span>
                        <span className="text-[11px] font-mono text-ivory/30 tracking-wider">
                            System Operational
                        </span>
                    </div>

                    {/* Legal */}
                    <div className="text-ivory/20 text-[11px] font-mono">
                        © {new Date().getFullYear()} Aaron Jacob Sunil. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
