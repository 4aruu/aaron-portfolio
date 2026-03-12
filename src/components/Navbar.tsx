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
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-out rounded-full px-4 sm:px-8 py-3 flex items-center gap-4 sm:gap-8 ${scrolled
                        ? "bg-ivory/80 backdrop-blur-2xl border border-midnight/10 shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
                        : "bg-white/[0.03] backdrop-blur-sm border border-white/[0.06]"
                    }`}
            >
                {/* Brand */}
                <span
                    className={`font-heading font-bold text-sm tracking-[-0.03em] whitespace-nowrap transition-colors duration-500 ${scrolled ? "text-obsidian" : "text-ivory"
                        }`}
                >
                    Aaron Jacob Sunil
                </span>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => handleNavClick(link.href)}
                            className={`text-[13px] font-medium link-lift transition-colors duration-300 bg-transparent border-none cursor-pointer ${scrolled
                                    ? "text-midnight/70 hover:text-obsidian"
                                    : "text-ivory/50 hover:text-ivory"
                                }`}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Desktop CTA */}
                <button
                    onClick={() => handleNavClick("#contact")}
                    className={`hidden md:inline-flex btn-magnetic text-[13px] font-semibold px-5 py-2 rounded-full cursor-pointer border-none transition-all duration-500 ${scrolled
                            ? "bg-champagne text-obsidian shadow-[0_4px_20px_rgba(201,168,76,0.25)]"
                            : "bg-ivory/[0.08] text-ivory border border-ivory/20 hover:bg-ivory/[0.15]"
                        }`}
                >
                    Let&apos;s Talk
                </button>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`md:hidden bg-transparent border-none cursor-pointer p-1 transition-colors duration-300 ${scrolled ? "text-obsidian" : "text-ivory"
                        }`}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-[99] bg-obsidian/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${menuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
            >
                {NAV_LINKS.map((link) => (
                    <button
                        key={link.label}
                        onClick={() => handleNavClick(link.href)}
                        className="text-ivory text-2xl font-heading font-semibold tracking-tight bg-transparent border-none cursor-pointer link-lift"
                    >
                        {link.label}
                    </button>
                ))}
                <button
                    onClick={() => handleNavClick("#contact")}
                    className="btn-magnetic bg-champagne text-obsidian text-base font-semibold px-8 py-3 rounded-full border-none cursor-pointer mt-4"
                >
                    Let&apos;s Talk
                </button>
            </div>
        </>
    );
}
