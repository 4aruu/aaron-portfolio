interface Props {
  id: string;
  index: string;
  title: string;
  lead?: string;
}

/** Editorial section head: index + large title on the left, lead on the right. */
export default function SectionHead({ id, index, title, lead }: Props) {
  return (
    <div className="reveal mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end md:gap-8">
      <div className="md:col-span-7">
        <p className="section-index" aria-hidden>
          {index}
        </p>
        <h2 id={id} className="t-section mt-3">
          {title}
        </h2>
      </div>
      {lead && <p className="t-body text-ink-2 md:col-span-5 md:pb-1">{lead}</p>}
    </div>
  );
}
