import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function MouseBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradient1Ref = useRef<HTMLDivElement>(null);
  const gradient2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gradient1 = gradient1Ref.current;
    const gradient2 = gradient2Ref.current;
    if (!gradient1 || !gradient2) return;

    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 100;
      targetY = (e.clientY / innerHeight - 0.5) * 100;

      gsap.to(gradient1, {
        x: targetX * 0.5,
        y: targetY * 0.5,
        duration: 1.5,
        ease: 'power2.out',
      });

      gsap.to(gradient2, {
        x: -targetX * 0.3,
        y: -targetY * 0.3,
        duration: 2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary gradient orb */}
      <div
        ref={gradient1Ref}
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.15]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 70%)',
          top: '10%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(100px)',
        }}
      />
      
      {/* Secondary gradient orb */}
      <div
        ref={gradient2Ref}
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.1]"
        style={{
          background: 'radial-gradient(circle, hsl(200 90% 50% / 0.5) 0%, transparent 70%)',
          top: '70%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
}
