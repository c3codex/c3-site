// src/components/measures/ClickToReveal.tsx
import React, { useState } from "react";

type Props = {
  src: string;

  // UI copy
  label?: string;

  openTitle?: string;
  openBody?: string;
  confirmOpenBody?: string;

  closeTitle?: string;
  closeBody?: string;
  confirmCloseBody?: string;

  aspect?: string; // e.g. "aspect-square"
};

export default function ClickToReveal({
  src,
  label = "original",
  openTitle = "Reveal",
  openBody = "Tap to prompt the reveal.",
  confirmOpenBody = "Tap again to reveal.",

  closeTitle = "Veil",
  closeBody = "Tap to prompt the veil.",
  confirmCloseBody = "Tap again to close.",

  aspect = "aspect-square",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirming, setConfirming] = useState<"open" | "close" | null>(null);

  const onOpen = () => {
    if (confirming !== "open") {
      setConfirming("open");
      window.setTimeout(() => setConfirming(null), 900);
      return;
    }
    setConfirming(null);
    setIsOpen(true);
  };

  const onClose = () => {
    if (confirming !== "close") {
      setConfirming("close");
      window.setTimeout(() => setConfirming(null), 900);
      return;
    }
    setConfirming(null);
    setIsOpen(false);
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/55">
          {label}
        </div>

        {!isOpen ? (
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full border border-white/10 bg-black/20 px-4 py-2
                       font-sans text-[10px] tracking-[0.32em] uppercase text-stone-200/70
                       hover:text-stone-100 hover:border-white/20 transition"
          >
            open
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-black/20 px-4 py-2
                       font-sans text-[10px] tracking-[0.32em] uppercase text-stone-200/70
                       hover:text-stone-100 hover:border-white/20 transition"
          >
            close
          </button>
        )}
      </div>

      <div className="mt-3 rounded-2xl border border-white/10 bg-black/25 p-5">
        <div className="font-serif text-lg text-stone-100">
          {!isOpen ? openTitle : closeTitle}
        </div>
        <div className="mt-2 font-sans text-sm text-stone-300/80">
          {!isOpen
            ? confirming === "open"
              ? confirmOpenBody
              : openBody
            : confirming === "close"
            ? confirmCloseBody
            : closeBody}
        </div>

        <div className="mt-5">
          {isOpen ? (
            <div
              className={`relative overflow-hidden rounded-xl border border-white/10 bg-black/40 ${aspect}`}
              onContextMenu={(e) => e.preventDefault()}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/10" />
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-black/20 p-6 text-center">
              <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/35">
                veiled
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}