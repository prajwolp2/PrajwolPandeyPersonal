import React, { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { ACCENT, DARK } from './Scene';

/** A shape that floats, spins slowly, and reacts when the cursor passes over it. */
function Shape({ position, float = 1.2, rotate = 1, speed = 1.2, children, scale = 1 }) {
  const [hover, setHover] = useState(false);
  const inner = useRef();
  useFrame((_, dt) => {
    const m = inner.current;
    if (!m) return;
    const target = hover ? scale * 1.18 : scale;
    m.scale.setScalar(THREE.MathUtils.damp(m.scale.x, target, 6, dt));
    m.rotation.z += dt * (hover ? 0.9 : 0.15);
  });
  return (
    <Float position={position} speed={speed} rotationIntensity={rotate} floatIntensity={float}>
      <group
        ref={inner}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        {typeof children === 'function' ? children(hover) : children}
      </group>
    </Float>
  );
}

/* Layouts keep the objects clear of the text column on desktop and tucked
   into the empty corners on phones. Positions are in world units. */
const DESKTOP = {
  knot: { position: [4.4, 1.2, -1.5], scale: 0.75 },
  ico: { position: [2.5, 0.1, 0], scale: 0.6 },
  ring: { position: [4.5, -2.4, 0], scale: 0.85 },
  octa: { position: [2.5, -1.1, 0.6], scale: 0.55 },
  sphere: { position: [2.2, -2.6, 0.5], scale: 0.3 },
  dodeca: { position: [0.9, 2.4, -1], scale: 0.4 },
};

const MOBILE = {
  knot: { position: [1.3, 2.3, -1], scale: 0.4 },
  ico: { position: [1.35, 0.6, 0], scale: 0.32 },
  ring: { position: [-0.85, -2.45, -0.5], scale: 0.34 },
  octa: null,
  sphere: { position: [1.1, -2.3, 0], scale: 0.22 },
  dodeca: { position: [0.35, -2.45, -1], scale: 0.3 },
};

function Shapes({ mobile }) {
  const group = useRef();
  const L = mobile ? MOBILE : DESKTOP;
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.18, 2.5, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.12, 2.5, dt);
  });

  return (
    <group ref={group}>
      {L.knot && (
        <Shape {...L.knot} float={1.4} rotate={1.4} speed={1}>
          {(hover) => (
            <mesh>
              <torusKnotGeometry args={[0.95, 0.3, 140, 18]} />
              <meshBasicMaterial color={hover ? '#ffffff' : ACCENT} wireframe transparent opacity={0.5} />
            </mesh>
          )}
        </Shape>
      )}

      {L.ico && (
        <Shape {...L.ico} speed={1.6}>
          {(hover) => (
            <mesh>
              <icosahedronGeometry args={[0.9, 0]} />
              <meshStandardMaterial color={hover ? ACCENT : DARK} flatShading roughness={0.45} metalness={0.5} />
              <Edges color={ACCENT} />
            </mesh>
          )}
        </Shape>
      )}

      {L.ring && (
        <Shape {...L.ring} rotate={2} speed={0.9}>
          <mesh rotation={[1.1, 0.4, 0]}>
            <torusGeometry args={[0.9, 0.16, 24, 96]} />
            <meshStandardMaterial color={ACCENT} roughness={0.2} metalness={0.7} />
          </mesh>
        </Shape>
      )}

      {L.octa && (
        <Shape {...L.octa} speed={1.8} float={2}>
          {(hover) => (
            <mesh>
              <octahedronGeometry args={[0.85, 0]} />
              <meshStandardMaterial color={hover ? ACCENT : '#1e1e22'} flatShading roughness={0.35} metalness={0.6} />
              <Edges color={hover ? '#ffffff' : '#8a8a90'} />
            </mesh>
          )}
        </Shape>
      )}

      {L.sphere && (
        <Shape {...L.sphere} speed={2.4} float={2.4}>
          <mesh>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial color={ACCENT} roughness={0.15} metalness={0.4} />
          </mesh>
        </Shape>
      )}

      {L.dodeca && (
        <Shape {...L.dodeca} speed={2} float={1.5}>
          <mesh>
            <dodecahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial color="#26262b" flatShading roughness={0.5} metalness={0.5} />
            <Edges color={ACCENT} />
          </mesh>
        </Shape>
      )}
    </group>
  );
}

function Particles({ count = 700 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 22;
      a[i * 3 + 1] = (Math.random() - 0.5) * 14;
      a[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return a;
  }, [count]);

  useFrame((state) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y = state.clock.elapsedTime * 0.02;
    p.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.25;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#ffffff" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function HeroScene() {
  const { viewport } = useThree();
  const mobile = viewport.width < 7.5;
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <pointLight position={[-4, -2, 4]} color={ACCENT} intensity={40} distance={14} />
      <Particles />
      <Shapes mobile={mobile} />
    </>
  );
}
