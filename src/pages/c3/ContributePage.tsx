import React from "react";

type PageId = "home" | "connect" | "contribute" | "create" | "restore" | "measures";

type Props = {
  onEnterGallery?: () => void;
  onNavigate: (id: PageId) => void;
};

const ContributePage: React.FC<Props> = ({ onNavigate }) => {
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
          Contribute
        </h1>

        <p className="mt-4 text-base md:text-lg leading-relaxed text-stone-400 max-w-2xl">
          Contribution is how value becomes real — chosen consciously, not coerced.
          Artists deserve compensation, and we refuse the “price-tag equals worth”
          collapse. Here, you decide what the work is worth to you, at the moment you
          acquire it.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 pb-16 md:pb-20 space-y-10">
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-stone-300">
            There are no minimums, no suggested prices, and no “limited time” tricks.
            The only requirement is sincerity: choose a contribution that reflects
            what you received — attention, feeling, clarity, provocation, beauty,
            memory, or momentum.
          </p>

          <p className="text-base leading-relaxed text-stone-400">
            Contribution isn’t charity. It’s participation. The viewer completes the
            circuit by meeting the artist’s offering with chosen value.
          </p>

          <p className="text-base leading-relaxed text-stone-400">
            When you contribute, you’re doing two things at once:
            compensating the artist — and helping prove a cultural model where art
            is encountered freely but never treated as disposable.
          </p>
        </div>

        {/* OAR */}
        <div className="rounded-2xl border border-gold/15 bg-black/20 p-6 md:p-7 space-y-5">
          <div className="grid gap-5 md:grid-cols-3">
            <OAR
              label="Objective"
              text="Make compensation true and voluntary — without turning art into a sales machine."
            />
            <OAR
              label="Action"
              text="Choose your contribution at acquisition. No minimums. No persuasion."
            />
            <OAR
              label="Result"
              text="Artists are resourced. Viewers participate. Value becomes conscious."
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
            onClick={() => onNavigate("create")}
            className="inline-flex items-center justify-center rounded-xl
                       border border-white/10 bg-black/10 px-6 py-3
                       font-sans text-sm tracking-wider uppercase text-stone-300
                       hover:text-stone-100 hover:border-white/20 hover:bg-black/20 transition"
          >
            Next: Create
          </button>
        </div>

        <p className="text-xs text-stone-500">
          You’re not paying for permission to look — you’re funding the conditions that make the work possible.
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

export default ContributePage;
