'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { AuroraWavesProps, Wave, Star } from './AuroraWaves.types';

export const AuroraWaves: React.FC<AuroraWavesProps> = ({
  colors = ['rgba(0, 255, 255, 0.3)', 'rgba(138, 43, 226, 0.3)', 'rgba(255, 105, 180, 0.3)'],
  speed = 5,
  amplitude = 100,
  waveCount = 3,
  blur = 30,
  parallax = true,
  parallaxIntensity = 0.3,
  backgroundColor = 'rgba(10, 10, 35, 1)',
  shimmer = true,
  showStars = true,
  starCount = 100,
  colorShift = false,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wavesRef = useRef<Wave[]>([]);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);
  const colorShiftRef = useRef(0);
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

  // Initialize stars
  const initStars = () => {
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.5 + Math.random() * 2,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;
  };

  // Helper function to shift color hue
  const shiftColor = (colorStr: string, shift: number): string => {
    // Extract RGB values from rgba string
    const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)\)/);
    if (!match) return colorStr;

    let [, r, g, b, a] = match;
    const rVal = parseInt(r) / 255;
    const gVal = parseInt(g) / 255;
    const bVal = parseInt(b) / 255;
    const alpha = a || '1';

    // Convert RGB to HSL
    const max = Math.max(rVal, gVal, bVal);
    const min = Math.min(rVal, gVal, bVal);
    let h = 0;
    const l = (max + min) / 2;
    const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);

    if (max !== min) {
      if (max === rVal) h = ((gVal - bVal) / (max - min) + (gVal < bVal ? 6 : 0)) / 6;
      else if (max === gVal) h = ((bVal - rVal) / (max - min) + 2) / 6;
      else h = ((rVal - gVal) / (max - min) + 4) / 6;
    }

    // Shift hue
    h = (h + shift) % 1;

    // Convert back to RGB
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let rNew, gNew, bNew;
    if (s === 0) {
      rNew = gNew = bNew = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      rNew = hue2rgb(p, q, h + 1/3);
      gNew = hue2rgb(p, q, h);
      bNew = hue2rgb(p, q, h - 1/3);
    }

    return `rgba(${Math.round(rNew * 255)}, ${Math.round(gNew * 255)}, ${Math.round(bNew * 255)}, ${alpha})`;
  };

  // Draw aurora waves
  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear and draw background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Draw stars background
    if (showStars) {
      ctx.filter = 'none';
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.beginPath();
        ctx.arc(
          (star.x / 100) * width,
          (star.y / 100) * height,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    // Apply blur for waves
    ctx.filter = `blur(${blur}px)`;

    // Update color shift
    if (colorShift) {
      colorShiftRef.current = (colorShiftRef.current + 0.001) % 1;
    }

    // Draw each wave
    wavesRef.current.forEach((wave, index) => {
      const currentColor = colorShift ? shiftColor(wave.color, colorShiftRef.current) : wave.color;

      ctx.globalAlpha = wave.opacity;
      ctx.fillStyle = currentColor;

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

      // Add shimmer effect
      if (shimmer) {
        ctx.globalCompositeOperation = 'lighter';
        const shimmerOpacity = (Math.sin(timeRef.current * 2 + index) * 0.5 + 0.5) * 0.2;
        ctx.globalAlpha = shimmerOpacity;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }
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
    if (showStars) {
      initStars();
    }
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, waveCount, speed, showStars, starCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 h-full w-full ${className}`}
    />
  );
};
