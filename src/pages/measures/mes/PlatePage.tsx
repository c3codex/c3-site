import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReturnGlyph from "@/components/measures/ReturnGlyph";
import type { MeasuresSectionId } from "@/pages/measures/measuresAssets";
import { setLastPlate } from "@/components/measures/progress";

export default function PlatePage({ section }: { section: MeasuresSectionId }) {
  const params = useParams();
  const n = Number(params.n ?? "1");

  useEffect(() => {
    if (Number.isFinite(n)) setLastPlate(section, n);
  }, [section, n]);

  return (
    <main className="min-h-screen bg-obsidian text-stone-100">
      <div className="fixed left-4 top-4 z-50">
        <ReturnGlyph title="Return to Temple" />
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-24 pb-16">
        <div className="font-sans text-[10px] tracking-[0.45em] uppercase text-stone-200/60">
          {section} · plate {n}
        </div>
        <h1 className="mt-3 font-serif text-3xl text-stone-100/90">
          Plate {n}
        </h1>
        <p className="mt-3 text-stone-300/70 max-w-2xl">
          Placeholder plate room. Next we’ll mount your framed plate UI (zoom, aspects, scroll/oracle links).
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-8">
          <div className="text-stone-200/70">
            Ready when you are: we plug in Supabase-signed (or public) plate renders and your plate metadata.
          </div>
        </div>
      </div>
    </main>
  );
}

