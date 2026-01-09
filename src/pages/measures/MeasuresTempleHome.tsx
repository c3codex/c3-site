// src/pages/measures/MeasuresTempleHome.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MEASURES_ASSETS } from "@/pages/measures/measuresAssets";

const AUTO_STATIC_AFTER = 5000;

// localStorage key so temple animation doesn't replay every return
const TEMPLE_SEEN_KEY = "measures:temple_seen";

// staged timing per zone (ms)
const ZONE_TIMING = {
  gates: { showRing: 120, showLabel: 420 },
  epithets: { showRing: 120, showLabel: 420 },
  mes: { showRing: 120, showLabel: 420 },
  exit: { showRing: 120, showLabel: 520 }, // gentle linger
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

  // ceremonial slow
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = 0.8;
  }, []);

  // FIRST LOAD vs RETURN:
  // - if temple was seen before, jump straight to static (no replay)
  // - otherwise play once, then swap to static and persist "seen"
  useEffect(() => {
    const seen = window.localStorage.getItem(TEMPLE_SEEN_KEY) === "1";

    if (seen) {
      setMode("static");
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      return;
    }

    const t = window.setTimeout(() => {
      setMode("static");
      window.localStorage.setItem(TEMPLE_SEEN_KEY, "1");
    }, AUTO_STATIC_AFTER);

    return () => window.clearTimeout(t);
  }, []);

  // pause + reset video once static arrives
  useEffect(() => {
    if (!videoRef.current) return;

    if (mode === "static") {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    } else {
      videoRef.current.play().catch(() => {});
    }
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
      {/* LOCATION / WHERE AM I (only after settle) */}
      <div
        className={`absolute left-5 top-5 z-30 transition-opacity duration-300 ${
          isStatic ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur">
          <span className="font-sans text-[10px] tracking-[0.34em] uppercase text-stone-200/70">
            measures temple — choose a threshold
          </span>
        </div>
      </div>

      {/* STAGE */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-square h-[98vh] max-h-[98vh] w-[min(98vh,98vw)]">
          {/* video */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-contain"
            autoPlay
            muted
            loop={false}
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,0,0,0.00),rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.86)_100%)]" />
      </div>

      {/* ZONES */}
      <div className="relative z-10 min-h-screen">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative aspect-square h-[96vh] max-h-[96vh] w-[min(96vh,98vw)]">
            {/* TOP — Obsidian */}
            <div
              className={`${
                isStatic ? "pointer-events-auto" : "pointer-events-none"
              } absolute left-1/2 -translate-x-1/2 top-[8%] w-[44%] h-[16%]`}
              onMouseEnter={() => beginZone("gates")}
              onMouseLeave={() => endZone("gates")}
            >
              <ZonePill
                ringOn={ringOn.gates}
                labelOn={labelOn.gates}
                label="enter obsidian gates"
                onClick={() =>
                  nav("/measures/frontmatter", {
                    state: { next: "/measures/gates" },
                  })
                }
              />
            </div>

            {/* LEFT — Crystal */}
            <div
              className={`${
                isStatic ? "pointer-events-auto" : "pointer-events-none"
              } absolute left-[6%] top-1/2 -translate-y-1/2 w-[18%] h-[42%]`}
              onMouseEnter={() => beginZone("epithets")}
              onMouseLeave={() => endZone("epithets")}
            >
              <ZoneRail
                ringOn={ringOn.epithets}
                labelOn={labelOn.epithets}
                label="crystal epithets"
                onClick={() => nav("/measures/epithets")}
              />
            </div>

            {/* RIGHT — Marble */}
            <div
              className={`${
                isStatic ? "pointer-events-auto" : "pointer-events-none"
              } absolute right-[6%] top-1/2 -translate-y-1/2 w-[18%] h-[42%]`}
              onMouseEnter={() => beginZone("mes")}
              onMouseLeave={() => endZone("mes")}
            >
              <ZoneRail
                ringOn={ringOn.mes}
                labelOn={labelOn.mes}
                label="marble mEs"
                onClick={() => nav("/measures/mes")}
              />
            </div>

            {/* BOTTOM — Return to Portal */}
            <div
              className={`${
                isStatic ? "pointer-events-auto" : "pointer-events-none"
              } absolute left-1/2 -translate-x-1/2 bottom-[6%] w-[34%] h-[12%]`}
              onMouseEnter={() => beginZone("exit")}
              onMouseLeave={() => endZone("exit")}
            >
              <ZonePill
                ringOn={ringOn.exit}
                labelOn={labelOn.exit}
                label="return to portal"
                onClick={() => nav("/")}
              />
            </div>

            {/* passive hint */}
            <div
              className={`pointer-events-none absolute left-0 right-0 bottom-2 text-center transition-opacity duration-300 ${
                isStatic && !activeZone ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="font-sans text-[10px] tracking-[0.32em] uppercase text-stone-200/40">
                hover a threshold to reveal it
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Pill zone (top + bottom) */
function ZonePill({
  ringOn,
  labelOn,
  label,
  onClick,
}: {
  ringOn: boolean;
  labelOn: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="absolute inset-0">
      <div
        className={`pointer-events-none absolute inset-0 rounded-full transition-all duration-300 ${
          ringOn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 rounded-full border border-white/10 bg-black/15 backdrop-blur" />
        <div className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(255,255,255,0.08)]" />
      </div>

      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          labelOn ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/85">
          {label}
        </span>
      </div>
    </button>
  );
}

/** Side rails */
function ZoneRail({
  ringOn,
  labelOn,
  label,
  onClick,
}: {
  ringOn: boolean;
  labelOn: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="absolute inset-0">
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl transition-all duration-300 ${
          ringOn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 rounded-2xl border border-white/10 bg-black/10 backdrop-blur" />
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_60px_rgba(255,255,255,0.06)]" />
      </div>

      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          labelOn ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/75">
          {label}
        </span>
      </div>
    </button>
  );
}
