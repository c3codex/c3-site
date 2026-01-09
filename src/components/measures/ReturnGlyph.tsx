import React from "react";
import { useNavigate } from "react-router-dom";
import { MEASURES_ASSETS } from "@/pages/measures/measuresAssets";

type Props = {
  className?: string;
  title?: string;
};

export default function ReturnGlyph({ className, title = "Return" }: Props) {
  const nav = useNavigate();

  return (
    <button
      type="button"
      onClick={(e) => {
        // Shift+click exits the realm to the Portal.
        if (e.shiftKey) nav("/");
        else nav("/measures");
      }}
      className={`group inline-flex items-center gap-2 ${className ?? ""}`}
      aria-label={title}
      title={`${title} (Shift+click: Exit to Portal)`}
    >
      <img
        src={MEASURES_ASSETS.ui.returnGlyph}
        alt=""
        className="h-8 w-8 opacity-80 transition group-hover:opacity-100"
        draggable={false}
      />
      <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-stone-200/60 group-hover:text-stone-200/85 transition hidden sm:inline">
        return
      </span>
    </button>
  );
}
