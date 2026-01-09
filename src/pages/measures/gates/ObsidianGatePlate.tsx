import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ReturnGlyph from "@/components/measures/ReturnGlyph";
import ClickToViewReveal from "@/components/measures/ClickToReveal";
import { MEASURES_ASSETS } from "@/pages/measures/measuresAssets";
import ClickToReveal from "@/components/measures/ClickToReveal";

type GateId =
  | "gate1"
  | "gate2"
  | "gate3"
  | "gate4"
  | "gate5"
  | "gate6"
  | "gate7";

const AUTO_STATIC_AFTER_MS = 5000;

// Gate attribute text (shown after settle)
const GATE_ATTRIBUTES: Partial<Record<GateId, { title?: string; text: string }>> =
  {
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
  const { gateId } = useParams<{ gateId: string }>();
  const id = (gateId ?? "gate1") as GateId;

  // Correct asset location: gates.obsidian.plates[gateId]
  const plate =
    MEASURES_ASSETS.gates.obsidian.plates[
      id as keyof typeof MEASURES_ASSETS.gates.obsidian.plates
    ] ?? null;

  // For now, only gate1 is open until you populate the rest
  const enabled = id === "gate1" && !!plate;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mode, setMode] = useState<"video" | "static">("video");
  const [readyText, setReadyText] = useState(false);

  const animatedSrc = useMemo(
    () => (enabled && plate?.animated ? plate.animated : ""),
    [enabled, plate]
  );

  const stillSrc = useMemo(
    () => (enabled && plate?.still ? plate.still : ""),
    [enabled, plate]
  );

  const originalSrc = useMemo(
    () => (enabled && plate?.original ? plate.original : ""),
    [enabled, plate]
  );

  // Animated (autoplay once) -> after 5s: pause/reset video + fade to static -> text appears
  useEffect(() => {
    if (!enabled) return;

    setMode("video");
    setReadyText(false);

    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85;

      // restart clean
      try {
        videoRef.current.currentTime = 0;
        void videoRef.current.play();
      } catch {
        // ignore autoplay edge cases
      }
    }

    const t = window.setTimeout(() => {
      // stop the video once we go static (so it doesn't run behind the veil)
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }

      setMode("static");
      window.setTimeout(() => setReadyText(true), 380);
    }, AUTO_STATIC_AFTER_MS);

    return () => window.clearTimeout(t);
  }, [enabled, id]);

  // Sealed view for gates not yet populated
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
              This gate is not open yet. Return to the index and proceed in
              order.
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
              {/* animated reveal */}
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-contain"
                autoPlay
                muted
                playsInline
                preload="auto"
                loop={false}
                controls={false}
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

                {attribute?.title ? (
                  <h1 className="mt-3 font-serif text-3xl text-stone-100">
                    {attribute.title}
                  </h1>
                ) : null}

                {attribute?.text ? (
                  <p className="mt-4 font-sans text-sm md:text-base text-stone-300/85 whitespace-pre-line max-w-3xl">
                    {attribute.text}
                  </p>
                ) : null}

                <div className="mt-10 flex flex-wrap gap-3">
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

                {/* Nested original — click-to-view with close/re-veil */}
                {originalSrc ? (
                  <ClickToReveal
                    src={originalSrc}
                    label="original (nested)"
                    openTitle="Nested view"
                    openBody="Tap to reveal the original plate."
                    confirmOpenBody="Tap again to reveal."
                    closeTitle="Close view"
                    closeBody="Tap to veil again."
                    confirmCloseBody="Tap again to close."
                    aspect="aspect-square"
                  />
                ) : null}
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
