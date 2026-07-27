import React from 'react';
import { Layers, Activity, Terminal as TerminalIcon, Mail, Settings, ShieldAlert } from 'lucide-react';

interface SidebarProps {
  onOpenTerminal: () => void;
  onOpenTelemetry: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenTerminal, onOpenTelemetry }) => {
  return (
    <aside className="hidden xl:flex fixed left-0 top-0 h-screen w-20 border-r border-[var(--subtle-border)] theme-sidebar flex-col items-center py-8 gap-8 z-40 shadow-2xl">
      <div className="font-mono-tech text-[10px] opacity-60 font-bold rotate-90 my-8 tracking-widest uppercase">
        ARCH_01
      </div>

      <div className="flex flex-col gap-5">
        <a
          href="#projects"
          className="p-3 bg-[var(--btn-main-bg)] text-[var(--btn-main-text)] rounded-2xl shadow-lg transition-all duration-200 hover:scale-110"
          title="Deployed Code & Projects"
        >
          <Layers className="w-5 h-5" />
        </a>

        <button
          onClick={onOpenTelemetry}
          className="p-3 opacity-70 hover:opacity-100 hover:bg-[var(--card-bg)] rounded-2xl transition-all duration-200 border border-transparent hover:border-[var(--card-border)]"
          title="Telemetry Monitor"
        >
          <Activity className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenTerminal}
          className="p-3 opacity-70 hover:opacity-100 hover:bg-[var(--card-bg)] rounded-2xl transition-all duration-200 border border-transparent hover:border-[var(--card-border)]"
          title="Open AI Terminal CLI"
        >
          <TerminalIcon className="w-5 h-5" />
        </button>

        <a
          href="#contact"
          className="p-3 opacity-70 hover:opacity-100 hover:bg-[var(--card-bg)] rounded-2xl transition-all duration-200 border border-transparent hover:border-[var(--card-border)]"
          title="Initiate Contact"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>

      <div className="mt-auto p-3 opacity-60 hover:opacity-100 transition-colors cursor-pointer" title="Settings & Preferences">
        <Settings className="w-5 h-5" />
      </div>
    </aside>
  );
};
