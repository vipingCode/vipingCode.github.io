import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STORY_CARDS = [
  {
    index: "01",
    year: "1960s",
    title: "UTILITY COMPUTING DREAM",
    subtitle: "SERIES 01 · MAINFRAME",
    description: "John McCarthy posits computation delivered as a public utility. Early mainframes lay the conceptual seeds for time-sharing systems and remote terminal access.",
    code: "PAR-01_MAINFRAME",
    coordinates: "19.60 - D01"
  },
  {
    index: "02",
    year: "1999",
    title: "SAAS & INTERNET RAILS",
    subtitle: "SERIES 02 · NETWORK",
    description: "Salesforce pioneers application delivery over HTTP. Enterprise software migrates from local disks to multi-tenant cloud servers across global fiber networks.",
    code: "PAR-02_SAAS_ERA",
    coordinates: "19.99 - D02"
  },
  {
    index: "03",
    year: "2006",
    title: "ELASTIC CLOUD REVOLUTION",
    subtitle: "SERIES 03 · INFRASTRUCTURE",
    description: "AWS introduces EC2 and S3. Hardware transitions from physical server racks into programmable, elastic API primitives available at penny scale.",
    code: "PAR-03_AWS_EC2",
    coordinates: "20.06 - D03"
  },
  {
    index: "04",
    year: "2015",
    title: "CLOUD NATIVE MESH",
    subtitle: "SERIES 04 · CONTAINERS",
    description: "Kubernetes standardizes containerized microservices. Applications break free from fixed infrastructure into dynamic, self-healing cluster meshes.",
    code: "PAR-04_KUBERNETES",
    coordinates: "20.15 - D04"
  },
  {
    index: "05",
    year: "2020s",
    title: "HYPERSCALE AI BACKBONE",
    subtitle: "SERIES 05 · SUPERCOMPUTE",
    description: "Cloud datacenters evolve into multi-gigawatt AI supercomputers. Massive GPU clusters drive trillion-parameter transformer models and real-time reasoning.",
    code: "PAR-05_AI_COMPUTE",
    coordinates: "20.20 - D05"
  },
  {
    index: "06",
    year: "2026",
    title: "AUTONOMOUS AGENTIC CLOUD",
    subtitle: "SERIES 06 · AGENTIC",
    description: "Self-governing LLM agents manage cloud topologies, auto-remediating orphaned assets, rightsizing compute pods, and optimizing cost jitter in real time.",
    code: "PAR-06_AUTONOMOUS",
    coordinates: "20.26 - D06"
  },
  {
    index: "07",
    year: "2030+",
    title: "QUANTUM CLOUD FABRIC",
    subtitle: "SERIES 07 · QUANTUM",
    description: "Hybrid quantum-classical cloud backbones solve cryptographic, chemical, and climate simulation limits beyond the reach of silicon transistors.",
    code: "PAR-07_QUANTUM",
    coordinates: "20.30 - D07"
  },
  {
    index: "08",
    year: "TYPE_I",
    title: "PLANETARY COMPUTE GRID",
    subtitle: "SERIES 08 · HARVEST",
    description: "Orbital solar arrays and planetary fusion compute nodes power interstellar AI reasoning, cementing compute as the central currency of civilization.",
    code: "PAR-08_TYPE_I",
    coordinates: "99.99 - D08"
  }
];

interface StoryCardProps {
  index: string;
  title: string;
  year: string;
  subtitle: string;
  description: string;
  code: string;
  coordinates: string;
}

