import type { FlowStep } from "@/data/projects";

/** Ordered pipeline: horizontal with arrows on medium+, vertical on narrow. */
export default function FlowDiagram({ steps, label }: { steps: FlowStep[]; label: string }) {
  if (steps.length === 0) return null;
  return (
    <ol className="flow" aria-label={label}>
      {steps.map((step, i) => (
        <li key={step.label} className="flow-step" style={{ "--i": i } as React.CSSProperties}>
          <div className="t-secondary font-medium text-ink">{step.label}</div>
          {step.detail && <div className="t-meta mt-0.5 text-ink-3">{step.detail}</div>}
        </li>
      ))}
    </ol>
  );
}
