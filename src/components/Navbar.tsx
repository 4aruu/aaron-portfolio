"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { label: "About", href: "#features" },
    { label: "Process", href: "#protocol" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const hero = document.getElementById("hero");
        if (!hero) return;

        const observer = new IntersectionObserver(
            ([entry]) => setScrolled(!entry.isIntersecting),
            { threshold: 0.3 }
        );

        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-out ${scrolled
                        ? "bg-paper/90 dark:bg-dark-surface/90 backdrop-blur-md border-b border-fog dark:border-dark-border"
                        : "bg-transparent border-b border-transparent"
                    }`}
            >
                <div className="max-w-page mx-auto px-5 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
                    {/* Brand */}
                    <span className="font-text font-semibold text-[14px] tracking-[-0.01em] text-obsidian dark:text-dark-text whitespace-nowrap">
                        Aaron Jacob Sunil
                    </span>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => handleNavClick(link.href)}
                                className="text-[12px] font-normal text-obsidian/70 dark:text-dark-text/70 hover:text-obsidian transition-colors duration-200 bg-transparent border-none cursor-pointer"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <button
                        onClick={() => handleNavClick("#contact")}
                        className="hidden md:inline-flex btn-neutral-pill text-[13px] cursor-pointer"
                    >
                        Let&apos;s Talk
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden bg-transparent border-none cursor-pointer p-1 text-obsidian dark:text-dark-text"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-[99] bg-paper dark:bg-dark-surface flex flex-col items-center justify-center gap-8 transition-opacity duration-300 md:hidden ${menuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
            >
                {NAV_LINKS.map((link) => (
                    <button
                        key={link.label}
                        onClick={() => handleNavClick(link.href)}
                        className="text-obsidian dark:text-dark-text text-2xl font-text font-semibold tracking-tight bg-transparent border-none cursor-pointer"
                    >
                        {link.label}
                    </button>
                ))}
                <button
                    onClick={() => handleNavClick("#contact")}
                    className="btn-primary-pill text-base mt-4 cursor-pointer"
                >
                    Let&apos;s Talk
                </button>
            </div>
        </>
    );
}
