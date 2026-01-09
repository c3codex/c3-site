import React from "react";

type PageId = "home" | "connect" | "contribute" | "create" | "restore" | "measures";

type Props = {
  onEnterGallery?: () => void;
  onNavigate: (id: PageId) => void;
};

const CreatePage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <main className="min-h-screen bg-obsidian text-stone-200">
      {/* Header */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-10">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="text-xs tracking-[0.32em] uppercase text-stone-400 hover:text-stone-200 transition"
          >
            ← Back
          </button>

          <p className="font-sans text-xs tracking-[0.35em] uppercase text-gold/70">
            c3 model
          </p>
        </div>

        <h1 className="mt-6 font-serif text-4xl md:text-5xl leading-tight">
          Create
        </h1>

        <p className="mt-4 text-base md:text-lg leading-relaxed text-stone-400 max-w-2xl">
          Creation is the feedback loop: art funds lived conditions, and lived conditions
          expand what can be made. This is where contribution becomes infrastructure —
          not extraction.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 pb-16 md:pb-20 space-y-10">
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-stone-300">
            In the Priceless model, creation isn’t limited to the artist.
            The system itself is a creative act — a new way of moving value that protects
            the sacred part of art (encounter) while still honoring the practical truth
            (compensation).
          </p>

          <p className="text-base leading-relaxed text-stone-400">
            Create is where we build what the art makes possible:
            better tooling, better access, and better community conditions for artists and
            collectors alike — so the work can keep arriving.
          </p>

          <p className="text-base leading-relaxed text-stone-400">
            This is proof-of-concept logic: show the loop, measure the outcomes, and refine
            the container — without turning it into a pitch.
          </p>
        </div>

        {/* OAR */}
        <div className="rounded-2xl border border-gold/15 bg-black/20 p-6 md:p-7 space-y-5">
          <div className="grid gap-5 md:grid-cols-3">
            <OAR
              label="Objective"
              text="Turn contribution into lasting creative capacity — not one-off transactions."
            />
            <OAR
              label="Action"
              text="Route a defined share into shared tools, access, and community infrastructure."
            />
            <OAR
              label="Result"
              text="More art can be made. More artists can stay in the work. The commons grows."
            />
          </div>
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            type="button"
            onClick={() => onNavigate("measures")}
            className="group inline-flex items-center justify-center gap-3 rounded-xl
                       border border-gold/35 bg-black/10 px-6 py-3
                       font-sans text-sm tracking-wider uppercase text-gold
                       hover:border-gold hover:text-stone-100 hover:bg-black/20 transition"
          >
            Enter Measures of Inanna
            <span className="transform transition group-hover:translate-x-1">→</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("restore")}
            className="inline-flex items-center justify-center rounded-xl
                       border border-white/10 bg-black/10 px-6 py-3
                       font-sans text-sm tracking-wider uppercase text-stone-300
                       hover:text-stone-100 hover:border-white/20 hover:bg-black/20 transition"
          >
            Next: Restore
          </button>
        </div>

        <p className="text-xs text-stone-500">
          Create isn’t branding. It’s the part where the loop becomes real enough to live in.
        </p>
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

export default CreatePage;
