import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// gsap.registerPlugin(ScrollTrigger, useGSAP); // Registered in App.tsx

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const name = nameRef.current;
      const role = roleRef.current;
      const tagline = taglineRef.current;
      const content = contentRef.current;

      if (!name || !role || !tagline || !content) return;

      // Kill any existing animations to prevent conflicts
      gsap.killTweensOf([name, role, tagline, content]);

      // Initial animation - Focus on opacity and smooth entrance
      const tl = gsap.timeline({ 
        delay: 0.3,
        onComplete: () => {
          // Clear props to ensure scroll parallax takes over cleanly
          gsap.set([name, role, tagline], { clearProps: 'transform' });
        }
      });

      tl.fromTo(
        name,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out' }
      )
        .fromTo(
          role,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
          '-=1.2'
        )
        .fromTo(
          tagline,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
          '-=0.8'
        );

      // Scroll-triggered parallax on the entire content wrapper
      gsap.to(content, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Individual subtle parallax for depth using yPercent
      gsap.to(name, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 animated-mesh-gradient" />
      <div className="noise-overlay z-[1]" />
      
      <div ref={contentRef} className="relative z-10 text-center max-w-[90vw] parallax-wrap">
        {/* Role badge */}
        <p
          ref={roleRef}
          className="text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground mb-6 md:mb-8"
        >
          Creative Technologist
        </p>

        {/* Massive name typography */}
        <h1
          ref={nameRef}
          className="text-display text-[15vw] md:text-[12vw] lg:text-[10vw] text-blend leading-[0.9] text-primary"
        >
          Jordan
          <br />
          Lee
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl mx-auto mt-12 md:mt-16"
        >
          Crafting Digital Experiences
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-border to-transparent" />
      <div className="absolute top-1/3 right-8 w-px h-48 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
    </section>
  );
}
