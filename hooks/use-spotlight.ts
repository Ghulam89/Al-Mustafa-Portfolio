"use client";

import { useState } from "react";

export function useSpotlight() {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return { coords, onMove };
}
