import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CustomCursor } from './components/CustomCursor';
import { MouseBackground } from './components/MouseBackground';
import { HeroSection } from './components/HeroSection';
import { HorizontalGallery } from './components/HorizontalGallery';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FloatingNav } from './components/FloatingNav';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
  useGSAP(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="relative noise-fixed">
      {/* Custom cursor (hidden on mobile) */}
      <CustomCursor />

      {/* Mouse-reactive background */}
      <MouseBackground />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <HorizontalGallery />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Floating navigation dock */}
      <FloatingNav />
    </div>
  );
}

export default App;
