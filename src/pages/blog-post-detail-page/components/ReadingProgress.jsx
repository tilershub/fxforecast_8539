import React, { useState, useEffect } from 'react';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement?.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
      
      // Calculate estimated time remaining (assuming 200 words per minute)
      const remainingPercent = 100 - scrollPercent;
      const totalReadTime = 8; // minutes (from article data)
      const remaining = Math.ceil((remainingPercent / 100) * totalReadTime);
      setTimeRemaining(Math.max(0, remaining));
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll);
    calculateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Reading Time Indicator - Desktop */}
      <div className="hidden lg:block fixed bottom-8 left-8 bg-card border border-border rounded-lg px-4 py-2 shadow-soft">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span className="text-muted-foreground">
            {timeRemaining > 0 ? `${timeRemaining} min left` : 'Reading complete'}
          </span>
        </div>
      </div>

      {/* Progress Circle - Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 w-12 h-12 bg-card border border-border rounded-full shadow-soft flex items-center justify-center">
        <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="var(--color-muted)"
            strokeWidth="2"
          />
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 14}`}
            strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress / 100)}`}
            className="transition-all duration-150 ease-out"
          />
        </svg>
        <span className="absolute text-xs font-medium text-foreground">
          {Math.round(progress)}%
        </span>
      </div>
    </>
  );
};

export default ReadingProgress;