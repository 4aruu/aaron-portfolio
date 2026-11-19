/**
 * Hero illustration: the two systems from the case studies, drawn as they
 * actually run. Left: Lumira's voice RAG pipeline. Right: the multi-AZ web tier
 * from the AWS internship. On load the wires draw in and request pulses travel
 * through each system twice, then everything rests (no endless loop).
 * Desktop only (lg+): below that width the labels would shrink under 12px.
 */

type Node = { x: number; y: number; w: number; label: string; note?: string; accent?: boolean };

const H = 52;

const AI_NODES: Node[] = [
  { x: 24, y: 64, w: 92, label: "Question", note: "voice" },
  { x: 140, y: 64, w: 96, label: "Whisper", note: "STT" },
  { x: 260, y: 64, w: 104, label: "ChromaDB", note: "retrieve", accent: true },
  { x: 388, y: 64, w: 108, label: "LLaMA 3.2", note: "answer" },
  { x: 388, y: 164, w: 108, label: "edge-tts", note: "speech" },
  { x: 24, y: 164, w: 92, label: "Answer", note: "spoken" },
];

const AWS_NODES: Node[] = [
  { x: 640, y: 104, w: 92, label: "Internet" },
  { x: 756, y: 104, w: 92, label: "ALB", note: "2 zones", accent: true },
  { x: 880, y: 44, w: 104, label: "EC2", note: "zone A" },
  { x: 880, y: 164, w: 104, label: "EC2", note: "zone B" },
  { x: 1016, y: 104, w: 92, label: "S3", note: "private" },
];


// Wires (also the paths the pulses follow).
const AI_PATH = `M116 90 H140 M236 90 H260 M364 90 H388 M442 116 V164 M388 190 H116`;
const AI_PULSE = `M70 90 H442 V190 H70`;
const AWS_WIRES = [
  `M732 130 H756`,
  `M848 130 H864 V70 H880`,
  `M848 130 H864 V190 H880`,
  `M984 70 H1000 V130 H1016`,
  `M984 190 H1000 V130 H1016`,
];
const AWS_PULSE_A = `M686 130 H864 V70 H1000 V130 H1062`;
const AWS_PULSE_B = `M686 130 H864 V190 H1000 V130 H1062`;

function Box({ n, delay }: { n: Node; delay: number }) {
  return (
    <g className="sm-node" style={{ animationDelay: `${delay}ms` }}>
      <rect
        x={n.x}
        y={n.y}
        width={n.w}
        height={H}
        rx={8}
        className={n.accent ? "sm-box sm-box-accent" : "sm-box"}
      />
      <text x={n.x + n.w / 2} y={n.y + (n.note ? 23 : 31)} textAnchor="middle" className="sm-label">
        {n.label}
      </text>
      {n.note && (
        <text x={n.x + n.w / 2} y={n.y + 40} textAnchor="middle" className="sm-note">
          {n.note}
        </text>
      )}
    </g>
  );
}

export default function SystemMap() {
  return (
    <figure className="system-map m-0 hidden lg:block" aria-labelledby="sm-title">
      <figcaption id="sm-title" className="sr-only">
        Two systems I have built. Lumira: a visitor&apos;s spoken question is transcribed by Whisper, relevant
        passages are retrieved from ChromaDB, LLaMA 3.2 answers from them, and edge-tts speaks the answer back. AWS web tier: internet
        traffic reaches an Application Load Balancer across two Availability Zones, EC2 instances in
        each zone serve it, and they reach S3 privately through a VPC endpoint.
      </figcaption>
      <svg viewBox="0 0 1132 248" className="block h-auto w-full" aria-hidden>
        {/* frames */}
        <g className="sm-frame-g">
          <rect x="8" y="8" width="512" height="232" rx="14" className="sm-frame" />
          <text x="28" y="38" className="sm-title">LUMIRA · VOICE RAG</text>
          <rect x="612" y="8" width="512" height="232" rx="14" className="sm-frame" />
          <text x="632" y="38" className="sm-title">AWS · MULTI-AZ WEB TIER</text>
          <rect x="864" y="28" width="136" height="216" rx="10" className="sm-zone" />
        </g>

        {/* wires draw in */}
        <path d={AI_PATH} pathLength={1} className="sm-wire" style={{ animationDelay: "650ms" }} />
        {AWS_WIRES.map((d, i) => (
          <path key={d} d={d} pathLength={1} className="sm-wire" style={{ animationDelay: `${700 + i * 60}ms` }} />
        ))}

        {AI_NODES.map((n, i) => (
          <Box key={`ai-${i}`} n={n} delay={500 + i * 70} />
        ))}
        {AWS_NODES.map((n, i) => (
          <Box key={`aws-${i}`} n={n} delay={560 + i * 70} />
        ))}

        {/* request pulses */}
        <circle r="4" className="sm-pulse" style={{ offsetPath: `path("${AI_PULSE}")`, animationDelay: "1300ms" }} />
        <circle r="4" className="sm-pulse" style={{ offsetPath: `path("${AWS_PULSE_A}")`, animationDelay: "1400ms" }} />
        <circle r="4" className="sm-pulse" style={{ offsetPath: `path("${AWS_PULSE_B}")`, animationDelay: "1700ms" }} />
      </svg>
    </figure>
  );
}
