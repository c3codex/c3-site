// src/components/layout/CodexstoneNav.tsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * DESIGN LAW (locked):
 * - CENTER = Measures (/measures)
 * - 4 crescents = Introducing, Artists, c3, Restore
 * - No wording on the codexstone art (no overlay text). Pure geometry interaction.
 */

export type PillarId = "intro" | "artists" | "c3" | "restore";
type ActiveRegion = PillarId | "center" | null;

export type CodexstoneNavProps = {
  navigateOnEnter?: boolean;

  /** mobile behavior for crescents */
  mobileMode?: "twoTap" | "direct";
  twoTapWindowMs?: number;

  /** center behavior (Measures) */
  centerMode?: "direct" | "twoTap";
  centerTwoTapWindowMs?: number;

  /** show debug outlines for tuning hit areas */
  debugZones?: boolean;

  className?: string;
};

const ROUTES = {
  center: "/measures",
  intro: "/introducing",
  artists: "/artists",
  c3: "/c3",
  restore: "/restore",
} as const;

export default function CodexstoneNav({
  navigateOnEnter = true,
  mobileMode = "twoTap",
  twoTapWindowMs = 1200,

  centerMode = "direct",
  centerTwoTapWindowMs = 1200,

  debugZones = false,
  className = "",
}: CodexstoneNavProps) {
  const navigate = useNavigate();
  const [activeRegion, setActiveRegion] = useState<ActiveRegion>(null);

  // mobile two-tap memory (shared)
  const lastTapRef = useRef<{ id: PillarId | "center" | null; t: number }>({
    id: null,
    t: 0,
  });

  const setRegion = (region: ActiveRegion) => setActiveRegion(region);

  const commit = (region: PillarId | "center") => {
    if (!navigateOnEnter) return;
    if (region === "center") return navigate(ROUTES.center);

    switch (region) {
      case "intro":
        return navigate(ROUTES.intro);
      case "artists":
        return navigate(ROUTES.artists);
      case "c3":
        return navigate(ROUTES.c3);
      case "restore":
        return navigate(ROUTES.restore);
    }
  };

  const handlePress = (region: PillarId) => {
    if (mobileMode === "direct") return commit(region);

    const now = Date.now();
    const last = lastTapRef.current;

    if (last.id === region && now - last.t <= twoTapWindowMs) {
      lastTapRef.current = { id: null, t: 0 };
      return commit(region);
    }

    lastTapRef.current = { id: region, t: now };
    setRegion(region);
  };

  const handleCenterPress = () => {
    if (centerMode === "direct") return commit("center");

    const now = Date.now();
    const last = lastTapRef.current;

    if (last.id === "center" && now - last.t <= centerTwoTapWindowMs) {
      lastTapRef.current = { id: null, t: 0 };
      return commit("center");
    }

    lastTapRef.current = { id: "center", t: now };
    setRegion("center");
  };

  // DEBUG styling
  const stroke = debugZones ? "rgba(234,230,223,0.35)" : "transparent";
  const strokeWidth = debugZones ? 2 : 0;

  return (
    <div className={`absolute inset-0 ${className}`} aria-label="Codexstone Navigation">
      <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full z-20">
        {/* CENTER REGION = Measures */}
        <circle
          cx="500"
          cy="500"
          r="140"
          fill="transparent"
          stroke={activeRegion === "center" ? "rgba(234,230,223,0.22)" : stroke}
          strokeWidth={activeRegion === "center" ? 2 : strokeWidth}
          role="button"
          tabIndex={0}
          aria-label="Enter Measures of Inanna"
          className="cursor-pointer"
          onPointerEnter={() => setRegion("center")}
          onPointerLeave={() => setRegion(null)}
          onPointerDown={(e) => {
            e.preventDefault();
            handleCenterPress();
          }}
          onFocus={() => setRegion("center")}
          onBlur={() => setRegion(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCenterPress(); // ✅ respects centerMode + centerTwoTapWindowMs
            }
            if (e.key === "Escape") {
              e.preventDefault();
              setRegion(null);
            }
          }}
        />

        {/* 4 CRESCENTS = pillars */}
        <CrescentRegion
          debugStroke={stroke}
          debugStrokeWidth={strokeWidth}
          d="M180,300 C80,500 80,500 180,700 C260,640 260,360 180,300 Z"
          ariaLabel="Introducing Priceless Gallery"
          isActive={activeRegion === "intro"}
          onApproach={() => setRegion("intro")}
          onLeave={() => setRegion(null)}
          onPress={() => handlePress("intro")}
        />

        <CrescentRegion
          debugStroke={stroke}
          debugStrokeWidth={strokeWidth}
          d="M820,300 C920,500 920,500 820,700 C740,640 740,360 820,300 Z"
          ariaLabel="Enter Artists’ Gallery"
          isActive={activeRegion === "artists"}
          onApproach={() => setRegion("artists")}
          onLeave={() => setRegion(null)}
          onPress={() => handlePress("artists")}
        />

        <CrescentRegion
          debugStroke={stroke}
          debugStrokeWidth={strokeWidth}
          d="M300,820 C500,920 500,920 700,820 C640,740 360,740 300,820 Z"
          ariaLabel="Enter c3"
          isActive={activeRegion === "c3"}
          onApproach={() => setRegion("c3")}
          onLeave={() => setRegion(null)}
          onPress={() => handlePress("c3")}
        />

        <CrescentRegion
          debugStroke={stroke}
          debugStrokeWidth={strokeWidth}
          d="M300,180 C500,80 500,80 700,180 C640,260 360,260 300,180 Z"
          ariaLabel="Enter Restore"
          isActive={activeRegion === "restore"}
          onApproach={() => setRegion("restore")}
          onLeave={() => setRegion(null)}
          onPress={() => handlePress("restore")}
        />
      </svg>
    </div>
  );
}

function CrescentRegion(props: {
  d: string;
  ariaLabel: string;
  isActive: boolean;
  onApproach: () => void;
  onLeave: () => void;
  onPress: () => void;

  debugStroke: string;
  debugStrokeWidth: number;
}) {
  const {
    d,
    ariaLabel,
    isActive,
    onApproach,
    onLeave,
    onPress,
    debugStroke,
    debugStrokeWidth,
  } = props;

  return (
    <path
      d={d}
      fill="transparent"
      stroke={isActive ? "rgba(234, 230, 223, 0.22)" : debugStroke}
      strokeWidth={isActive ? 2 : debugStrokeWidth}
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onPointerEnter={onApproach}
      onPointerLeave={onLeave}
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      onFocus={onApproach}
      onBlur={onLeave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPress();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          onLeave();
        }
      }}
    />
  );
}
