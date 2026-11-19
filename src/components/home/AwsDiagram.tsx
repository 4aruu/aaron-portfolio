/**
 * Multi-AZ web tier, drawn in HTML so labels never shrink below 12px on a
 * phone (an SVG would scale its text with the viewBox).
 */

function Node({ title, note, strong = false }: { title: string; note?: string; strong?: boolean }) {
  return (
    <div
      className={`rounded-lg border bg-l1 px-3 py-2 text-center ${
        strong ? "border-accent/60" : "border-line/[0.18]"
      }`}
    >
      <div className="t-secondary font-medium text-ink">{title}</div>
      {note && <div className="t-meta mt-0.5 text-ink-3">{note}</div>}
    </div>
  );
}

const VLine = () => <div className="mx-auto h-6 w-px bg-ink-3" aria-hidden />;

/** Bracket that splits one line into two (or joins two into one). */
function Split({ join = false }: { join?: boolean }) {
  return (
    <div aria-hidden className="relative h-6">
      <div className={`absolute left-1/2 h-3 w-px bg-ink-3 ${join ? "bottom-0" : "top-0"}`} />
      <div
        className={`absolute left-1/4 right-1/4 h-3 border-ink-3 ${
          join ? "top-0 border-b border-l border-r" : "bottom-0 border-l border-r border-t"
        }`}
      />
    </div>
  );
}

export default function AwsDiagram() {
  return (
    <figure className="surface m-0 p-5 md:p-6" aria-labelledby="aws-diagram-title">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <p id="aws-diagram-title" className="t-label">
          Architecture · multi-AZ web tier
        </p>
        <p className="t-meta text-ink-3">AWS · one region</p>
      </div>

      <figcaption className="sr-only">
        Internet traffic reaches an Application Load Balancer that spans two Availability Zones. Behind
        it, an Auto Scaling group runs EC2 instances from a Launch Template in each zone, inside a VPC
        protected by Security Groups and network ACLs. A CloudWatch CPU alarm drives the scaling policy.
        The instances reach Amazon S3 privately through a Gateway VPC Endpoint.
      </figcaption>

      <div aria-hidden>
        <div className="mx-auto max-w-[240px]">
          <Node title="Internet" note="HTTPS" />
        </div>
        <VLine />
        <div className="mx-auto max-w-[320px]">
          <Node title="Application Load Balancer" note="spans both zones" strong />
        </div>
        <Split />

        <div className="rounded-lg border border-dashed border-line/[0.18] p-3">
          <p className="t-meta mb-3 text-ink-3">VPC · Security Groups + NACLs</p>
          <div className="rounded-lg border border-dashed border-accent/50 p-3">
            <p className="t-meta mb-3 text-ink-3">Auto Scaling group · Launch Template</p>
            <div className="grid grid-cols-2 gap-3">
              {["A", "B"].map((az) => (
                <div key={az} className="rounded-lg bg-l0 p-3">
                  <p className="t-meta mb-2 text-ink-3">Zone {az}</p>
                  <Node title="EC2" note="web server" />
                </div>
              ))}
            </div>
          </div>
          <Split join />
          <div className="mx-auto max-w-[280px]">
            <Node title="Gateway VPC Endpoint" note="no public path" />
          </div>
        </div>

        <VLine />
        <div className="grid grid-cols-2 gap-3">
          <Node title="Amazon S3" note="private access" />
          <div className="rounded-lg border border-dashed border-line/[0.18] px-3 py-2 text-center">
            <div className="t-secondary font-medium text-ink">CloudWatch</div>
            <div className="t-meta mt-0.5 text-ink-3">CPU alarm → scaling policy</div>
          </div>
        </div>
      </div>
    </figure>
  );
}
