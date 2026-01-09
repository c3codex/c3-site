import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ReturnGlyph from "@/components/measures/ReturnGlyph";
import { MEASURES_ASSETS } from "@/pages/measures/measuresAssets";

type GateId = "gate1" | "gate2" | "gate3" | "gate4" | "gate5" | "gate6" | "gate7";

const AUTO_STATIC_AFTER_MS = 5000;

// Gate 1 attribute text (you asked this to appear after settle)
const GATE_ATTRIBUTES: Record<string, { title?: string; text: string }> = {
  gate1: {
    title: "Gate 1 — Inanna Queen of Heaven and Earth",
    text:
      "From the Great Above she opened her ear to the Great Below.\n" +
      "Inanna abandoned heaven and earth to descend to the underworld,\n" +
      "and then she prepared herself…",
  },
};

export default function ObsidianGatePlate() {
  const nav = useNavigate();
  
// was: /measures/gates/gate1
const gateRoute = (n: number) => `/measures/gates/${n}`;

  const { gateId } = useParams<{ gateId: string }>();
  const id = (gateId ?? "gate1") as GateId;

  // Right now we only have gate1 wired in assets. Others stay sealed.
  const gate1 = MEASURES_ASSETS.gates?.obsidian?.gate1;

  const enabled = id === "gate1" && !!gate1;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mode, setMode] = useState<"video" | "static">("video");
  const [readyText, setReadyText] = useState(false);

  const stillSrc = useMemo(() => {
    if (!enabled) return "";
    return gate1.still;
  }, [enabled, gate1]);

  const animatedSrc = useMemo(() => {
    if (!enabled) return "";
    return gate1.animated;
  }, [enabled, gate1]);

  const originalSrc = useMemo(() => {
    if (!enabled) return "";
    return gate1.original;
  }, [enabled, gate1]);

  // settle to static after delay
  useEffect(() => {
    if (!enabled) return;

    setMode("video");
    setReadyText(false);

    // slow it down slightly (ceremonial)
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;
    }

    const t = window.setTimeout(() => {
      setMode("static");
      // slight pause before text appears so it feels like a breath
      window.setTimeout(() => setReadyText(true), 380);
    }, AUTO_STATIC_AFTER_MS);

    return () => window.clearTimeout(t);
  }, [enabled, id]);

  // If sealed (gate2..7), show a clean “sealed” plate.
  if (!enabled) {
    return (
      <main className="min-h-screen bg-obsidian px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <ReturnGlyph />
            <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/60">
              obsidian gates — {id}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-black/25 p-10">
            <h1 className="font-serif text-3xl text-stone-100">Sealed</h1>
            <p className="mt-3 font-sans text-sm text-stone-400 max-w-2xl">
              This gate is not open yet. Return to the index and proceed in order.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => nav("/measures/gates")}
                className="rounded-full border border-white/15 bg-black/20 px-5 py-2
                           font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/80
                           hover:text-stone-100 hover:border-white/25 transition"
              >
                back to index
              </button>
              <button
                onClick={() => nav("/measures")}
                className="rounded-full border border-white/10 bg-black/10 px-5 py-2
                           font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/70
                           hover:text-stone-100 hover:border-white/20 transition"
              >
                temple home
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const attribute = GATE_ATTRIBUTES[id] ?? GATE_ATTRIBUTES["gate1"];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-obsidian">
      {/* Top bar */}
      <div className="relative z-20 px-6 pt-10">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <ReturnGlyph />
          <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/60">
            obsidian gates — {id}
          </div>
        </div>
      </div>

      {/* Stage */}
      <div className="relative z-10 mt-6 px-6 pb-14">
        <div className="mx-auto max-w-6xl">
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20"
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* square stage */}
            <div className="relative aspect-square w-full">
              {/* video */}
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src={animatedSrc} type="video/mp4" />
              </video>

              {/* static overlay */}
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                  mode === "static" ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={stillSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* subtle vignette */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.00),rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.80)_100%)]" />
            </div>

            {/* Text + actions (appear after settle) */}
            <div className="relative px-6 md:px-10 py-10">
              <div
                className={`transition-opacity duration-700 ${
                  readyText ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/55">
                  attribute
                </div>

                {attribute.title ? (
                  <h1 className="mt-3 font-serif text-3xl text-stone-100">
                    {attribute.title}
                  </h1>
                ) : null}

                <p className="mt-4 font-sans text-sm md:text-base text-stone-300/85 whitespace-pre-line max-w-3xl">
                  {attribute.text}
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => nav("/measures/gates/1")}
                    className="rounded-full border border-white/15 bg-black/25 px-6 py-3
                               font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/80
                               hover:text-stone-100 hover:border-white/25 transition"
                  >
                    open plate
                  </button>

                  <button
                    type="button"
                    onClick={() => nav("/measures/gates")}
                    className="rounded-full border border-white/10 bg-black/10 px-6 py-3
                               font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/70
                               hover:text-stone-100 hover:border-white/20 transition"
                  >
                    back to index
                  </button>
                </div>

                {/* Nested original (soft-protected: no drag, no context menu) */}
                <div className="mt-12">
                  <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/40">
                    original (nested)
                  </div>

                  <div
                    className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black/15"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <img
                      src={originalSrc}
                      alt=""
                      draggable={false}
                      className="w-full h-auto block opacity-95"
                    />
                  </div>

                  <p className="mt-3 font-sans text-xs text-stone-400 max-w-3xl">
                    (Viewing only.) This work remains protected in the field.
                  </p>
                </div>
              </div>

              {!readyText ? (
                <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/35">
                  settling…
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
