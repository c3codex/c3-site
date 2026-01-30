// src/assets/pricelessAssets.ts

export const PRICELESS_ASSETS = {
  
  // NEW — Priceless Gallery Hero (pillars)
priceless: {
    hero: {
      video:
        "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/heroPriceless.mov",
      still:
        "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/PricelessHero.webp",
    },

    // Optional static fallback / alt usage
    pillars:
      "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/Pricelessgallerypillars.png",
  },

  // Shared return glyph
  syndros: {
    thumb:
      "https://xttrboiohqzusyaneuaw.supabase.co/storage/v1/object/public/Measures-open/syndrosReturnglyph_thumb.webp",
  },
} as const;
