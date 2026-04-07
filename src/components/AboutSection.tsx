import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// gsap.registerPlugin(ScrollTrigger, useGSAP); // Registered in App.tsx

const skills = [
  'UI/UX Design',
  'Brand Identity',
  'Motion Design',
  'Web Development',
  'Creative Direction',
  'Prototyping',
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const elements = sectionRef.current?.querySelectorAll('.animate-in');
      if (!elements) return;

      elements.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
            delay: index * 0.1,
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-32 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="animate-in text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
          About
        </p>

        {/* Main statement */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-24">
          <h2 className="animate-in text-display text-4xl md:text-5xl lg:text-6xl">
            I design digital products that people{' '}
            <span className="text-accent">love</span> to use.
          </h2>

          <div className="space-y-6">
            <p className="animate-in text-lg text-muted-foreground leading-relaxed">
              With over 8 years of experience in digital design, I specialize in
              creating immersive experiences that bridge the gap between
              aesthetics and functionality.
            </p>
            <p className="animate-in text-lg text-muted-foreground leading-relaxed">
              My approach combines strategic thinking with meticulous attention
              to detail, ensuring every project delivers both visual impact and
              measurable results.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="animate-in grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 py-12 border-y border-border">
          {[
            { value: '8+', label: 'Years Experience' },
            { value: '50+', label: 'Projects Completed' },
            { value: '30+', label: 'Happy Clients' },
            { value: '12', label: 'Awards Won' },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-display text-4xl md:text-5xl text-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="animate-in">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Expertise
          </p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-6 py-3 rounded-full border border-border text-sm hover:bg-secondary hover:border-accent transition-all duration-300"
                data-cursor-hover
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
