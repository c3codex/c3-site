// src/routes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

import HeroPriceless from "@/components/layout/HeroPricelessGallery";
import MeasuresShell from "@/app/MeasuresShell";

// Pillar heroes
import HeroGallery from "@/components/layout/HeroGallery";
import HeroModel from "@/components/layout/HeroModel";

// Codexstone pillar (keep your existing one)
import HeroCodexstone from "@/components/layout/HeroCodexstone";

// Introducing page
import IntroducingSection from "@/components/layout/IntroducingSection";

export default function AppRoute() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Home */}
        <Route path="/" element={<HeroPriceless />} />

        {/* Pillars */}
        <Route path="/measures/*" element={<MeasuresShell />} />
        <Route path="/gallery" element={<HeroGallery />} />
        <Route path="/model" element={<HeroModel />} />
        <Route path="/codexstone" element={<HeroCodexstone />} />

        {/* Introducing */}
        <Route path="/introducing" element={<IntroducingSection />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
