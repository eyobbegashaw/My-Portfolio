import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/flip';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Certificates from './components/Certificate';
import SkillTreeOrganic from './components/SkillTreeOrganic';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger, Flip);

function App() {
  const appRef = useRef(null);
  const homeSlotRef = useRef(null);
  const aboutSlotRef = useRef(null);
  const sharedImageRef = useRef(null);
  const hasMovedToAbout = useRef(false);

  useEffect(() => {
    // Initially place image in Home slot
    if (sharedImageRef.current && homeSlotRef.current) {
      homeSlotRef.current.appendChild(sharedImageRef.current);
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top 70%',
        end: 'top 30%',
        scrub: 1.5,
        onUpdate: (self) => {
          if (!sharedImageRef.current) return;

          const hasMoved = hasMovedToAbout.current;
          const progress = self.progress;

          if (progress > 0.3 && !hasMoved) {
            hasMovedToAbout.current = true;
            const state = Flip.getState(sharedImageRef.current);
            aboutSlotRef.current.appendChild(sharedImageRef.current);
            Flip.from(state, {
              duration: 1.2,
              ease: 'power2.inOut',
              absolute: true,
              scale: true,
            });
          }
          else if (progress <= 0.3 && hasMoved) {
            hasMovedToAbout.current = false;
            const state = Flip.getState(sharedImageRef.current);
            homeSlotRef.current.appendChild(sharedImageRef.current);
            Flip.from(state, {
              duration: 1.2,
              ease: 'power2.inOut',
              absolute: true,
              scale: true,
            });
          }
        },
      });
    }, appRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={appRef} className="bg-white dark:bg-black text-black dark:text-white min-h-screen font-sans overflow-x-hidden transition-colors duration-300">
      <Header />

      <img
        ref={sharedImageRef}
        src="/images/photo.png"
        alt="Eyob Begashaw"
        className="w-72 h-72 md:w-96 md:h-96 rounded-full object-cover shadow-2xl"
      />

      <main>
        <Home homeSlotRef={homeSlotRef} />
        <About aboutSlotRef={aboutSlotRef} />
        <Projects />
        <Certificates />
        <SkillTreeOrganic />
        <Contact />
      </main>

      <footer className="py-8 text-center border-t border-black/10 dark:border-white/10">
        <div className="container mx-auto px-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Eyob Begashaw. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
