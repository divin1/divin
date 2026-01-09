"use client";

import { useState, ReactNode, useMemo, useEffect } from "react";

type InteractiveGradientBackgroundProps = {
  children: ReactNode;
  className?: string;
  orbSize?: number;
  orbIntensity?: number;
  gridOpacity?: number;
  gridSize?: number;
  staticGradientFrom?: string;
  staticGradientTo?: string;
  borderGlowFrom?: string;
  borderGlowTo?: string;
  seed?: string;
  variance?: number;
  haloSize?: number;
  haloDelay?: number;
  haloIntensity?: number;
};

export default function InteractiveGradientBackground({
  children,
  className = "",
  orbSize = 192,
  orbIntensity = 0.4,
  gridOpacity = 0.015,
  gridSize = 40,
  staticGradientFrom = "from-primary/5",
  staticGradientTo = "to-primary/3",
  borderGlowFrom = "from-primary/10",
  borderGlowTo = "to-primary/5",
  seed,
  variance = 0.3,
  haloSize = 300,
  haloDelay = 150,
  haloIntensity = 0.15,
}: InteractiveGradientBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [haloPosition, setHaloPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Helper function to convert var(--primary) to rgba
  const getPrimaryWithAlpha = (alpha: number) => {
    return `color-mix(in srgb, var(--primary) ${alpha * 100}%, transparent)`;
  };

  // Generate deterministic random values based on seed
  const variations = useMemo(() => {
    if (!seed) {
      return {
        orbSizeMultiplier: 1,
        orbIntensityOffset: 0,
        gridRotation: 0,
        hueRotation: 0,
      };
    }

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash = hash & hash;
    }

    const random1 = Math.abs(Math.sin(hash)) * variance;
    const random2 = Math.abs(Math.sin(hash * 2)) * variance;
    const random3 = Math.abs(Math.sin(hash * 3)) * variance;
    const random4 = Math.abs(Math.sin(hash * 4)) * variance;

    return {
      orbSizeMultiplier: 1 + (random1 - variance / 2),
      orbIntensityOffset: (random2 - variance / 2) * 0.2,
      gridRotation: (random3 - variance / 2) * 15,
      // Round to avoid hydration mismatch from floating point differences
      hueRotation: Math.round((random4 - variance / 2) * 60 * 100) / 100,
    };
  }, [seed, variance]);

  // Set mounted state after hydration
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Delayed halo effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setHaloPosition(mousePosition);
    }, haloDelay);

    return () => clearTimeout(timeout);
  }, [mousePosition, haloDelay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const adjustedOrbSize = orbSize * variations.orbSizeMultiplier;
  const adjustedOrbIntensity = Math.max(
    0.1,
    Math.min(1, orbIntensity + variations.orbIntensityOffset)
  );

  return (
    <div
      className={`group relative overflow-hidden rounded-lg ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        // Only apply filter after mount to avoid hydration mismatch
        filter: isMounted && seed ? `hue-rotate(${variations.hueRotation}deg)` : undefined,
      }}
    >
      {/* Background with gradient */}
      <div className="from-background via-background/95 to-background absolute inset-0 bg-gradient-to-br" />

      {/* Delayed halo sphere */}
      <div
        className="pointer-events-none absolute opacity-0 blur-2xl transition-all duration-500 ease-out group-hover:opacity-100"
        style={{
          width: `${haloSize}px`,
          height: `${haloSize}px`,
          background: `radial-gradient(circle, ${getPrimaryWithAlpha(haloIntensity)} 0%, ${getPrimaryWithAlpha(haloIntensity * 0.5)} 40%, transparent 70%)`,
          left: `${haloPosition.x}px`,
          top: `${haloPosition.y}px`,
          transform: "translate(-50%, -50%)",
          boxShadow: `0 0 ${haloSize / 2}px ${getPrimaryWithAlpha(haloIntensity * 0.3)}`,
        }}
      />

      {/* Animated gradient orb that follows mouse */}
      <div
        className="pointer-events-none absolute opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          width: `${adjustedOrbSize}px`,
          height: `${adjustedOrbSize}px`,
          background: `radial-gradient(circle, ${getPrimaryWithAlpha(adjustedOrbIntensity)} 0%, transparent 70%)`,
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Static gradient accents */}
      <div
        className={`absolute inset-0 bg-gradient-to-br via-transparent ${staticGradientFrom} ${staticGradientTo}`}
      />

      {/* Border glow effect */}
      <div
        className={`absolute inset-0 rounded-lg bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${borderGlowFrom} ${borderGlowTo}`}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          backgroundImage: `linear-gradient(${getPrimaryWithAlpha(1)} 1px, transparent 1px), linear-gradient(90deg, ${getPrimaryWithAlpha(1)} 1px, transparent 1px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          transform: `rotate(${variations.gridRotation}deg)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
