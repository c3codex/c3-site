// src/pillars/measures/MeasuresShell.tsx
import { Routes, Route, Navigate } from "react-router-dom";

import MeasuresTempleHome from "@/pillars/measures/MeasuresTempleHome";
import MeasuresExhibition from "@/pillars/measures/MeasuresExhibition";

// Obsidian flow
import ObsidianGateIntro from "@/pillars/measures/gates/ObsidianGateIntro";
import ObsidianGateIndex from "@/pillars/measures/gates/ObsidianGateIndex";
import ObsidianGatePlate from "@/pillars/measures/gates/ObsidianGatePlate";

export default function MeasuresShell() {
  return (
    <Routes>
      {/* Temple */}
      <Route index element={<MeasuresTempleHome />} />

      {/* Antechamber */}
      <Route path="exhibition" element={<MeasuresExhibition />} />

      {/* Obsidian Descent: Intro -> Index -> Plate */}
      <Route path="gates/intro" element={<ObsidianGateIntro />} />
      <Route path="gates" element={<ObsidianGateIndex />} />
      <Route path="gates/:gateId" element={<ObsidianGatePlate />} />

      {/* Seal everything else */}
      <Route path="*" element={<Navigate to="/measures" replace />} />
    </Routes>
  );
}
