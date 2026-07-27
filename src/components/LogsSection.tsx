import React from 'react';
import { ExperienceLog } from '../types';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import logsData from '../data/logs.json';

const LOGS: ExperienceLog[] = logsData as ExperienceLog[];

export const LogsSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto border-t border-[var(--subtle-border)]">
      
      {/* Header */}
      <div className="mb-12 sm:mb-20">
        <div className="hidden sm:flex items-center gap-3 font-mono-tech text-xs opacity-60 uppercase tracking-widest font-bold mb-2">
          <Briefcase className="w-4 h-4 text-[var(--text-primary)] opacity-70" />
          <span>03 · CAREER CHRONOLOGY & FINANCIAL ENGINEERING LOGS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-[var(--text-primary)]">
          0x03_LOGS
        </h2>
        <p className="font-mono-tech text-xs opacity-60 uppercase mt-2 tracking-widest font-bold">
          Professional Experience & Leadership Records
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* Timeline Column */}
        <div className="relative space-y-16">
          
          {/* Vertical Timeline line - aligned center in the gutter */}
          <div className="absolute left-3 sm:left-4 md:left-5 top-3 bottom-6 w-[2px] -translate-x-1/2 bg-[var(--card-border)]" />

          {LOGS.map((log) => (
            <div key={log.id} className="relative group pl-8 sm:pl-10 md:pl-12">
              
              {/* Timeline dot - centered precisely over vertical line with safe gap to content */}
              <div className="absolute left-3 sm:left-4 md:left-5 top-2 w-3.5 h-3.5 -translate-x-1/2 bg-[var(--btn-main-bg)] border-2 border-[var(--card-bg)] rounded-full z-10 shadow-md group-hover:scale-125 transition-transform" />

              <div className="space-y-4">
                
                {/* Period Badge & Subtitle */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-mono-tech text-xs font-bold tracking-widest bg-[var(--badge-bg)] inline-block px-3.5 py-1.5 rounded-full border border-[var(--card-border)] shadow-sm text-[var(--text-primary)]">
                    {log.period}
                  </div>
                  {log.companySubtitle && (
                    <span className="font-mono-tech text-[11px] opacity-60 font-medium">
                      {log.companySubtitle}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
                    {log.company}
                  </h3>
                  <div className="font-mono-tech text-xs opacity-60 tracking-widest uppercase font-bold mt-0.5">
                    {log.role}
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                  {log.description}
                </p>

                {/* Nested Sub-Roles */}
                {log.subRoles && log.subRoles.length > 0 && (
                  <div className="hidden md:block mt-6 space-y-6 pt-4 border-t border-zinc-900/10 dark:border-zinc-100/10">
                    {log.subRoles.map((role, idx) => (
                      <div key={idx} className="pl-4 border-l-2 border-zinc-900/20 dark:border-zinc-100/20 space-y-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="font-sans font-bold text-base sm:text-lg text-[var(--text-primary)]">
                            {role.title}
                          </h4>
                        </div>
                        <div className="font-mono-tech text-xs font-bold text-[var(--text-primary)] opacity-80">
                          {role.period} {role.location ? `· ${role.location}` : ''}
                        </div>

                        {role.description && (
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                            {role.description}
                          </p>
                        )}

                        {role.highlights && role.highlights.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            {role.highlights.map((hl, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--text-primary)] shrink-0 mt-0.5 opacity-80" />
                                <span>{hl}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {role.skills && role.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {role.skills.map((sk, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2.5 py-0.5 rounded-full font-mono-tech text-[10px] font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 shadow-sm"
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl pt-4 border-t border-zinc-900/10 dark:border-zinc-100/10">
                  <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 shadow-md">
                    <div className="text-[10px] font-mono-tech text-zinc-400 font-bold uppercase tracking-wider">
                      Projects completed
                    </div>
                    <div className="text-xs sm:text-sm font-bold font-mono-tech text-white mt-1">
                      {log.metrics.projectsCompleted}
                    </div>
                  </div>

                  <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 shadow-md">
                    <div className="text-[10px] font-mono-tech text-zinc-400 font-bold uppercase tracking-wider">
                      Impact
                    </div>
                    <div className="text-xs sm:text-sm font-bold font-mono-tech text-white mt-1">
                      {log.metrics.impact}
                    </div>
                  </div>

                  <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 shadow-md">
                    <div className="text-[10px] font-mono-tech text-zinc-400 font-bold uppercase tracking-wider">
                      Core improvements
                    </div>
                    <div className="text-xs sm:text-sm font-bold font-mono-tech text-white mt-1">
                      {log.metrics.coreImprovements}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

