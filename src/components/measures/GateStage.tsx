import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReturnGlyph from "@/components/measures/ReturnGlyph";
import type { MeasuresSectionId } from "@/pages/measures/measuresAssets";

type Props = {
  section: MeasuresSectionId;

  // display
  titleLine1: string;
  titleLine2?: string;

  // the short “hover invocation” shown on the intro gate (NOT the long attribute)
  hoverInvocation?: string;

  // media
  animatedSrc: string;
  stillSrc: string;

  // index behavior
  indexCount: number; // 7, 9, 13
  plateRouteBase: string; // e.g. "/measures/gates" | "/measures/epithets" | "/measures/mes"
  indexLabel?: string; // optional label above index

  // timing
  autoStaticAfterMs?: number; // default 5000

  // optional: if you want roman numerals for gates
  indexStyle?: "roman" | "arabic";
};

const DEFAULT_AUTO_STATIC = 5000;

function toRoman(n: number) {
  const map: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let x = n;
  let out = "";
  for (const [v, s] of map) {
    while (x >= v) {
      out += s;
      x -= v;
    }
  }
  return out;
}

export default function GateStage({
  section,
  titleLine1,
  titleLine2,
  hoverInvocation,
  animatedSrc,
  stillSrc,
  indexCount,
  plateRouteBase,
  indexLabel,
  autoStaticAfterMs = DEFAULT_AUTO_STATIC,
  indexStyle = "roman",
}: Props) {
  const nav = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [mode, setMode] = useState<"video" | "static">("video");
  const [showIndex, setShowIndex] = useState(false);

  const isStatic = mode === "static";

  // auto switch to static
  useEffect(() => {
    setMode("video");
    setShowIndex(false);

    const t = window.setTimeout(() => setMode("static"), autoStaticAfterMs);
    return () => window.clearTimeout(t);
  }, [autoStaticAfterMs]);

  // pause video in static
  useEffect(() => {
    if (!videoRef.current) return;
    if (mode === "static") videoRef.current.pause();
    else videoRef.current.play().catch(() => {});
  }, [mode]);

  const items = useMemo(() => {
    return Array.from({ length: indexCount }, (_, i) => {
      const num = i + 1;
      const label = indexStyle === "roman" ? toRoman(num) : String(num);
      const to = `${plateRouteBase}/gate${num}`;
      return { num, label, to };
    });
  }, [indexCount, plateRouteBase, indexStyle]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-obsidian">
      {/* top left: return glyph */}
      <div className="absolute top-4 left-4 z-20">
        <ReturnGlyph />
      </div>

      {/* STAGE (square, big) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-square h-[98vh] max-h-[98vh] w-[min(98vh,98vw)]">
          {/* video */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
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
              isStatic ? "opacity-100" : "opacity-0"
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

          {/* vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,0,0,0.00),rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.82)_100%)]" />

          {/* TITLE + hover invocation (only after static) */}
          <div className="absolute inset-0 z-10 flex items-end justify-center pb-10 md:pb-12">
            <div className="group text-center px-6">
              <div className="font-sans text-[10px] tracking-[0.36em] uppercase text-stone-200/60">
                {titleLine1}
              </div>

              {titleLine2 ? (
                <div className="mt-2 font-serif text-xl md:text-2xl text-stone-100">
                  {titleLine2}
                </div>
              ) : null}

              {/* brief invocation appears on hover — only when static and index not open */}
{hoverInvocation && isStatic && !showIndex ? (
  <div
    className="pointer-events-none absolute left-1/2 bottom-10 -translate-x-1/2 w-[min(820px,92vw)]
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    aria-hidden="true"
  >
    <div className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-sm px-5 py-4">
      <p className="font-serif text-base md:text-lg text-stone-100/90 leading-relaxed text-center">
        {hoverInvocation}
      </p>
      <p className="mt-3 font-sans text-[10px] tracking-[0.32em] uppercase text-stone-200/55 text-center">
        click to reveal index
      </p>
    </div>
  </div>
) : null}

            </div>
          </div>

          {/* CLICK LAYER:
              - only active when static
              - first click reveals index
           */}
          <button
            type="button"
            disabled={!isStatic}
            onClick={() => setShowIndex(true)}
            className={`absolute inset-0 z-20 ${
              isStatic && !showIndex ? "cursor-pointer" : "pointer-events-none"
            }`}
            aria-label="Reveal index"
          />

          {/* INDEX OVERLAY */}
          <div
            className={`absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300 ${
              showIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="w-[min(680px,92vw)] rounded-3xl border border-white/10 bg-black/55 backdrop-blur-md p-6 md:p-8 shadow-[0_0_80px_rgba(0,0,0,0.55)]">
              <div className="text-center">
                <div className="font-sans text-[10px] tracking-[0.36em] uppercase text-stone-200/65">
                  {indexLabel ?? (section === "gates" ? "The Seven Gates" : "Index")}
                </div>
                <div className="mt-2 font-serif text-xl md:text-2xl text-stone-100">
                  Choose a threshold
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {items.map((it) => (
                  <button
                    key={it.num}
                    type="button"
                    onClick={() => nav(it.to)}
                    className="group rounded-2xl border border-white/10 bg-black/35 px-3 py-3
                               hover:border-white/20 hover:bg-black/45 transition"
                    aria-label={`Open ${section} gate ${it.num}`}
                  >
                    <div className="font-serif text-lg text-stone-100 group-hover:text-stone-50 transition">
                      {it.label}
                    </div>
                    <div className="mt-1 font-sans text-[9px] tracking-[0.28em] uppercase text-stone-200/45">
                      open
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
