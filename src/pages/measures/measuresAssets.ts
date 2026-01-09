// src/pages/measures/measuresAssets.ts

export const MEASURES_ASSETS = {
  temple: {
    animated:
      "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/TempleHome_animated.mp4",
    still:
      "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/TempleHome_static.png",
  },

  ui: {
    returnGlyph:
      "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/returnglyph.png",
  },

  gates: {
    // Gate Intro assets (portal)
    obsidian: {
      animated:
        "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/obsidiangate_animated.mp4",
      still:
        "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/media/obsidiangate.png",

      // Plate assets inside this section
      plates: {
        gate1: {
          original:
            "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/original_gate1.jpeg",
          animated:
            "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/rendered_animated_gate1.mp4",
          still:
            "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/rendered_artwork_gate1.webp",
          thumb:
            "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/rendered_artwork_gate1_thumb.webp",
        },
      },
    },

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
