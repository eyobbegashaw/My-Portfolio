import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaAward, FaBuilding, FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const certificatesData = [
  {
    id: 1,
    title: "Video Editing",
    provider: "Zewd Tech",
    category: "Design",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    link: "/certificates/Video Editing_Eyob Begashaw  .png",
  },
  {
    id: 2,
    title: "Graphics Design",
    provider: "Zewd Tech",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    link: "/certificates/Graphics Design_Eyob Begashaw  .png",
  },
  {
    id: 3,
    title: "Digital Management",
    provider: "Zewd Tech",
    category: "Business",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    link: "/certificates/Digital Marketing_Eyob Begashaw  .png",
  },
  {
    id: 4,
    title: "Artificial Intelligence",
    provider: "Udacity",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    link: "/certificates/artificial_intelligence.pdf",
  },
  {
    id: 5,
    title: "Data Science",
    provider: "Udacity",
    category: "Data",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    link: "/certificates/data.pdf",
  },
  {
    id: 6,
    title: "Android Development",
    provider: "Udacity",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&w=800&q=80",
    link: "/certificates/adroid_development.pdf",
  },
];

const Certificates = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".cert-card");
    const floatingText = gsap.utils.toArray(".floating-cert-title");
    const grid = ".cert-grid";

    gsap.set(grid, {
      transformPerspective: 2000,
      rotateX: 75,
      y: 50,
      scale: 0.9,
    });

    gsap.set(cards, {
      rotateX: -90,
      transformOrigin: "top center",
      opacity: 0,
    });

    gsap.set(floatingText, { y: 20, opacity: 0.5, scale: 1.1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000",
        pin: true,
        scrub: 1.5,
      },
    });

    tl.to(
      floatingText,
      {
        y: -250,
        opacity: 0.05,
        scale: 0.7,
        duration: 1,
      },
      0
    )
      .to(
        cards,
        {
          rotateX: 0,
          opacity: 1,
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
      id="certificates"
      className="relative h-screen w-full overflow-hidden bg-white dark:bg-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />

      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <h2 className="floating-cert-title text-[10vw] font-black tracking-tighter text-black/20 dark:text-white/5 uppercase italic backdrop-blur-sm bg-white/10 dark:bg-black/5 rounded-xl">
          Certificates
        </h2>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-center px-6">
        <div
          className="cert-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {certificatesData.map((cert) => (
            <div
              key={cert.id}
              className="cert-card group relative h-[280px] overflow-hidden rounded-3xl border border-gray-300 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-lg dark:shadow-2xl cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated border - travels top → right → bottom → left */}
              <div className="absolute top-0 left-0 h-[2px] w-full bg-gray-700 dark:bg-white/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="absolute top-0 right-0 h-full w-[2px] bg-gray-700 dark:bg-white/60 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top delay-75" />
              <div className="absolute bottom-0 right-0 h-[2px] w-full bg-gray-700 dark:bg-white/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right delay-150" />
              <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gray-700 dark:bg-white/60 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom delay-[225ms]" />
              <img
                src={cert.image}
                alt={cert.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-black dark:via-black/70 dark:to-transparent" />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-black/10 dark:bg-white/10 blur-2xl" />

              <div className="relative z-10 flex h-full flex-col justify-between p-5">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md uppercase tracking-widest">
                      {cert.category}
                    </span>
                    <FaAward className="text-gray-500 dark:text-gray-400 text-lg" />
                  </div>

                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                    <FaBuilding /> {cert.provider}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-xs font-bold text-black dark:text-white uppercase hover:text-gray-500 dark:hover:text-gray-400 transition"
                  >
                    View Certificate
                    <FaExternalLinkAlt />
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

export default Certificates;


