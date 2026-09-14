import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ACCENT } from './Scene';

const COLS = 110;
const ROWS = 44;

/** A grid of points rolling like a slow sea, laid out beneath the camera. */
export default function WaveScene() {
  const ref = useRef();
  const positions = useMemo(() => {
    const a = new Float32Array(COLS * ROWS * 3);
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        a[i++] = (c / (COLS - 1) - 0.5) * 30;
        a[i++] = 0;
        a[i++] = (r / (ROWS - 1) - 0.5) * 12;
      }
    }
    return a;
  }, []);

  useFrame((state) => {
    const geo = ref.current && ref.current.geometry;
    if (!geo) return;
    const t = state.clock.elapsedTime;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, Math.sin(x * 0.45 + t * 0.9) * 0.35 + Math.cos(z * 0.6 + t * 0.6) * 0.3);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref} position={[0, -1.4, 0]} rotation={[0.25, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color={ACCENT} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}
