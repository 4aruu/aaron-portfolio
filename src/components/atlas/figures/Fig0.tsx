/* Fig. 0 — a section through a system, interface at the top to region at the
   bottom. The orange line is one request travelling down through the layers. */
const LAYERS = [
  { n: "L1", name: "Interface", stack: "React · Next.js · TypeScript" },
  { n: "L2", name: "Application", stack: "FastAPI · Node.js · Express" },
  { n: "L3", name: "Retrieval", stack: "LangChain · ChromaDB", signal: true },
  { n: "L4", name: "Models", stack: "LLaMA 3.2 · faster-whisper · edge-tts" },
  { n: "L5", name: "Data", stack: "PostgreSQL · MySQL · MongoDB · S3" },
  { n: "L6", name: "Compute", stack: "EC2 · Auto Scaling · ALB · Docker" },
  { n: "L7", name: "Region", stack: "VPC · two Availability Zones · CloudWatch" },
];

export default function Fig0() {
  return (
    <figure className="fig0" aria-labelledby="fig0-caption">
      <div className="fig0-section">
        <ol className="fig0-layers">
          {LAYERS.map((l) => (
            <li key={l.n} className={l.signal ? "fig0-layer is-signal" : "fig0-layer"}>
              <span className="fig0-n">{l.n}</span>
              <span className="fig0-name">{l.name}</span>
              <span className="fig0-stack">{l.stack}</span>
            </li>
          ))}
        </ol>
        <div className="fig0-signal" aria-hidden />
        <span className="fig0-enter" aria-hidden>
          a question enters →
        </span>
      </div>
      <figcaption id="fig0-caption" className="fig0-caption">
        Fig. 0 — Section through a system: the layers I work across, interface to region. The orange line is one request, drawn as an illustration.
      </figcaption>
    </figure>
  );
}
