import { Link } from "react-router-dom";

export default function IntroducingPage() {
  return (
    <main className="min-h-screen bg-obsidian">
      <div className="mx-auto max-w-4xl px-6 pt-16 pb-20">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold/60">
          Priceless Gallery
        </p>

        <h1 className="font-serif text-4xl md:text-5xl text-stone-200 mt-3">
          Introducing Priceless Gallery
        </h1>

        <p className="mt-6 text-stone-400 leading-relaxed">
          This is a threshold-based gallery. Some rooms are authored and sealed.
          Others are open and living. Value here isn’t a price tag — it’s a
          signal carried by form, craft, and coherence.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/c3"
            className="rounded-full border border-gold/25 bg-black/30 px-5 py-2 font-sans text-xs uppercase tracking-[0.25em] text-stone-200 hover:border-gold/45 transition"
          >
            enter the how: c3
          </Link>

          <Link
            to="/artists"
            className="rounded-full border border-white/10 bg-black/20 px-5 py-2 font-sans text-xs uppercase tracking-[0.25em] text-stone-300 hover:text-stone-100 hover:border-white/20 transition"
          >
            enter artists’ gallery
          </Link>

          <Link
            to="/"
            className="rounded-full border border-white/10 bg-black/10 px-5 py-2 font-sans text-xs uppercase tracking-[0.25em] text-stone-300 hover:text-stone-100 hover:border-white/20 transition"
          >
            return to portal
          </Link>
        </div>
      </div>
    </main>
  );
}
