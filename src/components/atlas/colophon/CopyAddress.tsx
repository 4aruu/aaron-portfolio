"use client";

import { useRef, useState } from "react";

/* Copies the email address and says so in a status region. If the clipboard
   is blocked, it says that too and selects the address for a manual copy. */
export default function CopyAddress({ email }: { email: string }) {
  const [msg, setMsg] = useState("");
  const timer = useRef<number | undefined>(undefined);

  async function copy() {
    window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setMsg("Address copied");
    } catch {
      const link = document.getElementById("p08-email");
      const sel = window.getSelection();
      if (link && sel) {
        const range = document.createRange();
        range.selectNodeContents(link);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      setMsg("Couldn’t copy. The address is selected; press Ctrl+C or ⌘C.");
    }
    timer.current = window.setTimeout(() => setMsg(""), 4000);
  }

  return (
    <div className="p08-copy">
      <button type="button" className="p08-copy-btn" onClick={copy}>
        Copy address
      </button>
      <p className="p08-status" role="status" aria-live="polite">
        {msg}
      </p>
    </div>
  );
}
