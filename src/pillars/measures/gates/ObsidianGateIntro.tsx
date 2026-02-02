// src/pillars/measures/gates/ObsidianGateIntro.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MEASURES_ASSETS } from "@/pillars/measures/measuresAssets";
import MeasuresReturnGlyph from "@/pillars/measures/components/MeasuresReturnGlyph";
import EncounterStage, { type EncounterPhase } from "@/pillars/measures/components/EncounterStage";
import { useMeasuresAudioBus } from "@/pillars/measures/audio/MeasuresAudioBusProvider";

type PanelMode = "closed" | "open";

const AUTO_STATIC_AFTER_MS = 5000; // video -> still settle
const ENCOUNTER_PAUSE_MS = 1100; // matches antechamber pause

export default function ObsidianGateIntro() {
  const nav = useNavigate();
  const { duck, restore } = useMeasuresAudioBus();

  const [phase, setPhase] = useState<EncounterPhase>("arrive");
  const [panelMode, setPanelMode] = useState<PanelMode>("closed");

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  // Auto-open when EncounterStage is ready
  useEffect(() => {
    if (phase !== "ready") return;
    setPanelMode("open");
  }, [phase]);

  // Duck tone when panel is open (so reading feels “clearer”)
  useEffect(() => {
    if (panelMode === "open") duck();
    else restore();
  }, [panelMode, duck, restore]);

  // ESC collapses
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelMode("closed");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <EncounterStage
      stillSrc={MEASURES_ASSETS.obsidianEpigraph.still}
      alt="Obsidian Gate — Threshold"
      videoSrc={MEASURES_ASSETS.obsidianEpigraph.animated}
      videoDurationMs={AUTO_STATIC_AFTER_MS}
      settleFadeMs={900}
      encounterPauseMs={ENCOUNTER_PAUSE_MS}
      mediaFit="contain"
      onPhaseChange={setPhase}
      topLeft={<MeasuresReturnGlyph to="/measures" ariaLabel="Return to Temple" />}
    >
      {/* VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,0,0,0),rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.88)_100%)]" />

      {/* CTA when panels closed */}
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

      {/* PLAQUE PANEL */}
      {panelMode === "open" && (
        <div className="absolute inset-0 z-30 flex justify-center px-4 pt-[96px]">
          <div className="relative w-full max-w-[820px] overflow-hidden rounded-2xl border border-white/10 bg-black/32 backdrop-blur-md shadow-[0_0_60px_rgba(0,0,0,0.55)]">
            <button
              type="button"
              onClick={() => setPanelMode("closed")}
              className="absolute right-4 top-4 z-50 min-h-[44px]
                         rounded-full border border-white/20 bg-black/45 px-5 py-2
                         font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/85
                         transition hover:text-stone-100 hover:border-white/30"
            >
              return to threshold
            </button>

            <div className="max-h-[72svh] overflow-y-auto px-6 pb-8 pt-10 md:px-10">
              <div className="space-y-10">
                {/* PANEL 0 */}
                <section>
                  <div className="rounded-2xl border border-white/10 bg-black/18 p-6">
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
                      It does not announce a journey. It marks a decision.
                    </p>

                    <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/80">
                      Inanna does not fall. She listens.
                    </p>
                  </div>
                </section>

                {/* PANEL 1 */}
                <section>
                  <div className="rounded-2xl border border-white/10 bg-black/16 p-6">
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
                      This is not punishment. It is procedure.
                    </p>
                  </div>
                </section>

                {/* PANEL 2 */}
                <section>
                  <div className="rounded-2xl border border-white/10 bg-black/14 p-6">
                    <div className="font-sans text-[11px] tracking-[0.35em] uppercase text-stone-200/60">
                      Descent as Architecture
                    </div>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/90">
                      The descent is often misread as myth or metaphor. In this exhibition, it is treated as structure.
                    </p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm text-stone-200/85">
                      <li>What is relinquished</li>
                      <li>What is named</li>
                      <li>What is carried through the body afterward</li>
                    </ul>
                  </div>
                </section>

                {/* PANEL 3 */}
                <section>
                  <div className="rounded-2xl border border-white/10 bg-black/14 p-6">
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
                  </div>
                </section>

                {/* PANEL 4 */}
                <section>
                  <div className="rounded-2xl border border-white/10 bg-black/16 p-6">
                    <div className="font-sans text-[11px] tracking-[0.35em] uppercase text-stone-200/60">
                      An Invitation
                    </div>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-stone-200/85">
                      You are not asked to interpret correctly. You are asked to notice what shifts as you move through.
                    </p>
                    <p className="mt-6 font-serif text-lg text-stone-100">
                      Descent is not regression. It is how depth is measured.
                    </p>
                  </div>
                </section>

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
                </div>

                <div className="h-6" />
              </div>
            </div>
          </div>
        </div>
      )}
    </EncounterStage>
  );
}
