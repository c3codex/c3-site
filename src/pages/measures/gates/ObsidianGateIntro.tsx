// src/pages/measures/gates/ObsidianGateIntro.tsx
import React from "react";
import GateStage from "@/components/measures/GateStage";
import { MEASURES_ASSETS } from "@/pages/measures/measuresAssets";

export default function ObsidianGateIntro() {
  return (
    <GateStage
      titleLine1="obsidian gates"
      titleLine2="k̇umurrah passage"
      hoverInvocation="Move in order. The gate opens when you arrive."

      animatedSrc={MEASURES_ASSETS.gates.obsidian.animated}
      stillSrc={MEASURES_ASSETS.gates.obsidian.still}

      indexCount={7}
      plateRouteBase="/measures/gates"

      // reveal index after passage
      autoRevealAfterMs={9000}

      // set this later when you add more gate assets
      enableMode="gate1Only"
    />
  );
}

