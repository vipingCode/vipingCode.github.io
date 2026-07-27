import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const CursorTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 4,
        opacity: 0.6,
      };

      setParticles((prev) => [...prev.slice(-12), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const timer = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            opacity: p.opacity - 0.08,
            size: p.size * 0.92,
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 40);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, [enabled]);

  return (
    <>
      {enabled &&
        particles.map((p) => (
          <div
            key={p.id}
            className="cursor-trail"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
            }}
          />
        ))}
    </>
  );
};
