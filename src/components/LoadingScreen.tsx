"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LoadingScreen.module.css";

const BOOT_LINES = [
  { text: "INITIALIZING SYSTEM KERNEL...", delay: 0 },
  { text: "LOADING NEURAL INTERFACE LAYER...", delay: 180 },
  { text: "MOUNTING COMPONENT REGISTRY...", delay: 380 },
  { text: "CALIBRATING RENDER PIPELINE...", delay: 600 },
  { text: "SYNCING DESIGN TOKENS...", delay: 820 },
  { text: "COMPILING PORTFOLIO ASSETS...", delay: 1050 },
  { text: "ESTABLISHING NETWORK PROTOCOLS...", delay: 1300 },
  { text: "SYSTEM READY.", delay: 1560 },
];

const MIN_DISPLAY_MS = 2800;

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTimeRef = useRef(Date.now());
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const completedRef = useRef(false);

  /* ── Circuit canvas animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate circuit nodes once
    type Node = { x: number; y: number; active: boolean; pulse: number };
    type Segment = { x1: number; y1: number; x2: number; y2: number; progress: number; speed: number; delay: number };

    const GRID = 60;
    const cols = Math.ceil(window.innerWidth / GRID) + 1;
    const rows = Math.ceil(window.innerHeight / GRID) + 1;

    const nodes: Node[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 0.18) {
          nodes.push({
            x: c * GRID + (Math.random() - 0.5) * 20,
            y: r * GRID + (Math.random() - 0.5) * 20,
            active: false,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    const segments: Segment[] = [];
    nodes.forEach((n, i) => {
      const near = nodes
        .filter((m, j) => j !== i)
        .sort(
          (a, b) =>
            Math.hypot(a.x - n.x, a.y - n.y) -
            Math.hypot(b.x - n.x, b.y - n.y)
        )
        .slice(0, 2);
      near.forEach((m) => {
        if (Math.random() < 0.55) {
          // Prefer axis-aligned L-shaped traces
          const mid =
            Math.random() < 0.5
              ? { x: m.x, y: n.y }
              : { x: n.x, y: m.y };
          segments.push({
            x1: n.x, y1: n.y,
            x2: mid.x, y2: mid.y,
            progress: 0,
            speed: 0.004 + Math.random() * 0.006,
            delay: Math.random() * 0.6,
          });
          segments.push({
            x1: mid.x, y1: mid.y,
            x2: m.x, y2: m.y,
            progress: 0,
            speed: 0.004 + Math.random() * 0.006,
            delay: Math.random() * 0.6 + 0.15,
          });
        }
      });
    });

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Segments
      segments.forEach((s) => {
        if (t < s.delay) return;
        s.progress = Math.min(s.progress + s.speed, 1);

        const ex = s.x1 + (s.x2 - s.x1) * s.progress;
        const ey = s.y1 + (s.y2 - s.y1) * s.progress;

        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(201,168,76,${0.08 + s.progress * 0.12})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Glowing head dot
        if (s.progress < 1) {
          ctx.beginPath();
          ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201,168,76,0.9)`;
          ctx.fill();
          const g = ctx.createRadialGradient(ex, ey, 0, ex, ey, 12);
          g.addColorStop(0, "rgba(201,168,76,0.4)");
          g.addColorStop(1, "rgba(201,168,76,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(ex, ey, 12, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Nodes
      nodes.forEach((n) => {
        n.pulse += 0.035;
        const alpha = 0.15 + Math.sin(n.pulse) * 0.12;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${alpha + 0.15})`;
        ctx.fill();
        // Outer ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Boot lines ── */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, i]);
        }, line.delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  /* ── Progress bar ── */
  useEffect(() => {
    const start = Date.now();
    const duration = MIN_DISPLAY_MS - 400;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  /* ── Completion gate ── */
  useEffect(() => {
    if (completedRef.current) return;
    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(MIN_DISPLAY_MS - elapsed, 0);

    const t = setTimeout(() => {
      completedRef.current = true;
      setExiting(true);
      setTimeout(onComplete, 700);
    }, remaining);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.root} ${exiting ? styles.exiting : ""}`}>
      {/* Circuit canvas */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Center piece */}
      <div className={styles.center}>
        {/* Logo mark */}
        <div className={styles.logoRing}>
          <div className={styles.logoInner}>
            <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
              {/* Hexagon-inspired mark */}
              <polygon
                points="20,2 36,11 36,29 20,38 4,29 4,11"
                stroke="#C9A84C"
                strokeWidth="1.5"
                fill="none"
                className={styles.hexPoly}
              />
              <polygon
                points="20,9 30,14.5 30,25.5 20,31 10,25.5 10,14.5"
                stroke="#C9A84C"
                strokeWidth="0.8"
                strokeOpacity="0.5"
                fill="none"
              />
              <text
                x="20"
                y="24"
                textAnchor="middle"
                fill="#C9A84C"
                fontSize="14"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
              >
                A
              </text>
            </svg>
          </div>
          <div className={styles.orbitDot} />
        </div>

        {/* Name */}
        <p className={styles.nameLabel}>AARON JACOB SUNIL</p>

        {/* Terminal boot log */}
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <span className={styles.dot} style={{ background: "#FF5F57" }} />
            <span className={styles.dot} style={{ background: "#FFBD2E" }} />
            <span className={styles.dot} style={{ background: "#28CA41" }} />
            <span className={styles.termTitle}>boot.sys</span>
          </div>
          <div className={styles.terminalBody}>
            {BOOT_LINES.map((line, i) => (
              <div
                key={i}
                className={`${styles.bootLine} ${
                  visibleLines.includes(i) ? styles.bootLineVisible : ""
                }`}
              >
                <span className={styles.prompt}>&gt;&nbsp;</span>
                <span
                  className={
                    i === BOOT_LINES.length - 1 ? styles.readyText : ""
                  }
                >
                  {line.text}
                </span>
              </div>
            ))}
            {/* Blinking cursor */}
            <div className={styles.cursor} />
          </div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
            {/* Chunk marks */}
            {[25, 50, 75].map((pct) => (
              <div
                key={pct}
                className={styles.chunk}
                style={{ left: `${pct}%` }}
              />
            ))}
          </div>
          <div className={styles.progressMeta}>
            <span className={styles.progressLabel}>LOADING SYSTEM</span>
            <span className={styles.progressPct}>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className={`${styles.corner} ${styles.cornerTL}`} />
      <div className={`${styles.corner} ${styles.cornerTR}`} />
      <div className={`${styles.corner} ${styles.cornerBL}`} />
      <div className={`${styles.corner} ${styles.cornerBR}`} />

      {/* Horizontal scan line */}
      <div className={styles.scanLine} />

      {/* Exit curtain */}
      <div className={styles.curtain} />
    </div>
  );
}
