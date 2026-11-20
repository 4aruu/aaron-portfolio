import Link from "next/link";
import { PROJECTS } from "@/data/projects";

/* Plate III · Lumira. The route a spoken question takes, stop by stop; on
   scroll the orange line travels it (see PlateMotion). */
const STOPS = [
  { tag: "Stop 1", name: "Question", detail: "Spoken on the visitor’s phone, after a QR scan." },
  { tag: "Stop 2", name: "faster-whisper", detail: "Speech to text on the GPU." },
  { tag: "Stop 3", name: "ChromaDB", detail: "Retrieves passages from the uploaded PDF, TXT or DOCX." },
  { tag: "Stop 4", name: "LLaMA 3.2", detail: "Answers from that context alone, through Ollama." },
  { tag: "Stop 5", name: "edge-tts", detail: "Neural speech reads the answer back." },
  { tag: "Arrival", name: "Or a plain “I don’t know”", detail: "When the documents don’t hold the answer, it says so." },
];

export default function Plate03() {
  const p = PROJECTS.find((x) => x.id === "lumira")!;
  return (
    <section id="lumira" className="plate p03 plate-ruled" aria-labelledby="p03-title">
      <div className="p03-head">
        <div className="p03-text">
          <p className="plate-kicker">Plate III · Lumira · {p.period} · team of four</p>
          <h2 id="p03-title" className="p03-title">The route of a question</h2>
          <p className="plate-lede">
            A voice assistant for exhibition booths. Visitors scan a QR code and ask out loud; the answer comes back from the exhibitor’s own documents.
          </p>
        </div>
        <aside className="plate-decision" aria-label="Decision">
          <p className="plate-decision-k">Decision</p>
          <p>
            <strong>Run the model locally.</strong> The documents and LLaMA 3.2 stay on the exhibitor’s machine; only the finished answer goes to edge-tts for speech.
          </p>
        </aside>
      </div>

      <figure id="route" className="route" aria-labelledby="route-caption">
        <div className="route-track" aria-hidden>
          <div className="route-fill" />
        </div>
        <ol className="route-stops">
          {STOPS.map((s, i) => (
            <li key={s.tag} className={i === STOPS.length - 1 ? "route-stop is-arrival" : "route-stop"} data-stop={i}>
              <span className="route-dot" aria-hidden>
                <span className="route-dot-fill" />
              </span>
              <span className="route-tag">{s.tag}</span>
              <span className="route-name">{s.name}</span>
              <span className="route-detail">{s.detail}</span>
            </li>
          ))}
        </ol>
        <figcaption id="route-caption" className="route-caption">
          Fig. 3 — As you scroll, the question travels the line stop by stop.{" "}
          <Link href="/projects/lumira" className="atlas-link">
            Read the case study <span aria-hidden>→</span>
          </Link>
        </figcaption>
      </figure>
    </section>
  );
}
