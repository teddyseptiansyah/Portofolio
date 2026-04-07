import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// gsap.registerPlugin(ScrollTrigger, useGSAP); // Registered in App.tsx

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Nebula App',
    category: 'Mobile Design',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1000&fit=crop',
  },
  {
    id: 2,
    title: 'Quantum Brand',
    category: 'Brand Identity',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=800&h=1000&fit=crop',
  },
  {
    id: 3,
    title: 'Aurora Dashboard',
    category: 'Web Design',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=1000&fit=crop',
  },
  {
    id: 4,
    title: 'Flux Motion',
    category: 'Motion Design',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=1000&fit=crop',
  },
  {
    id: 5,
    title: 'Echo Platform',
    category: 'UX Design',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=800&h=1000&fit=crop',
  },
];

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const title = titleRef.current;

      if (!section || !container || !title) return;

      const totalWidth = container.scrollWidth - window.innerWidth;

      // Title animation
      gsap.fromTo(
        title,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      // Horizontal scroll
      const horizontalScroll = gsap.to(container, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${container.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax on individual cards
      const cards = container.querySelectorAll('.project-card');
      cards.forEach((card) => {
        const image = card.querySelector('.parallax-image');
        if (image) {
          gsap.fromTo(
            image,
            { x: '-15%' },
            {
              x: '5%',
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  const handleProjectClick = contextSafe((project: Project, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProject(project);

    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Animation for expanding card (handled by Framer Motion or GSAP transition)
    // Here we'll just set state and use conditional rendering with animations
  });

  const closeProject = contextSafe(() => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  });

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Section header */}
      <div className="absolute top-8 left-6 md:left-12 z-20">
        <h2
          ref={titleRef}
          className="text-display text-4xl md:text-6xl lg:text-7xl"
        >
          Selected
          <br />
          <span className="text-muted-foreground">Works</span>
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="horizontal-scroll-container h-screen items-center pt-32 pb-12"
      >
        {/* Spacer for title */}
        <div className="shrink-0 w-[10vw] md:w-[20vw]" />

        {projects.map((project, index) => (
          <article
            key={project.id}
            className="project-card shrink-0 w-[80vw] md:w-[50vw] lg:w-[35vw] h-[70vh] md:h-[75vh] mr-8 md:mr-12 group"
          >
            <button
              onClick={(e) => handleProjectClick(project, e)}
              className="relative block w-full h-full rounded-2xl overflow-hidden bg-secondary text-left"
              data-cursor-hover
            >
              {/* Image with parallax */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="parallax-image w-[120%] h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ marginLeft: '-10%' }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                {/* Project number */}
                <span className="absolute top-6 right-6 text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Category & Year */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs uppercase tracking-wider text-accent">
                    {project.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {project.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-display text-3xl md:text-4xl lg:text-5xl mb-4 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>

                {/* View button */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </button>
          </article>
        ))}

        {/* End spacer */}
        <div className="shrink-0 w-[10vw]" />
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <span className="text-xs text-muted-foreground">01</span>
        <div className="w-32 h-px bg-border relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/5 bg-accent" />
        </div>
        <span className="text-xs text-muted-foreground">
          {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      {/* Full-screen Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={closeProject}
          />

          {/* Project Details Modal */}
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] glass rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-500">
            {/* Close Button */}
            <button
              onClick={closeProject}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-background/50 hover:bg-background transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Image Section */}
              <div className="relative h-64 lg:h-full">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12 overflow-y-auto">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-accent uppercase tracking-widest text-xs font-bold">
                    {selectedProject.category}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {selectedProject.year}
                  </span>
                </div>

                <h2 className="text-display text-4xl md:text-6xl mb-8">
                  {selectedProject.title}
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                  Exploring the boundaries between digital art and functional design. This project represents a shift towards more immersive, motion-driven user experiences that challenge traditional interface paradigms.
                </p>

                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                      Services
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>UX Research</li>
                      <li>Visual Design</li>
                      <li>Interaction Design</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                      Tools
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>Figma</li>
                      <li>React</li>
                      <li>GSAP</li>
                    </ul>
                  </div>
                </div>

                <button className="w-full py-4 bg-foreground text-background rounded-xl font-medium hover:bg-accent hover:text-foreground transition-all duration-300">
                  Launch Live Site
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
