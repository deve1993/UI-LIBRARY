'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { AuroraWavesProps, Wave } from './AuroraWaves.types';

export const AuroraWaves: React.FC<AuroraWavesProps> = ({
  colors = ['rgba(0, 255, 255, 0.3)', 'rgba(138, 43, 226, 0.3)', 'rgba(255, 105, 180, 0.3)'],
  speed = 5,
  amplitude = 100,
  waveCount = 3,
  blur = 30,
  parallax = true,
  parallaxIntensity = 0.3,
  backgroundColor = 'rgba(10, 10, 35, 1)',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wavesRef = useRef<Wave[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize waves
  const initWaves = () => {
    const waves: Wave[] = [];
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        offset: Math.random() * Math.PI * 2,
        frequency: 0.01 + Math.random() * 0.02,
        amplitude: amplitude * (0.5 + Math.random() * 0.5),
        speed: (speed / 100) * (0.5 + Math.random() * 0.5),
        color: colors[i % colors.length],
        opacity: 0.3 + Math.random() * 0.4,
      });
    }
    wavesRef.current = waves;
  };

  // Draw aurora waves
  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear and draw background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Apply blur
    ctx.filter = `blur(${blur}px)`;

    // Draw each wave
    wavesRef.current.forEach((wave, index) => {
      ctx.globalAlpha = wave.opacity;
      ctx.fillStyle = wave.color;

      ctx.beginPath();
      ctx.moveTo(0, height);

      // Generate wave path
      for (let x = 0; x <= width; x += 5) {
        const baseY = height / 2;

        // Primary wave
        const y1 = Math.sin(x * wave.frequency + wave.offset + timeRef.current * wave.speed) * wave.amplitude;

        // Secondary wave for complexity
        const y2 = Math.sin(x * wave.frequency * 1.5 + wave.offset * 1.3 + timeRef.current * wave.speed * 0.7) * wave.amplitude * 0.5;

        // Parallax offset based on mouse position
        let parallaxOffset = 0;
        if (parallax) {
          parallaxOffset = (mouseRef.current.x - 0.5) * width * parallaxIntensity * (index + 1) / waveCount;
        }

        const y = baseY + y1 + y2 + (mouseRef.current.y - 0.5) * amplitude * parallaxIntensity;

        ctx.lineTo(x + parallaxOffset, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Add glow effect
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = wave.opacity * 0.3;
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    });

    ctx.filter = 'none';
    ctx.globalAlpha = 1;

    // Increment time
    timeRef.current += 0.05;
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    draw(ctx, canvas.width, canvas.height);

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Handle mouse move for parallax
  useEffect(() => {
    if (!parallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [parallax]);

  // Initialize and start animation
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    initWaves();
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, waveCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 h-full w-full ${className}`}
    />
  );
};
