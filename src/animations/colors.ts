import gsap from "gsap";

export function setAccentColor(color: number[]) {
  gsap.to(":root", {
    "--accent-r": color[0],
    "--accent-g": color[1],
    "--accent-b": color[2],
    duration: 0.8,
    ease: "power3.out",
  });
}
