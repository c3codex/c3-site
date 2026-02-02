// src/pillars/measures/components/EncounterStage.tsx
import React, { useEffect, useRef, useState } from "react";

export type EncounterPhase = "arrive" | "settle" | "pause" | "ready";

type Props = {
  stillSrc: string;
  alt: string;
  videoSrc?: string | null;
  videoDurationMs?: number;
  settleFadeMs?: number;
  encounterPauseMs?: number;
  mediaFit?: "contain" | "cover";
  onPhaseChange?: (p: EncounterPhase) => void;

  // ✅ NEW
  videoPlaybackRate?: number;

  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  children?: React.ReactNode;
};

export default function EncounterStage({
  stillSrc,
  alt,
  videoSrc,
  videoDurationMs = 5200,
  settleFadeMs = 900,
  encounterPauseMs = 1100,
  mediaFit = "contain",
  onPhaseChange,
  videoPlaybackRate = 0.9, // ✅ default
  topLeft,
  topRight,
  children,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [phase, setPhase] = useState<EncounterPhase>("arrive");
  const [showStill, setShowStill] = useState(false);
  const [videoFading, setVideoFading] = useState(false);
  const [videoOn, setVideoOn] = useState(Boolean(videoSrc));

  // phase notify helper
  const setPhaseBoth = (p: EncounterPhase) => {
    setPhase(p);
    onPhaseChange?.(p);
  };

  // apply playbackRate to the *real* video
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = videoPlaybackRate;
  }, [videoPlaybackRate]);

  // timeline: arrive -> settle -> pause -> ready
  useEffect(() => {
    setPhaseBoth("arrive");

    // start settle timer at videoDurationMs
    const t1 = window.setTimeout(() => {
      setPhaseBoth("settle");
      setShowStill(true);
      setVideoFading(true);

      // after crossfade, drop video layer
      const tFade = window.setTimeout(() => {
        setVideoOn(false);
      }, settleFadeMs);

      // encounter pause then ready
      const t2 = window.setTimeout(() => {
        setPhaseBoth("pause");

        const t3 = window.setTimeout(() => {
          setPhaseBoth("ready");
        }, encounterPauseMs);

        return () => window.clearTimeout(t3);
      }, settleFadeMs);

      return () => {
        window.clearTimeout(tFade);
        window.clearTimeout(t2);
      };
    }, videoSrc ? videoDurationMs : 0);

    // if no video, go straight into pause -> ready
    if (!videoSrc) {
      setShowStill(true);
      setPhaseBoth("pause");
      const t3 = window.setTimeout(() => setPhaseBoth("ready"), encounterPauseMs);
      return () => window.clearTimeout(t3);
    }

    return () => window.clearTimeout(t1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSrc, videoDurationMs, settleFadeMs, encounterPauseMs]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-obsidian">
      {/* MEDIA */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[96svh] w-[min(98vw,1500px)]">
          {/* Still underlay */}
          <img
            src={stillSrc}
            alt={alt}
            draggable={false}
            className={`absolute inset-0 h-full w-full select-none object-${mediaFit} transition-opacity duration-700`}
            style={{ opacity: showStill || !videoOn ? 1 : 0 }}
          />

          {/* Video overlay */}
          {videoOn && videoSrc && (
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-${mediaFit}`}
              autoPlay
              muted
              playsInline
              preload="auto"
              loop={false}
              style={{
                opacity: videoFading ? 0 : 1,
                transition: `opacity ${settleFadeMs}ms ease`,
              }}
              onEnded={() => setShowStill(true)}
              onError={() => setShowStill(true)}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      {/* corners */}
      {topLeft && <div className="absolute left-6 top-6 z-40">{topLeft}</div>}
      {topRight && <div className="absolute right-6 top-6 z-40">{topRight}</div>}

      {/* children overlay */}
      {children}
    </section>
  );
}
