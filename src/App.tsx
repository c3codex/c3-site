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
// import RestorePage from "@/pages/restore/RestorePage";
import ArtistsPage from "@/pages/artists/ArtistsPage";

// measures
import ObsidianGatePlate from "@/pages/measures/gates/ObsidianGatePlate";

// ...

<Route path="/measures" element={<MeasuresLayout />}>
  {/* ... */}
  <Route path="gates/:gateId" element={<ObsidianGatePlate />} />
</Route>
import TempleHome from "@/pages/measures/MeasuresTempleHome";
import ObsidianGateIntro from "@/pages/measures/gates/ObsidianGateIntro";
import CrystalGateIntro from "@/pages/measures/epithets/CrystalGateIntro";
import MarbleGateIntro from "@/pages/measures/mes/MarbleGateIntro";
import PlatePage from "@/pages/measures/PlatePage";
import RestorePage from "./pages/restore/RestorePage";
import ObsidianGatesIndex from "./pages/measures/gates/ObsidianGatesIndex";
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
            <Route index element={<ConnectPage onNavigate={function (): void {
              throw new Error("Function not implemented.");
            } } />} />
            <Route path="connect" element={<ConnectPage onNavigate={function (id: string): void {
              throw new Error("Function not implemented.");
            } } />} />
            <Route path="contribute" element={<ContributePage onNavigate={function (id: "connect" | "contribute" | "create" | "home" | "restore" | "measures"): void {
              throw new Error("Function not implemented.");
            } } />} />
            <Route path="create" element={<CreatePage onNavigate={function (id: "connect" | "contribute" | "create" | "home" | "restore" | "measures"): void {
              throw new Error("Function not implemented.");
            } } />} />
          </Route>

          {/* restore */}
          <Route path="/restore" element={<RestorePage />} />

          {/* artists */}
          <Route path="/artists" element={<ArtistsPage />} />
        </Route>

        {/* MEASURES — sealed temple */}
        <Route path="/measures" element={<MeasuresLayout />}>
          <Route index element={<TempleHome />} />
          <Route path="gates" element={<ObsidianGateIntro />} />
          <Route path="gates" element={<ObsidianGatesIndex />} />
          <Route path="gates/intro" element={<ObsidianGateIntro />} />
          <Route path="epithets" element={<CrystalGateIntro />} />
          <Route path="mes" element={<MarbleGateIntro />} />
    
         {/* Obsidian gate plates (Option 1: /measures/gates/gate1) */}
           <Route path="gates/:gateId" element={<ObsidianGatePlate />} />

          <Route path="epithets/:plateId" element={<PlatePage section={"gates"} />} />
          <Route path="mes/:plateId" element={<PlatePage section={"gates"} />} />
        </Route>

      </Routes>
    </AppProvider>
  );
};

export default App;
