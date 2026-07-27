import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeSwitchProps {
  theme: 'light' | 'dark';
  onToggle: (theme: 'light' | 'dark') => void;
  compact?: boolean;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => onToggle(isDark ? 'light' : 'dark')}
      className="relative flex items-center w-14 h-7 p-0.5 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] shadow-md cursor-pointer transition-colors duration-300 focus:outline-none select-none shrink-0"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sliding background thumb */}
      <div
        className={`absolute top-0.5 bottom-0.5 w-6 rounded-full bg-[var(--btn-main-bg)] shadow-sm transition-transform duration-300 ease-out ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      />

      {/* Sun Icon (Light) */}
      <div
        className={`relative z-10 flex items-center justify-center w-6 h-6 transition-colors duration-300 ${
          !isDark ? 'text-[var(--btn-main-text)]' : 'text-[var(--text-secondary)] opacity-50'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </div>

      {/* Spacer */}
      <div className="w-1" />

      {/* Moon Icon (Dark) */}
      <div
        className={`relative z-10 flex items-center justify-center w-6 h-6 transition-colors duration-300 ${
          isDark ? 'text-[var(--btn-main-text)]' : 'text-[var(--text-secondary)] opacity-50'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </div>
    </button>
  );
};

