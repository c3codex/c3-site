// src/pillars/measures/gates/ObsidianGateIntro.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MEASURES_ASSETS } from "@/pillars/measures/measuresAssets";
import MeasuresReturnGlyph from "@/pillars/measures/components/MeasuresReturnGlyph";

type PanelMode = "closed" | "open";

const AUTO_STATIC_AFTER_MS = 5000;
const PANEL_DELAY_MS = 4000;

export default function ObsidianGateIntro() {
  const nav = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [mediaMode, setMediaMode] = useState<"video" | "static">("video");
  const [panelMode, setPanelMode] = useState<PanelMode>("closed");

  /* settle subtle motion */
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = 0.9;

    const settle = () => setMediaMode("static");
    const t = window.setTimeout(settle, AUTO_STATIC_AFTER_MS);

    v?.addEventListener("ended", settle);
    v?.addEventListener("error", settle);

    return () => {
      window.clearTimeout(t);
      v?.removeEventListener("ended", settle);
      v?.removeEventListener("error", settle);
    };
  }, []);

  /* open panels after encounter pause */
  useEffect(() => {
    const t = window.setTimeout(() => setPanelMode("open"), PANEL_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  /* ESC collapses panels */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelMode("closed");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);


  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-obsidian">
      {/* HERO MEDIA */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[96svh] w-[min(98vw,1500px)]">
          {mediaMode === "video" && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-contain"
              autoPlay
              muted
              playsInline
              preload="auto"
              loop={false}
            >
              <source src={MEASURES_ASSETS.obsidianEpigraph.animated} type="video/mp4" />
            </video>
          )}

          <img
            src={MEASURES_ASSETS.obsidianEpigraph.still}
            alt="Obsidian Gate — Threshold"
            draggable={false}
            className={[
              "absolute inset-0 h-full w-full object-contain select-none transition-opacity duration-700",
              mediaMode === "static" ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        </div>
      </div>

      {/* VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,0,0,0),rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.88)_100%)]" />

      {/* RETURN TO EXHIBITION */}
      <div className="absolute left-6 top-6 z-40">
        <MeasuresReturnGlyph to="/measures/MeasuresTempleHome" ariaLabel="Return to Exhibition" />
      </div>
]
      {/* HERO CTA WHEN PANELS CLOSED */}
      {panelMode === "closed" && (
        <div className="absolute inset-x-0 bottom-8 z-40 flex justify-center gap-3 px-6">
          <button
            type="button"
            onClick={() => setPanelMode("open")}
            className="min-h-[44px] rounded-full border border-white/14 bg-black/35 px-6 py-3
                       font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/85
                       backdrop-blur-sm transition hover:border-white/28 hover:text-stone-100"
          >
            Expand 
          </button>

          <button
            type="button"
            onClick={() => nav("/measures/gates")}
            className="min-h-[44px] rounded-full border border-white/18 bg-black/35 px-6 py-3
                       font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/85
                       backdrop-blur-sm transition hover:border-white/30 hover:text-stone-100"
          >
            Continue Descent
          </button>
        </div>
      )}

      {/* PANEL CONTAINER  */}
      {panelMode === "open" && (
        <div className="absolute inset-0 z-30 flex justify-center px-4 pt-[96px]">
          <div className="relative w-full max-w-[820px] rounded-2xl border border-white/10 bg-black/55 backdrop-blur-sm shadow-[0_0_60px_rgba(0,0,0,0.55)]">
            {/* COLLAPSE */}
            <button
              type="button"
              onClick={() => setPanelMode("closed")}
              className="absolute right-4 top-4 z-50 min-h-[44px]
                         rounded-full border border-white/20 bg-black/40 px-5 py-2
                         font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/85
                         transition hover:text-stone-100 hover:border-white/30"
            >
              return to threshold
            </button>

            {/* SCROLL AREA */}
            <div className="max-h-[72svh] overflow-y-auto px-6 pb-8 pt-10 md:px-10">
              <div className="space-y-8">
                
                <div className="space-y-10">

  {/* PANEL 0 — THRESHOLD INSCRIPTION */}
  <section>
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <div className="text-center font-serif text-xl text-stone-100">
        𒀭𒈹𒁀𒀭𒌈
        <br />
        𒀭𒋫𒃲𒋫 𒄑𒌆𒃲𒊺
      </div>

      <p className="mt-4 text-center font-serif text-lg text-stone-200">
        From the Great Above
        <br />
        she opened her ear
        <br />
        to the Great Below.
      </p>

      <p className="mt-6 font-sans text-sm leading-relaxed text-stone-200/85">
        This line is among the oldest recorded passages attributed to the Descent of Inanna,
        preserved in Sumerian cuneiform on clay tablets over four thousand years ago.
      </p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
        It does not announce a journey.  
        It marks a decision.
      </p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
        Inanna does not fall.  
        She listens.
      </p>
    </div>
  </section>

  {/* PANEL 1 — HISTORICAL CONTEXT */}
  <section>
    <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
      <div className="font-sans text-[11px] tracking-[0.35em] uppercase text-stone-200/60">
        Inanna and the Descent
      </div>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/90">
        Inanna was one of the central deities of ancient Sumer, governing fertility, sexuality,
        sovereignty, exchange, and transformation. She presided over thresholds: between heaven
        and earth, life and death, power and surrender.
      </p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/85">
        The Descent of Inanna is among the earliest known written narratives in human history.
        It describes a goddess who chooses to descend into the underworld, passing through seven
        gates. At each gate, she is required to remove a symbol of authority, status, or protection.
      </p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
        By the time she reaches the Great Below, nothing remains to shield her.
      </p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
        This is not punishment.  
        It is procedure.
      </p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
        Sumerian culture understood descent not as failure, but as a necessary passage through
        which renewal becomes possible. Transformation required contact with consequence.
        Wisdom required exposure.
      </p>
    </div>
  </section>

  {/* PANEL 2 — STRUCTURAL MEANING */}
  <section>
    <div className="rounded-2xl border border-white/10 bg-black/22 p-6">
      <div className="font-sans text-[11px] tracking-[0.35em] uppercase text-stone-200/60">
        Descent as Architecture
      </div>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/90">
        The descent is often misread as myth or metaphor. In this exhibition, it is treated
        as structure.
      </p>

      <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm text-stone-200/85">
        <li>What is relinquished</li>
        <li>What is named</li>
        <li>What is carried through the body afterward</li>
      </ul>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
        Inanna’s descent is not a story about a goddess losing power.
        It is about power being re-measured.
      </p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
        Ancient Sumer did not separate value from consequence. Authority was not assumed to
        be permanent. Descent was how coherence was tested.
      </p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
        Pressure applied to form reveals what is essential.
      </p>
    </div>
  </section>

  {/* PANEL 3 — CONTEMPORARY RELEVANCE */}
  <section>
    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
      <div className="font-sans text-[11px] tracking-[0.35em] uppercase text-stone-200/60">
        Why This Matters Now
      </div>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/90">
        We live in a culture that prioritizes ascent: accumulation, acceleration, amplification.
        Very few systems are designed to test coherence under pressure.
      </p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/85">
        The result is fragility disguised as scale.
      </p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
        Inanna’s descent offers a counter-architecture:
      </p>

      <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm text-stone-200/80">
        <li>Value is what remains when display is removed</li>
        <li>Identity is what endures when assertion fails</li>
        <li>Renewal comes through structured encounter</li>
      </ul>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
        This exhibition does not ask you to believe in Inanna.
        It asks you to recognize the pattern she encodes.
      </p>
    </div>
  </section>

  {/* PANEL 4 — INVITATION */}
  <section>
    <div className="rounded-2xl border border-white/10 bg-black/18 p-6">
      <div className="font-sans text-[11px] tracking-[0.35em] uppercase text-stone-200/60">
        An Invitation
      </div>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/85">
        The works you are about to encounter are arranged according to material states
        and gates of passage.
      </p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
        You are not asked to interpret them correctly.
        You are asked to notice what shifts as you move through them.
      </p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
        There is no single reading.
        There is only response.
      </p>

      <p className="mt-6 font-serif text-lg text-stone-100">
        Descent is not regression.  
        It is how depth is measured.
      </p>
    </div>
  </section>

</div>


                {/* ACTIONS */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => nav("/measures/gates")}
                    className="min-h-[44px] rounded-full border border-white/20 bg-black/30 px-6 py-3
                               font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/85
                               transition hover:text-stone-100 hover:border-white/30"
                  >
                    Continue Descent
                  
                  </button>

                  <div className="ml-auto font-sans text-[10px] tracking-[0.28em] uppercase text-stone-200/35">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
