import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Mail } from 'lucide-react';

// gsap.registerPlugin(ScrollTrigger, useGSAP); // Registered in App.tsx

const socialLinks = [
  { name: 'LinkedIn', href: '#' },
  { name: 'Dribbble', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'Instagram', href: '#' },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const elements = sectionRef.current?.querySelectorAll('.animate-in');
      if (!elements) return;

      elements.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
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
      id="contact"
      className="relative min-h-screen py-32 px-6 md:px-12 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section label */}
        <p className="animate-in text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Get in Touch
        </p>

        {/* Main CTA */}
        <div className="mb-16">
          <h2 className="animate-in text-display text-5xl md:text-7xl lg:text-8xl mb-8">
            Let&apos;s create
            <br />
            <span className="text-accent">something</span>
            <br />
            together.
          </h2>

          <a
            href="mailto:teddyseptiansyah@gmail.com"
            className="animate-in inline-flex items-center gap-4 text-xl md:text-2xl text-muted-foreground hover:text-foreground transition-colors group"
            data-cursor-hover
          >
            <Mail className="w-6 h-6" />
            <span className="relative">
              teddyseptiansyah@gmail.com
              <span className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
            </span>
          </a>
        </div>

        {/* Footer content */}
        <div className="animate-in pt-12 border-t border-border">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Social links */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Follow Me
              </p>
              <div className="flex flex-wrap gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-1 text-foreground hover:text-accent transition-colors group"
                    data-cursor-hover
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="md:text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Based In
              </p>
              <p className="text-foreground">San Francisco, CA</p>
              <p className="text-muted-foreground">Available Worldwide</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Teddy Septiansyah. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Designed & Built with passion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
