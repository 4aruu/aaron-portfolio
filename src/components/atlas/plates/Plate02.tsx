import Fig2 from "../figures/Fig2";

/* Plate II · Field survey. The internship architecture; every note is from the
   IPSR machine test report. */
const NOTES = [
  "A load balancer and an Auto Scaling group across two Availability Zones, from a Launch Template. Terminate an instance and the group replaces it.",
  "Target tracking at 50% CPU: under stress-ng the group grew from 2 instances to 3, then shrank back to 2.",
  "Private S3 access through a Gateway VPC Endpoint.",
  "Least privilege with Security Groups and network ACLs.",
];

export default function Plate02() {
  return (
    <section id="experience" className="plate p02" aria-labelledby="p02-title">
      <div className="p02-text">
        <p className="plate-kicker">Plate II · Field survey</p>
        <h2 id="p02-title" className="plate-title">A web tier that survives a zone going down</h2>
        <p className="plate-meta">
          Cloud Infrastructure Intern (AWS)
          <br />
          IPSR Solutions · remote · May – Nov 2026
        </p>
        <ol className="p02-notes">
          {NOTES.map((n, i) => (
            <li key={i}>
              <span className="p02-num" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="sr-only">Note {i + 1}: </span>
              {n}
            </li>
          ))}
        </ol>
      </div>
      <Fig2 />
    </section>
  );
}
