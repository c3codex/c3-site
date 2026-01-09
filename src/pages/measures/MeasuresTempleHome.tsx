import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MEASURES_ASSETS } from "@/pages/measures/measuresAssets";

const AUTO_STATIC_AFTER = 5000;

// staged timing per zone (ms)
const ZONE_TIMING = {
  gates: { showRing: 120, showLabel: 420 },
  epithets: { showRing: 120, showLabel: 420 },
  mes: { showRing: 120, showLabel: 420 },
  exit: { showRing: 120, showLabel: 700 }, // linger a touch longer
} as const;

type ZoneId = keyof typeof ZONE_TIMING;

export default function TempleHome() {
  const nav = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [mode, setMode] = useState<"video" | "static">("video");

  const [activeZone, setActiveZone] = useState<ZoneId | null>(null);
  const [ringOn, setRingOn] = useState<Record<ZoneId, boolean>>({
    gates: false,
    epithets: false,
    mes: false,
    exit: false,
  });
  const [labelOn, setLabelOn] = useState<Record<ZoneId, boolean>>({
    gates: false,
    epithets: false,
    mes: false,
    exit: false,
  });

  const timers = useRef<number[]>([]);
  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  // auto swap to static after a few seconds
  useEffect(() => {
    const t = window.setTimeout(() => setMode("static"), AUTO_STATIC_AFTER);
    return () => window.clearTimeout(t);
  }, []);

  // ceremonial slow
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = 0.8;
  }, []);

  // pause video once static arrives
  useEffect(() => {
    if (mode === "static") videoRef.current?.pause();
  }, [mode]);

  const beginZone = (id: ZoneId) => {
    if (mode !== "static") return;
    clearTimers();
    setActiveZone(id);

    const t1 = window.setTimeout(() => {
      setRingOn((s) => ({ ...s, [id]: true }));
    }, ZONE_TIMING[id].showRing);

    const t2 = window.setTimeout(() => {
      setLabelOn((s) => ({ ...s, [id]: true }));
    }, ZONE_TIMING[id].showLabel);

    timers.current.push(t1, t2);
  };

  const endZone = (id: ZoneId) => {
    clearTimers();
    setActiveZone((cur) => (cur === id ? null : cur));
    setRingOn((s) => ({ ...s, [id]: false }));
    setLabelOn((s) => ({ ...s, [id]: false }));
  };

  const isStatic = mode === "static";

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-obsidian">
      {/* STAGE (square, large) */}
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
            <source src={MEASURES_ASSETS.temple.animated} type="video/mp4" />
          </video>

          {/* static overlay */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
              isStatic ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={MEASURES_ASSETS.temple.still}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>

        {/* vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,0,0,0.00),rgba(0,0,0,0.50)_72%,rgba(0,0,0,0.86)_100%)]" />
      </div>

      {/* ZONES (only active in static mode) */}
      <div className="relative z-10 min-h-screen">
        {/* ZONE WRAPPER aligned to the stage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative aspect-square h-[96vh] max-h-[96vh] w-[min(96vh,98vw)]">
            {/* TOP: Obsidian Gate */}
            <div
              className={`${isStatic ? "pointer-events-auto" : "pointer-events-none"}
                          absolute left-1/2 -translate-x-1/2 top-[10%] w-[42%] h-[14%]`}
              onMouseEnter={() => beginZone("gates")}
              onMouseLeave={() => endZone("gates")}
            >
              <ZonePill
                ringOn={ringOn.gates}
                labelOn={labelOn.gates}
                label="enter obsidian gate"
                tone="obsidian"
                onClick={() => nav("/measures/gates")}
              />
            </div>

            {/* LEFT: Crystal Gate */}
            <div
              className={`${isStatic ? "pointer-events-auto" : "pointer-events-none"}
                          absolute left-[6%] top-1/2 -translate-y-1/2 w-[18%] h-[40%]`}
              onMouseEnter={() => beginZone("epithets")}
              onMouseLeave={() => endZone("epithets")}
            >
              <ZoneRail
                ringOn={ringOn.epithets}
                labelOn={labelOn.epithets}
                label="crystal epithets"
                tone="crystal"
                onClick={() => nav("/measures/epithets")}
              />
            </div>

            {/* RIGHT: Marble Gate */}
            <div
              className={`${isStatic ? "pointer-events-auto" : "pointer-events-none"}
                          absolute right-[6%] top-1/2 -translate-y-1/2 w-[18%] h-[40%]`}
              onMouseEnter={() => beginZone("mes")}
              onMouseLeave={() => endZone("mes")}
            >
              <ZoneRail
                ringOn={ringOn.mes}
                labelOn={labelOn.mes}
                label="marble mEs"
                tone="marble"
                onClick={() => nav("/measures/mes")}
              />
            </div>

            {/* CENTER ALTAR EXIT (Portal) */}
            <div
              className={`${isStatic ? "pointer-events-auto" : "pointer-events-none"}
                          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                          h-[22%] w-[22%]`}
              onMouseEnter={() => beginZone("exit")}
              onMouseLeave={() => endZone("exit")}
            >
              <button
                type="button"
                onClick={() => nav("/")}
                className="absolute inset-0"
                aria-label="Exit temple to Portal"
              >
                {/* ring 1 */}
                <div
                  className={`pointer-events-none absolute inset-0 transition-all duration-300 ${
                    ringOn.exit ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <div className="absolute inset-0 rounded-full border border-[rgba(120,190,255,0.25)] bg-black/10 backdrop-blur-[1px]" />
                  <div className="absolute inset-0 rounded-full shadow-[0_0_55px_rgba(80,140,255,0.14)]" />
                </div>

                {/* ring 2 (linger) */}
                <div
                  className={`pointer-events-none absolute -inset-5 transition-all duration-500 ${
                    labelOn.exit ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <div className="absolute inset-0 rounded-full border border-[rgba(45,212,191,0.18)]" />
                  <div className="absolute inset-0 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(45,212,191,0.10),transparent_65%)]" />
                </div>

                {/* label (ritual quiet) */}
                <div
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                    labelOn.exit ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-center px-2">
                    <div className="font-sans text-[10px] tracking-[0.34em] uppercase text-stone-200/70">
                      return to portal
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* passive hint */}
            <div
              className={`pointer-events-none absolute left-0 right-0 bottom-3 text-center transition-opacity duration-300 ${
                isStatic && !activeZone ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="font-sans text-[10px] tracking-[0.32em] uppercase text-stone-200/40">
                Enter a gate to begin
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Top “pill” zone */
function ZonePill({
  ringOn,
  labelOn,
  label,
  tone,
  onClick,
}: {
  ringOn: boolean;
  labelOn: boolean;
  label: string;
  tone: "obsidian" | "crystal" | "marble";
  onClick: () => void;
}) {
  const border =
    tone === "obsidian"
      ? "border-white/10"
      : tone === "crystal"
      ? "border-[rgba(45,212,191,0.22)]"
      : "border-[rgba(230,230,230,0.16)]";

  const glow =
    tone === "obsidian"
      ? "shadow-[0_0_55px_rgba(255,255,255,0.06)]"
      : tone === "crystal"
      ? "shadow-[0_0_60px_rgba(45,212,191,0.14)]"
      : "shadow-[0_0_60px_rgba(230,230,230,0.10)]";

  return (
    <button type="button" onClick={onClick} className="absolute inset-0">
      <div
        className={`pointer-events-none absolute inset-0 rounded-[999px] transition-all duration-300 ${
          ringOn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className={`absolute inset-0 rounded-[999px] border ${border} bg-black/12 backdrop-blur-[1px]`} />
        <div className={`absolute inset-0 rounded-[999px] ${glow}`} />
      </div>

      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          labelOn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="rounded-full border border-white/10 bg-black/25 px-5 py-2 backdrop-blur">
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/80">
            {label}
          </span>
        </div>
      </div>
    </button>
  );
}

/** Side “rail” zones */
function ZoneRail({
  ringOn,
  labelOn,
  label,
  tone,
  onClick,
}: {
  ringOn: boolean;
  labelOn: boolean;
  label: string;
  tone: "obsidian" | "crystal" | "marble";
  onClick: () => void;
}) {
  const border =
    tone === "crystal"
      ? "border-[rgba(45,212,191,0.18)]"
      : tone === "marble"
      ? "border-white/10"
      : "border-white/8";

  const glow =
    tone === "crystal"
      ? "shadow-[0_0_60px_rgba(45,212,191,0.10)]"
      : tone === "marble"
      ? "shadow-[0_0_60px_rgba(230,230,230,0.08)]"
      : "shadow-[0_0_55px_rgba(255,255,255,0.05)]";

  return (
    <button type="button" onClick={onClick} className="absolute inset-0">
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl transition-all duration-300 ${
          ringOn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className={`absolute inset-0 rounded-2xl border ${border} bg-black/10 backdrop-blur-[1px]`} />
        <div className={`absolute inset-0 rounded-2xl ${glow}`} />
      </div>

      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          labelOn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur">
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/75">
            {label}
          </span>
        </div>
      </div>
    </button>
  );
}
