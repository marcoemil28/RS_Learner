import { useEffect, useRef } from 'react';
import type { EcgTrace } from './waveform';

interface Props {
  trace: EcgTrace;
  width?: number;
  height?: number;
  pxPerMv?: number;
  msPerPx?: number;
}

export function EkgTrace({ trace, width = 760, height = 220, pxPerMv = 70 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#1a0505';
    ctx.fillRect(0, 0, width, height);

    const smallGrid = 8;
    ctx.strokeStyle = 'rgba(255, 90, 90, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += smallGrid) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += smallGrid) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255, 90, 90, 0.35)';
    for (let x = 0; x <= width; x += smallGrid * 5) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += smallGrid * 5) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const midY = height / 2;
    const n = trace.values.length;
    const xStep = width / n;

    ctx.strokeStyle = '#3dff6e';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    trace.values.forEach((v, i) => {
      const x = i * xStep;
      const y = midY - v * pxPerMv;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [trace, width, height, pxPerMv]);

  return <canvas ref={canvasRef} className="ekg-canvas" />;
}
