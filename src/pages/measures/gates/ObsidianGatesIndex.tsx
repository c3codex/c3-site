// src/pages/measures/gates/ObsidianGatesIndex.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnGlyph from "@/components/measures/ReturnGlyph";
import { MEASURES_ASSETS } from "@/pages/measures/measuresAssets";

export default function ObsidianGatesIndex() {
  const nav = useNavigate();

  // was: /measures/gates/gate1
const gateRoute = (n: number) => `/measures/gates/${n}`;

  const gates = Array.from({ length: 7 }, (_, i) => {
    const n = i + 1;

    // For now, only Gate 1 is enabled (you can flip this later)
    const enabled = n === 1;

    // Thumb support:
    // Gate 1 is wired; gates 2-7 will be null until you add them to MEASURES_ASSETS
    const key = `gate${n}` as const;

    const thumb =
      // @ts-expect-error - gates 2-7 are not in assets yet (intentional)
      MEASURES_ASSETS.gates.obsidian?.[key]?.thumb ?? null;

    return {
      n,
      enabled,
      thumb,
      to: gateRoute(n),
    };
  });

  return (
    <main className="min-h-screen bg-obsidian px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <ReturnGlyph />
          <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/60">
            obsidian gates — index
          </div>
        </div>

        <h1 className="mt-10 font-serif text-3xl text-stone-100">
          The Seven Gates
        </h1>
        <p className="mt-2 font-sans text-sm text-stone-400 max-w-2xl">
          Move in order. The gate opens when you arrive.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {gates.map((g) => (
            <button
              key={g.n}
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
      </div>
    </main>
  );
}
