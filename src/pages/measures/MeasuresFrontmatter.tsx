// src/pages/measures/MeasuresFrontmatter.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import frontmatter from "./measures-frontmatter.md?raw";

export default function MeasuresFrontmatter() {
  const nav = useNavigate();
  const location = useLocation();
  const next = (location.state as any)?.next ?? "/measures/gates";

  return (
    <main className="min-h-screen bg-obsidian px-6 py-16">
      <div className="mx-auto max-w-3xl space-y-14">
        {/* TITLE IMAGE */}
        <img
          src="https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/MeasuresFrontMatter_title.png"
          alt=""
          className="w-full h-auto"
          draggable={false}
        />

        {/* TEXT (MD) */}
        <article className="prose prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
          {frontmatter}
        </article>

        {/* EPIGRAPH IMAGE */}
        <img
          src="https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/Epigraph.webp"
          alt=""
          className="w-full h-auto opacity-90"
          draggable={false}
        />

        {/* CONTINUE */}
        <div className="pt-10 text-center">
          <button
            onClick={() => nav(next)}
            className="rounded-full border border-white/20 px-6 py-3
                       font-sans text-[10px] tracking-[0.35em] uppercase
                       text-stone-200 hover:text-white transition"
          >
            continue
          </button>
        </div>
      </div>
    </main>
  );
}
