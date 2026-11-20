/*
 * The plates of The Systems Atlas, in reading order.
 * `anchor` is the id of the section on the homepage. The ids are stable:
 * later milestones replace what is inside each section, not the anchor.
 */
export interface Plate {
  numeral: string;
  title: string;
  anchor: string;
}

export const PLATES: Plate[] = [
  { numeral: "00", title: "Frontispiece", anchor: "frontispiece" },
  { numeral: "I", title: "The four territories", anchor: "territories" },
  { numeral: "II", title: "A web tier that survives", anchor: "experience" },
  { numeral: "III", title: "The route of a question", anchor: "lumira" },
  { numeral: "IV", title: "231, a specimen sheet", anchor: "nutriswap" },
  { numeral: "V", title: "Under two minutes", anchor: "infobot" },
  { numeral: "VI", title: "The route", anchor: "timeline" },
  { numeral: "VII", title: "Gazetteer", anchor: "toolkit" },
  { numeral: "VIII", title: "Colophon", anchor: "contact" },
];

export const LAST_NUMERAL = PLATES[PLATES.length - 1].numeral;
