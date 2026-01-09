// src/pages/measures/mes/MarbleGateIntro.tsx
import React from "react";
import GateStage from "@/components/measures/GateStage";
import { MEASURES_ASSETS } from "@/pages/measures/measuresAssets";

export default function MarbleGateIntro() {
  return (
    <GateStage
      section="mes"
      titleLine1="MARBLE GATE"
      titleLine2="Inanna seeds the MEs"
      invocation="Carry what you learned into form. Let coherence become law."
      animatedSrc={MEASURES_ASSETS.gates.marble.animated}
      stillSrc={MEASURES_ASSETS.gates.marble.still}
      indexCount={13}
      plateRouteBase="/measures/mes"
      autoStaticAfterMs={5000}
      
    />
  );
}
