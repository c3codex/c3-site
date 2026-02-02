// src/pillars/measures/gates/ObsidianGatePlate.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MEASURES_ASSETS } from "@/pillars/measures/measuresAssets";
import MeasuresReturnGlyph from "@/pillars/measures/components/MeasuresReturnGlyph";

import AspectEdgeLayer from "@/pillars/measures/components/aspects/AspectEdgeLayer";
import { queenOfHeavenAspects } from "@/pillars/measures/data/queenOfHeavenAspects";

import { useMeasuresAudioBus } from "@/pillars/measures/audio/MeasuresAudioBusProvider";

const AUTO_STATIC_AFTER_MS = 5200; // video -> begin fade
const FADE_MS = 900; // crossfade duration
const ENCOUNTER_PAUSE_MS = 900; // beat before plaques open
const PLAQUE_OPEN_DELAY_MS = AUTO_STATIC_AFTER_MS + ENCOUNTER_PAUSE_MS;

export default function ObsidianGatePlate() {
  const nav = useNavigate();
  const { gateId } = useParams<{ gateId?: string }>();

  const bus = useMeasuresAudioBus();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [mediaMode, setMediaMode] = useState<"animated" | "still">("animated");
  const [showStill, setShowStill] = useState(false);
  const [videoFading, setVideoFading] = useState(false);

  const [plaqueOpen, setPlaqueOpen] = useState(false);
  const [plaqueMinimized, setPlaqueMinimized] = useState(false);

  // toggle for edge aspects via Syndros guide glyph
  const [aspectsOn, setAspectsOn] = useState(false);

  // 🔁 Plate selection (right now only gate0 exists)
  // When you add more plates, switch on gateId here.
  const plate = MEASURES_ASSETS.kumurrah.plates.gate0;

  // ✅ ROUTES: aligned to MeasuresShell:
  // <Route path="gates/:gateId" element={<ObsidianGatePlate />} />
  const continueTo = "/measures/gates/gate1";

  // --- AUDIO: keep obsidian bed active through plates, duck during plaque ---
  useEffect(() => {
    bus.setObsidianActive(true);
    return () => {
      // don’t hard-stop here; Temple/Exhibition should explicitly turn it off.
      bus.restore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (plaqueOpen && !plaqueMinimized) bus.duck();
    else bus.restore();
  }, [plaqueOpen, plaqueMinimized, bus]);

  // --- media timing: video -> still, then plaques open ---
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = 0.85;

    const t1 = window.setTimeout(() => {
      setShowStill(true);
      setVideoFading(true);

      window.setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
        setMediaMode("still");
      }, FADE_MS);
    }, AUTO_STATIC_AFTER_MS);

    const t2 = window.setTimeout(() => {
      setPlaqueOpen(true);
      setPlaqueMinimized(false);
      requestAnimationFrame(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      });
    }, PLAQUE_OPEN_DELAY_MS);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const showContinueOnMedia = plaqueOpen && plaqueMinimized;

  // Syndros guide glyph asset
  const syndrosThumb = MEASURES_ASSETS.syndros?.thumb ?? null;

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      {/* MEDIA STACK: cover background + contain foreground, crossfade video->still */}
      <div className="absolute inset-0">
        {/* Background fill (always cover) using still, blurred */}
        <img
          src={plate.still}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover select-none"
          style={{
            filter: "blur(18px) saturate(1.05)",
            transform: "scale(1.06)",
            opacity: 0.35,
          }}
        />
        <div className="absolute inset-0 bg-black/35" />

        {/* Foreground true frame (always contain) */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Still fades in under video */}
          <img
            src={plate.still}
            alt="Obsidian Gate Plate"
            draggable={false}
            className="h-full w-full object-contain select-none"
            style={{
              opacity: showStill || mediaMode === "still" ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease`,
            }}
          />

          {/* Video fades out above still */}
          {mediaMode === "animated" && (
            <video
              ref={videoRef}
              src={plate.animated}
              autoPlay
              muted
              playsInline
              preload="auto"
              poster={plate.still}
              className="absolute inset-0 h-full w-full object-contain"
              style={{
                opacity: videoFading ? 0 : 1,
                transition: `opacity ${FADE_MS}ms ease`,
              }}
            />
          )}
        </div>

        {/* Vignette for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.78) 100%)",
          }}
        />
      </div>

      {/* EDGE ASPECTS (toggled by Syndros guide) */}
      <AspectEdgeLayer aspects={queenOfHeavenAspects} enabled={aspectsOn} />

      {/* RETURN GLYPH (Measures) */}
      <div className="absolute top-5 right-5 z-30">
        <MeasuresReturnGlyph to="/measures" ariaLabel="Return to Temple" />
      </div>

      {/* MEDIA CONTROLS: Open Text + Continue (when minimized) */}
      <div className="absolute bottom-6 left-6 z-30 flex items-center gap-3">
        {!plaqueOpen || plaqueMinimized ? (
          <button
            type="button"
            onClick={() => {
              setPlaqueOpen(true);
              setPlaqueMinimized(false);
              requestAnimationFrame(() => {
                if (scrollRef.current) scrollRef.current.scrollTop = 0;
              });
            }}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm text-stone-100 backdrop-blur hover:bg-white/15 transition"
          >
            Open Text
          </button>
        ) : null}

        {showContinueOnMedia ? (
          <button
            type="button"
            onClick={() => nav(continueTo)}
            className="rounded-xl bg-white/15 px-4 py-2 text-sm text-stone-100 backdrop-blur hover:bg-white/20 transition"
          >
            Continue Descent
          </button>
        ) : null}
      </div>

      {/* SYNDROS GUIDE GLYPH (toggles inscriptions / edge aspects) */}
      {syndrosThumb && (
        <div className="absolute bottom-6 right-6 z-[65]">
          <button
            type="button"
            onClick={() => setAspectsOn((v) => !v)}
            aria-label="Reveal inscriptions"
            className="group pointer-events-auto"
          >
            <img
              src={syndrosThumb}
              alt=""
              draggable={false}
              className={[
                "h-10 w-10 transition-opacity duration-500",
                aspectsOn ? "opacity-85" : "opacity-55",
                "group-hover:opacity-100 animate-pulse",
              ].join(" ")}
            />
          </button>
        </div>
      )}

      {/* PLAQUE OVERLAY (less opaque + not full-page, so it doesn't cut the art) */}
      {plaqueOpen && !plaqueMinimized && (
        <div className="absolute inset-x-0 bottom-8 z-40 px-4 pointer-events-none">
          <div
            className="
              pointer-events-auto
              mx-auto
              w-full
              max-w-2xl
              rounded-2xl
              border border-white/10
              bg-black/28
              backdrop-blur-lg
              shadow-[0_16px_60px_rgba(0,0,0,0.45)]
              overflow-hidden
            "
          >
            {/* plaque header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="text-xs uppercase tracking-[0.3em] text-stone-200/90">
                Queen of Heaven
              </div>

              <button
                type="button"
                onClick={() => setPlaqueMinimized(true)}
                className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-stone-100 hover:bg-white/15 transition"
              >
                Close Text
              </button>
            </div>

            {/* scroll body */}
            <div
              ref={scrollRef}
              className="px-5 py-5 text-stone-100/90 overflow-y-auto"
              style={{ maxHeight: "42svh" }}
            >
              <div className="space-y-4 text-center leading-relaxed">
                <p>
                  With the <em>me</em> in her possession, she prepared herself:
                </p>

                <p>
                  She placed the <strong>shugurra</strong>, the crown of the steppe, on her head.
                  <br />
                  She arranged the dark locks of hair across her forehead.
                  <br />
                  She tied the small lapis beads around her neck.
                </p>

                <p>
                  Let the double strand of beads fall to her breast,
                  <br />
                  And wrapped the royal robe around her body.
                </p>

                <p>
                  She daubed her eyes with ointment called
                  <br />
                  <em>“let him come, let him come.”</em>
                </p>

                <p>
                  Bound the breast plate called
                  <br />
                  <em>“Come, man, come!”</em>
                  <br />
                  around her chest,
                </p>

                <p>
                  Slipped the gold ring over her wrist,
                  <br />
                  And took the lapis measuring rod and line in her hand.
                </p>

                <p className="pt-2">Inanna set out for the underworld.</p>

                {/* Continue at end of plaque */}
                <div className="pt-5">
                  <button
                    type="button"
                    onClick={() => nav(continueTo)}
                    className="w-full rounded-xl bg-white/12 px-4 py-3 text-sm text-stone-100 hover:bg-white/18 transition"
                  >
                    Continue Descent
                  </button>
                </div>
              </div>
            </div>

            <div className="h-2 bg-gradient-to-b from-white/5 to-transparent" />
          </div>
        </div>
      )}
    </section>
  );
}
