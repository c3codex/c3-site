import React from "react";
import GateStage from "@/components/measures/GateStage";
import { MEASURES_ASSETS } from "@/pages/measures/measuresAssets";

export default function CrystalGateIntro() {
  return (
    <GateStage
      section="epithets"
      titleLine1="CRYSTAL GATE"
      titleLine2="Recognition & Emergence"
      invocation="What was stripped is named again. You are seen."
      animatedSrc={MEASURES_ASSETS.gates.crystal.animated}
      stillSrc={MEASURES_ASSETS.gates.crystal.still}
      indexCount={9}
      plateRouteBase="/measures/epithets"
      autoStaticAfterMs={5000}
    />
  );
}
