"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CAMERA, FACES, LAYERS, PARTS, SIGNAL_LAYER, s, shade, type PartDef } from "./geometry";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PLATE_NUMERALS = ["00", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/* What is printed on each part. "top" is the face that becomes a page region;
   the other named face is what you see on the outside of the closed cube. */
function Art({ part, face }: { part: PartDef["k"]; face: string }) {
  const mark = (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <line x1="50" y1="40" x2="50" y2="60" className="cube-mark" />
      <line x1="40" y1="50" x2="60" y2="50" className="cube-mark" />
      <circle cx="50" cy="50" r="6" className="cube-mark" />
    </svg>
  );
  if (part === "lid" && face === "top")
    return (
      <>
        {mark}
        <span className="cube-eng" style={{ left: "7%", top: "7%" }}>The Systems Atlas</span>
        <span className="cube-eng" style={{ right: "7%", bottom: "7%" }}>Vol. 01</span>
      </>
    );
  if (part === "base" && face === "top") return <span className="cube-eng cube-lbl" style={{ left: "7%", top: "7%" }}>Pl. 00 · ground</span>;
  if (part === "front" && face === "top") return <span className="cube-eng cube-lbl" style={{ left: "8%", top: "12%" }}>Lede · actions</span>;
  if (part === "front" && face === "bot")
    return (
      <>
        <span className="cube-eng" style={{ left: "7%", top: "9%" }}>29.37° N · 47.98° E</span>
        <span className="cube-eng" style={{ left: "7%", top: "22%" }}>Pl. 00 – VIII</span>
        <span className="cube-square" />
      </>
    );
  if (part === "back" && face === "top")
    return (
      <span className="cube-lbl cube-name" style={{ left: "8%", top: "10%" }}>
        Aaron
        <br />
        Jacob
        <br />
        Sunil
      </span>
    );
  if (part === "back" && face === "bot") return <span className="cube-eng" style={{ left: "7%", top: "9%" }}>AJS · 2026</span>;
  if (part === "left" && face === "top")
    return (
      <span className="cube-lbl cube-numerals">
        {PLATE_NUMERALS.map((n) => (
          <span key={n} className="cube-eng">{n}</span>
        ))}
      </span>
    );
  if (part === "left" && face === "bot") return <span className="cube-eng" style={{ left: "7%", top: "9%" }}>Index</span>;
  if (part === "right" && face === "top") return <span className="cube-eng cube-lbl" style={{ left: "8%", top: "8%" }}>Fig. 0 · section</span>;
  if (part === "right" && face === "bot")
    return (
      <>
        <span className="cube-eng" style={{ left: "7%", top: "9%" }}>Fig. 0</span>
        <span className="cube-bar" />
      </>
    );
  if (part.startsWith("s") && face === "top") {
    const i = Number(part.slice(1));
    return (
      <span className={i === SIGNAL_LAYER ? "cube-eng cube-lbl cube-layer is-signal" : "cube-eng cube-lbl cube-layer"}>{LAYERS[i]}</span>
    );
  }
  return null;
}

const assembled = (d: PartDef) =>
  `translate3d(${s(d.p[0])}, ${s(d.p[1])}, ${s(d.p[2])}) rotateX(${d.r[0]}deg) rotateY(${d.r[1]}deg)`;

