"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CopyLinkButtonProps = {
  url: string;
  label: string;
};

export function CopyLinkButton({ url, label }: CopyLinkButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  async function copy() {
    window.clearTimeout(resetTimer.current);

    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      resetTimer.current = window.setTimeout(() => setStatus("idle"), 2400);
    } catch {
      // Clipboard access can be blocked; leave the link selected so it can be copied by hand.
      inputRef.current?.select();
      setStatus("manual");
    }
  }

  return (
    <>
      <div className="copy-link">
        <label className="sr-only" htmlFor="copy-link-url">
          {label}
        </label>
        <input
          ref={inputRef}
          className="copy-link__url"
          id="copy-link-url"
          readOnly
          value={url.replace(/^https?:\/\//, "")}
          onFocus={(event) => event.currentTarget.select()}
        />
        <button className="copy-link__button" type="button" onClick={copy}>
          {status === "copied" ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}
          {status === "copied" ? "Copied" : "Copy link"}
        </button>
      </div>
      <p className={status === "manual" ? "copy-link__hint" : "sr-only"} aria-live="polite">
        {status === "copied" ? "Link copied." : status === "manual" ? "Link selected. Press Ctrl+C or ⌘C to copy it." : ""}
      </p>
    </>
  );
}
