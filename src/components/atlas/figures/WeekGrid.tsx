/*
 * Fig. 5 — a semester 6 week. The fixed slots (Minor, Mentoring, Placement)
 * come from the college's real rules; the course codes and the lab's position
 * are sample data. data-order is the order the generator fills it: fixed
 * rules first, then the three-hour lab, then lectures.
 */
type Cell = { t: string; k: "rule" | "lab" | "lec" };
const R = (t: string): Cell => ({ t, k: "rule" });
const B = (t: string): Cell => ({ t, k: "lab" });
const C = (t: string): Cell => ({ t, k: "lec" });

const DAYS: [string, Cell[]][] = [
  ["Mon", [C("CS 601"), C("CS 603"), C("CS 605"), R("Minor"), C("CS 607"), C("CS 601"), R("Mentoring")]],
  ["Tue", [C("CS 603"), C("CS 605"), C("CS 607"), R("Minor"), B("Lab"), B(""), B("")]],
  ["Wed", [C("CS 605"), C("CS 601"), C("CS 603"), R("Minor"), C("CS 607"), C("CS 603"), C("CS 605")]],
  ["Thu", [C("CS 607"), C("CS 601"), C("CS 605"), R("Minor"), C("CS 603"), R("Placement"), C("CS 601")]],
  ["Fri", [C("CS 601"), C("CS 607"), C("CS 603"), C("CS 605"), C("CS 605"), C("CS 607"), R("Placement")]],
];
const PERIODS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7"];
const RANK = { rule: 0, lab: 1, lec: 2 } as const;

export default function WeekGrid() {
  // fill order: by kind first, then reading order within each kind
  const flat = DAYS.flatMap(([, cells], d) => cells.map((c, p) => ({ ...c, d, p })));
  const order = new Map(
    [...flat].sort((a, b) => RANK[a.k] - RANK[b.k] || a.d - b.d || a.p - b.p).map((c, i) => [`${c.d}-${c.p}`, i]),
  );
  return (
    <figure id="week" className="week" aria-labelledby="week-caption">
      <div className="week-scroll">
        <table className="week-grid">
          <caption className="sr-only">Semester 6 week, sample course codes</caption>
          <thead>
            <tr>
              <th scope="col">S6</th>
              {PERIODS.map((p) => (
                <th key={p} scope="col">
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map(([day, cells], d) => (
              <tr key={day}>
                <th scope="row">{day}</th>
                {cells.map((c, p) => (
                  <td key={p} className={`week-cell is-${c.k}`} data-order={order.get(`${d}-${p}`)}>
                    {c.k === "lab" && c.t === "" ? <span className="sr-only">Lab, continued</span> : c.t}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption id="week-caption" className="week-caption">
        Fig. 5 — Semester 6. Orange slots come straight from the rules; the lab takes three consecutive hours; course codes and the lab’s position are sample data. On scroll the week fills in that order. Friday’s afternoon periods start at 2:00.
      </figcaption>
    </figure>
  );
}
