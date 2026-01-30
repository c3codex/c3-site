// src/components/layout/AppLayout.tsx
import { Outlet, useLocation } from "react-router-dom";


export default function AppLayout() {
  const { pathname } = useLocation();
  const inMeasures =
    pathname === "/measures" || pathname.startsWith("/measures/");

  return (
    <>
      <Outlet />
      
    </>
  );
}
