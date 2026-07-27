import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, Cpu, ArrowUpRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeSwitch } from './ThemeSwitch';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: (theme: 'light' | 'dark') => void;
  onOpenTerminal: () => void;
  onOpenTelemetry: () => void;
}

const MENU_ITEMS = [
  {
    index: '01',
    code: 'OVERVIEW',
    title: 'Overview & Mission',
    subtitle: 'SYSTEM_SUMMARY · DECIMALS',
    targetId: 'hero',
    description: 'Executive overview, real-time decoder & core architectural focus.'
  },
  {
    index: '02',
    code: 'THOUGHTS',
    title: 'Journal & Strategy',
    subtitle: '0x01_THOUGHTS · PUBLICATIONS',
    targetId: 'blog',
    description: 'Articles on FinOps, distributed sharding, & agentic governance.'
  },
  {
    index: '03',
    code: 'ARCHITECTURE',
    title: 'Evolution of Compute',
    subtitle: 'HISTORICAL_TIMELINE · SCROLLY_VIDEO',
    targetId: 'ai-story',
    description: 'Interactive scrollytelling timeline from mainframe to Kardashev scale.'
  },
  {
    index: '04',
    code: 'SPECS',
    title: 'System Stack & Specs',
    subtitle: '0x02_STACK · PROJECT_RELEASES',
    targetId: 'projects',
    description: 'Deconstructable blueprints, infrastructure code & performance benchmarks.'
  },
  {
    index: '05',
    code: 'LOGS',
    title: 'Career & FinOps Logs',
    subtitle: '0x03_LOGS · CHRONOLOGY',
    targetId: 'experience',
    description: 'Career achievements, node fleet telemetry & impact records.'
  },
  {
    index: '06',
    code: 'CONTACT',
    title: 'Contact',
    subtitle: '0x04_CONTACT · DIRECT_GATEWAY',
    targetId: 'contact',
    description: 'Direct communication gateway.'
  }
];

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenTerminal, onOpenTelemetry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setMenuOpen(false);

    // Smooth scroll after brief delay for menu exit animation
    setTimeout(() => {
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  return (
    <>
      {/* Floating Header Navbar Bar */}
      <nav
        className={`fixed top-3 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[92%] max-w-7xl rounded-full theme-nav z-50 transition-all duration-300 px-3 sm:px-6 py-2 sm:py-3 flex justify-between items-center border shadow-2xl ${
          scrolled ? 'py-1.5 sm:py-2.5 shadow-xl' : ''
        }`}
      >
        {/* Brand logo */}
        <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="flex items-center gap-2 group min-w-0 shrink mr-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[var(--btn-main-bg)] rounded-full flex items-center justify-center text-[var(--btn-main-text)] group-hover:scale-110 transition-transform shadow-md shrink-0">
            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="text-xs sm:text-sm md:text-base font-black tracking-tight font-mono-tech truncate">
            VIPIN GUPTA <span className="opacity-60 font-normal text-[10px] sm:text-xs md:text-sm">· CLOUD FINOPS</span>
          </div>
        </a>

        {/* Right Action Group */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Switcher */}
          <ThemeSwitch theme={theme} onToggle={onToggleTheme} />

          {/* Hamburger Menu Trigger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-[var(--btn-main-bg)] text-[var(--btn-main-text)] rounded-full text-xs font-bold font-mono-tech hover:opacity-90 transition-all duration-200 shadow-md flex items-center gap-1.5 sm:gap-2 active:scale-95 shrink-0"
            aria-label="Toggle Full Page Menu"
          >
            {menuOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            <span className="font-mono-tech font-extrabold tracking-wider">
              {menuOpen ? 'CLOSE' : 'MENU'}
            </span>
          </button>
        </div>
      </nav>

      {/* Full Page Navigation Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl overflow-y-auto flex flex-col justify-between text-[var(--text-primary)]"
          >
            {/* Top Bar Inside Full Overlay */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 flex items-center justify-between border-b border-zinc-900/10 dark:border-zinc-100/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 rounded-full flex items-center justify-center text-white dark:text-zinc-950 font-bold">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="font-mono-tech text-sm sm:text-base font-black tracking-tight uppercase">
                  NAVIGATION_GRID <span className="opacity-50">· SYSTEM_INDEX</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ThemeSwitch theme={theme} onToggle={onToggleTheme} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2.5 rounded-full bg-zinc-900/10 dark:bg-zinc-100/10 hover:bg-zinc-900/20 dark:hover:bg-zinc-100/20 transition-all text-zinc-900 dark:text-zinc-100 font-bold flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Main Menu Links Grid */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 sm:py-12 my-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-mono-tech">
                {MENU_ITEMS.map((item, idx) => (
                  <motion.a
                    key={item.targetId}
                    href={`#${item.targetId}`}
                    onClick={(e) => handleNavClick(e, item.targetId)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.35, delay: idx * 0.05, ease: 'easeOut' }}
                    className="group relative p-6 sm:p-8 rounded-2xl bg-zinc-900/5 dark:bg-zinc-100/5 border border-zinc-900/10 dark:border-zinc-100/10 hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
                  >
                    {/* Top subtitle and index */}
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">
                      <span>{item.subtitle}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/10 dark:bg-zinc-100/10 text-zinc-900 dark:text-zinc-100 text-[10px] group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900 transition-colors">
                        {item.index}
                      </span>
                    </div>

                    {/* Main Title */}
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white uppercase tracking-tight group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <ArrowUpRight className="w-6 h-6 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>

                    {/* Description */}
                    <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Bottom Actions Footer inside Full Overlay */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 border-t border-zinc-900/10 dark:border-zinc-100/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-xs font-bold">
              <div className="text-zinc-500 dark:text-zinc-400">
                MICROSOFT CLOUD FINANCE // ARCHITECTURE PORTFOLIO
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenTelemetry();
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full border border-zinc-900/20 dark:border-zinc-100/20 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-2 transition-all"
                >
                  <Activity className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                  <span>TELEMETRY</span>
                </button>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:opacity-90 flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Terminal className="w-4 h-4" />
                  <span>EXECUTE_CLI</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
