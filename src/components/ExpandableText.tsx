"use client";

import { useState } from "react";

function smartTruncate(input: string, limit: number): string {
  if (input.length <= limit) return input;
  let end = limit;
  // back up to the last space to avoid mid-word cuts
  const lastSpace = input.lastIndexOf(" ", limit);
  if (lastSpace > limit * 0.6) end = lastSpace; // only if reasonably close
  // avoid ending on punctuation .,!?;:
  while (end > 0 && ".,!?;:".includes(input[end - 1])) end--;
  return input.slice(0, end);
}

export default function ExpandableText({ text, limit = 280 }: { text: string; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const truncated = smartTruncate(text, limit);
  const showToggle = text.length > truncated.length;

  if (expanded || !showToggle) {
    return (
      <p className="text-neutral-700">
        {expanded ? text : truncated}
        {showToggle && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="text-blue-500 underline underline-offset-4 ml-1"
          >
            View less
          </button>
        )}
      </p>
    );
  }

  return (
    <p className="text-neutral-700">
      {truncated}
      <span>… </span>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="text-blue-500 underline underline-offset-4"
      >
        View more
      </button>
    </p>
  );
}


