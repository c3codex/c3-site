import React from "react";

export function SyndrosReturnGlyph() {
  return (
    <button
      type="button"
      aria-label="Return"
      className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-stone-100/90 backdrop-blur-md hover:bg-black/50"
      onClick={() => window.history.back()}
    >
      Syndros
    </button>
  );
}
