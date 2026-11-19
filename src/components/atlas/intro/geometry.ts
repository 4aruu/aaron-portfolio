/*
 * The cube on Plate 00: a solid of 13 parts, all sized in multiples of the
 * edge S (the CSS variable --s), so the server can render it closed and GSAP
 * only has to animate it. Lighting is computed per face (Lambert) from the
 * camera and part rotations.
 */
export const LAYERS = ["L1 Interface", "L2 Application", "L3 Retrieval", "L4 Models", "L5 Data", "L6 Compute", "L7 Region"];
export const SIGNAL_LAYER = 2;

const T = 0.16; // wall and slab thickness
const I = 1 - 2 * T; // inner edge, 0.68
const H = I / 7; // core slice

export type PartKey = "base" | "front" | "back" | "left" | "right" | "lid" | `s${number}`;
export interface PartDef {
  k: PartKey;
  a: number; // footprint width (S units)
  b: number; // footprint depth
  c: number; // thickness
  p: [number, number, number]; // assembled centre
  r: [number, number]; // assembled rotateX, rotateY (deg)
  ex: [number, number, number]; // exploded offset
}

export const PARTS: PartDef[] = [
  { k: "base", a: 1, b: 1, c: T, p: [0, 0, T / 2], r: [0, 0], ex: [0, 0, -0.12] },
  { k: "front", a: 1, b: I, c: T, p: [0, 0.5 - T / 2, 0.5], r: [90, 0], ex: [0, 0.62, 0] },
  { k: "back", a: 1, b: I, c: T, p: [0, -0.5 + T / 2, 0.5], r: [-90, 0], ex: [0, -0.62, 0] },
  { k: "left", a: I, b: I, c: T, p: [-0.5 + T / 2, 0, 0.5], r: [0, 90], ex: [-0.62, 0, 0] },
  { k: "right", a: I, b: I, c: T, p: [0.5 - T / 2, 0, 0.5], r: [0, -90], ex: [0.62, 0, 0] },
  ...LAYERS.map(
    (_, i): PartDef => ({ k: `s${i}`, a: I, b: I, c: H, p: [0, 0, T + (6.5 - i) * H], r: [0, 0], ex: [0, 0, 0.18 + (6 - i) * 0.075] }),
  ),
  { k: "lid", a: 1, b: 1, c: T, p: [0, 0, 1 - T / 2], r: [0, 0], ex: [0, 0, 0.95] },
];

export type FaceKey = "top" | "bot" | "px" | "nx" | "py" | "ny";
export interface FaceDef {
  f: FaceKey;
  w: (d: PartDef) => number;
  h: (d: PartDef) => number;
  rot: string; // rotation before the push-out
  push: (d: PartDef) => number; // translateZ distance (S units)
  n: [number, number, number]; // local normal
}
export const FACES: FaceDef[] = [
  { f: "top", w: (d) => d.a, h: (d) => d.b, rot: "", push: (d) => d.c / 2, n: [0, 0, 1] },
  { f: "bot", w: (d) => d.a, h: (d) => d.b, rot: "rotateY(180deg)", push: (d) => d.c / 2, n: [0, 0, -1] },
  { f: "px", w: (d) => d.c, h: (d) => d.b, rot: "rotateY(90deg)", push: (d) => d.a / 2, n: [1, 0, 0] },
  { f: "nx", w: (d) => d.c, h: (d) => d.b, rot: "rotateY(-90deg)", push: (d) => d.a / 2, n: [-1, 0, 0] },
  { f: "py", w: (d) => d.a, h: (d) => d.c, rot: "rotateX(-90deg)", push: (d) => d.b / 2, n: [0, 1, 0] },
  { f: "ny", w: (d) => d.a, h: (d) => d.c, rot: "rotateX(90deg)", push: (d) => d.b / 2, n: [0, -1, 0] },
];

/* Camera at rest: a three-quarter view from about 30° above the floor. */
export const CAMERA = { tx: 60, tz: -36, y: 0.34 };

type V = [number, number, number];
const D = Math.PI / 180;
const rx = (a: number, [x, y, z]: V): V => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
const ry = (a: number, [x, y, z]: V): V => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
const rz = (a: number, [x, y, z]: V): V => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a), z];
const LIGHT: V = (() => {
  const v: V = [0.62, -0.5, 0.6];
  const m = Math.hypot(...v);
  return [v[0] / m, v[1] / m, v[2] / m];
})();

/* Opacity of the shade layer on a face: 0 when fully lit. */
export function shade(n: V, camX: number, camZ: number, partX: number, partY: number, light = 0): number {
  const w = rx(camX * D, rz(camZ * D, rx(partX * D, ry(partY * D, n))));
  const lit = Math.max(0, w[0] * LIGHT[0] + w[1] * LIGHT[1] + w[2] * LIGHT[2]);
  return (1 - (0.5 + 0.5 * lit)) * 0.62 * (1 - light);
}

/* S-unit lengths as CSS, for the server-rendered closed cube. */
export const s = (k: number) => `calc(var(--s) * ${+k.toFixed(5)})`;
