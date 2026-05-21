import React, { useEffect, useRef } from 'react';

export default function TabNavigation({ subjects, activeTab, onTabChange, progressBySubject = {} }) {
  const scrollContainer = useRef(null);
  const activeTabRef = useRef(null);

  // Auto-scroll active tab into view on mobile
  useEffect(() => {
    if (activeTabRef.current && scrollContainer.current) {
      const container = scrollContainer.current;
      const tab = activeTabRef.current;

      // Only scroll on mobile
      if (window.innerWidth < 768) {
        const tabLeft = tab.offsetLeft;
        const tabRight = tab.offsetLeft + tab.offsetWidth;
        const scrollLeft = container.scrollLeft;
        const scrollRight = container.scrollLeft + container.clientWidth;

        if (tabLeft < scrollLeft) {
          container.scrollLeft = tabLeft;
        } else if (tabRight > scrollRight) {
          container.scrollLeft = tabRight - container.clientWidth;
        }
      }
    }
  }, [activeTab]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onTabChange(Math.max(0, activeTab - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onTabChange(Math.min(subjects.length - 1, activeTab + 1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        onTabChange(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        onTabChange(subjects.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, subjects.length, onTabChange]);

  return (
    <div className="mb-8">
      <div
        ref={scrollContainer}
        className="flex gap-2 overflow-x-auto pb-2 scroll-smooth"
        role="tablist"
        aria-label="Subject tabs"
      >
        {subjects.map((subject, index) => {
          const progress = progressBySubject[subject.id] || { rated: 0, total: '?' };
          const isActive = index === activeTab;

          return (
            <button
              key={subject.id}
              ref={isActive ? activeTabRef : null}
              onClick={() => onTabChange(index)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${subject.id}`}
              className={`
                flex-shrink-0 px-4 py-3 rounded-lg font-semibold text-sm md:text-base
                transition-all duration-200 whitespace-nowrap
                border-b-4
                ${isActive
                  ? 'bg-white text-indigo-600 border-indigo-600 shadow-md'
                  : 'bg-white/50 text-gray-700 border-transparent hover:bg-white'
                }
              `}
            >
              <div className="flex flex-col items-center gap-1">
                <span>{subject.name}</span>
                <span className={`text-xs font-normal ${
                  isActive ? 'text-indigo-600' : 'text-gray-500'
                }`}>
                  {progress.rated}/{progress.total}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Desktop: show all subject progress */}
      <div className="hidden md:grid gap-2 mt-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))` }}>
        {subjects.map((subject) => {
          const progress = progressBySubject[subject.id];
          if (!progress) return null;
          const percentage = (progress.rated / progress.total) * 100;

          return (
            <div key={subject.id} className="text-center text-xs">
              <div className="text-gray-700 font-semibold mb-1 truncate">{subject.name}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-gray-600 mt-1">{progress.rated}/{progress.total}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
