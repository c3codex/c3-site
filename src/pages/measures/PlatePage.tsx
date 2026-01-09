// src/pages/measures/PlatePage.tsx
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReturnGlyph from "@/components/measures/ReturnGlyph";
import { MEASURES_ASSETS, type GateId } from "@/pages/measures/measuresAssets";

export type MeasuresSectionId = "gates" | "epithets" | "mes";

type Props = {
  section: MeasuresSectionId;
};

type PlateAsset = {
  title: string;
  subtitle?: string;
  rendered: string;
  original?: string; // nested
  thumb?: string;
};

function normalizeGateId(raw?: string): GateId | null {
  if (!raw) return "gate1";

  // allow "gate1" or "1"
  if (raw.startsWith("gate")) return raw as GateId;
  if (/^\d+$/.test(raw)) return (`gate${raw}` as GateId);

  return null;
}

export default function PlatePage({ section }: Props) {
  const nav = useNavigate();

  // expects /measures/gates/:gateId where gateId is "gate1" (or "1")
  const { gateId } = useParams<{ gateId: string }>();
  const id = normalizeGateId(gateId);

  const [aspect, setAspect] = useState<"rendered" | "original">("rendered");

  const plate: PlateAsset | null = useMemo(() => {
    if (section !== "gates") return null;
    if (!id) return null;

    const p = MEASURES_ASSETS.gates.obsidian.plates[id];

    // if nothing is wired yet -> sealed
    if (!p?.still && !p?.original) return null;

    // only gate1 is "open" right now (optional lock)
    const enabled = id === "gate1";
    if (!enabled) return null;

    return {
      title: "Obsidian Gate I",
      subtitle: "Descent & Release",
      rendered: p.still ?? p.original ?? "",
      original: p.original,
      thumb: p.thumb,
    };
  }, [section, id]);

  if (!plate) {
    return (
      <main className="min-h-screen bg-obsidian px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <ReturnGlyph />
          <h1 className="mt-10 font-serif text-3xl text-stone-100">Sealed</h1>
          <p className="mt-2 font-sans text-sm text-stone-400">
            This plate is not yet opened.
          </p>

          <button
            type="button"
            onClick={() => nav("/measures/gates")}
            className="mt-8 rounded-full border border-white/15 bg-black/25 px-5 py-2 backdrop-blur
                       font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/75
                       hover:text-stone-100 hover:border-white/25 transition"
          >
            back to index
          </button>
        </div>
      </main>
    );
  }

  const activeSrc =
    aspect === "rendered"
      ? plate.rendered
      : plate.original ?? plate.rendered;

  return (
    <main className="min-h-screen bg-obsidian">
      {/* Top controls */}
      <div className="sticky top-0 z-30 border-b border-white/5 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-4">
          <ReturnGlyph />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => nav("/measures/gates")}
              className="rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur
                         font-sans text-[10px] tracking-[0.32em] uppercase text-stone-200/60
                         hover:text-stone-100 hover:border-white/20 transition"
            >
              index
            </button>

            {/* Aspects */}
            <div className="ml-2 flex items-center rounded-full border border-white/10 bg-black/20 p-1">
              <AspectButton
                active={aspect === "rendered"}
                onClick={() => setAspect("rendered")}
                label="rendered"
              />
              <AspectButton
                active={aspect === "original"}
                onClick={() => setAspect("original")}
                label="original"
                disabled={!plate.original}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Plate content */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-3">
          <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/60">
            {plate.title}
          </div>
          {plate.subtitle ? (
            <h1 className="font-serif text-3xl md:text-4xl text-stone-100">
              {plate.subtitle}
            </h1>
          ) : null}
        </div>

        {/* Art frame */}
        <div
          className="mt-8 relative overflow-hidden rounded-xl border border-white/10 bg-black/40"
          onContextMenu={(e) => e.preventDefault()}
        >
          <img
            src={activeSrc}
            alt=""
            draggable={false}
            className="w-full h-auto object-contain"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,0,0,0),rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.85)_100%)]" />
        </div>

        {/* Gate I attribute */}
        {section === "gates" && id === "gate1" ? (
          <div className="mt-10 max-w-3xl border-l border-white/10 pl-5">
            <div className="font-serif text-xl text-stone-200 leading-relaxed">
              From the Great Above, she opened her ear to the Great Below.
            </div>
            <div className="font-serif text-xl text-stone-200 leading-relaxed mt-2">
              Inanna abandoned heaven and earth to descend to the underworld.
            </div>
            <div className="font-serif text-xl text-stone-200 leading-relaxed mt-2">
              And then she prepared herself.
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}

function AspectButton({
  active,
  onClick,
  label,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`px-3 py-2 rounded-full font-sans text-[10px] tracking-[0.32em] uppercase transition
        ${
          disabled
            ? "text-stone-200/20 cursor-not-allowed"
            : active
            ? "text-stone-100 bg-white/10"
            : "text-stone-200/60 hover:text-stone-100"
        }`}
    >
      {label}
    </button>
  );
}
