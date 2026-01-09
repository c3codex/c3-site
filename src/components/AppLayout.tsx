import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-obsidian">
      {/* Header / Nav — NEVER appears on / or /measures */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-3 flex gap-6 text-sm items-center">
          <TopLink to="/introducing">Introducing</TopLink>
          <TopLink to="/c3">c3</TopLink>
          <TopLink to="/restore">Restore</TopLink>
          <TopLink to="/artists">Artists</TopLink>
        </div>
      </nav>

      {/* Render active page */}
      <Outlet />
    </div>
  );
}

function TopLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `font-sans uppercase tracking-wider transition ${
          isActive ? "text-gold" : "text-stone-400 hover:text-stone-200"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
