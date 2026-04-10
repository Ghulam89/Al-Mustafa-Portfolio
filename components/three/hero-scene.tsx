"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { PointLight } from "three";

/** Mouse-parallax camera: smooth follow without fighting user scroll (subtle WOW, stable). */
function InteractiveCamera() {
  const { camera, mouse } = useThree();
  const base = useMemo(() => ({ x: 0, y: 0.2, z: 5.2 }), []);

  useFrame(() => {
    const targetX = base.x + mouse.x * 1.35;
    const targetY = base.y + mouse.y * 0.85;
    const targetZ = base.z;
    /* eslint-disable react-hooks/immutability */
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.065);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.065);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.065);
    camera.lookAt(0, 0, 0);
    /* eslint-enable react-hooks/immutability */
  });

  return null;
}

/** Neutral white / warm-gray lights only (no blue / purple gel). */
function DynamicLights({ isLight }: { isLight: boolean }) {
  const keyRef = useRef<PointLight>(null);
  const fillRef = useRef<PointLight>(null);
  const rimRef = useRef<PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const orbit = 3.8;

    if (keyRef.current) {
      keyRef.current.position.set(
        Math.sin(t * 0.42) * orbit,
        Math.cos(t * 0.31) * 2.1,
        Math.cos(t * 0.38) * orbit * 0.55 + 1.2,
      );
      keyRef.current.intensity =
        (isLight ? 1.05 : 1.45) + Math.sin(t * 1.2) * (isLight ? 0.06 : 0.12);
    }
    if (fillRef.current) {
      fillRef.current.position.set(
        Math.cos(t * 0.36) * orbit * 0.75,
        Math.sin(t * 0.52) * 2.4,
        Math.sin(t * 0.36) * orbit,
      );
      fillRef.current.intensity =
        (isLight ? 0.75 : 1.05) + Math.cos(t * 0.9) * (isLight ? 0.05 : 0.1);
    }
    if (rimRef.current) {
      rimRef.current.position.set(
        -3.2 + Math.sin(t * 0.2) * 0.6,
        -1.4 + Math.cos(t * 0.25) * 0.5,
        -2 + Math.sin(t * 0.15),
      );
      rimRef.current.intensity =
        (isLight ? 0.35 : 0.6) + Math.sin(t * 0.8) * (isLight ? 0.05 : 0.08);
    }
  });

  return (
    <>
      <ambientLight intensity={isLight ? 0.72 : 0.42} />
      <directionalLight position={[4, 6, 3]} intensity={isLight ? 0.55 : 0.85} color="#ffffff" />
      <pointLight
        ref={keyRef}
        color="#ffffff"
        intensity={isLight ? 1.0 : 1.5}
        distance={22}
        decay={2}
      />
      <pointLight
        ref={fillRef}
        color="#e2e8f0"
        intensity={isLight ? 0.75 : 1.05}
        distance={20}
        decay={2}
      />
      <pointLight
        ref={rimRef}
        position={[-3, -1.5, -2]}
        color="#cbd5e1"
        intensity={isLight ? 0.4 : 0.65}
        distance={16}
        decay={2}
      />
    </>
  );
}

function SceneContents({ isLight }: { isLight: boolean }) {
  const palette = isLight
    ? {
        starsFactor: 2.4,
        starCount: 900,
        sparkleColor: "#ffffff",
      }
    : {
        starsFactor: 3.2,
        starCount: 2000,
        sparkleColor: "#f1f5f9",
      };

  return (
    <>
      <color attach="background" args={[isLight ? "#f1f5f9" : "#020617"]} />
      <DynamicLights isLight={isLight} />
      <InteractiveCamera />
      <Stars
        radius={88}
        depth={36}
        count={palette.starCount}
        factor={palette.starsFactor}
        saturation={0}
        fade
        speed={0.72}
      />
      <Sparkles
        count={isLight ? 55 : 95}
        scale={16}
        size={isLight ? 1.8 : 2.4}
        speed={0.32}
        opacity={isLight ? 0.28 : 0.42}
        color={palette.sparkleColor}
      />
    </>
  );
}

export function HeroScene() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        key={resolvedTheme ?? "dark"}
        dpr={[1, Math.min(1.75, typeof window !== "undefined" ? window.devicePixelRatio : 1.5)]}
        frameloop="always"
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0.2, 5.2], fov: 64, near: 0.1, far: 100 }}
      >
        <SceneContents isLight={isLight} />
      </Canvas>
    </div>
  );
}
