import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

/** The actual WebGL canvas. Loaded lazily so Three.js stays out of the main bundle. */
export default function CanvasHost({ children, camera, dpr, visible }) {
  return (
    <Canvas
      dpr={dpr}
      camera={camera}
      frameloop={visible ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
