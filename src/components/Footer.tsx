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
            { label: "GitHub", href: "https://github.com/4aruu", external: true },
            {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/aaron-jacob-sunil",
                external: true,
            },
            { label: "Email", href: "mailto:aaronjacobsunil@gmail.com" },
        ],
    },
    {
        title: "Resources",
        links: [{ label: "Resume", href: "/resume.pdf", download: true }],
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
        <footer className="relative bg-paper dark:bg-dark-surface border-t border-fog dark:border-dark-border">
            <div className="max-w-page mx-auto px-5 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-6 sm:pb-8">
                {/* Main Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-8 mb-10 sm:mb-16">
                    {/* Brand — spans both cols on mobile */}
                    <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                        <h3 className="font-display font-semibold text-xl text-obsidian dark:text-dark-text tracking-[-0.01em] mb-3">
                            Aaron Jacob Sunil
                        </h3>
                        <p className="text-obsidian/50 dark:text-dark-text/50 text-sm leading-relaxed mb-6 max-w-[240px]">
                            Systems-first developer crafting intelligent, resilient
                            applications.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/4aruu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-link bg-mist dark:bg-dark-mist flex items-center justify-center text-obsidian/60 dark:text-dark-text/60 hover:text-signal-blue transition-colors duration-200 no-underline"
                                aria-label="GitHub"
                            >
                                <Github size={15} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/aaron-jacob-sunil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-link bg-mist dark:bg-dark-mist flex items-center justify-center text-obsidian/60 dark:text-dark-text/60 hover:text-signal-blue transition-colors duration-200 no-underline"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={15} />
                            </a>
                            <a
                                href="mailto:aaronjacobsunil@gmail.com"
                                className="w-9 h-9 rounded-link bg-mist dark:bg-dark-mist flex items-center justify-center text-obsidian/60 dark:text-dark-text/60 hover:text-signal-blue transition-colors duration-200 no-underline"
                                aria-label="Email"
                            >
                                <Mail size={15} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {NAV_COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h4 className="text-obsidian/40 dark:text-dark-text/40 text-[11px] font-semibold tracking-[0.1em] uppercase mb-5">
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
                                                    className="text-obsidian/60 dark:text-dark-text/60 text-sm hover:text-signal-blue cursor-pointer bg-transparent border-none transition-colors duration-200"
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
                                                    className="text-obsidian/60 dark:text-dark-text/60 text-sm hover:text-signal-blue no-underline transition-colors duration-200"
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
                <div className="pt-6 border-t border-fog dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-obsidian/40 dark:text-dark-text/40 text-[11px] font-mono tracking-wider">
                        System Operational
                    </div>
                    <div className="text-obsidian/30 dark:text-dark-text/30 text-[11px] font-mono">
                        © {new Date().getFullYear()} Aaron Jacob Sunil. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
