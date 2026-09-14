import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';

export const ACCENT = '#ff5a36';
export const DARK = '#141416';

const CanvasHost = lazy(() => import('./CanvasHost'));

class Boundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function webglOk() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

/**
 * Hosts a 3D scene. The WebGL code is downloaded only once the scene is near
 * the viewport, and the frame loop pauses while it is scrolled out of view.
 */
export default function Scene({ children, className, style, camera, dpr = [1, 1.5] }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!webglOk()) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setMounted(true);
      },
      { rootMargin: '160px 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style} aria-hidden="true">
      {mounted && (
        <Boundary>
          <Suspense fallback={null}>
            <CanvasHost camera={camera} dpr={dpr} visible={visible}>
              {children}
            </CanvasHost>
          </Suspense>
        </Boundary>
      )}
    </div>
  );
}
