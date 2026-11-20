/* Fig. 2 — the internship architecture. The numbered markers match Plate II's
   notes; on scroll the wires draw in order (see PlateMotion). */
const Num = ({ n }: { n: number }) => (
  <span className="f2-num">
    <span className="sr-only">note </span>
    {String(n).padStart(2, "0")}
  </span>
);

export default function Fig2() {
  return (
    <figure id="fig2" className="f2" aria-labelledby="fig2-caption">
      <div className="f2-board">
        <div className="f2-box f2-internet">Internet</div>
        <div className="f2-wire f2-wire-v" data-wire="0" aria-hidden />
        <div className="f2-box f2-alb">
          Application Load Balancer <Num n={1} />
        </div>
        <div className="f2-wire f2-wire-v" data-wire="1" aria-hidden />
        <div className="f2-vpc">
          <p className="f2-vpc-label">
            VPC · Security Groups + NACLs <Num n={4} />
          </p>
          <div className="f2-zones">
            <div className="f2-zone">
              <span className="f2-zone-name">Zone A</span>
              <span className="f2-box">EC2 · web</span>
            </div>
            <div className="f2-zone">
              <span className="f2-zone-name">Zone B</span>
              <span className="f2-box">EC2 · web</span>
            </div>
          </div>
          <p className="f2-zones-note">two Availability Zones</p>
          <div className="f2-row">
            <span className="f2-box">
              Gateway VPC Endpoint <Num n={3} />
            </span>
            <span className="f2-wire f2-wire-h" data-wire="2" aria-hidden />
            <span className="f2-box f2-box-strong">Amazon S3 · private</span>
          </div>
        </div>
        <div className="f2-row f2-row-watch">
          <span className="f2-box">
            CloudWatch · CPU alarm <Num n={2} />
          </span>
          <span className="f2-wire f2-wire-h" data-wire="3" aria-hidden />
          <span className="f2-box">scaling policy</span>
        </div>
      </div>
      <figcaption id="fig2-caption" className="f2-caption">
        Fig. 2 — Survey of the internship architecture. Numbers match the notes. Scroll draws the wires in order.
      </figcaption>
    </figure>
  );
}
