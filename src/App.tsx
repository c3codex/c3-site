import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";

import AppLayout from "@/components/AppLayout";
import MeasuresLayout from "@/layouts/MeasuresLayout";

// pages
import HomePage from "@/pages/HomePage";
import IntroducingPage from "@/pages/IntroducingPage";

import ConnectPage from "@/pages/c3/ConnectPage";
import ContributePage from "@/pages/c3/ContributePage";
import CreatePage from "@/pages/c3/CreatePage";
import ArtistsPage from "@/pages/artists/ArtistsPage";
import RestorePage from "@/pages/restore/RestorePage";

// measures
import TempleHome from "@/pages/measures/MeasuresTempleHome";
import ObsidianGateIntro from "@/pages/measures/gates/ObsidianGateIntro";
import ObsidianGatePlate from "@/pages/measures/gates/ObsidianGatePlate";
import CrystalGateIntro from "@/pages/measures/epithets/CrystalGateIntro";
import MarbleGateIntro from "@/pages/measures/mes/MarbleGateIntro";

// other
import NotFound from "@/pages/NotFound";
import measuresfrontmatter from "./pages/measures/measuresfrontmatter";
// ✅ use alias import (matches the rest of the project)
import MeasuresFrontmatter from "@/pages/measures/measuresfrontmatter";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes>
        {/* PORTAL — no header */}
        <Route path="/" element={<HomePage />} />

        {/* MAIN SITE SHELL */}
        <Route element={<AppLayout />}>
          <Route path="/introducing" element={<IntroducingPage />} />

          {/* c3 pillar */}
          <Route path="/c3">
            <Route
              index
              element={
                <ConnectPage
                  onNavigate={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />
            <Route
              path="connect"
              element={
                <ConnectPage
                  onNavigate={function (id: string): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />
            <Route
              path="contribute"
              element={
                <ContributePage
                  onNavigate={function (
                    id:
                      | "connect"
                      | "contribute"
                      | "create"
                      | "home"
                      | "restore"
                      | "measures"
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />
            <Route
              path="create"
              element={
                <CreatePage
                  onNavigate={function (
                    id:
                      | "connect"
                      | "contribute"
                      | "create"
                      | "home"
                      | "restore"
                      | "measures"
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />
          </Route>

          {/* restore */}
          <Route path="/restore" element={<RestorePage />} />

          {/* artists */}
          <Route path="/artists" element={<ArtistsPage />} />
        </Route>

        {/* MEASURES — sealed temple */}
<Route path="/measures" element={<MeasuresLayout />}>
  <Route index element={<TempleHome />} />

  {/* frontmatter */}
  <Route path="frontmatter" element={<MeasuresFrontmatter />} />

  {/* Obsidian entry = Kumarrah passage -> index overlay */}
  <Route path="gates" element={<ObsidianGateIntro />} />

  {/* Plates */}
  <Route path="gates/:gateId" element={<ObsidianGatePlate />} />

  {/* Later (optional, keep if you want routes live) */}
  <Route path="epithets" element={<CrystalGateIntro />} />
  <Route path="mes" element={<MarbleGateIntro />} />
</Route>

        {/* FALLBACK */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
