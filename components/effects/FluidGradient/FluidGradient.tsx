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
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<Blob[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const [, forceUpdate] = useState({});

  // Initialize blobs
  const initBlobs = () => {
    const blobs: Blob[] = [];
    for (let i = 0; i < blobCount; i++) {
      blobs.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        radius: 20 + Math.random() * 30,
        vx: (Math.random() - 0.5) * speed * 0.2,
        vy: (Math.random() - 0.5) * speed * 0.2,
        color: colors[i % colors.length],
      });
    }
    blobsRef.current = blobs;
  };

  // Update blob positions
  const updateBlobs = () => {
    blobsRef.current.forEach((blob) => {
      // Mouse interaction
      if (interactive && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const mouseXPercent = ((mouseRef.current.x - rect.left) / rect.width) * 100;
        const mouseYPercent = ((mouseRef.current.y - rect.top) / rect.height) * 100;

        const dx = mouseXPercent - blob.x;
        const dy = mouseYPercent - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius / 10) {
          const force = (mouseRadius / 10 - distance) / (mouseRadius / 10);
          blob.vx += (dx / distance) * force * 0.5;
          blob.vy += (dy / distance) * force * 0.5;
        }
      }

      // Update position
      blob.x += blob.vx;
      blob.y += blob.vy;

      // Bounce off edges
      if (blob.x < -10 || blob.x > 110) {
        blob.vx *= -1;
        blob.x = Math.max(-10, Math.min(110, blob.x));
      }
      if (blob.y < -10 || blob.y > 110) {
        blob.vy *= -1;
        blob.y = Math.max(-10, Math.min(110, blob.y));
      }

      // Apply friction
      blob.vx *= 0.98;
      blob.vy *= 0.98;

      // Maintain minimum speed
      const currentSpeed = Math.sqrt(blob.vx * blob.vx + blob.vy * blob.vy);
      if (currentSpeed < speed * 0.05) {
        blob.vx += (Math.random() - 0.5) * speed * 0.1;
        blob.vy += (Math.random() - 0.5) * speed * 0.1;
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
            className="absolute rounded-full opacity-60 transition-all duration-1000"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: `${blob.radius}%`,
              height: `${blob.radius}%`,
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Overlay gradient for better blending */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, ${colors[0]}20 0%, ${colors[colors.length - 1]}20 100%)`,
        }}
      />
    </div>
  );
};