const StoryCard: React.FC<StoryCardProps> = ({
  index,
  title,
  year,
  subtitle,
  description,
  code,
  coordinates
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 20%"]
  });

  // Reveals smoothly as card enters focus zone with size grow transform
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.65, 0.85], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.28, 0.65, 0.85], [120, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.28, 0.65, 0.85], [0.78, 1.02, 1, 0.92]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="w-full bg-white/95 dark:bg-zinc-950/95 border border-zinc-900/20 dark:border-zinc-100/20 shadow-xl dark:shadow-2xl p-6 sm:p-8 md:p-10 font-mono-tech relative overflow-hidden transition-colors duration-500 rounded-sm"
    >
      {/* Top Brutalist Metadata Header */}
      <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase pb-3 border-b border-zinc-900/15 dark:border-zinc-100/15 mb-6">
        <span>{subtitle}</span>
        <span>{coordinates}</span>
      </div>

      {/* Main Large Title - Editorial Bold Uppercase */}
      <div className="mb-6">
        <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-zinc-950 dark:text-white uppercase tracking-tight leading-none">
          {title}
        </h3>
      </div>

      {/* Grid with Description and Large Brutalist Index Number */}
      <div className="pt-4 border-t border-zinc-900/15 dark:border-zinc-100/15 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        <p className="font-sans text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-sm">
          {description}
        </p>
        <div className="text-right self-end shrink-0">
          <span className="font-sans font-black text-5xl sm:text-6xl md:text-7xl leading-none text-zinc-950/90 dark:text-white/90 tracking-tighter">
            {index}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const ScrollyVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const bgVideo = bgVideoRef.current;
    const section = sectionRef.current;
    if (!section) return;

    if (bgVideo) {
      bgVideo.muted = true;
      bgVideo.playsInline = true;
    }

    let targetTime = 0;
    let rafId: number;

    const handleLoaded = () => {
      ScrollTrigger.refresh();
    };

    if (bgVideo) {
      bgVideo.muted = true;
      bgVideo.playsInline = true;
      if (bgVideo.readyState >= 1) {
        handleLoaded();
      } else {
        bgVideo.addEventListener("loadedmetadata", handleLoaded);
      }
    }

    // Smooth lerp frame scrubbing loop for background video
    const updateVideoFrame = () => {
      if (bgVideo && bgVideo.duration && !isNaN(bgVideo.duration) && bgVideo.duration > 0 && bgVideo.readyState >= 1) {
        const deltaBg = targetTime - bgVideo.currentTime;
        if (Math.abs(deltaBg) > 0.0005) {
          bgVideo.currentTime += deltaBg * 0.25;
        }
      }
      rafId = requestAnimationFrame(updateVideoFrame);
    };

    rafId = requestAnimationFrame(updateVideoFrame);

    // Bind GSAP ScrollTrigger across the full height of sectionRef
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const dur = bgVideo?.duration;
        if (dur && !isNaN(dur) && dur > 0) {
          targetTime = self.progress * dur;
        }
      }
    });

    return () => {
      st.kill();
      if (bgVideo) {
        bgVideo.removeEventListener("loadedmetadata", handleLoaded);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="ai-story"
      ref={sectionRef}
      className="w-full relative border-t border-[var(--subtle-border)] min-h-[450vh] overflow-visible"
    >
      {/* Editorial Tech Label Badge */}
      <div className="tech-label font-mono-tech text-[10px] sm:text-xs font-bold tracking-widest px-3 py-1 rounded-br-xl z-30 relative uppercase">
        HISTORICAL_TIMELINE · CLOUD_TO_KARDASHEV_SCALE
      </div>

      {/* Sticky Container - Pins full size blurred background video */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 pointer-events-none">
        
        {/* Full-size Blurred Background Video - plays on scroll */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            ref={bgVideoRef}
            src="/assets/scrollyVideo.mp4"
            className="w-full h-full object-cover scale-105 blur-2xl opacity-40 dark:opacity-50 scrolly-video-element pointer-events-none"
            muted
            playsInline
            preload="auto"
            disableRemotePlayback
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] opacity-85" />
        </div>

      </div>

      {/* Editorial Stories Layer - Overlays on the left side of the sticky canvas */}
      <div className="relative z-10 -mt-[100vh] w-full pt-[20vh] pb-[40vh] pointer-events-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          
          {/* Section Heading - Editorial Swiss Brutalist style */}
          <div className="mb-[25vh] max-w-xl font-mono-tech">
            <div className="hidden sm:flex items-center gap-3 border-b border-[var(--subtle-border)] pb-3 mb-4 text-xs font-bold tracking-widest text-zinc-500 dark:text-zinc-400">
              <span>02 · EVOLUTION OF COMPUTE</span>
              <span className="ml-auto">VOL 02.8</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase tracking-tight leading-none mb-4">
              Rise of Cloud to Kardashev Scale
            </h2>
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] font-normal">
              Tracing the trajectory from primitive mainframe utility computing to hyperscale AI backbones, quantum mesh infrastructure, and planetary compute energy harvesting.
            </p>
          </div>

          {/* Editorial Cards Stack Column - Left Aligned */}
          <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col gap-[75vh]">
            {STORY_CARDS.map((card, i) => (
              <StoryCard
                key={i}
                index={card.index}
                title={card.title}
                year={card.year}
                subtitle={card.subtitle}
                description={card.description}
                code={card.code}
                coordinates={card.coordinates}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
