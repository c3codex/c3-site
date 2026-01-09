import React from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
};

/**
 * NOTE: This cannot stop screenshots.
 * It prevents the easy download paths:
 * - right-click save
 * - drag to desktop
 * - long-press save (partially)
 */
export default function NoSaveImage({ src, alt = "", className }: Props) {
  return (
    <div
      className={`relative select-none ${className ?? ""}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        // prevents middle-click open on some browsers
        if (e.button === 1) e.preventDefault();
      }}
      onTouchStart={(e) => {
        // helps reduce long-press save on mobile Safari/Chrome
        // (not perfect, but worth it)
        e.preventDefault();
      }}
      style={{ WebkitTouchCallout: "none" as any }}
      aria-label={alt}
    >
      {/* Rendered as background to reduce "save image" affordances */}
      <div
        className="h-full w-full bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url("${src}")`,
          WebkitUserDrag: "none" as any,
          userSelect: "none",
        }}
      />

      {/* Glass overlay: catches interactions, keeps it view-only */}
      <div className="absolute inset-0" aria-hidden="true" />
    </div>
  );
}

