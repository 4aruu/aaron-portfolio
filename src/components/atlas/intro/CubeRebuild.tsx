"use client";

/* Scrolls back to the top, where the cube rebuilds itself. Shown only while
   the cube is active (html.atlas-intro); otherwise there is nothing to rebuild. */
export default function CubeRebuild() {
  return (
    <button type="button" className="p00-rebuild" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      Rebuild the cube <span aria-hidden>↑</span>
    </button>
  );
}
