import React from "react";
import GateStage from "@/components/measures/GateStage";
import { MEASURES_ASSETS } from "@/pages/measures/measuresAssets";

export default function ObsidianGateIntro() {
  return (
    <GateStage
      section="gates"
      titleLine1="OBSIDIAN GATE"
      titleLine2="Inanna's Descent"
      hoverInvocation="Descend without diminishment. What falls away was never your sovereignty."
      animatedSrc={MEASURES_ASSETS.gates.obsidian.animated}
      stillSrc={MEASURES_ASSETS.gates.obsidian.still}
      indexCount={7}
      plateRouteBase="/measures/gates"
      autoStaticAfterMs={5000}
      indexLabel="The Seven Gates"
      indexStyle="roman"
    />
  );
}
