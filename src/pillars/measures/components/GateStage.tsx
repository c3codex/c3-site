// src/pillars/measures/components/GateStage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SyndrosReturnGlyph from "@/components/ui/SyndrosReturnGlyph";

type EnableMode = "all" | "gate1Only";

export type GateStageProps = {
  titleLine1: string;
  titleLine2?: string;
  hoverInvocation?: string;

  animatedSrc: string;
  stillSrc: string;

  indexCount: number;
  plateRouteBase: string; // e.g. "/measures/gates"

  autoRevealAfterMs?: number; // e.g. 9000
  enableMode?: EnableMode; // e.g. "gate1Only"
};

type GateId = `gate${1 | 2 | 3 | 4 | 5 | 6 | 7}`;

export default function GateStage({
  titleLine1,
  titleLine2,
  hoverInvocation,

  animatedSrc,
  stillSrc,

  indexCount,
  plateRouteBase,

  autoRevealAfterMs = 9000,
  enableMode = "all",
}: GateStageProps) {
  const nav = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [settled, setSettled] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState<GateId | null>(null);

  const gates = useMemo(() => {
    const ids: GateId[] = [];
    const n = Math.max(1, Math.min(7, indexCount));
    for (let i = 1; i <= n; i++) ids.push(`gate${i}` as GateId);
    return ids;
  }, [indexCount]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = 0.85;

    const t = window.setTimeout(() => {
      setSettled(true);
      setRevealed(true);
    }, autoRevealAfterMs);

    return () => window.clearTimeout(t);
  }, [autoRevealAfterMs]);

  const isEnabled = (id: GateId) => {
    if (enableMode === "all") return true;
    return id === "gate1";
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-obsidian">
      {/* top bar */}
      <div className="relative z-30 px-6 pt-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <SyndrosReturnGlyph />
          <div className="text-right">
            <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/60">
              {titleLine1}
            </div>
            {titleLine2 ? (
              <div className="mt-1 font-sans text-[10px] tracking-[0.30em] uppercase text-stone-200/40">
                {titleLine2}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* stage */}
      <div className="relative z-10 mt-6 px-6 pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <div className="relative aspect-square w-full">
              {/* animated */}
              <video
                ref={videoRef}
                className={[
                  "absolute inset-0 h-full w-full object-contain",
                  "transition-opacity duration-700",
                  settled ? "opacity-0" : "opacity-100",
                ].join(" ")}
                autoPlay
                muted
                playsInline
                preload="auto"
                loop={false}
              >
                <source src={animatedSrc} type="video/mp4" />
              </video>

              {/* still */}
              <img
                src={stillSrc}
                alt=""
                className={[
                  "absolute inset-0 h-full w-full object-contain",
                  "transition-opacity duration-700",
                  settled ? "opacity-100" : "opacity-0",
                ].join(" ")}
                draggable={false}
              />

              {/* vignette */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.00),rgba(0,0,0,0.60)_70%,rgba(0,0,0,0.90)_100%)]" />

              {/* hover invocation */}
              {hoverInvocation ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-5 text-center">
                  <span
                    className="rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur
                               font-sans text-[10px] tracking-[0.32em] uppercase text-stone-200/55"
                  >
                    {hoverInvocation}
                  </span>
                </div>
              ) : null}
            </div>

            {/* index reveal */}
            <div className="px-6 py-10 md:px-10">
              {!revealed ? (
                <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/35">
                  settling…
                </div>
              ) : (
                <>
                  <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/55">
                    index
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {gates.map((id) => {
                      const enabled = isEnabled(id);

                      return (
                        <button
                          key={id}
                          type="button"
                          disabled={!enabled}
                          onMouseEnter={() => setActive(id)}
                          onMouseLeave={() => setActive(null)}
                          onFocus={() => setActive(id)}
                          onBlur={() => setActive(null)}
                          onClick={() => nav(`${plateRouteBase}/${id}`)}
                          className={[
                            "relative rounded-xl border bg-black/10 px-4 py-4 text-left transition",
                            enabled
                              ? "border-white/10 hover:border-white/20"
                              : "cursor-not-allowed border-white/5 opacity-50",
                          ].join(" ")}
                        >
                          <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/75">
                            {id.replace("gate", "gate ")}
                          </div>
                          <div className="mt-2 font-sans text-[10px] tracking-[0.30em] uppercase text-stone-200/40">
                            {enabled ? "open" : "sealed"}
                          </div>

                          {active === id && enabled ? (
                            <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.10)]" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* back to temple */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => nav("/measures")}
              className="rounded-full border border-white/12 bg-black/10 px-6 py-3
                         font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/70
                         transition hover:border-white/20 hover:text-stone-100"
            >
              return to temple
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
