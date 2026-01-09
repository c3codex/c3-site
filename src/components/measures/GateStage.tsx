// src/components/measures/GateStage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReturnGlyph from "@/components/measures/ReturnGlyph";
import { MEASURES_ASSETS, type GateId } from "@/pages/measures/measuresAssets";

type Props = {
  // display
  titleLine1: string;
  titleLine2?: string;

  // optional short line shown while passage plays
  hoverInvocation?: string;

  // media (passage)
  animatedSrc: string; // mp4
  stillSrc: string; // poster/fallback

  // routing
  plateRouteBase: string; // "/measures/gates"

  // index behavior
  indexCount: number; // 7
  indexLabel?: string;

  // autoplay fallback (if onEnded doesn’t fire)
  autoRevealAfterMs?: number; // default 9000

  // enable logic
  enableMode?: "gate1Only" | "hasPlateAssets"; // default "gate1Only"
};

const DEFAULT_REVEAL_MS = 9000;

export default function GateStage({
  titleLine1,
  titleLine2,
  hoverInvocation,
  animatedSrc,
  stillSrc,
  plateRouteBase,
  indexCount,
  indexLabel = "The Seven Gates",
  autoRevealAfterMs = DEFAULT_REVEAL_MS,
  enableMode = "gate1Only",
}: Props) {
  const nav = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [showIndex, setShowIndex] = useState(false);

  // play once then show index
  useEffect(() => {
    setShowIndex(false);

    const v = videoRef.current;
    if (v) {
      try {
        v.currentTime = 0;
      } catch {}
      v.play().catch(() => {});
    }

    const t = window.setTimeout(() => setShowIndex(true), autoRevealAfterMs);
    return () => window.clearTimeout(t);
  }, [animatedSrc, autoRevealAfterMs]);

  const gates = useMemo(() => {
    return Array.from({ length: indexCount }, (_, i) => {
      const n = i + 1;
      const id = (`gate${n}` as GateId);

      const plate = MEASURES_ASSETS.gates.obsidian.plates[id] ?? {};
      const thumb = plate.thumb ?? null;

      const enabled =
        enableMode === "gate1Only"
          ? id === "gate1"
          : Boolean(plate.animated || plate.still || plate.original);

      const to = `${plateRouteBase}/${id}`;

      return { n, id, to, thumb, enabled };
    });
  }, [indexCount, plateRouteBase, enableMode]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-obsidian">
      {/* return glyph */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 opacity-75 hover:opacity-100 transition">
        <ReturnGlyph />
      </div>

      {/* stage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-square h-[98vh] max-h-[98vh] w-[min(98vh,98vw)]">
          {/* passage video */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop={false}
            playsInline
            preload="auto"
            poster={stillSrc}
            onEnded={() => setShowIndex(true)}
          >
            <source src={animatedSrc} type="video/mp4" />
          </video>

          {/* vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,0,0,0.00),rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.86)_100%)]" />

          {/* header */}
          <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 z-20 text-center">
            <div className="font-sans text-[10px] tracking-[0.45em] uppercase text-stone-200/45">
              MEASURES OF INANNA
            </div>
            <div className="mt-2 font-serif text-2xl text-stone-100">
              OBSIDIAN
            </div>
          </div>

          {/* footer title */}
          <div className="pointer-events-none absolute left-1/2 bottom-4 -translate-x-1/2 z-10 text-center">
            <div className="font-sans text-[10px] tracking-[0.36em] uppercase text-stone-200/55">
              {titleLine1}
            </div>
            {titleLine2 ? (
              <div className="mt-1 font-serif text-lg text-stone-100">
                {titleLine2}
              </div>
            ) : null}
          </div>

          {/* while passage plays */}
          {!showIndex ? (
            <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-[min(820px,92vw)] px-6">
              <div className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-sm px-5 py-4 text-center">
                {hoverInvocation ? (
                  <p className="font-serif text-base md:text-lg text-stone-100/90 leading-relaxed">
                    {hoverInvocation}
                  </p>
                ) : null}
                <p className="mt-2 font-sans text-[10px] tracking-[0.32em] uppercase text-stone-200/45">
                  passage opening…
                </p>
              </div>
            </div>
          ) : null}

          {/* INDEX OVERLAY (auto after video) */}
          <div
            className={`absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300 ${
              showIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="w-[min(920px,92vw)] rounded-3xl border border-white/10 bg-black/55 backdrop-blur-md p-6 md:p-8 shadow-[0_0_80px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between">
                <div className="font-sans text-[10px] tracking-[0.36em] uppercase text-stone-200/65">
                  {indexLabel}
                </div>
                <button
                  type="button"
                  onClick={() => setShowIndex(false)}
                  className="rounded-full border border-white/10 bg-black/25 px-4 py-2
                             font-sans text-[10px] tracking-[0.32em] uppercase text-stone-200/65
                             hover:text-stone-100 hover:border-white/20 transition"
                >
                  close
                </button>
              </div>

              <h2 className="mt-6 font-serif text-2xl text-stone-100">
                The Seven Gates
              </h2>
              <p className="mt-2 font-sans text-sm text-stone-400 max-w-2xl">
                Move in order. The gate opens when you arrive.
              </p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {gates.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    disabled={!g.enabled}
                    onClick={() => g.enabled && nav(g.to)}
                    className={`group relative aspect-square rounded-xl border backdrop-blur transition overflow-hidden
                      ${
                        g.enabled
                          ? "border-white/15 bg-black/30 hover:border-white/25"
                          : "border-white/5 bg-black/10 opacity-50 cursor-not-allowed"
                      }`}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    {g.thumb ? (
                      <img
                        src={g.thumb}
                        alt=""
                        draggable={false}
                        className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-100 transition"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_60%)]" />
                    )}

                    <div className="absolute inset-0 bg-black/35" />

                    <div className="absolute left-3 top-3 font-sans text-[10px] tracking-[0.32em] uppercase text-stone-200/75">
                      gate {g.n}
                    </div>

                    <div className="absolute bottom-3 left-3 font-sans text-[10px] tracking-[0.28em] uppercase">
                      {g.enabled ? (
                        <span className="text-stone-200/70">open</span>
                      ) : (
                        <span className="text-stone-200/40">sealed</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => nav("/measures")}
                  className="rounded-full border border-white/10 bg-black/25 px-5 py-2
                             font-sans text-[10px] tracking-[0.32em] uppercase text-stone-200/65
                             hover:text-stone-100 hover:border-white/20 transition"
                >
                  back to temple
                </button>
              </div>
            </div>
          </div>
          {/* END INDEX */}
        </div>
      </div>
    </section>
  );
}
