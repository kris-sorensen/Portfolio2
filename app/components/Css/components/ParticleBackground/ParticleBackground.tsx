'use client';

import React, { useEffect, useRef } from 'react';
import './css/particles.css';

const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount = 50;
    const particles: HTMLElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.width = Math.random() * 3 + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDuration = Math.random() * 20 + 10 + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';

      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return <div ref={containerRef} className="particle-background" />;
};

export default ParticleBackground;
