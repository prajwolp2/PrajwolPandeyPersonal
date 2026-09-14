import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ACCENT } from './Scene';

const NODES = 16;

function Nodes() {
  const group = useRef();
  const orbits = useMemo(
    () =>
      Array.from({ length: NODES }, (_, i) => ({
        radius: 2.1 + (i % 4) * 0.28,
        tilt: (i / NODES) * Math.PI,
        speed: 0.18 + (i % 5) * 0.06,
        phase: (i * 2.399) % (Math.PI * 2),
        size: 0.055 + (i % 3) * 0.02,
      })),
    []
  );
  const refs = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    orbits.forEach((o, i) => {
      const m = refs.current[i];
      if (!m) return;
      const a = o.phase + t * o.speed;
      const x = Math.cos(a) * o.radius;
      const z = Math.sin(a) * o.radius;
      m.position.set(x * Math.cos(o.tilt), z * Math.sin(o.tilt) * 0.9, z * Math.cos(o.tilt) + x * Math.sin(o.tilt) * 0.3);
    });
  });

  return (
    <group ref={group}>
      {orbits.map((o, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)}>
          <sphereGeometry args={[o.size, 16, 16]} />
          <meshStandardMaterial color={i % 3 === 0 ? '#ffffff' : ACCENT} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Core() {
  const outer = useRef();
  const inner = useRef();
  useFrame((state, dt) => {
    if (outer.current) {
      outer.current.rotation.y += dt * 0.12;
      outer.current.rotation.x = THREE.MathUtils.damp(outer.current.rotation.x, -state.pointer.y * 0.4, 2, dt);
      outer.current.rotation.z = THREE.MathUtils.damp(outer.current.rotation.z, state.pointer.x * 0.4, 2, dt);
    }
    if (inner.current) inner.current.rotation.y -= dt * 0.2;
  });
  return (
    <>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#1a1a1d" flatShading roughness={0.4} metalness={0.6} />
      </mesh>
    </>
  );
}

/** A wireframe core with small nodes orbiting it, a nod to data pipelines. */
export default function NetworkScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <pointLight position={[-3, -1, 3]} color={ACCENT} intensity={14} />
      <Core />
      <Nodes />
    </>
  );
}
