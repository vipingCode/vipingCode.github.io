import React, { useState } from 'react';
import { Lock, ArrowUpRight } from 'lucide-react';
import { JournalEntry } from '../types';

import thoughtsData from '../data/thoughts.json';

interface BlogCardItem extends JournalEntry {
  accentGlow: string;
  accentColor: string;
  accentBorder: string;
  locked?: boolean;
}

const INITIAL_ENTRIES: BlogCardItem[] = thoughtsData as BlogCardItem[];

export const ThoughtsSection: React.FC = () => {
  const [entries] = useState<BlogCardItem[]>(INITIAL_ENTRIES);

  return (
    <section id="blog" className="py-16 sm:py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto border-t border-[var(--subtle-border)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-16">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
            0x01_THOUGHTS
          </h2>
          <p className="font-mono-tech text-xs opacity-75 uppercase mt-2 tracking-widest font-bold">
            Journal, Discussions and Strategy
          </p>
        </div>
        <div className="font-mono-tech text-xs px-4 py-2 border border-[var(--card-border)] rounded-full bg-[var(--badge-bg)] self-start sm:self-auto font-bold shadow-sm">
          [ LOG_STREAM_ENABLED ]
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 isomorphic-card-wrapper">
        
        {entries.map((entry) => {
          if (entry.locked) {
            return (
              <div
                key={entry.id}
                className="group relative isomorphic-card theme-card rounded-3xl overflow-hidden border border-zinc-800/80 shadow-xl flex flex-col justify-between min-h-[220px] sm:min-h-[250px] p-5 sm:p-6 cursor-not-allowed select-none opacity-60 hover:opacity-75 transition-all duration-500"
                style={{
                  '--card-accent-color': entry.accentColor,
                  '--card-glow-color': entry.accentGlow,
                } as React.CSSProperties}
              >
                {/* Full-bleed Grayed-out Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={entry.imageUrl}
                    alt={entry.title}
                    className="w-full h-full object-cover grayscale contrast-125 opacity-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg,#0b0d11)] via-[var(--card-bg,#0b0d11)]/95 to-black/60" />
                </div>

                {/* Content Layer */}
                <div className="relative z-20 flex flex-col justify-between h-full">
                  {/* Top metadata row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono-tech text-[10px] sm:text-[11px] font-bold tracking-widest text-amber-500/90 dark:text-amber-400/90 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                      <Lock className="w-3.5 h-3.5 text-amber-500" />
                      <span>LOCKED // {entry.date}</span>
                    </span>
                  </div>

                  {/* Title with Lock icon inline */}
                  <div className="mt-auto">
                    <h3 className="text-lg sm:text-xl font-extrabold leading-snug text-zinc-400 dark:text-zinc-500">
                      {entry.title}
                      <span className="inline-flex items-center justify-center ml-2 p-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-amber-500/80 align-middle">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <a
              key={entry.id}
              href={entry.externalUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative isomorphic-card theme-card rounded-3xl overflow-hidden border border-[var(--card-border)] ${entry.accentBorder} shadow-2xl flex flex-col justify-between cursor-pointer min-h-[220px] sm:min-h-[250px] p-5 sm:p-6 block`}
              style={{
                '--card-accent-color': entry.accentColor,
                '--card-glow-color': entry.accentGlow,
              } as React.CSSProperties}
            >
              {/* Animated Border Trail Shimmer */}
              <div className="border-trail-glow pointer-events-none z-30" />

              {/* Top Corner Flare */}
              <div 
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-10"
                style={{ background: entry.accentGlow }}
              />

              {/* Full-bleed Background Cover Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={entry.imageUrl}
                  alt={entry.title}
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out opacity-40 group-hover:opacity-60"
                />
                {/* Multi-layer Gradient Blend for seamless readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg,#0b0d11)] via-[var(--card-bg,#0b0d11)]/90 to-black/30 group-hover:via-[var(--card-bg,#0b0d11)]/80 transition-colors duration-500" />
              </div>

              {/* Content Layer */}
              <div className="relative z-20 flex flex-col justify-between h-full">
                
                {/* Top metadata row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono-tech text-[10px] sm:text-[11px] font-bold tracking-widest text-[var(--text-secondary)] uppercase bg-[var(--badge-bg)]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[var(--card-border)]">
                    {entry.date}
                  </span>
                </div>

                {/* Title with Arrow Button right next to last word */}
                <div className="mt-auto">
                  <h3 className="text-lg sm:text-xl font-extrabold leading-snug text-[var(--text-primary)] transition-colors duration-300">
                    <span>{entry.title}</span>
                    <span className="inline-flex items-center justify-center ml-2.5 p-1.5 rounded-full border border-[var(--card-border)] bg-[var(--badge-bg)]/80 text-[var(--text-primary)] group-hover:bg-[var(--btn-main-bg)] group-hover:text-[var(--btn-main-text)] transition-all duration-300 shadow-md align-middle">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </h3>
                </div>

              </div>
            </a>
          );
        })}

      </div>

    </section>
  );
};