export default function AtlasCube() {
  const root = useRef<HTMLDivElement>(null);
  const trigRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      const el = root.current;
      if (!el || !html.classList.contains("atlas-intro")) return;
      (window as unknown as { __atlasCubeReady?: boolean }).__atlasCubeReady = true;
      ScrollTrigger.config({ ignoreMobileResize: true });

      const $ = <T extends Element = HTMLElement>(q: string) => document.querySelector<T>(q);
      const $$ = <T extends Element = HTMLElement>(q: string) => Array.from(document.querySelectorAll<T>(q));
      const world = el.querySelector<HTMLElement>(".cube-world")!;
      const partEls = Array.from(el.querySelectorAll<HTMLElement>(".cube-part"));
      const shadowEl = el.querySelector<HTMLElement>(".cube-shadow")!;

      const cam = { tx: CAMERA.tx, tz: CAMERA.tz, sc: 1, y: 0, idle: 0.5, px: 0, py: 0, light: 0, guide: 0 };
      type St = { x: number; y: number; z: number; rx: number; ry: number; sx: number; sy: number; sz: number };
      let S = 200;
      let states: St[] = [];
      let dirty = true;
      const mark = () => {
        dirty = true;
      };

      const render = () => {
        if (!dirty) return;
        dirty = false;
        const tz = cam.tz + (cam.idle - 0.5) * 6 + cam.px;
        const tx = cam.tx + cam.py;
        world.style.transform = `translateY(${cam.y - (cam.idle - 0.5) * 3}px) scale3d(${cam.sc},${cam.sc},${cam.sc}) rotateX(${tx}deg) rotateZ(${tz}deg)`;
        partEls.forEach((pe, i) => {
          const q = states[i];
          pe.style.transform = `translate3d(${q.x}px,${q.y}px,${q.z}px) rotateX(${q.rx}deg) rotateY(${q.ry}deg) scale3d(${q.sx},${q.sy},${q.sz})`;
          pe.querySelectorAll<HTMLElement>(".cube-sh").forEach((sh, fi) => {
            sh.style.opacity = shade(FACES[fi].n, tx, tz, q.rx, q.ry, cam.light).toFixed(3);
          });
        });
        shadowEl.style.opacity = String((1 - cam.guide) * (1 - cam.light) * 0.95);
      };

      const rectOf = (e: Element | null) => {
        const r = e!.getBoundingClientRect();
        return { x: r.left, y: r.top, w: r.width, h: r.height };
      };
      const union = (els: Element[]) => {
        const rs = els.map((e) => e.getBoundingClientRect());
        const x = Math.min(...rs.map((r) => r.left)), y = Math.min(...rs.map((r) => r.top));
        return { x, y, w: Math.max(...rs.map((r) => r.right)) - x, h: Math.max(...rs.map((r) => r.bottom)) - y };
      };
      const visible = (e: Element | null) => !!e && e.getClientRects().length > 0;
      /* useGSAP scopes selector strings to the cube, so anything on the page is
         passed to GSAP as elements, never as strings */
      const pg = (...qs: string[]) => qs.flatMap((q) => $$(q));

      const PAGE = [".atlas-head", ".atlas-rail", ".p00 .plate-kicker", ".p00-lede", ".p00-actions", ".p00-id", ".p00-rebuild", ".fig0", ".fig0-layer", ".fig0-caption", ".fig0-enter"];
      let tl: gsap.core.Timeline | null = null;
      let idle: gsap.core.Tween | null = null;

      const setup = () => {
        const progress = trigRef.current ? trigRef.current.progress : 0;
        trigRef.current?.kill(true);
        tl?.kill();
        idle?.kill();
        gsap.set(pg(...PAGE, ".p00-name .c", ".fig0-signal"), { clearProps: "all" });
        gsap.set(el.querySelectorAll(".cube-title, .cube-title-sub, .cube-stage, .cube-cyc, .cube-layer-svg, .cube-skip, .cube-prompt, .cube-hint"), { clearProps: "all" });
        gsap.set(el, { clearProps: "visibility" });
        gsap.set(el.querySelectorAll(".cube-trace"), { clearProps: "all" });
        gsap.set(el.querySelectorAll(".cube-lbl, .cube-guide, .cube-node, .cube-f > :not(.cube-sh)"), { clearProps: "opacity" });
        const sy0 = window.scrollY;
        window.scrollTo(0, 0); // measure the page as it sits at the top

        const W = window.innerWidth, H = window.innerHeight;
        S = el.querySelector<HTMLElement>(".cube-part")!.offsetWidth || 200; // the base is S wide
        states = PARTS.map((d) => ({ x: d.p[0] * S, y: d.p[1] * S, z: d.p[2] * S, rx: d.r[0], ry: d.r[1], sx: 1, sy: 1, sz: 1 }));
        Object.assign(cam, { tx: CAMERA.tx, tz: CAMERA.tz, sc: 1, y: CAMERA.y * S, idle: 0.5, px: 0, py: 0, light: 0, guide: 0 });
        dirty = true;

        /* targets on the real Plate 00 */
        const railOn = visible($(".atlas-rail"));
        const T: Record<string, { x: number; y: number; w: number; h: number }> = {
          base: { x: 0, y: 0, w: W, h: H },
          lid: rectOf($(".atlas-head")),
          left: rectOf(railOn ? $(".atlas-rail") : $(".atlas-head-count")),
          back: rectOf($(".p00-name")),
          front: union([$(".p00-lede")!, $(".p00-actions")!, $(".p00-id")!]),
          right: rectOf($(".fig0-section")),
        };
        $$(".fig0-layer").forEach((e, i) => (T[`s${i}`] = rectOf(e)));

        /* the page layout in miniature, as world coordinates for a top-down camera */
        const M = 0.6, ox = W / 2, oy = H * 0.52, cx = W / 2, cy = H / 2;
        const order: Record<string, number> = { base: 0, lid: 3, left: 3, back: 3, front: 3, right: 2 };
        const plan = PARTS.map((d) => {
          const r = T[d.k];
          const mx = cx + M * (r.x + r.w / 2 - cx), my = cy + M * (r.y + r.h / 2 - cy), mw = M * r.w, mh = M * r.h, sz = 0.02;
          return { x: mx - ox, y: my - oy, z: (order[d.k] ?? 4) * 0.6 - d.c * S * sz / 2, rx: 0, ry: 0, sx: mw / (d.a * S), sy: mh / (d.b * S), sz, mini: { x: mx - mw / 2, y: my - mh / 2, w: mw, h: mh } };
        });

        /* the 2D hand-off layer, prepared up front so the whole sequence can run backwards */
        const layer = el.querySelector<SVGSVGElement>(".cube-layer-svg")!;
        layer.replaceChildren();
        const NS = "http://www.w3.org/2000/svg";
        const mk = (tag: string, attrs: Record<string, number>, cls: string) => {
          const e = document.createElementNS(NS, tag);
          Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, String(v)));
          e.setAttribute("class", cls);
          layer.appendChild(e);
          return e;
        };
        const rects = plan.map((q, i) => mk("rect", { x: q.mini.x, y: q.mini.y, width: q.mini.w, height: q.mini.h }, PARTS[i].k.startsWith("s") ? "cube-hand cube-hand-faint" : "cube-hand"));
        const headBottom = T.lid.y + T.lid.h;
        const hl = mk("line", { x1: W / 2, x2: W / 2, y1: headBottom, y2: headBottom }, "cube-rule");
        const vl = railOn ? mk("line", { x1: T.left.x + T.left.w, x2: T.left.x + T.left.w, y1: H * 0.55, y2: H * 0.55 }, "cube-rule") : null;
        gsap.set(layer, { autoAlpha: 0 });

        gsap.set(pg(...PAGE), { autoAlpha: 0 });
        // The stylesheet starts the letters at translateY(110%) for the first paint; GSAP would
        // read that as a fixed pixel y, so zero it and work in yPercent only.
        gsap.set(pg(".p00-name .c"), { y: 0, yPercent: 110 });
        gsap.set(pg(".fig0-signal"), { scaleY: 0, transformOrigin: "50% 0%" });
        gsap.set(pg(".p00-lede", ".p00-actions"), { y: 12 });
        const titleTarget = visible($(".atlas-head-full")) ? $(".atlas-head-full") : $(".atlas-head-short");
        const tr = rectOf(titleTarget), tt = rectOf(el.querySelector(".cube-title"));

        const io = { ease: "power2.inOut" };
        const t = gsap.timeline({ paused: true, defaults: { ease: "none" }, onUpdate: mark });
        /* 1 · the seams show: the monolith is an assembly */
        t.to(el.querySelectorAll(".cube-prompt, .cube-hint"), { autoAlpha: 0, duration: 0.3 }, 0)
          .to(el.querySelectorAll(".cube-trace"), { strokeDashoffset: 0, duration: 0.55, stagger: { each: 0.004, from: "random" } }, 0.05)
          /* 2 · exploded view along its own axes */
          .to(cam, { sc: 0.8, y: S * 0.2, guide: 1, duration: 1.3, ...io }, 0.4)
          .to(el.querySelectorAll(".cube-guide"), { opacity: 1, duration: 0.4 }, 0.6)
          .to(el.querySelectorAll(".cube-node"), { opacity: 1, duration: 0.3, stagger: 0.05 }, 1.0)
          .to(el.querySelectorAll(".cube-lbl"), { opacity: 1, duration: 0.4, stagger: 0.03 }, 0.95);
        const sequence = ["lid", "front", "right", "back", "left", "base", ...LAYERS.map((_, i) => `s${i}`)];
        sequence.forEach((k, i) => {
          const pi = PARTS.findIndex((d) => d.k === k), d = PARTS[pi];
          t.to(states[pi], { x: (d.p[0] + d.ex[0]) * S, y: (d.p[1] + d.ex[1]) * S, z: (d.p[2] + d.ex[2]) * S, duration: 0.9, ease: "power3.inOut" }, 0.45 + (i < 6 ? i * 0.07 : 0.42 + (i - 6) * 0.04));
        });
        /* 3 · every part lies flat and slides into the page layout, in miniature */
        t.to(el.querySelectorAll(".cube-f > :not(.cube-sh):not(.cube-trace-svg)"), { opacity: 0, duration: 0.3 }, 1.85)
          .to(el.querySelectorAll(".cube-guide, .cube-node"), { opacity: 0, duration: 0.4 }, 1.85)
          .to(el.querySelectorAll(".cube-trace"), { opacity: 0, duration: 0.4 }, 1.9)
          .to(cam, { tx: 0, tz: 0, sc: 1, y: 0, light: 1, duration: 1.25, ...io }, 1.85)
          .to(el.querySelector(".cube-cyc"), { autoAlpha: 0, duration: 1 }, 1.95);
        sequence.forEach((k, i) => {
          const pi = PARTS.findIndex((d) => d.k === k), q = plan[pi];
          t.to(states[pi], { x: q.x, y: q.y, z: q.z, rx: 0, ry: 0, sx: q.sx, sy: q.sy, sz: q.sz, duration: 1.15, ease: "power3.inOut" }, 1.9 + i * 0.025);
        });
        /* 4 · the plan grows into the page */
        const h0 = 3.35;
        t.set(layer, { autoAlpha: 1 }, h0)
          .to(el.querySelector(".cube-stage"), { autoAlpha: 0, duration: 0.25 }, h0)
          .to(hl, { attr: { x1: 0, x2: W }, duration: 0.9, ...io }, h0);
        if (vl) t.to(vl, { attr: { y1: T.left.y, y2: H }, duration: 0.9, ...io }, h0 + 0.05);
        t.to(el.querySelector(".cube-title-sub"), { autoAlpha: 0, duration: 0.25 }, h0)
          .to(el.querySelector(".cube-title"), { x: tr.x - tt.x, y: tr.y - tt.y, scale: tr.h / tt.h, duration: 1, ...io }, h0);
        PARTS.forEach((d, i) => {
          const r = T[d.k];
          t.to(rects[i], { attr: { x: r.x, y: r.y, width: r.w, height: r.h }, duration: 1.05, ...io }, d.k === "base" ? h0 : h0 + 0.04 + i * 0.025);
        });
        t.to(rects, { strokeOpacity: 0, duration: 0.35 }, h0 + 0.85)
          .to([hl, vl].filter(Boolean), { opacity: 0, duration: 0.4 }, h0 + 1.0)
          .to(pg(".atlas-head", ".atlas-rail", ".fig0", ".p00 .plate-kicker"), { autoAlpha: 1, duration: 0.3 }, h0 + 1.05)
          .to(layer, { autoAlpha: 0, duration: 0.3 }, h0 + 1.15)
          .to(el.querySelectorAll(".cube-title, .cube-skip"), { autoAlpha: 0, duration: 0.2 }, h0 + 1.1)
          .to(pg(".fig0-layer"), { autoAlpha: 1, duration: 0.35, stagger: 0.04 }, h0 + 1.05)
          .to(pg(".p00-name .c"), { yPercent: 0, duration: 0.8, stagger: 0.028, ease: "power3.out" }, h0 + 1.15)
          .to(pg(".fig0-signal"), { scaleY: 1, duration: 0.6, ...io }, h0 + 1.3)
          .to(pg(".p00-lede", ".p00-actions"), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, h0 + 1.5)
          .to(pg(".fig0-caption", ".fig0-enter", ".p00-id", ".p00-rebuild"), { autoAlpha: 1, duration: 0.4 }, h0 + 1.4)
          .to({}, { duration: 0.3 }); // a short rest on the finished plate
        tl = t;

        const frontis = $("#frontispiece")!;
        const startTop = frontis.getBoundingClientRect().top;
        trigRef.current = ScrollTrigger.create({
          trigger: frontis,
          start: `top ${startTop}px`,
          end: "+=200%",
          pin: true,
          scrub: 0.6,
          animation: t,
          onUpdate: (self) => {
            const p = self.progress;
            if (p > 0.002 && idle && !idle.paused()) {
              idle.pause();
              gsap.to(cam, { idle: 0.5, px: 0, py: 0, duration: 0.4, onUpdate: mark });
            } else if (p <= 0.002 && idle?.paused()) idle.resume();
            el.style.visibility = p >= 0.999 ? "hidden" : "";
          },
        });
        // the pin adds two screen-heights above everything else: re-measure the other triggers
        ScrollTrigger.refresh();
        idle = gsap.to(cam, { idle: 1, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1, startAt: { idle: 0 }, onUpdate: mark });
        window.scrollTo(0, progress ? trigRef.current.start + progress * (trigRef.current.end - trigRef.current.start) : sy0);
        render();
      };

      try {
        setup();
      } catch (err) {
        html.classList.remove("atlas-intro"); // never leave the plate hidden behind a broken cube
        throw err;
      }
      gsap.ticker.add(render);

      let rt = 0;
      const onResize = () => {
        window.clearTimeout(rt);
        rt = window.setTimeout(setup, 200);
      };
      const toEnd = (smooth: boolean) => {
        const tr = trigRef.current;
        if (tr) window.scrollTo({ top: tr.end, behavior: smooth ? "smooth" : "instant" });
      };
      const onPrompt = () => toEnd(true);
      const onSkip = () => {
        toEnd(false);
        $<HTMLElement>("#p00-title")?.focus({ preventScroll: true });
      };
      const onMove = (e: PointerEvent) => {
        if ((trigRef.current?.progress ?? 1) > 0.002) return;
        gsap.to(cam, { px: (e.clientX / window.innerWidth - 0.5) * 6, py: (e.clientY / window.innerHeight - 0.5) * -4, duration: 0.8, ease: "power3", overwrite: "auto", onUpdate: mark });
      };
      const stage = el.querySelector<HTMLElement>(".cube-stage")!;
      const prompt = el.querySelector<HTMLButtonElement>(".cube-prompt")!;
      const skip = el.querySelector<HTMLButtonElement>(".cube-skip")!;
      const fine = window.matchMedia("(pointer: fine)").matches;
      window.addEventListener("resize", onResize);
      prompt.addEventListener("click", onPrompt);
      stage.addEventListener("click", onPrompt);
      skip.addEventListener("click", onSkip);
      if (fine) stage.addEventListener("pointermove", onMove);

      return () => {
        window.clearTimeout(rt);
        window.removeEventListener("resize", onResize);
        prompt.removeEventListener("click", onPrompt);
        stage.removeEventListener("click", onPrompt);
        skip.removeEventListener("click", onSkip);
        stage.removeEventListener("pointermove", onMove);
        gsap.ticker.remove(render);
        trigRef.current?.kill(true);
        trigRef.current = null;
        tl?.kill();
        idle?.kill();
      };
    },
    { scope: root },
  );

  /* The closed cube, rendered on the server. Hidden unless the pre-paint
     script set html.atlas-intro, so visitors without motion never see it. */
  return (
    <div ref={root} className="cube">
      <div className="cube-cyc" aria-hidden />
      <div className="cube-head">
        <p className="cube-title" aria-hidden>
          <span className="cube-title-main">The Systems Atlas</span>
          <span className="cube-title-sub">Vol. 01 — Aaron Jacob Sunil</span>
        </p>
        <button type="button" className="cube-skip">
          Skip the opening
        </button>
      </div>
      <div className="cube-stage" aria-hidden>
        <div className="cube-world" style={{ transform: `translateY(${s(CAMERA.y)}) rotateX(${CAMERA.tx}deg) rotateZ(${CAMERA.tz}deg)` }}>
          <div className="cube-shadow" />
          {PARTS.map((d) => (
            <div
              key={d.k}
              className="cube-part"
              style={{ width: s(d.a), height: s(d.b), margin: `${s(-d.b / 2)} 0 0 ${s(-d.a / 2)}`, transform: assembled(d) }}
            >
              {FACES.map((F) => (
                <div
                  key={F.f}
                  className={`cube-f cube-f-${F.f}`}
                  style={{
                    width: s(F.w(d)),
                    height: s(F.h(d)),
                    margin: `${s(-F.h(d) / 2)} 0 0 ${s(-F.w(d) / 2)}`,
                    transform: `${F.rot} translateZ(${s(F.push(d))})`,
                  }}
                >
                  <Art part={d.k} face={F.f} />
                  <svg className="cube-trace-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <rect className="cube-trace" pathLength={1} x="0" y="0" width="100" height="100" />
                  </svg>
                  <div className="cube-sh" style={{ opacity: +shade(F.n, CAMERA.tx, CAMERA.tz, d.r[0], d.r[1]).toFixed(3) }} />
                </div>
              ))}
            </div>
          ))}
          <div className="cube-guide" style={{ width: s(3.4), height: 1, transform: `translate3d(${s(-1.7)}, 0, ${s(0.5)})` }} />
          <div className="cube-guide" style={{ width: 1, height: s(3.4), transform: `translate3d(0, ${s(-1.7)}, ${s(0.5)})` }} />
          <div className="cube-guide" style={{ width: 1, height: s(2.6), transform: `translate3d(0, 0, ${s(-0.3)}) rotateX(90deg)` }} />
          {PARTS.filter((d) => ["front", "back", "left", "right", "lid"].includes(d.k)).map((d) => (
            <div
              key={d.k}
              className="cube-node"
              style={{ transform: `translate3d(${s(d.p[0] + d.ex[0])}, ${s(d.p[1] + d.ex[1])}, ${s(d.p[2] + d.ex[2] + (d.k === "lid" ? d.c / 2 : 0))})` }}
            />
          ))}
        </div>
      </div>
      <svg className="cube-layer-svg" aria-hidden />
      <button type="button" className="cube-prompt">
        Scroll to unbuild <span className="cube-prompt-arrow" aria-hidden>↓</span>
      </button>
      <p className="cube-hint" aria-hidden>
        Scroll back up to rebuild it
      </p>
    </div>
  );
}
