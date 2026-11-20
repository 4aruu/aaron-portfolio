"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * Scroll-linked figures on Plates II, III and V. Everything is visible in the
 * HTML; this only animates it into place, scrubbed to the scroll, and does
 * nothing with reduced motion.
 *   Fig. 2: the wires draw in order.
 *   Fig. 3: the orange line travels the route and each stop lights as it is reached.
 *   Fig. 5: the week fills cell by cell, in the generator's order.
 */
export default function PlateMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 1024px)" },
      (ctx) => {
        const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
        if (!motion) return;

        const fig2 = document.getElementById("fig2");
        if (fig2) {
          const wires = Array.from(fig2.querySelectorAll<HTMLElement>("[data-wire]")).sort((a, b) => +a.dataset.wire! - +b.dataset.wire!);
          const tl = gsap.timeline({ scrollTrigger: { trigger: fig2, start: "top 75%", end: "center 45%", scrub: 0.5 } });
          wires.forEach((w, i) => {
            const vertical = w.classList.contains("f2-wire-v");
            tl.from(w, { [vertical ? "scaleY" : "scaleX"]: 0, transformOrigin: vertical ? "50% 0%" : "0% 50%", duration: 1, ease: "none" }, i);
          });
          tl.from(fig2.querySelectorAll(".f2-num"), { scale: 0, duration: 0.5, stagger: 0.4, ease: "back.out(2)" }, 0.3);
        }

        const route = document.getElementById("route");
        if (route) {
          const fill = route.querySelector<HTMLElement>(".route-fill")!;
          const dots = Array.from(route.querySelectorAll<HTMLElement>(".route-dot-fill"));
          const tl = gsap.timeline({ scrollTrigger: { trigger: route, start: wide ? "top 70%" : "top 80%", end: wide ? "bottom 55%" : "bottom 70%", scrub: 0.5 } });
          tl.from(fill, { [wide ? "scaleX" : "scaleY"]: 0, transformOrigin: wide ? "0% 50%" : "50% 0%", duration: dots.length - 1, ease: "none" }, 0);
          dots.forEach((d, i) => tl.from(d, { scale: 0, duration: 0.25, ease: "power2.out" }, Math.max(0, i - 0.15)));
        }

        const week = document.getElementById("week");
        if (week) {
          const cells = Array.from(week.querySelectorAll<HTMLElement>("[data-order]")).sort((a, b) => +a.dataset.order! - +b.dataset.order!);
          gsap.timeline({ scrollTrigger: { trigger: week, start: "top 75%", end: "bottom 60%", scrub: 0.5 } }).from(cells, {
            autoAlpha: 0,
            scale: 0.85,
            duration: 0.4,
            stagger: 0.12,
            ease: "power2.out",
          });
        }
      },
    );
    return () => mm.revert();
  });
  return null;
}
