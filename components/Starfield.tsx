import React, { useRef, useEffect, useCallback } from 'react';
import type { Star } from '../types';

interface StarfieldProps {
  numStars?: number;
  speed?: number;
}

const Starfield: React.FC<StarfieldProps> = ({ numStars = 500, speed = .5 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);

  const setup = useCallback((canvas: HTMLCanvasElement) => {
    starsRef.current = [];
    for (let i = 0; i < numStars; i++) {
      starsRef.current.push({
        x: (Math.random() - 0.5) * canvas.width,
        y: (Math.random() - 0.5) * canvas.height,
        z: Math.random() * canvas.width,
      });
    }
  }, [numStars]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const draw = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        star.z -= speed;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * canvas.width;
          star.y = (Math.random() - 0.5) * canvas.height;
          star.z = canvas.width;
        }

        const sx = (star.x / star.z) * centerX + centerX;
        const sy = (star.y / star.z) * centerY + centerY;
        
        if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) {
            continue;
        }

        const radius = Math.max(0, (1 - star.z / canvas.width) * 1);
        
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setup(canvas);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    draw(); // Start the animation loop

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [setup, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      aria-hidden="true"
    />
  );
};

export default Starfield;