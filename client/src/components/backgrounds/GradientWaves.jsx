import { lazy, Suspense } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

// Lazy-load the heavy WebGL background so it doesn't block the initial paint
const GradientWavesCore = lazy(() => import('../../reactbits/GradientWaves'));

/**
 * GradientWavesBackground
 *
 * Wraps the React Bits GradientWaves component in an isolated, swappable
 * component. Sits behind all hero content (z-0). Falls back to a CSS
 * gradient when the user prefers reduced motion or WebGL isn't available.
 */
const GradientWavesBackground = () => {
  const reduced = useReducedMotion();

  if (reduced) {
    // Static CSS fallback — no animation
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, #3b1fa8 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #7c3aed 0%, transparent 55%), linear-gradient(135deg, #0a0a0f 0%, #1a0a3e 100%)',
        }}
      />
    );
  }

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      <Suspense
        fallback={
          <div
            className="h-full w-full"
            style={{
              background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a3e 100%)',
            }}
          />
        }
      >
        <GradientWavesCore
          horizonColor="#3b1fa8"
          waveColor="#8b5cf6"
          crestColor="#c4b5fd"
          backgroundColor="#0a0a0f"
          speed={0.3}
          amplitude={2}
          opacity={0.85}
          brightness={0.9}
          quality="medium"
          mouseInteraction
          swellOnClick
          className="h-full w-full"
        />
      </Suspense>
    </div>
  );
};

export default GradientWavesBackground;
