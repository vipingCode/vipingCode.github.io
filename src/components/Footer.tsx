import React from 'react';
import { Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[var(--subtle-border)] py-12 font-mono-tech">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2 font-bold text-sm">
          <Cpu className="w-4 h-4" />
          <span>VIPIN GUPTA · CLOUD FINOPS</span>
        </div>

        {/* Copyright */}
        <div className="text-xs opacity-60 text-center font-bold">
          © {new Date().getFullYear()} Vipin Gupta. All rights reserved.
        </div>

        {/* External links */}
        <div className="flex gap-8 text-xs opacity-75 font-bold">
          <a
            href="https://github.com/vipingCode"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vipin1gupta/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
};

