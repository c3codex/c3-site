// src/pages/measures/measuresAssets.ts

export type GateId =
  | "gate1"
  | "gate2"
  | "gate3"
  | "gate4"
  | "gate5"
  | "gate6"
  | "gate7";

export type MeasuresPlateAsset = {
  /** Original (still) image */
  original?: string;
  /** Animated reveal (video) */
  animated?: string;
  /** Static render (still) */
  still?: string;
  /** Thumb for index grids */
  thumb?: string;
};

export const MEASURES_ASSETS = {
  temple: {
    animated:
      "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/TempleHome_animated.MP4",
    still:
      "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/TempleHome.webp",
  },

  ui: {
    returnGlyph:
      "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/returnglyph.png",
  },

  // SECTION THRESHOLDS / FRONT MATTER PLATES
  frontmatter: {
    title:
      "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/MeasuresFrontMatter_title.png",
    epigraph:
      "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/Epigraph.webp",
    // add later:
    // crystal: "",
    // marble: "",
  },

  gates: {
    obsidian: {
      // Gate Intro assets (portal)
      animated:
        "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/KumurrahGatePassage_animated.MP4",
      still:
        "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/KumurrahGatePassage_still.webp",

      // Plate assets (7 gates)
      plates: {
        gate1: {
          // ORIGINAL (still)
          original:
            "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/original_gate1.jpeg",

          // ANIMATED (reveal)
          animated:
            "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/gate1_original_animated.mp4",

          // STATIC (after 5 seconds)
          // If you don’t have a separate static render yet, point this to the original
          // OR upload a dedicated still and swap later.
          still:
            "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/original_gate1.jpeg",

          // THUMB (index)
          // NOTE: your URL had Measuresopen (missing hyphen). I’m assuming that was a typo.
          // If the file truly lives at Measuresopen, revert to that exact path.
          thumb:
            "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/rendered_artwork_gate1_thumb.webp",
        },

        // Placeholders — add when ready
        gate2: {},
        gate3: {},
        gate4: {},
        gate5: {},
        gate6: {},
        gate7: {},
      } as Record<GateId, MeasuresPlateAsset>,
    },

    // Keep these if you’re still using them as “gate portals”
    crystal: {
      animated:
        "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/crystalgate_animated.mp4",
      still:
        "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/crystalgate.png",
      plates: {},
    },

    marble: {
      animated:
        "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/marblegate_animated.mp4",
      still:
        "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/marblegate.png",
      plates: {},
    },
  },
} as const;

export type MeasuresSectionId = "gates" | "epithets" | "mes";
