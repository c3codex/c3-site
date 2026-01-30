import SyndrosReturnGlyph from "@/components/ui/SyndrosReturnGlyph";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-stone-500">
          Page Not Found
        </p>

        <h1 className="mt-4 font-serif text-3xl text-stone-200">
          This path does not hold.
        </h1>

        <p className="mt-6 text-stone-400 leading-relaxed">
          The page you’re looking for may have moved, resolved,
          or was never meant to remain accessible.
        </p>

        <div className="mt-10 flex justify-center">
          <SyndrosReturnGlyph />
        </div>
      </div>
    </main>
  );
}
