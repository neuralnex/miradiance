import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scaleRef = useRef(1);
  const targetScaleRef = useRef(1);

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('group')
      ) {
        targetScaleRef.current = 2.5;
      } else {
        targetScaleRef.current = 1;
      }
    };

    let raf: number;

    function animate() {
      raf = requestAnimationFrame(animate);

      const pos = posRef.current;
      pos.x += (pos.targetX - pos.x) * 0.15;
      pos.y += (pos.targetY - pos.y) * 0.15;

      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.12;

      if (cursor) {
        cursor.style.transform = `translate(${pos.x - 12}px, ${pos.y - 12}px) scale(${scaleRef.current})`;
      }
    }

    animate();

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        border: '1px solid white',
        backgroundColor: 'transparent',
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        mixBlendMode: 'difference',
        willChange: 'transform',
      }}
    />
  );
}
