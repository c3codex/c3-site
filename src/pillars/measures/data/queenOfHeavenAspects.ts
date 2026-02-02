// data ONLY — no React imports

export type Aspect = {
  id: string;
  sign: string;
  title: string;
  text: string;
  side: "left" | "right";
  top: string;
};

export const queenOfHeavenAspects: readonly Aspect[] = [
  {
    id: "dingir",
    sign: "𒀭",
    title: "Sovereign Presence",
    text:
      "This mark denotes divinity not as distance, but as station. The crown does not elevate her; it reveals her.",
    side: "left",
    top: "18%",
  },
  {
    id: "nin",
    sign: "𒊩",
    title: "Lady / Authority",
    text:
      "Authority gathered into form. Not command, but rightful presence.",
    side: "left",
    top: "32%",
  },
  {
    id: "me",
    sign: "𒈬",
    title: "Divine Measure",
    text:
      "The me are not objects, but functions of reality.",
    side: "left",
    top: "48%",
  },
  {
    id: "igi",
    sign: "𒄑",
    title: "The Eye",
    text:
      "Seeing is an act of invocation.",
    side: "right",
    top: "22%",
  },
  {
    id: "ki",
    sign: "𒆠",
    title: "Earth",
    text:
      "Rule is anchored in land, body, and breath.",
    side: "right",
    top: "38%",
  },
  {
    id: "shu",
    sign: "𒋗",
    title: "The Hand",
    text:
      "What is held becomes responsibility.",
    side: "right",
    top: "56%",
  },
  {
    id: "gir",
    sign: "𒂵",
    title: "Edge",
    text:
      "Boundary defines relation.",
    side: "right",
    top: "74%",
  },
] as const;
