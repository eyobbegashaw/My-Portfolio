import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaPython, FaPhp, FaJava, FaReact, FaDocker, FaJs, FaNodeJs } from "react-icons/fa";
import { SiLaravel, SiNextdotjs, SiPostgresql, SiMongodb, SiGreensock, SiCplusplus } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const About = ({ aboutSlotRef }) => {
  const sectionRef = useRef(null);

  const skillsData = [
    { name: "Python", level: 90, icon: <FaPython />, color: "#292305ff" },
    { name: "C++", level: 85, icon: <SiCplusplus />, color: "#00599C" },
    { name: "JavaScript", level: 80, icon: <FaJs />, color: "#F7DF1E" },
    { name: "PostgreSQL", level: 70, icon: <SiPostgresql />, color: "#336791" },
    { name: "React", level: 70, icon: <FaReact />, color: "#187a96ff" },
    { name: "Next.js", level: 69, icon: <SiNextdotjs />, color: "#a01e1eff" },
    { name: "MongoDB", level: 68, icon: <SiMongodb />, color: "#a2479dff" },
    { name: "Node.js", level: 65, icon: <FaNodeJs />, color: "#052e05ff" },
    { name: "PHP Laravel", level: 60, icon: <SiLaravel />, color: "#098119ff" },
    { name: "React Native", level: 60, icon: <TbBrandReactNative />, color: "#61DAFB" },
    { name: "GSAP", level: 60, icon: <SiGreensock />, color: "#88CE02" },
    { name: "Java", level: 50, icon: <FaJava />, color: "#210b83ff" },
    { name: "Python Kivy", level: 50, icon: <FaPython />, color: "#3776AB" },
    { name: "Docker", level: 50, icon: <FaDocker />, color: "#051725ff" },
  ];

  useGSAP(() => {
    gsap.utils.toArray(".skill-bar-fill").forEach((bar) => {
      const targetWidth = bar.getAttribute("data-level") + "%";
      gsap.to(bar, {
        width: targetWidth,
        duration: 1.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 95%",
          toggleActions: "play none none reverse",
        }
      });
    });

    gsap.from(".about-info", {
      opacity: 0,
      x: -50,
      duration: 1,
      scrollTrigger: {
        trigger: ".about-info",
        start: "top 80%",
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="min-h-screen w-full bg-gray-50 dark:bg-black py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">

        <div className="about-info lg:w-1/3 space-y-8">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-5xl font-black text-black dark:text-white tracking-tighter italic uppercase underline decoration-gray-300 dark:decoration-gray-700">
              About Me
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 text-base leading-relaxed font-light">
              <p>I am a computer science student at Debre Berhan University with a strong passion for programming and problem-solving.</p>
              <p>I build complete applications from scalable databases to high-performance mobile and web interfaces.</p>
            </div>
          </div>

          {/* Slot for shared profile image - settles here after scroll animation */}
          <div className="relative group w-fit mx-auto lg:mx-0">
            <div ref={aboutSlotRef} className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl" />
            <div className="absolute -inset-4 bg-black/5 dark:bg-white/5 blur-3xl rounded-full -z-10 opacity-50" />
          </div>
        </div>

        <div className="lg:w-2/3 bg-white dark:bg-white/[0.02] border border-gray-300 dark:border-white/5 p-6 md:p-10 rounded-[2.5rem] shadow-lg dark:shadow-2xl">
          <h3 className="text-3xl font-bold text-black dark:text-white mb-10 tracking-widest uppercase opacity-70 border-b border-gray-200 dark:border-white/10 pb-4">
            Technical Stack
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {skillsData.map((skill, index) => (
              <div key={index} className="group relative px-4 py-3 rounded-xl border border-gray-300 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-sm">
                {/* Animated border - travels top → right → bottom → left */}
                <div className="absolute top-0 left-0 h-[2px] w-full rounded-t-xl" style={{ backgroundColor: skill.color, transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 300ms ease' }} />
                <div className="absolute top-0 right-0 h-full w-[2px] rounded-r-xl" style={{ backgroundColor: skill.color, transform: 'scaleY(0)', transformOrigin: 'top', transition: 'transform 300ms ease 75ms' }} />
                <div className="absolute bottom-0 right-0 h-[2px] w-full rounded-b-xl" style={{ backgroundColor: skill.color, transform: 'scaleX(0)', transformOrigin: 'right', transition: 'transform 300ms ease 150ms' }} />
                <div className="absolute bottom-0 left-0 h-full w-[2px] rounded-l-xl" style={{ backgroundColor: skill.color, transform: 'scaleY(0)', transformOrigin: 'bottom', transition: 'transform 300ms ease 225ms' }} />

                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl transition-transform group-hover:scale-110 duration-300" style={{ color: skill.color }}>
                      {skill.icon}
                    </span>
                    <span className="font-bold text-base tracking-wide" style={{ color: skill.color }}>
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold" style={{ color: skill.color }}>
                    {skill.level}%
                  </span>
                </div>

                <div className="h-[8px] w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden p-[1px]">
                  <div
                    className="skill-bar-fill h-full rounded-full relative"
                    data-level={skill.level}
                    style={{
                      width: "0%",
                      backgroundColor: skill.color,
                      boxShadow: `0 0 15px ${skill.color}80`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent dark:from-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;