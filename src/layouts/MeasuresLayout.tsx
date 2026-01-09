import React from "react";
import { Outlet } from "react-router-dom";

export default function MeasuresLayout() {
  return (
    <div className="min-h-screen bg-obsidian text-stone-100">
      {/* NO NAV. sealed realm */}
      <Outlet />
    </div>
  );
}
