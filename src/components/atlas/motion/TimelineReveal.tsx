"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * Each timeline block fades and rises into place on its own as it reaches the
 * lower part of the screen, and goes back if you scroll up past it. The blocks
 * are visible in the HTML; this only adds motion, and adds none with reduced
 * motion. It animates opacity rather than visibility, so a card that has not
 * been revealed yet can still take keyboard focus, and focusing one reveals it.
 */
export default function TimelineReveal() {
  useGSAP(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".tl-item"));
    if (!items.length) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const offs: Array<() => void> = [];
      items.forEach((item) => {
        const card = item.querySelector<HTMLElement>(".surface");
        const dot = item.querySelector<HTMLElement>(".tl-dot");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" },
        });
        if (card) tl.from(card, { opacity: 0, y: 48, scale: 0.97, duration: 0.6, ease: "power3.out" }, 0);
        if (dot) tl.from(dot, { scale: 0, duration: 0.4, ease: "power2.out" }, 0.1);
        const reveal = () => tl.progress(1);
        item.addEventListener("focusin", reveal);
        offs.push(() => item.removeEventListener("focusin", reveal));
      });
      return () => offs.forEach((off) => off());
    });
    return () => mm.revert();
  });
  return null;
}
