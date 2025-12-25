"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SECTIONS } from "@/data/sections";

gsap.registerPlugin(ScrollTrigger);

export function useSection() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    SECTIONS.forEach((section) => {
      const trigger = ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return activeSection;
}
