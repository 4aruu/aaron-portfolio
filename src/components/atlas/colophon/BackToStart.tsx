"use client";

/* Back to the top. When the opening cube is active (html.atlas-intro), the
   cube rebuilds as the page scrolls up, so the label says Replay. */
export default function BackToStart() {
  function go() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
    document.getElementById("p00-title")?.focus({ preventScroll: true });
  }
  return (
    <button type="button" className="p08-replay" onClick={go}>
      <span className="p08-replay-intro">Replay the opening</span>
      <span className="p08-replay-top">Back to the top</span>
      <span aria-hidden>↑</span>
    </button>
  );
}
