import React, { useEffect } from 'react';

export const StudioBackground: React.FC = () => {
  useEffect(() => {
    let ticking = false;

    function updateStudioLighting() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Calculate scroll percentage (0 to 1)
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;

      // Shift lighting focal point downwards during scroll (68% -> 40%)
      const lightY = 68 - progress * 28;

      // Adjust shadow depth & width based on scroll position
      const shadowOpacity = 0.85 - progress * 0.25;
      const shadowScale = 1 + progress * 0.15;

      // Apply updated properties to CSS custom variables
      document.documentElement.style.setProperty('--light-y', `${lightY}%`);
      document.documentElement.style.setProperty('--shadow-opacity', `${shadowOpacity}`);
      document.documentElement.style.setProperty('--shadow-scale', `${shadowScale}`);

      ticking = false;
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateStudioLighting);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateStudioLighting();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="studio-background" />
  );
};
