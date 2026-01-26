"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-text-variant hover:text-foreground flex cursor-pointer items-center gap-2 text-sm transition-colors"
    >
      {copied ? (
        <>
          <Check className="size-4" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Link2 className="size-4" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
