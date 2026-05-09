// Header.jsx
import React, { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Certificates", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/10 dark:border-white/10' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-2xl font-black tracking-tighter text-black dark:text-white group"
        >
          EYOB
        </a>

        <nav className="hidden md:flex items-center gap-8 bg-black/5 dark:bg-white/5 backdrop-blur-xl px-8 py-3 rounded-full border border-black/10 dark:border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xl text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform"
            aria-label="Toggle theme"
          >
            {isDark ? <IoMdSunny /> : <IoMdMoon />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 text-3xl text-black dark:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-white dark:bg-black backdrop-blur-2xl z-[90] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-3xl font-black uppercase tracking-tighter text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;