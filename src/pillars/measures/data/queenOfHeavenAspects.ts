// src/pillars/measures/data/aspects/queenOfHeaven.ts
import type { Aspect } from "@/pillars/measures/components/aspects/AspectTypes";

export const queenOfHeavenAspects = [
  {
    id: "dingir",
    sign: "𒀭",
    title: "Sovereign Presence",
    text: "This mark denotes divinity not as distance, but as station. Here, sovereignty is assumed consciously, worn rather than bestowed. The crown does not elevate her, it reveals her.",
    side: "left",
    top: "18%",
  },
  {
    id: "nin",
    sign: "𒊩",
    title: "Lady / Authority",
    text: "Authority gathered into form. Not command, but rightful presence. She stands as one who governs by coherence, not force.",
    side: "left",
    top: "32%",
  },
  {
    id: "me",
    sign: "𒈬",
    title: "Divine Measure",
    text: "The me are not objects, they are functions of reality. To carry them is to hold the laws of form, relation, and return. Measure is power when held in balance.",
    side: "left",
    top: "48%",
  },
  {
    id: "igi",
    sign: "𒄑",
    title: "The Eye / Attention",
    text: "Seeing is an act of invocation. The gaze prepares the field before the body enters it. What is attended to begins to respond.",
    side: "right",
    top: "22%",
  },
  {
    id: "ki",
    sign: "𒆠",
    title: "Earth / Ground",
    text: "The steppe beneath her feet is not wilderness, but domain. Rule is anchored in land, body, and breath. Heaven touches earth through embodiment.",
    side: "right",
    top: "38%",
  },
  {
    id: "shu",
    sign: "𒋗",
    title: "The Hand / Possession",
    text: "What is held is claimed. What is taken up becomes responsibility. The hand is the bridge between intention and action.",
    side: "right",
    top: "56%",
  },
  {
    id: "gir",
    sign: "𒂵",
    title: "Edge / Boundary",
    text: "This mark signals the place where contact occurs. Boundary does not repel, it defines relation. Desire and defense are sealed into one form.",
    side: "right",
    top: "74%",
  },
] as const satisfies readonly Aspect[];
