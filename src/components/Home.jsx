import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaDownload, FaArrowRight } from "react-icons/fa";

const portfolioData = {
  personalInfo: {
    name: "Eyob",
    title: "Computer Science Student & Aspiring Full-Stack Developer",
    description: "Passionate about creating innovative solutions and exploring new technologies",
    profileImage: "/images/photo.png",
    resumeUrl: "/resume/eyob-begashaw-resume.pdf"
  }
};

const Home = ({ homeSlotRef }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".hero-text-item", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen w-full flex items-center justify-center bg-white dark:bg-black overflow-hidden px-6 lg:px-20">

      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-black/5 dark:bg-white/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="hero-text space-y-8 z-10">
          <div className="space-y-4">
            <h1 className="hero-text-item text-5xl md:text-8xl font-black text-black dark:text-white tracking-tighter">
              Hi, I'm <span className="text-gray-600 dark:text-gray-400 drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]">{portfolioData.personalInfo.name}</span>
            </h1>
            <h2 className="hero-text-item text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 tracking-wide border-l-4 border-gray-500 dark:border-gray-400 pl-4">
              {portfolioData.personalInfo.title}
            </h2>
            <p className="hero-text-item text-gray-500 dark:text-gray-400 text-lg max-w-lg leading-relaxed font-light">
              {portfolioData.personalInfo.description}
            </p>
          </div>

          <div className="hero-text-item flex flex-wrap gap-5">
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
              className="group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full overflow-hidden transition-all hover:pr-12"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gray-700 dark:bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            <a
              href={portfolioData.personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 border border-black/20 dark:border-white/20 text-black dark:text-white font-bold rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <FaDownload className="text-gray-500 dark:text-gray-400" /> Download Resume
            </a>
          </div>
        </div>

        <div className="hero-image-slot flex justify-center lg:justify-end">
          <div ref={homeSlotRef} className="w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden" />
        </div>

      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] uppercase tracking-[0.3em] text-black dark:text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>

    </section>
  );
};

export default Home;
