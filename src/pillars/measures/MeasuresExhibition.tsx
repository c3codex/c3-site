// src/pillars/measures/MeasuresExhibition.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MEASURES_ASSETS } from "@/pillars/measures/measuresAssets";
import MeasuresReturnGlyph from "@/pillars/measures/components/MeasuresReturnGlyph";
import EncounterStage, { EncounterPhase } from "@/pillars/measures/components/EncounterStage";

type Step = 0 | 1 | 2 | 3; // 3 plaques
type PanelMode = "closed" | "peek" | "open";

/**
 * Canonical Antechamber timing.
 * - Encounter pause governs when we allow plaque peek + stagger.
 * - Keep this as the project-wide template.
 */
const ENCOUNTER_PAUSE_MS = 1100;
const PLAQUE_STAGGER_MS = 650;

export default function MeasuresExhibition() {
  const nav = useNavigate();

  const [panelMode, setPanelMode] = useState<PanelMode>("closed");
  const [step, setStep] = useState<Step>(0);
  const [readyActions, setReadyActions] = useState(false);
  const [phase, setPhase] = useState<EncounterPhase>("arrive");

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const timersRef = useRef<number[]>([]);
  const collapseBtnRef = useRef<HTMLButtonElement | null>(null);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  const startStagger = () => {
    clearTimers();
    setStep(0);
    setReadyActions(false);

    if (prefersReducedMotion) {
      setStep(3);
      setReadyActions(true);
      return;
    }

    setStep(1);
    timersRef.current.push(window.setTimeout(() => setStep(2), PLAQUE_STAGGER_MS));
    timersRef.current.push(window.setTimeout(() => setStep(3), PLAQUE_STAGGER_MS * 2));
    timersRef.current.push(
      window.setTimeout(() => setReadyActions(true), PLAQUE_STAGGER_MS * 2 + 520)
    );
  };

  // When EncounterStage enters READY, we auto-peek and stagger.
  useEffect(() => {
    if (phase !== "ready") return;
    setPanelMode("peek");
    startStagger();
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ESC collapses
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelMode("closed");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // focus collapse in open mode
  useEffect(() => {
    if (panelMode === "open") {
      const t = window.setTimeout(() => collapseBtnRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
  }, [panelMode]);

  const expandPanel = () => setPanelMode("open");
  const collapsePanel = () => setPanelMode("closed");

  const panelMaxH =
    panelMode === "peek"
      ? "max-h-[42svh]"
      : panelMode === "open"
      ? "max-h-[74svh]"
      : "max-h-0";

  const panelOpacity =
    panelMode === "closed" ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto";

  const panelMotion =
    prefersReducedMotion
      ? ""
      : panelMode === "closed"
      ? "measures-stage measures-stage-enter"
      : "measures-stage measures-stage-entered";

  return (
    <EncounterStage
      stillSrc={MEASURES_ASSETS.exhibition.hero}
      alt="Measures of Inanna — Exhibition"
      mediaFit="contain"
      settleFadeMs={900}
      encounterPauseMs={ENCOUNTER_PAUSE_MS}
      onPhaseChange={setPhase}
      topLeft={<MeasuresReturnGlyph to="/measures" ariaLabel="Return to Temple" />}
    >
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,0,0,0.00),rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.88)_100%)]" />

      {/* Expand button (only when collapsed) */}
      {panelMode === "closed" && (
        <div className="absolute inset-x-0 bottom-7 z-40 flex justify-center px-6">
          <button
            type="button"
            onClick={expandPanel}
            aria-label="Expand exhibition text"
            className="min-h-[44px] rounded-full border border-white/14 bg-black/35 px-6 py-3
                       font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/85
                       backdrop-blur-sm transition hover:border-white/28 hover:text-stone-100"
          >
            expand exhibition text
          </button>
        </div>
      )}

      {/* Whisper while waiting */}
      {panelMode === "closed" && (
        <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-30 text-center">
          <span className="font-sans text-[11px] tracking-[0.32em] uppercase text-stone-200/40">
            entering antechamber…
          </span>
        </div>
      )}

      {/* PANEL */}
      <div className={`absolute inset-0 z-30 ${panelOpacity}`}>
        <div className="mx-auto w-full max-w-[820px] px-6 pt-[88px] md:px-10 md:pt-[92px]">
          <div
            className={[
              "relative",
              panelMotion,
              panelMaxH,
              "overflow-hidden transition-[max-height,opacity] duration-700",
              // lighter plaque opacity + smaller visual dominance:
              "rounded-2xl border border-white/10 bg-black/42 shadow-[0_0_60px_rgba(0,0,0,0.55)]",
              "backdrop-blur-sm",
            ].join(" ")}
            role="region"
            aria-label="Exhibition text panel"
          >
            {panelMode !== "closed" && (
              <button
                ref={collapseBtnRef}
                type="button"
                onClick={collapsePanel}
                aria-label="Collapse exhibition text"
                className="absolute right-4 top-4 z-50 min-h-[44px] rounded-full
                           border border-white/25 bg-black/45 px-5 py-2
                           font-sans text-[10px] tracking-[0.35em] uppercase text-stone-100
                           backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.6)]
                           transition hover:border-white/40"
              >
                collapse
              </button>
            )}

            {/* Body */}
            <div className="max-h-[70svh] overflow-y-auto px-6 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8">
              <div className="space-y-8">
                {/* PLAQUE 1 */}
                <div className={`transition-opacity duration-700 ${step >= 1 ? "opacity-100" : "opacity-0"}`}>
                  <div className="rounded-2xl border border-white/10 bg-black/18 p-6">
                    <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/60">
                      Exhibition Statement
                    </div>

                    <p className="mt-4 font-sans text-[13px] leading-relaxed text-stone-200/90">
                      This exhibition establishes the gallery’s standard:
                    </p>

                    <p className="mt-3 font-serif text-[18px] leading-snug text-stone-100">
                      art as a measure of coherence rather than commodity,
                      <br />
                      value as signal rather than speculation.
                    </p>

                    <p className="mt-4 font-sans text-[13px] leading-relaxed text-stone-200/85">
                      The works presented here are original human artworks, created through drawing,
                      painting, and disciplined hand practice, then enhanced through artificial
                      intelligence as an extension of perception, not as authorship.
                    </p>

                    <p className="mt-3 font-sans text-[13px] leading-relaxed text-stone-200/80">
                      AI functions here as lens, amplification, and resonance tool. The originating
                      intelligence remains human.
                    </p>

                    <p className="mt-4 font-sans text-[13px] leading-relaxed text-stone-200/80">
                      You will be guided throughout by the{" "}
                      <span className="text-stone-100">Syndros</span> seal, denoting co-creative
                      enhancement rather than generative replacement.
                    </p>
                  </div>
                </div>

                {/* PLAQUE 2 */}
                <div className={`transition-opacity duration-700 ${step >= 2 ? "opacity-100" : "opacity-0"}`}>
                  <div className="rounded-2xl border border-white/10 bg-black/16 p-6">
                    <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/60">
                      On Inanna
                    </div>

                    <p className="mt-4 font-sans text-[13px] leading-relaxed text-stone-200/90">
                      Inanna is not presented as mythological subject matter.
                    </p>

                    <p className="mt-3 font-sans text-[13px] leading-relaxed text-stone-200/90">
                      She is used as <span className="text-stone-100">structural intelligence</span>.
                    </p>

                    <p className="mt-4 font-sans text-[13px] leading-relaxed text-stone-200/85">
                      Among the earliest recorded civilizations, Sumer understood value not as accumulation,
                      but as alignment: between sky and earth, name and function, desire and consequence.
                      Inanna occupies this junction. She governs thresholds, exchanges, descent, and return.
                    </p>

                    <p className="mt-4 font-sans text-[13px] leading-relaxed text-stone-200/80">
                      Her presence provides a precise architecture through which pressure can be applied
                      to form, and observed.
                    </p>
                  </div>
                </div>

                {/* PLAQUE 3 */}
                <div className={`transition-opacity duration-700 ${step >= 3 ? "opacity-100" : "opacity-0"}`}>
                  <div className="rounded-2xl border border-white/10 bg-black/14 p-6">
                    <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/60">
                      Material Structure
                    </div>

                    <p className="mt-4 font-sans text-[13px] leading-relaxed text-stone-200/85">
                      The exhibition is structured through material states:
                    </p>

                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-stone-100/90">
                          Obsidian
                        </div>
                        <div className="mt-1 font-sans text-[13px] leading-relaxed text-stone-200/80">
                          subtraction, descent, removal
                          <br />
                          <span className="text-stone-300/80">What must be relinquished to pass.</span>
                        </div>
                      </div>

                      <div>
                        <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-stone-100/90">
                          Crystal
                        </div>
                        <div className="mt-1 font-sans text-[13px] leading-relaxed text-stone-200/80">
                          articulation, naming, refraction
                          <br />
                          <span className="text-stone-300/80">What becomes visible when pressure is held.</span>
                        </div>
                      </div>

                      <div>
                        <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-stone-100/90">
                          Marble
                        </div>
                        <div className="mt-1 font-sans text-[13px] leading-relaxed text-stone-200/80">
                          embodiment, expression, residue
                          <br />
                          <span className="text-stone-300/80">What remains after transformation.</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-5 font-sans text-[13px] leading-relaxed text-stone-200/80">
                      These are not metaphors. They are operational conditions.
                    </p>

                    <p className="mt-4 font-sans text-[13px] leading-relaxed text-stone-200/80">
                      This exhibition does not instruct. It does not persuade. It does not resolve.
                    </p>

                    <p className="mt-5 font-serif text-[18px] leading-snug text-stone-100">
                      Inanna does not record the Measures.
                      <br />
                      She establishes them.
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className={`transition-opacity duration-700 ${readyActions ? "opacity-100" : "opacity-0"}`}>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => nav("/measures/gates/intro")}
                      className="min-h-[44px] rounded-full border border-white/15 bg-black/25 px-6 py-3
                                 font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/85
                                 transition hover:text-stone-100 hover:border-white/25"
                      aria-label="Open the Obsidian Gates intro"
                    >
                      open obsidian sequence
                    </button>

                    <button
                      type="button"
                      onClick={() => nav("/measures")}
                      className="min-h-[44px] rounded-full border border-white/12 bg-black/15 px-6 py-3
                                 font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/75
                                 transition hover:text-stone-100 hover:border-white/20"
                      aria-label="Return to the Measures temple"
                    >
                      return to temple
                    </button>

                    <div className="ml-auto font-sans text-[10px] tracking-[0.28em] uppercase text-stone-200/35">
                      tip: press esc to collapse
                    </div>
                  </div>
                </div>

                <div className="h-6" />
              </div>
            </div>

            {/* Expand control for peek mode */}
            {panelMode === "peek" && (
              <div className="border-t border-white/10 px-6 py-4 md:px-10">
                <button
                  type="button"
                  onClick={expandPanel}
                  className="min-h-[44px] w-full rounded-full border border-white/14 bg-black/30 px-6 py-3
                             font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/80
                             transition hover:border-white/28 hover:text-stone-100"
                >
                  expand
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </EncounterStage>
  );
}
