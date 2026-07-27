import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { ScrollyVideoSection } from './components/ScrollyVideoSection';
import { ThoughtsSection } from './components/ThoughtsSection';
import { StackSection } from './components/StackSection';
import { LogsSection } from './components/LogsSection';
import { TerminalSection } from './components/TerminalSection';
import { Footer } from './components/Footer';
import { CursorTrail } from './components/CursorTrail';
import { BlueprintModal } from './components/BlueprintModal';
import { LiveTelemetryWidget } from './components/LiveTelemetryWidget';
import { StudioBackground } from './components/StudioBackground';
import { ProjectRelease } from './types';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedProject, setSelectedProject] = useState<ProjectRelease | null>(null);
  const [telemetryOpen, setTelemetryOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  const scrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative text-[var(--text-primary)] selection:bg-[var(--card-border)]">
      {/* Studio Lighting Background & Floor Shadow */}
      <StudioBackground />

      {/* High-Tech Particle Trail Effect */}
      <CursorTrail />

      {/* Top Floating Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={setTheme}
        onOpenTerminal={scrollToContact}
        onOpenTelemetry={() => setTelemetryOpen(true)}
      />

      {/* Vertical Rail Sidebar */}
      <Sidebar
        onOpenTerminal={scrollToContact}
        onOpenTelemetry={() => setTelemetryOpen(true)}
      />

      {/* Main Content (Offset on XL screens for Sidebar) */}
      <main className="ml-0 xl:ml-20 transition-all duration-300">
        
        {/* Hero Section with Live Text Decoder */}
        <div id="hero">
          <HeroSection
            onOpenTerminal={scrollToContact}
            onOpenTelemetry={() => setTelemetryOpen(true)}
          />
        </div>

        {/* 0x01_THOUGHTS Blog / Journal */}
        <ThoughtsSection />

        {/* Apple-style Video Scrolly Section with scrolly-video */}
        <ScrollyVideoSection />

        {/* 0x02_STACK Projects & Releases */}
        <StackSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 0x03_LOGS Timeline & FinOps Calculator */}
        <LogsSection />

        {/* 0x04_TERMINAL Contact Form & AI Console */}
        <TerminalSection />

        {/* Footer */}
        <Footer />
      </main>

      {/* Project Blueprint Modal */}
      <BlueprintModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Realtime Telemetry Monitor Widget */}
      <LiveTelemetryWidget
        isOpen={telemetryOpen}
        onClose={() => setTelemetryOpen(false)}
      />
    </div>
  );
}
