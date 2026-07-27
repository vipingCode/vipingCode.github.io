import React from 'react';
import { ProjectRelease } from '../types';
import { ArrowRight, Layers, Award, Radio } from 'lucide-react';
import stackData from '../data/stack.json';

interface StackSectionProps {
  onSelectProject: (project: ProjectRelease) => void;
}

const PROJECTS: ProjectRelease[] = stackData.projects as ProjectRelease[];
const CERTIFICATIONS: ProjectRelease[] = stackData.certifications as ProjectRelease[];
const CONFERENCES: ProjectRelease[] = stackData.conferences as ProjectRelease[];

export const StackSection: React.FC<StackSectionProps> = ({ onSelectProject }) => {
  return (
    <section id="projects" className="py-16 sm:py-28 border-t border-[var(--subtle-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        
        {/* Section Main Header */}
        <div className="mb-16 sm:mb-20">
          <div className="hidden sm:flex items-center gap-3 font-mono-tech text-xs opacity-60 uppercase tracking-widest font-bold mb-2">
            <Layers className="w-4 h-4 text-[var(--text-primary)] opacity-70" />
            <span>02 · ARCHITECTURE, CREDENTIALS & INDUSTRY ENGAGEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-[var(--text-primary)]">
            0x02_STACK
          </h2>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-grow h-[1px] bg-[var(--subtle-border)]" />
          </div>
        </div>

        {/* --- SECTION 1: PROJECTS --- */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center justify-between border-b border-[var(--subtle-border)] pb-3 mb-6">
            <div className="flex items-center gap-3 font-mono-tech text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-wider">
              <span>Projects</span>
            </div>
            <span className="hidden sm:inline font-mono-tech text-xs opacity-50 uppercase font-bold">
              SYSTEM_RELEASES ({PROJECTS.length})
            </span>
          </div>

          <div className="divide-y divide-[var(--subtle-border)] border-b border-[var(--subtle-border)]">
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="py-6 sm:py-8">
                {/* Header Sector & Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-xs font-bold opacity-60 mb-2 uppercase tracking-wider">
                  <span>SECTOR: {proj.sector}</span>
                  {proj.latLong && <span>{proj.latLong}</span>}
                </div>

                {/* Title */}
                <h3 className="font-sans font-black text-xl sm:text-2xl text-[var(--text-primary)] uppercase tracking-tight mb-2">
                  {proj.title}
                </h3>

                {/* One line description */}
                <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-4xl">
                  {proj.description}
                </p>

                {/* Stack Pills + Action Link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="flex flex-wrap gap-2 items-center">
                    {proj.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full font-mono-tech text-[10px] sm:text-[11px] font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-200/90 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectProject(proj)}
                    className="font-mono-tech text-xs font-bold text-[var(--text-primary)] hover:opacity-70 flex items-center gap-2 cursor-pointer transition-opacity shrink-0 self-start sm:self-auto"
                  >
                    <span className="w-8 sm:w-12 h-[1px] bg-zinc-400 dark:bg-zinc-600" />
                    <span className="uppercase tracking-wider">Initialize_project_deploy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 2: CERTIFICATIONS --- */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center justify-between border-b border-[var(--subtle-border)] pb-3 mb-6">
            <div className="flex items-center gap-3 font-mono-tech text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-wider">
              <Award className="w-4 h-4 opacity-70" />
              <span>Certifications</span>
            </div>
            <span className="hidden sm:inline font-mono-tech text-xs opacity-50 uppercase font-bold">
              VERIFIED_CREDENTIALS ({CERTIFICATIONS.length})
            </span>
          </div>

          <div className="divide-y divide-[var(--subtle-border)] border-b border-[var(--subtle-border)]">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.id} className="py-6 sm:py-8">
                {/* Title */}
                <h3 className="font-sans font-black text-xl sm:text-2xl text-[var(--text-primary)] uppercase tracking-tight mb-2">
                  {cert.title}
                </h3>

                {/* One line description */}
                <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-4xl">
                  {cert.description}
                </p>

                {/* Stack Pills */}
                <div className="flex flex-wrap gap-2 items-center">
                  {cert.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full font-mono-tech text-[10px] sm:text-[11px] font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-200/90 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 3: INDUSTRY CONFERENCES --- */}
        <div>
          <div className="flex items-center justify-between border-b border-[var(--subtle-border)] pb-3 mb-6">
            <div className="flex items-center gap-3 font-mono-tech text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-wider">
              <Radio className="w-4 h-4 opacity-70" />
              <span>Industry Conferences</span>
            </div>
            <span className="hidden sm:inline font-mono-tech text-xs opacity-50 uppercase font-bold">
              PUBLIC_ENGAGEMENTS ({CONFERENCES.length})
            </span>
          </div>

          <div className="divide-y divide-[var(--subtle-border)] border-b border-[var(--subtle-border)]">
            {CONFERENCES.map((conf) => (
              <div key={conf.id} className="py-6 sm:py-8">
                {/* Header Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-xs font-bold opacity-60 mb-2 uppercase tracking-wider">
                  <span>EVENT: {conf.sector}</span>
                  {conf.latLong && <span>{conf.latLong}</span>}
                </div>

                {/* Title */}
                <h3 className="font-sans font-black text-xl sm:text-2xl text-[var(--text-primary)] uppercase tracking-tight mb-2">
                  {conf.title}
                </h3>

                {/* One line description */}
                <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-4xl">
                  {conf.description}
                </p>

                {/* Stack Pills */}
                <div className="flex flex-wrap gap-2 items-center">
                  {conf.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full font-mono-tech text-[10px] sm:text-[11px] font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-200/90 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
