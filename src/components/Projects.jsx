import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "AI Learning Platform",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/eyobbegashaw/ai-learning",
    demo: "https://ai-learning-demo.vercel.app",
  },
  {
    id: 2,
    title: "E-Commerce Mobile",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/eyobbegashaw/ecommerce-app",
    demo: "https://ecommerce-demo.vercel.app",
  },
  {
    id: 3,
    title: "Portfolio Dashboard",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/eyobbegashaw/dashboard",
    demo: "https://dashboard-demo.vercel.app",
  },
  {
    id: 4,
    title: "REST API Service",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/eyobbegashaw/api-service",
    demo: "https://api-demo.vercel.app",
  },
  {
    id: 5,
    title: "ML Prediction Model",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/eyobbegashaw/ml-model",
    demo: "https://ml-demo.vercel.app",
  },
  {
    id: 6,
    title: "Blockchain Tracker",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/eyobbegashaw/blockchain",
    demo: "https://blockchain-demo.vercel.app",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".project-card");
    const floatingText = gsap.utils.toArray(".floating-title-h2");
    const grid = ".projects-grid";

    gsap.set(grid, {
      transformPerspective: 2000,
      rotateX: 75,
      y: 50,
      scale: 0.9,
    });

    gsap.set(cards, {
      rotateX: -90,
      transformOrigin: "top center",
      opacity: 0.2,
      filter: "blur(4px)",
    });

    gsap.set(floatingText, {
      y: 20,
      opacity: 0.5,
      scale: 1.1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2500",
        pin: true,
        scrub: 1.2,
      },
    });

    tl.to(
      floatingText,
      {
        y: -220,
        opacity: 0.05,
        scale: 0.8,
        duration: 1,
      },
      0
    )
      .to(
        cards,
        {
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "elastic.out(1, 0.75)",
          stagger: 0.1,
        },
        0.2
      )
      .to(
        grid,
        {
          rotateX: 0,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0.2
      );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-screen w-full overflow-hidden bg-white dark:bg-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />

      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <h2 className="floating-title-h2 text-[14vw] font-black tracking-tighter text-black/20 dark:text-white/5 uppercase italic backdrop-blur-sm bg-white/10 dark:bg-black/5 rounded-xl">
          Projects
        </h2>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-5xl items-center justify-center px-4">
        <div
          className="projects-grid grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((p) => (
            <div
              key={p.id}
              className="project-card group relative h-[260px] cursor-pointer overflow-hidden rounded-2xl border border-gray-300 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-lg dark:shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated border - travels top → right → bottom → left */}
              <div className="absolute top-0 left-0 h-[2px] w-full bg-gray-700 dark:bg-white/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="absolute top-0 right-0 h-full w-[2px] bg-gray-700 dark:bg-white/60 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top delay-75" />
              <div className="absolute bottom-0 right-0 h-[2px] w-full bg-gray-700 dark:bg-white/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right delay-150" />
              <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gray-700 dark:bg-white/60 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom delay-[225ms]" />
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-black/10 dark:bg-white/10 blur-2xl" />

              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-black dark:via-black/60 dark:to-transparent" />

              <div className="relative z-10 flex h-full flex-col justify-between p-5">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                    0{p.id}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-black dark:text-white">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-white/60">{p.category}</p>
                </div>

                <div className="flex gap-4">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-600 dark:text-white/70 hover:text-black dark:hover:text-white transition"
                  >
                    GitHub →
                  </a>

                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-600 dark:text-white/70 hover:text-black dark:hover:text-white transition"
                  >
                    Live Demo →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;