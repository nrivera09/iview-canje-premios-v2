'use client';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

type ConfettiCanvasProps = {
  /** Cantidad inicial de confettis */
  count?: number;
  /** Colores disponibles */
  colors?: string[];
  /** Retraso antes de iniciar (ms) */
  delay?: number;
  /** Inicia automáticamente al montar */
  autoStart?: boolean;
  /** Clase extra para el canvas (opcional) */
  className?: string;
  /** Cubrir toda la ventana (default true). Si false, usa el tamaño del contenedor */
  fullScreen?: boolean;
};

type Confetti = {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
};

const defaultColors = ['#FF007A', '#7A00FF', '#00FF7A', '#FFD700', '#00D4FF'];

const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({
  count = 200,
  colors = defaultColors,
  delay = 800,
  autoStart = true,
  className,
  fullScreen = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef<boolean>(false);
  const confettisRef = useRef<Confetti[]>([]);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const width = fullScreen ? window.innerWidth : canvas.clientWidth;
    const height = fullScreen ? window.innerHeight : canvas.clientHeight;

    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const createConfetti = (
    w: number,
    h: number,
    palette: string[]
  ): Confetti => {
    return {
      x: Math.random() * w,
      y: Math.random() * h - h,
      size: Math.random() * 10 + 5,
      color: palette[Math.floor(Math.random() * palette.length)],
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 5 + 2,
      rotation: Math.random() * 360,
    };
  };

  const initConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = fullScreen ? window.innerWidth : canvas.clientWidth;
    const h = fullScreen ? window.innerHeight : canvas.clientHeight;

    confettisRef.current = [];
    for (let i = 0; i < count; i++) {
      confettisRef.current.push(createConfetti(w, h, colors));
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = fullScreen ? window.innerWidth : canvas.clientWidth;
    const h = fullScreen ? window.innerHeight : canvas.clientHeight;

    ctx.clearRect(0, 0, w, h);

    const confettis = confettisRef.current;
    for (let i = confettis.length - 1; i >= 0; i--) {
      const c = confettis[i];
      c.x += c.speedX;
      c.y += c.speedY;
      c.rotation += c.speedX;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate((c.rotation * Math.PI) / 180);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
      ctx.restore();

      if (c.y > h) {
        confettis.splice(i, 1);
      }
    }

    if (confettis.length > 0) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      rafRef.current = null; // terminó
    }
  };

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    resizeCanvas();
    initConfetti();
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    resizeCanvas();

    let timer: number | undefined;
    if (autoStart) {
      timer = window.setTimeout(start, delay);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timer) window.clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, delay, fullScreen, count, colors.join(',')]);

  // Exponer un método imperativo (opcional): puedes convertirlo a forwardRef si lo necesitas
  // para disparar start() desde el padre.

  return (
    <canvas
      ref={canvasRef}
      className={clsx(`className !z-0`)}
      style={{
        display: 'block',
        position: fullScreen ? 'fixed' : 'relative',
        inset: fullScreen ? 0 : undefined,
        pointerEvents: 'none',
        zIndex: 9999,
        width: fullScreen ? '100vw' : undefined,
        height: fullScreen ? '100vh' : undefined,
      }}
    />
  );
};

export default ConfettiCanvas;
