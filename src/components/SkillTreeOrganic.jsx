// SkillTree.jsx
import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FaReact,
  FaNodeJs,
  FaFigma,
  FaGithub,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiGreensock,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*                                  CONFIG                                    */
/* -------------------------------------------------------------------------- */

const skills = [
  {
    side: "left",
    title: "Frontend",
    desc: "Building modern responsive interfaces with scalable architecture.",
    skills: [
      { name: "React", percent: "95%", icon: <FaReact /> },
      { name: "Tailwind", percent: "92%", icon: <SiTailwindcss /> },
      { name: "TypeScript", percent: "90%", icon: <SiTypescript /> },
    ],
  },

  {
    side: "right",
    title: "Backend",
    desc: "Developing performant APIs and distributed systems.",
    skills: [
      { name: "Node", percent: "93%", icon: <FaNodeJs /> },
      { name: "MongoDB", percent: "91%", icon: <SiMongodb /> },
      { name: "GSAP", percent: "96%", icon: <SiGreensock /> },
    ],
  },

  {
    side: "left",
    title: "Creative",
    desc: "Crafting immersive experiences and polished UI motion.",
    skills: [
      { name: "Figma", percent: "94%", icon: <FaFigma /> },
      { name: "Motion", percent: "92%", icon: <SiGreensock /> },
      { name: "GitHub", percent: "97%", icon: <FaGithub /> },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                             RESPONSIVE SYSTEM                              */
/* -------------------------------------------------------------------------- */

const BREAKPOINTS = {
  mobile: 768,
};

const SVG_WIDTH = 1440;

export default function SkillTree() {
  const sectionRef = useRef(null);

  const isMobile =
    typeof window !== "undefined"
      ? window.innerWidth < BREAKPOINTS.mobile
      : false;

  /* ---------------------------------------------------------------------- */
  /*                     RESPONSIVE SPACING + CARD SIZE                     */
  /* ---------------------------------------------------------------------- */

  const SPACING = isMobile ? 520 : 680;

  const CARD_WIDTH = isMobile ? 320 : 430;

  const CARD_HEIGHT = isMobile ? 310 : 360;

  const CENTER_X = SVG_WIDTH / 2;

  const BRANCH_OFFSET = isMobile ? 120 : 420;

  const START_Y = 240;

  const layout = useMemo(() => {
    return skills.map((item, i) => {
      const nodeY = START_Y + i * SPACING;

      const cardX =
        item.side === "left"
          ? CENTER_X - BRANCH_OFFSET - CARD_WIDTH
          : CENTER_X + BRANCH_OFFSET;

      const cardY = nodeY - CARD_HEIGHT / 2;

      const branchEndX =
        item.side === "left"
          ? cardX + CARD_WIDTH
          : cardX;

      return {
        ...item,
        nodeY,
        cardX,
        cardY,
        branchEndX,
      };
    });
  }, [SPACING, CARD_WIDTH, CARD_HEIGHT, BRANCH_OFFSET]);

  const svgHeight = START_Y + skills.length * SPACING;

  /* ---------------------------------------------------------------------- */
  /*                                  GSAP                                  */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ----------------------------- MAIN TRUNK ---------------------------- */

      const trunk = document.querySelector(".main-trunk");

      const trunkLength = trunk.getTotalLength();

      gsap.set(trunk, {
        strokeDasharray: trunkLength,
        strokeDashoffset: trunkLength,
      });

      gsap.to(trunk, {
        strokeDashoffset: 0,
        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      /* --------------------------- EACH TREE NODE -------------------------- */

      layout.forEach((_, i) => {
        const branch = document.querySelector(`.branch-${i}`);
        const outline = document.querySelector(`.outline-${i}`);
        const card = document.querySelector(`.card-${i}`);
        const content = document.querySelector(`.content-${i}`);

        if (!branch || !outline || !card || !content) return;

        const branchLength = branch.getTotalLength();
        const outlineLength = outline.getTotalLength();

        gsap.set(branch, {
          strokeDasharray: branchLength,
          strokeDashoffset: branchLength,
        });

        gsap.set(outline, {
          strokeDasharray: outlineLength,
          strokeDashoffset: outlineLength,
        });

        gsap.set(content.children, {
          opacity: 0,
          y: 24,
          scale: 0.9,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        });

        /* ------------------------- BRANCH ANIMATION ------------------------ */

        tl.to(branch, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
        });

        /* ------------------------- BORDER ANIMATION ------------------------ */

        tl.to(
          outline,
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: "power2.out",
          },
          ">-0.2"
        );

        /* ------------------------- CONTENT REVEAL -------------------------- */

        tl.to(
          content.children,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
          },
          ">-0.25"
        );

        /* ---------------------------- FLOAT NODE --------------------------- */

        gsap.to(`.node-${i}`, {
          scale: 1.25,
          repeat: -1,
          yoyo: true,
          duration: 1.8,
          ease: "sine.inOut",
          transformOrigin: "center",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [layout]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-white
        dark:bg-[#020617]
        transition-colors
        duration-300
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[500px]
          bg-cyan-400/10
          blur-[160px]
          pointer-events-none
        "
      />

      {/* SVG TREE SYSTEM */}
      <svg
        className="relative w-full h-auto"
        viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
        preserveAspectRatio="xMidYMin meet"
      >
        {/* ---------------------------------------------------------------- */}
        {/*                              MAIN TRUNK                           */}
        {/* ---------------------------------------------------------------- */}

        <path
          className="
            main-trunk
            stroke-cyan-400
          "
          d={`M ${CENTER_X} 0 L ${CENTER_X} ${svgHeight}`}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* ---------------------------------------------------------------- */}
        {/*                           SKILL NODES                             */}
        {/* ---------------------------------------------------------------- */}

        {layout.map((item, i) => {
          const isLeft = item.side === "left";

          const radius = 11;

          const cardRadius = 36;

          const branchPath = `
            M ${CENTER_X} ${item.nodeY}
            H ${item.branchEndX}
          `;

          const outlinePath = `
            M ${item.cardX + cardRadius} ${item.cardY}
            H ${item.cardX + CARD_WIDTH - cardRadius}
            Q ${item.cardX + CARD_WIDTH} ${item.cardY}
              ${item.cardX + CARD_WIDTH} ${item.cardY + cardRadius}

            V ${item.cardY + CARD_HEIGHT - cardRadius}

            Q ${item.cardX + CARD_WIDTH} ${
            item.cardY + CARD_HEIGHT
          }
              ${item.cardX + CARD_WIDTH - cardRadius}
              ${item.cardY + CARD_HEIGHT}

            H ${item.cardX + cardRadius}

            Q ${item.cardX} ${item.cardY + CARD_HEIGHT}
              ${item.cardX}
              ${item.cardY + CARD_HEIGHT - cardRadius}

            V ${item.cardY + cardRadius}

            Q ${item.cardX} ${item.cardY}
              ${item.cardX + cardRadius}
              ${item.cardY}
            Z
          `;

          return (
            <g key={i}>
              {/* NODE */}
              <circle
                className={`
                  node-${i}
                  fill-cyan-400
                `}
                cx={CENTER_X}
                cy={item.nodeY}
                r={radius}
              />

              {/* BRANCH */}
              <path
                className={`
                  branch-${i}
                  stroke-cyan-400
                `}
                d={branchPath}
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* CARD OUTLINE */}
              <path
                className={`
                  outline-${i}
                  fill-white/[0.04]
                  dark:fill-white/[0.03]
                  stroke-cyan-400
                `}
                d={outlinePath}
                strokeWidth="2"
              />

              {/* ------------------------------------------------------------ */}
              {/*                       FOREIGN OBJECT CARD                    */}
              {/* ------------------------------------------------------------ */}

              <foreignObject
                className={`card-${i}`}
                x={item.cardX}
                y={item.cardY}
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
              >
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  className="
                    w-full
                    h-full
                    rounded-[36px]
                    overflow-hidden
                  "
                >
                  {/* CONTENT */}
                  <div
                    className={`
                      content-${i}
                      relative
                      z-10
                      flex
                      flex-col
                      justify-between
                      h-full
                      p-6
                      md:p-8

                      backdrop-blur-xl

                      bg-white/80
                      dark:bg-white/[0.03]

                      border
                      border-slate-200
                      dark:border-white/10

                      text-slate-900
                      dark:text-white

                      rounded-[36px]

                      shadow-[0_0_40px_rgba(79,246,246,0.10)]
                    `}
                  >
                    {/* TOP */}
                    <div>
                      <h2
                        className="
                          text-2xl
                          md:text-4xl
                          font-black
                          mb-4
                        "
                      >
                        {item.title}
                      </h2>

                      <p
                        className="
                          text-sm
                          md:text-lg
                          leading-relaxed
                          text-slate-600
                          dark:text-white/60
                        "
                      >
                        {item.desc}
                      </p>
                    </div>

                    {/* SKILLS */}
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        md:gap-4
                      "
                    >
                      {item.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="
                            flex
                            flex-col
                            items-center
                            gap-2
                            md:gap-3
                          "
                        >
                          <span
                            className="
                              text-cyan-400
                              text-xl
                              md:text-3xl
                              font-bold
                            "
                          >
                            {skill.percent}
                          </span>

                          <div
                            className="
                              w-14
                              h-14
                              md:w-24
                              md:h-24

                              rounded-full

                              border
                              border-slate-200
                              dark:border-white/10

                              bg-slate-100
                              dark:bg-white/[0.04]

                              flex
                              items-center
                              justify-center

                              text-cyan-400

                              text-3xl
                              md:text-5xl

                              backdrop-blur-md
                            "
                          >
                            {skill.icon}
                          </div>

                          <span
                            className="
                              text-xs
                              md:text-sm

                              text-slate-600
                              dark:text-white/70
                            "
                          >
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* ANIMATED BORDER GLOW */}
                    <div
                      className="
                        absolute
                        inset-0
                        rounded-[36px]
                        pointer-events-none

                        [background:linear-gradient(90deg,transparent,rgba(34,211,238,0.35),transparent)]
                        animate-pulse
                        opacity-60
                      "
                    />
                  </div>
                </div>
              </foreignObject>

              {/* CONNECTOR DOT */}
              <circle
                cx={item.branchEndX}
                cy={item.nodeY}
                r="5"
                className="fill-cyan-400"
              />
            </g>
          );
        })}
      </svg>
    </section>
  );
}