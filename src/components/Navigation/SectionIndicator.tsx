"use client";

import { SECTIONS } from "@/data/sections";
import { useSection } from "@/hooks/useSection";

export default function SectionIndicator() {
  const active = useSection();

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Sections"
      style={{
        position: 'fixed',
        left: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 120,
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        alignItems: 'center',
        pointerEvents: 'auto',
      }}
    >
      {SECTIONS.map((section) => {
        const isActive = section.id === active;
        return (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            title={section.label}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              margin: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: `rgb(${section.color.join(',')})`,
              opacity: isActive ? 1 : 0.35,
              transform: isActive ? 'translateX(2px)' : 'none',
              transition: 'opacity 220ms ease, transform 220ms ease',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontWeight: 700,
              fontSize: 14,
              lineHeight: 1,
              backgroundClip: 'padding-box'
            }}
          >
            {section.label}
          </button>
        );
      })}
    </nav>
  );
}
