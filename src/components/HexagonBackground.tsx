
import React from "react";

interface HexagonBackgroundProps {
  dark?: boolean;
}

const HexagonBackground: React.FC<HexagonBackgroundProps> = ({ dark = true }) => {
  // Don't render the hexagon background in light mode
  if (!dark) return null;
  
  return (
    <div className="fixed inset-0 hexagon-bg opacity-20 pointer-events-none z-0" />
  );
};

export default HexagonBackground;
