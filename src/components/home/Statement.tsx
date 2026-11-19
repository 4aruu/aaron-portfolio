/**
 * A large sentence whose words light up in reading order as it scrolls
 * through the viewport. Words wrapped in *asterisks* are set in the accent.
 * Screen readers get the plain sentence once.
 */
export default function Statement({ text }: { text: string }) {
  const words = text.split(" ");
  const plain = text.replace(/\*/g, "");
  return (
    <p className="statement reveal" aria-label={plain} style={{ "--n": words.length } as React.CSSProperties}>
      {words.map((raw, i) => {
        const accent = raw.startsWith("*");
        const word = raw.replace(/\*/g, "");
        const span = (
          <span className="statement-word" style={{ "--i": i } as React.CSSProperties}>
            {word}
          </span>
        );
        return (
          <span key={i} aria-hidden>
            {accent ? <em>{span}</em> : span}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
