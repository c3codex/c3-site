import React, { useState } from "react";

const HERO_IMAGE =
  "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/Quantum_Loops.webp";

const HERO_VIDEO =
  "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/Quantum_Loops.mov";

type Props = {
  onEnterGallery?: () => void;
  onNavigate: (id: string) => void; // uses AppLayout state nav (not router)
};

const ConnectPage: React.FC<Props> = ({ onNavigate }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <main className="min-h-screen bg-obsidian text-stone-200">
      {/* Top bar (simple nav back) */}
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="inline-flex items-center gap-2 rounded-xl border border-gold/20 bg-black/10 px-4 py-2
                     font-sans text-xs tracking-[0.28em] uppercase text-stone-300
                     hover:border-gold/40 hover:text-stone-100 hover:bg-black/20 transition"
        >
          ← Back to Home
        </button>
      </div>

      {/* Media (contained, shows full art, animates on hover) */}
      <section className="mx-auto max-w-6xl px-6 pt-8">
        <div
          className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-black/20"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Use a fixed aspect ratio so the whole piece shows nicely */}
          <div className="relative w-full aspect-[16/9]">
            {/* Static image (default) */}
            <img
              src={HERO_IMAGE}
              alt="Quantum Loops — creative potential in motion"
              className={`absolute inset-0 h-full w-full object-contain p-4 transition-opacity duration-300 ${
                hovered ? "opacity-0" : "opacity-100"
              }`}
              loading="eager"
            />

            {/* Hover video */}
            <video
              className={`absolute inset-0 h-full w-full object-contain p-4 transition-opacity duration-300 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
              autoPlay={hovered}
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          </div>

          {/* Hint label */}
          <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-gold/20 bg-black/40 px-3 py-1
                          font-sans text-[10px] tracking-[0.28em] uppercase text-stone-300">
            Hover to animate
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20 space-y-10">
        <header className="space-y-4">
          <p className="font-sans text-xs tracking-[0.35em] uppercase text-gold/70">
            c3 model
          </p>

          <h1 className="font-serif text-4xl md:text-5xl leading-tight">
            Connect
          </h1>
        </header>

        <p className="text-lg leading-relaxed text-stone-300">
          Creative expression is a shared human capacity. The ability to imagine,
          shape, and bring something into form exists in every person. It is one
          of the clearest expressions of human potential.
        </p>

        <p className="text-base leading-relaxed text-stone-400">
          The Priceless Gallery exists as a space to encounter that capacity
          directly — before price, before transaction, before evaluation.
        </p>

        <p className="text-base leading-relaxed text-stone-400">
          Every work in the gallery represents time, skill, risk, and care.
          Artists are not offering ideas in abstraction — they are contributing
          real work, created under real conditions.
        </p>

        <p className="text-base leading-relaxed text-stone-400">
          Compensation matters. But it is not the only language art speaks.
        </p>

        <p className="text-base leading-relaxed text-stone-400">
          Recognition comes before transaction. Viewers are invited to slow
          down, to notice, and to engage with the work on its own terms — without
          pressure to buy, perform interest, or justify attention.
        </p>

        <p className="text-base leading-relaxed text-stone-400">
          Artists contribute their work to a shared cultural commons. Viewers
          who choose to acquire do so consciously, assigning value at the moment
          of engagement. Art deserves compensation — and art exceeds what markets
          alone can measure.
        </p>

        <p className="text-base leading-relaxed text-stone-400">
          The gallery exists to hold space for what cannot be optimized:
          experimentation, depth, subtlety, and work that does not resolve neatly
          into trends or categories.
        </p>

        {/* OAR (kept light, but present) */}
        <div className="rounded-2xl border border-gold/15 bg-black/20 p-6 md:p-7">
          <div className="grid gap-6 md:grid-cols-3">
            <OAR label="Objective" text="Make art encounterable as a human right — not a funnel." />
            <OAR label="Action" text="Browse without prompts, pricing pressure, or persuasion." />
            <OAR label="Result" text="Artists are seen. Viewers connect. Value becomes conscious." />
          </div>
        </div>

        {/* CTA row */}
        <div className="pt-4 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate("measures")}
            className="group inline-flex items-center gap-3 rounded-xl
                       border border-gold/40 bg-black/10 px-6 py-3
                       font-sans text-sm tracking-wider uppercase text-gold
                       hover:border-gold hover:text-stone-100 hover:bg-black/20
                       transition"
          >
            
            Return to Threshold
          </button>
        </div>
      </section>
    </main>
  );
};

function OAR({ label, text }: { label: string; text: string }) {
  return (
    <div className="space-y-2">
      <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold/70">
        {label}
      </div>
      <div className="text-sm leading-relaxed text-stone-300">{text}</div>
    </div>
  );
}

export default ConnectPage;
