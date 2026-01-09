import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type NavId = "measures" | "c3" | "artists";

type Props = {
  onNavigate: (id: NavId) => void;
};

const HERO_VIDEO =
  "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/Priceless_hero_animated.mp4";

const HERO_STILL =
  "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/hero_image_titled.png";

// timings (ms)
const AUTO_STATIC_AFTER = 5000;

// zone timing (stage1 geometry + stage2 label)
const ZONE_TIMING = {
  measures: { showRing: 220, showLabel: 620 }, // slowest
  c3: { showRing: 140, showLabel: 420 }, // medium
  artists: { showRing: 90, showLabel: 320 }, // quickest
} as const;

// return grace: skip video if already visited this session
const SESSION_KEY = "priceless.hero.seen";

/** LAPIS (tint + glow) */
const LAPIS_BORDER = "rgba(30,90,168,0.35)";
const LAPIS_BORDER_SOFT = "rgba(30,90,168,0.22)";
const LAPIS_GLOW = "rgba(30,90,168,0.22)";
const LAPIS_TEXT = "rgba(159,198,255,0.88)";
const LAPIS_TEXT_STRONG = "rgba(127,178,255,0.95)";

const HeroSection: React.FC<Props> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [mode, setMode] = useState<"video" | "static">("video");
  const [breathPulse, setBreathPulse] = useState(false);

  // zoned hover state (two-stage)
  const [activeZone, setActiveZone] = useState<NavId | null>(null);
  const [ringOn, setRingOn] = useState<Record<NavId, boolean>>({
    measures: false,
    c3: false,
    artists: false,
  });
  const [labelOn, setLabelOn] = useState<Record<NavId, boolean>>({
    measures: false,
    c3: false,
    artists: false,
  });

  const timers = useRef<number[]>([]);
  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  // decide initial mode (return grace)
  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY) === "1";
    if (seen) {
      setMode("static");
      return;
    }

    setMode("video");
    const t = window.setTimeout(() => {
      setMode("static");
      sessionStorage.setItem(SESSION_KEY, "1");
    }, AUTO_STATIC_AFTER);

    return () => window.clearTimeout(t);
  }, []);

  // slow the video
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = 0.6;
  }, []);

  // when entering static: pause video + one-time breath pulse
  useEffect(() => {
    if (mode === "static") {
      videoRef.current?.pause();

      setBreathPulse(true);
      const t = window.setTimeout(() => setBreathPulse(false), 900);
      return () => window.clearTimeout(t);
    } else {
      videoRef.current?.play().catch(() => {});
    }
  }, [mode]);

  // zone helper
  const resetZone = (id: NavId) => {
    setRingOn((s) => ({ ...s, [id]: false }));
    setLabelOn((s) => ({ ...s, [id]: false }));
  };

  const beginZone = (id: NavId) => {
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

  const endZone = (id: NavId) => {
    clearTimers();
    setActiveZone((cur) => (cur === id ? null : cur));
    resetZone(id);
  };

  const isStatic = mode === "static";

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-obsidian cursor-default">
      {/* BACKGROUND MEDIA: CENTERED SQUARE STAGE (prevents cropping) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-square h-[88vh] max-h-[88vh] w-[min(88vh,96vw)]">
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
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>

          {/* static seal overlay */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
              isStatic ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={HERO_STILL}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              draggable={false}
            />
            {/* soft seal glass */}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* stage vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,0,0,0.00),rgba(0,0,0,0.35)_72%,rgba(0,0,0,0.55)_100%)]" />
        </div>
      </div>

      {/* FOREGROUND */}
      <div className="relative z-10 h-full w-full">
        {/* Introducing link (ONLY in static) — moved LEFT */}
        <div
          className={`absolute top-6 left-6 md:top-8 md:left-10 z-30transition-opacity duration-500 ${
            isStatic ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Link
            to="/introducing"
            className="rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur-sm
                       font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/70
                       hover:text-stone-100 hover:border-white/20 transition"
          >
            Introducing Priceless Gallery
          </Link>
        </div>

        {/* One-time breath pulse when static arrives — LAPIS */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            breathPulse ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-[28rem] w-[28rem] md:h-[34rem] md:w-[34rem] rounded-full blur-3xl bg-[radial-gradient(circle,rgba(30,90,168,0.22),transparent_65%)]" />
        </div>

        {/* ZONING: bound to SAME stage box for perfect alignment */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

          <div className="relative aspect-square h-[88vh] max-h-[88vh] w-[min(88vh,96vw)]">
            {/* ABOVE ZONE: c3 */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-[11%] w-[70%] h-[16%]
                          ${isStatic ? "pointer-events-auto" : "pointer-events-none"}`}
              onMouseEnter={() => beginZone("c3")}
              onMouseLeave={() => endZone("c3")}
            >
              {/* geometry response */}
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  ringOn.c3 ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="absolute inset-0 rounded-[999px] border bg-black/10 backdrop-blur-[1px]"
                  style={{ borderColor: LAPIS_BORDER }}
                />
                <div
                  className="absolute inset-0 rounded-[999px]"
                  style={{ boxShadow: `0 0 60px ${LAPIS_GLOW}` }}
                />
              </div>

              {/* label after linger */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                  labelOn.c3 ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onNavigate("c3")}
                  className="cursor-pointer rounded-full border bg-black/25 px-5 py-2 backdrop-blur transition"
                  style={{ borderColor: LAPIS_BORDER_SOFT, color: LAPIS_TEXT }}
                >
                  <span className="font-sans text-[10px] tracking-[0.35em] uppercase">
                    enter c3
                  </span>
                </button>
              </div>
            </div>

            {/* CENTER ZONE: Measures (tight diamond) */}
            <div
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                          h-[34%] w-[34%]
                          ${isStatic ? "pointer-events-auto" : "pointer-events-none"}`}
              onMouseEnter={() => beginZone("measures")}
              onMouseLeave={() => endZone("measures")}
            >
              <button
                type="button"
                onClick={() => onNavigate("measures")}
                className="absolute inset-0 cursor-pointer"
                aria-label="Enter Measures of Inanna"
              >
                {/* ring response */}
                <div
                  className={`pointer-events-none absolute inset-0 transition-all duration-300 ${
                    ringOn.measures ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <div
                    className="absolute inset-0 rotate-45 border bg-transparent"
                    style={{
                      borderColor: LAPIS_BORDER,
                      boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 0 75px ${LAPIS_GLOW}`,
                    }}
                  />
                  <div
                    className="absolute inset-6 rotate-45 border"
                    style={{ borderColor: LAPIS_BORDER_SOFT }}
                  />
                </div>

                {/* label after linger */}
                <div
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                    labelOn.measures ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-center px-3">
                    <div
                      className="font-sans text-[10px] tracking-[0.35em] uppercase"
                      style={{ color: LAPIS_TEXT_STRONG }}
                    >
                      enter exhibition
                    </div>
                    <div className="mt-2 font-serif text-base md:text-lg text-stone-100">
                    
                      Measures of Inanna
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* BELOW ZONE: Artists’ Gallery */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 bottom-[11%] w-[70%] h-[16%]
                          ${isStatic ? "pointer-events-auto" : "pointer-events-none"}`}
              onMouseEnter={() => beginZone("artists")}
              onMouseLeave={() => endZone("artists")}
            >
              {/* geometry response */}
              <div
                className={`absolute inset-0 transition-all duration-250 ${
                  ringOn.artists ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="absolute inset-0 rounded-[999px] border bg-black/10 backdrop-blur-[1px]"
                  style={{ borderColor: LAPIS_BORDER_SOFT }}
                />
                <div
                  className="absolute inset-0 rounded-[999px]"
                  style={{ boxShadow: `0 0 55px ${LAPIS_GLOW}` }}
                />
              </div>

              {/* label after linger */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                  labelOn.artists ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onNavigate("artists")}
                  className="cursor-pointer rounded-full border bg-black/20 px-5 py-2 backdrop-blur transition"
                  style={{ borderColor: LAPIS_BORDER_SOFT, color: LAPIS_TEXT }}
                >
                  <span className="font-sans text-[10px] tracking-[0.35em] uppercase">
                    enter artists’ gallery
                  </span>
                </button>
              </div>
            </div>

            {/* passive hint (static only, disappears once any zone activates) */}
            <div
              className={`pointer-events-none absolute left-0 right-0 bottom-2 text-center transition-opacity duration-300 ${
                isStatic && !activeZone ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-200/35">
                hover the geometry
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outer vignette to sit in page edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,0,0,0.00),rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.82)_100%)]" />
    </section>
  );
};

export default HeroSection;
