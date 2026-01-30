// src/pillars/measures/components/aspects/AspectCard.tsx
import React from "react";

type Props = {
  sign: string;
  title: string;
  text: string;
  side: "left" | "right";
  onClose: () => void;
};

export default function AspectCard({
  sign,
  title,
  text,
  side,
  onClose,
}: Props) {
  return (
    <div
      className={`pointer-events-auto absolute z-40 max-w-xs ${
    side === "left" ? "left-16" : "right-16"
  } top-1/3`}
    >
      <div className="rounded-xl border border-white/12 bg-black/45 backdrop-blur-xl p-4 shadow-lg">
        <div className="flex items-start justify-between mb-2">
          <span className="text-2xl text-stone-200">{sign}</span>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-200 transition"
            aria-label="Close aspect"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="text-xs uppercase tracking-wide text-stone-300 mb-1">
          {title}
        </div>

        <p className="text-sm text-stone-100/90 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
