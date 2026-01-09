import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <HeroSection
      onNavigate={(id) => {
        if (id === "measures") navigate("/measures");
        if (id === "c3") navigate("/c3");
        if (id === "artists") navigate("/artists");
      }}
    />
  );
}
