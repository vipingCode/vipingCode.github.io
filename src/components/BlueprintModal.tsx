import React from 'react';
import { ProjectRelease } from '../types';
import { X, Cpu, Server, ShieldCheck, Zap, Layers, CheckCircle2, Cloud } from 'lucide-react';

interface BlueprintModalProps {
  project: ProjectRelease | null;
  onClose: () => void;
}

export const BlueprintModal: React.FC<BlueprintModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      {/* Outer container with strict rounded clipping and border */}
      <div className="theme-card rounded-3xl max-w-3xl w-full max-h-[90vh] border border-[var(--card-border)] shadow-2xl relative flex flex-col overflow-hidden">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 opacity-80 hover:opacity-100 rounded-full bg-[var(--badge-bg)] border border-[var(--card-border)] backdrop-blur-md transition-colors cursor-pointer shadow-md"
          title="Close specification"
        >
          <X className="w-5 h-5 text-[var(--text-primary)]" />
        </button>

        {/* Scrollable Content Container clipped cleanly inside rounded outer box */}
        <div className="p-6 md:p-10 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-400/40 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500/60">
        
        {/* Sector Tag */}
        <div className="font-mono-tech text-xs opacity-60 font-bold mb-2 tracking-widest pr-10">
          ARCHITECTURE_BLUEPRINT · SECTOR: {project.sector}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tighter text-[var(--text-primary)] pr-10">
          {project.title}
        </h2>

        {/* Lat Long */}
        {project.latLong && (
          <div className="inline-block bg-[var(--badge-bg)] px-3.5 py-1 rounded-full font-mono-tech text-xs mb-6 border border-[var(--card-border)] font-bold text-[var(--text-primary)]">
            {project.latLong}
          </div>
        )}

        {/* Image */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-[var(--card-border)] shadow-xl bg-zinc-900">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mb-8">
          {project.description}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="bg-[var(--badge-bg)] p-4 rounded-2xl border border-[var(--card-border)]">
              <div className="text-[10px] font-mono-tech opacity-60 font-bold uppercase text-[var(--text-primary)]">{m.label}</div>
              <div className="text-sm font-bold font-mono-tech mt-1 text-[var(--text-primary)]">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Blueprint Specifications */}
        <div className="bg-zinc-950 p-6 rounded-2xl mb-8 font-mono-tech text-xs space-y-3 border border-zinc-800 shadow-inner">
          <div className="text-white font-bold text-sm mb-4 border-b border-zinc-800 pb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-white" />
            <span>TECHNICAL_SPECIFICATIONS</span>
          </div>

          <div className="flex justify-between py-1 border-b border-zinc-800/80">
            <span className="text-gray-400">Control Plane:</span>
            <span className="text-gray-200 font-semibold">{project.blueprintDetails.architecture}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-800/80">
            <span className="text-gray-400">Peak Throughput:</span>
            <span className="text-white font-bold">{project.blueprintDetails.throughput}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-800/80">
            <span className="text-gray-400">Active Compute Pods:</span>
            <span className="text-gray-200 font-semibold">{project.blueprintDetails.nodes}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-800/80">
            <span className="text-gray-400">Cloud Infrastructure:</span>
            <span className="text-gray-200 font-semibold">{project.blueprintDetails.cloudProvider}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-400">FinOps Efficiency Impact:</span>
            <span className="text-white font-bold">{project.blueprintDetails.costReduction}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-between items-center pt-4 border-t border-[var(--card-border)]">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[var(--text-primary)] font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>BLUEPRINT_VERIFIED_BY_MSFT_CFE</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-3 bg-[var(--btn-main-bg)] text-[var(--btn-main-text)] font-mono-tech text-xs rounded-full hover:opacity-90 font-extrabold cursor-pointer transition-opacity"
          >
            CLOSE_SPECIFICATION
          </button>
        </div>

        </div>
      </div>
    </div>
  );
};
