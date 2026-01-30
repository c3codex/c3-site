// src/components/layout/PricelessNav.tsx
import { useNavigate } from "react-router-dom";

type NavItem = {
  label: string;
  to: string;
  aria: string;
};

export default function PricelessNav({
  className = "",
  items = [
    { label: "Measures", to: "/measures", aria: "Enter Measures of Inanna" },
    { label: "Gallery", to: "/gallery", aria: "Enter Gallery" },
    { label: "Model", to: "/model", aria: "Enter c3 model" },
    { label: "Codexstone", to: "/codexstone", aria: "Enter Restore" },
  ],
}: {
  className?: string;
  items?: NavItem[];
}) {
  const nav = useNavigate();

  return (
    <nav
      className={[
        "pointer-events-auto flex flex-wrap items-center justify-center gap-3",
        className,
      ].join(" ")}
      aria-label="Primary navigation"
    >
      {items.map((it) => (
        <button
          key={it.label}
          type="button"
          onClick={() => nav(it.to)}
          aria-label={it.aria}
          className="min-h-[44px] rounded-full border border-white/14 bg-black/30 px-5 py-2
                     font-sans text-[10px] tracking-[0.35em] uppercase text-stone-200/80
                     backdrop-blur-sm transition hover:border-white/25 hover:text-stone-100"
        >
          {it.label}
        </button>
      ))}
    </nav>
  );
}
