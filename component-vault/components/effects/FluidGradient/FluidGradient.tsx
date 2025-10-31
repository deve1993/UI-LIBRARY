'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { FluidGradientProps, Blob } from './FluidGradient.types';

export const FluidGradient: React.FC<FluidGradientProps> = ({
  colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
  speed = 5,
  blur = 40,
  interactive = true,
  mouseRadius = 200,
  blobCount = 5,
  glow = true,
  glowIntensity = 0.5,
  morphing = true,
  morphSpeed = 0.02,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<Blob[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const [, forceUpdate] = useState({});

  // Initialize blobs with morphing properties
  const initBlobs = () => {
    const blobs: Blob[] = [];
    for (let i = 0; i < blobCount; i++) {
      const radius = 20 + Math.random() * 30;
      blobs.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        radius,
        vx: (Math.random() - 0.5) * speed * 0.2,
        vy: (Math.random() - 0.5) * speed * 0.2,
        color: colors[i % colors.length],
        targetRadius: radius + (Math.random() - 0.5) * 15,
        morphProgress: 0,
      });
    }
    blobsRef.current = blobs;
  };

  // Update blob positions with improved physics
  const updateBlobs = () => {
    blobsRef.current.forEach((blob) => {
      // Mouse interaction with ripple effect
      if (interactive && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const mouseXPercent = ((mouseRef.current.x - rect.left) / rect.width) * 100;
        const mouseYPercent = ((mouseRef.current.y - rect.top) / rect.height) * 100;

        const dx = mouseXPercent - blob.x;
        const dy = mouseYPercent - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius / 10) {
          // Stronger attraction with easing
          const force = (mouseRadius / 10 - distance) / (mouseRadius / 10);
          const easing = 1 - Math.pow(1 - force, 3); // Cubic easing
          blob.vx += (dx / distance) * easing * 0.8;
          blob.vy += (dy / distance) * easing * 0.8;
        }
      }

      // Morphing animation
      if (morphing) {
        blob.morphProgress = (blob.morphProgress || 0) + morphSpeed;
        if (blob.morphProgress >= 1) {
          blob.morphProgress = 0;
          blob.targetRadius = 20 + Math.random() * 30;
        }
        // Smooth interpolation
        const t = blob.morphProgress;
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Ease in-out quad
        blob.radius = blob.radius + ((blob.targetRadius || blob.radius) - blob.radius) * eased * 0.1;
      }

      // Update position
      blob.x += blob.vx;
      blob.y += blob.vy;

      // Bounce off edges with damping
      if (blob.x < -10 || blob.x > 110) {
        blob.vx *= -0.9; // Damping
        blob.x = Math.max(-10, Math.min(110, blob.x));
      }
      if (blob.y < -10 || blob.y > 110) {
        blob.vy *= -0.9; // Damping
        blob.y = Math.max(-10, Math.min(110, blob.y));
      }

      // Apply friction for smoother movement
      blob.vx *= 0.985;
      blob.vy *= 0.985;

      // Maintain minimum speed with smooth acceleration
      const currentSpeed = Math.sqrt(blob.vx * blob.vx + blob.vy * blob.vy);
      if (currentSpeed < speed * 0.05) {
        const targetVx = (Math.random() - 0.5) * speed * 0.15;
        const targetVy = (Math.random() - 0.5) * speed * 0.15;
        blob.vx += (targetVx - blob.vx) * 0.05;
        blob.vy += (targetVy - blob.vy) * 0.05;
      }
    });

    forceUpdate({});
  };

  // Animation loop
  const animate = () => {
    updateBlobs();
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Handle mouse move
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive]);

  // Initialize and start animation
  useEffect(() => {
    initBlobs();
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [blobCount, speed]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 -z-10 overflow-hidden ${className}`}
    >
      {/* Main blobs layer with blur */}
      <div
        className="absolute inset-0"
        style={{
          filter: `blur(${blur}px)`,
          transform: 'scale(1.1)',
        }}
      >
        {blobsRef.current.map((blob, index) => (
          <div
            key={index}
            className="absolute rounded-full opacity-70 transition-all duration-700 ease-out"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: `${blob.radius}%`,
              height: `${blob.radius}%`,
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)',
              mixBlendMode: 'screen',
            }}
          />
        ))}
      </div>

      {/* Glow layer for enhanced effect */}
      {glow && (
        <div
          className="absolute inset-0"
          style={{
            filter: `blur(${blur * 1.5}px)`,
            transform: 'scale(1.15)',
            opacity: glowIntensity,
          }}
        >
          {blobsRef.current.map((blob, index) => (
            <div
              key={`glow-${index}`}
              className="absolute rounded-full transition-all duration-700 ease-out"
              style={{
                left: `${blob.x}%`,
                top: `${blob.y}%`,
                width: `${blob.radius * 0.8}%`,
                height: `${blob.radius * 0.8}%`,
                background: `radial-gradient(circle, ${blob.color}cc 0%, transparent 60%)`,
                transform: 'translate(-50%, -50%)',
                mixBlendMode: 'overlay',
              }}
            />
          ))}
        </div>
      )}

      {/* Overlay gradient for depth */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, ${colors[0]}15 0%, ${colors[colors.length - 1]}15 100%)`,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Subtle noise texture for organic feel */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};
