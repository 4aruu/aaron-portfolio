"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

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

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out ${
                scrolled
                    ? "bg-canvas/85 dark:bg-dark-canvas/85 backdrop-blur-md border-b border-fog/50 dark:border-dark-border/50"
                    : "bg-transparent border-b border-transparent"
            }`}
        >
            <div className="max-w-page mx-auto px-5 sm:px-10 lg:px-16 h-14 flex items-center">
                {/* Brand — only mark, no links */}
                <span className="font-text font-medium text-[13px] tracking-[0.06em] uppercase text-obsidian/60 dark:text-dark-text/50 whitespace-nowrap select-none">
                    Aaron Jacob Sunil
                </span>
            </div>
        </nav>
    );
}
