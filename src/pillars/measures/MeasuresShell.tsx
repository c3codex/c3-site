// src/pillars/measures/MeasuresShell.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MeasuresTempleHome from "@/pillars/measures/MeasuresTempleHome";
import MeasuresExhibition from "@/pillars/measures/MeasuresExhibition";

import ObsidianGateIntro from "@/pillars/measures/gates/ObsidianGateIntro";
import ObsidianGateIndex from "@/pillars/measures/gates/ObsidianGateIndex";
import ObsidianGatePlate from "@/pillars/measures/gates/ObsidianGatePlate";

import { MeasuresAudioBusProvider, useMeasuresAudioBus } from "@/pillars/measures/audio/MeasuresAudioBusProvider";

function MeasuresAudioUnlockLayer({ children }: { children: React.ReactNode }) {
  const bus = useMeasuresAudioBus();
  return (
    <div
      className="h-full w-full"
      onPointerDown={() => bus.unlock()}
      onKeyDown={() => bus.unlock()}
      role="presentation"
    >
      {children}
    </div>
  );
}

export default function MeasuresShell() {
  return (
    <MeasuresAudioBusProvider>
      <MeasuresAudioUnlockLayer>
        <Routes>
          <Route index element={<MeasuresTempleHome />} />
          <Route path="exhibition" element={<MeasuresExhibition />} />

          <Route path="gates/intro" element={<ObsidianGateIntro />} />
          <Route path="gates" element={<ObsidianGateIndex />} />
          <Route path="gates/:gateId" element={<ObsidianGatePlate />} />

          <Route path="*" element={<Navigate to="/measures" replace />} />
        </Routes>
      </MeasuresAudioUnlockLayer>
    </MeasuresAudioBusProvider>
  );
}
