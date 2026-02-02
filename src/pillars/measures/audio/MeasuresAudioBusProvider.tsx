// src/pillars/measures/audio/MeasuresAudioBusProvider.tsx
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";

type BusContext = {
  setObsidianActive: (on: boolean) => void;
  duck: () => void;
  restore: () => void;
};

const Ctx = createContext<BusContext | null>(null);

const OBSIDIAN_VOL = 0.22;
const DUCK_VOL = 0.07;

// Put your file in /public/audio/obsidian-bed.mp3
const OBSIDIAN_SRC = "/audio/obsidian-bed.mp3";

// Route rule: Obsidian tone runs ONLY during the descent sequence
function isObsidianRoute(pathname: string) {
  return pathname.startsWith("/measures/gates");
}

export function MeasuresAudioBusProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create the audio element once
  useEffect(() => {
    const a = new Audio(OBSIDIAN_SRC);
    a.loop = true;
    a.preload = "auto";
    a.volume = 0;
    audioRef.current = a;

    return () => {
      a.pause();
      a.src = "";
      audioRef.current = null;
    };
  }, []);

  const setObsidianActive = useCallback((on: boolean) => {
    const a = audioRef.current;
    if (!a) return;

    if (on) {
      // play may fail until user gesture; that's okay
      a.play().catch(() => {});
      a.volume = OBSIDIAN_VOL;
    } else {
      a.volume = 0;
      a.pause();
      a.currentTime = 0;
    }
  }, []);

  const duck = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = DUCK_VOL;
  }, []);

  const restore = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    // only restore if we're actually in obsidian routes
    if (isObsidianRoute(window.location.pathname)) a.volume = OBSIDIAN_VOL;
  }, []);

  // 🔥 The key fix: toggle based on route changes
  useEffect(() => {
    setObsidianActive(isObsidianRoute(pathname));
  }, [pathname, setObsidianActive]);

  const value = useMemo(() => ({ setObsidianActive, duck, restore }), [setObsidianActive, duck, restore]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMeasuresAudioBus() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMeasuresAudioBus must be inside MeasuresAudioBusProvider");
  return ctx;
}
