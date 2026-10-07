"use client";

import { useState } from "react";
import { Check, Copy } from "@/components/ui/Icons";

/** Email as a mailto link, with a copy button for people without a mail app set up. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <span className="flex flex-wrap items-center gap-3">
      <a href={`mailto:${email}`} className="text-h3 underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-teal-glow hover:decoration-teal">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong px-3.5 text-sm text-fg-2 transition-colors hover:border-teal hover:text-fg"
      >
        {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </span>
  );
}
