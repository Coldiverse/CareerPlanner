# Phase 2 Implementation Code Patterns

This document provides ready-to-use code patterns and component implementations.

---

## 1. CUSTOM HOOKS

### useTabNavigation - Keyboard & Touch Support

```tsx
// hooks/useTabNavigation.ts
import { useEffect, useCallback } from 'react';

export const useTabNavigation = (
  tabCount: number,
  activeTab: number,
  onTabChange: (index: number) => void
) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const { key } = e;
    
    if (key === 'ArrowRight') {
      e.preventDefault();
      onTabChange((activeTab + 1) % tabCount);
    } else if (key === 'ArrowLeft') {
      e.preventDefault();
      onTabChange((activeTab - 1 + tabCount) % tabCount);
    } else if (key === 'Home') {
      e.preventDefault();
      onTabChange(0);
    } else if (key === 'End') {
      e.preventDefault();
      onTabChange(tabCount - 1);
    }
  }, [activeTab, tabCount, onTabChange]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
```

### useSaveStatus - Auto-hide & Retry Logic

```tsx
// hooks/useSaveStatus.ts
import { useState, useCallback, useRef } from 'react';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export const useSaveStatus = (autoHideDelay = 2000) => {
  const [status, setStatus] = useState<SaveStatus>('idle');
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  const clearTimeout = useCallback(() => {
    if (timeoutRef.current) {
      global.clearTimeout(timeoutRef.current);
    }
  }, []);
  
  const saveData = useCallback(
    async (callback: () => Promise<void>, retries = 3) => {
      setStatus('saving');
      clearTimeout();
      
      for (let i = 0; i < retries; i++) {
        try {
          await callback();
          setStatus('saved');
          
          timeoutRef.current = setTimeout(() => {
            setStatus('idle');
          }, autoHideDelay);
          
          return;
        } catch (error) {
          if (i === retries - 1) {
            setStatus('error');
            
            timeoutRef.current = setTimeout(() => {
              setStatus('idle');
            }, autoHideDelay);
          }
        }
      }
    },
    [autoHideDelay, clearTimeout]
  );
  
  return { status, saveData, setStatus };
};
```

### useResponsive - Breakpoint Detection

```tsx
// hooks/useResponsive.ts
import { useEffect, useState } from 'react';

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof BREAKPOINTS;

export const useResponsive = () => {
  const [screen, setScreen] = useState<{
    width: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    breakpoint: Breakpoint;
  }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    isMobile: true,
    isTablet: false,
    isDesktop: false,
    breakpoint: 'sm',
  });
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let breakpoint: Breakpoint = 'sm';
      
      if (width >= BREAKPOINTS['2xl']) breakpoint = '2xl';
      else if (width >= BREAKPOINTS.xl) breakpoint = 'xl';
      else if (width >= BREAKPOINTS.lg) breakpoint = 'lg';
      else if (width >= BREAKPOINTS.md) breakpoint = 'md';
      else breakpoint = 'sm';
      
      setScreen({
        width,
        isMobile: width < BREAKPOINTS.md,
        isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
        isDesktop: width >= BREAKPOINTS.lg,
        breakpoint,
      });
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return screen;
};
```

### useRatingDebounce - Debounced Save with Optimistic Update

```tsx
// hooks/useRatingDebounce.ts
import { useCallback, useRef, useState } from 'react';

export const useRatingDebounce = (
  onSave: (id: string, value: number) => Promise<void>,
  delay = 500
) => {
  const [optimisticRatings, setOptimisticRatings] = useState<Record<string, number>>({});
  const timeoutRef = useRef<Record<string, NodeJS.Timeout>>({});
  
  const handleRatingChange = useCallback(
    (id: string, value: number) => {
      // Optimistic update
      setOptimisticRatings(prev => ({...prev, [id]: value}));
      
      // Clear existing timeout for this id
      if (timeoutRef.current[id]) {
        clearTimeout(timeoutRef.current[id]);
      }
      
      // Debounce the save
      timeoutRef.current[id] = setTimeout(() => {
        onSave(id, value).catch(error => {
          console.error('Save failed:', error);
          // Revert optimistic update on error
          setOptimisticRatings(prev => {
            const {[id]: _, ...rest} = prev;
            return rest;
          });
        });
      }, delay);
    },
    [onSave, delay]
  );
  
  return { optimisticRatings, handleRatingChange };
};
```

---

## 2. CORE COMPONENTS

### TabNavigation Component

```tsx
// components/Phase2/TabNavigation.tsx
import React, { useRef, useEffect } from 'react';
import { useTabNavigation } from '../../hooks/useTabNavigation';

interface Tab {
  id: string;
  name: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (index: number) => void;
  ratings: Record<string, number>;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  ratings,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  
  useTabNavigation(tabs.length, activeTab, onTabChange);
  
  // Auto-scroll active tab into view on mobile
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeTab]);
  
  const getRatedCount = (tabId: string) => {
    return Object.entries(ratings)
      .filter(([key]) => key.startsWith(tabId))
      .filter(([, value]) => value > 0).length;
  };
  
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-2">
        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-8 gap-2">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              ref={idx === activeTab ? activeTabRef : null}
              onClick={() => onTabChange(idx)}
              className={`
                px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200
                flex flex-col items-center gap-1
                
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                
                ${activeTab === idx
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
              aria-selected={activeTab === idx}
              aria-label={`${tab.name}, ${getRatedCount(tab.id)}/4 rated`}
            >
              <span>{tab.name}</span>
              <span className="text-xs font-semibold">
                {getRatedCount(tab.id)}/4
              </span>
            </button>
          ))}
        </div>
        
        {/* Mobile/Tablet: Horizontal scroll */}
        <div className="md:hidden relative">
          {/* Left scroll indicator */}
          {activeTab > 0 && (
            <div className="absolute left-0 top-0 bottom-0 pointer-events-none bg-gradient-to-r from-white to-transparent w-8" />
          )}
          
          {/* Scrollable tabs */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide flex gap-2 pb-2"
          >
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                ref={idx === activeTab ? activeTabRef : null}
                onClick={() => onTabChange(idx)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm
                  transition-all duration-200 whitespace-nowrap
                  min-h-[44px] flex items-center gap-2
                  
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  
                  ${activeTab === idx
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
                aria-selected={activeTab === idx}
                aria-label={`${tab.name}, ${getRatedCount(tab.id)}/4 rated`}
              >
                <span>{tab.name}</span>
                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {getRatedCount(tab.id)}/4
                </span>
              </button>
            ))}
          </div>
          
          {/* Right scroll indicator */}
          {activeTab < tabs.length - 1 && (
            <div className="absolute right-0 top-0 bottom-0 pointer-events-none bg-gradient-to-l from-white to-transparent w-8" />
          )}
        </div>
      </div>
    </div>
  );
};
```

### SubcategoryCard Component

```tsx
// components/Phase2/SubcategoryCard.tsx
import React, { useState, useEffect } from 'react';

interface SubcategoryCardProps {
  id: string;
  name: string;
  description?: string;
  currentValue?: number;
  onRatingChange: (id: string, value: number) => Promise<void>;
  lastUpdated?: Date;
  isLoading?: boolean;
}

export const SubcategoryCard: React.FC<SubcategoryCardProps> = ({
  id,
  name,
  description,
  currentValue = 0,
  onRatingChange,
  lastUpdated,
  isLoading = false,
}) => {
  const [value, setValue] = useState(currentValue);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedValue, setLastSavedValue] = useState(currentValue);
  
  const starRating = Math.round((value / 100) * 5 * 2) / 2; // Half-star support
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    
    // Save immediately (debounced by parent hook)
    setIsSaving(true);
    onRatingChange(id, newValue)
      .then(() => {
        setLastSavedValue(newValue);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };
  
  useEffect(() => {
    setValue(currentValue);
    setLastSavedValue(currentValue);
  }, [currentValue]);
  
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };
  
  const isUnsaved = value !== lastSavedValue;
  
  return (
    <div
      className={`
        p-4 md:p-6 rounded-xl border-2 transition-all duration-200
        bg-white
        
        ${isUnsaved
          ? 'border-yellow-300 shadow-md'
          : 'border-gray-200 hover:shadow-lg hover:border-blue-300'
        }
        
        ${isLoading ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
          {name}
        </h3>
        {description && (
          <p className="text-xs md:text-sm text-gray-600 mb-2">
            {description}
          </p>
        )}
        <p className={`text-xs md:text-sm ${
          isUnsaved ? 'text-yellow-600 font-medium' : 'text-gray-500'
        }`}>
          {isUnsaved
            ? 'Unsaved changes'
            : lastUpdated
            ? `Updated ${formatTimeAgo(lastUpdated)}`
            : 'Not rated yet'}
        </p>
      </div>
      
      {/* Slider */}
      <div className="mb-4">
        <div className="relative mb-2">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={handleSliderChange}
            disabled={isLoading || isSaving}
            className={`
              w-full h-2 md:h-3 bg-gray-200 rounded-lg cursor-pointer
              appearance-none slider
              
              transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            aria-label={`Rate ${name}: ${value} out of 100`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            aria-valuetext={`${value} out of 100`}
          />
          
          {/* Animated loading indicator during save */}
          {isSaving && (
            <div className="absolute top-1/2 right-0 -translate-y-1/2 -translate-x-8">
              <div className="w-3 h-3 border-2 border-blue-400 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}
        </div>
        
        {/* Value labels */}
        <div className="flex justify-between items-center text-xs md:text-sm text-gray-500">
          <span>0</span>
          <div className="text-sm md:text-base font-bold text-blue-600">
            {value}
          </div>
          <span>100</span>
        </div>
      </div>
      
      {/* Star Rating Display */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="relative text-lg md:text-2xl">
              {/* Empty star background */}
              <span className="text-gray-300 select-none">★</span>
              
              {/* Filled star overlay */}
              <div
                className={`
                  absolute top-0 left-0 overflow-hidden transition-all duration-200
                  ${value > 0 ? 'text-yellow-400' : 'text-gray-300'}
                `}
                style={{
                  width: `${Math.max(0, Math.min(100, starRating - star + 1)) * 100}%`,
                }}
              >
                <span className="select-none">★</span>
              </div>
            </div>
          ))}
        </div>
        
        <span className="text-sm md:text-base font-semibold text-gray-700 ml-2">
          {value > 0 ? `${value}/100` : 'Not rated'}
        </span>
      </div>
    </div>
  );
};
```

### ProgressBar Component

```tsx
// components/Phase2/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  ratedCount: number;
  total: number;
  compact?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  ratedCount,
  total,
  compact = false,
}) => {
  const percentage = (ratedCount / total) * 100;
  const remaining = total - ratedCount;
  
  return (
    <div className="w-full bg-white sticky top-0 z-30 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            {compact ? 'Progress' : 'Overall Progress'}
          </h2>
          <div className="flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-bold text-blue-600">
              {ratedCount}
            </span>
            <span className="text-gray-600 font-medium">
              / {total}
            </span>
            <span className="text-xs md:text-sm text-gray-500 ml-auto sm:ml-2">
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="relative w-full h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`
              h-full rounded-full transition-all duration-500 ease-out
              bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600
            `}
            style={{width: `${percentage}%`}}
            role="progressbar"
            aria-valuenow={ratedCount}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={`Progress: ${ratedCount} of ${total} rated`}
          />
        </div>
        
        {/* Status message */}
        {remaining > 0 && (
          <p className="text-xs md:text-sm text-gray-600 mt-2">
            Rate {remaining} more to unlock results
          </p>
        )}
        
        {remaining === 0 && (
          <p className="text-xs md:text-sm text-green-600 font-medium mt-2">
            ✓ All items rated! View your results below.
          </p>
        )}
      </div>
    </div>
  );
};
```

### SaveIndicator Component

```tsx
// components/Phase2/SaveIndicator.tsx
import React, { useEffect, useState } from 'react';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface SaveIndicatorProps {
  status: SaveStatus;
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({ status }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (status !== 'idle') {
      setIsVisible(true);
    } else {
      // Delay fade out
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [status]);
  
  if (!isVisible) return null;
  
  return (
    <div
      className={`
        fixed bottom-6 right-6
        md:bottom-8 md:right-8
        lg:bottom-10 lg:right-10
        
        z-50
        
        transition-all duration-300
        ${status === 'idle' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
      role="status"
      aria-live="polite"
      aria-label={
        status === 'saving'
          ? 'Saving your rating'
          : status === 'saved'
          ? 'Rating saved successfully'
          : 'Save failed, retrying'
      }
    >
      <div
        className={`
          px-4 py-3 md:px-6 md:py-4
          rounded-full
          text-sm font-medium
          flex items-center gap-2
          
          shadow-xl
          backdrop-blur-sm
          border border-white border-opacity-20
        `}
        style={{
          background: status === 'error'
            ? 'rgba(239, 68, 68, 0.95)'
            : status === 'saved'
            ? 'rgba(34, 197, 94, 0.95)'
            : 'rgba(59, 130, 246, 0.95)',
        }}
      >
        {status === 'saving' && (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="text-white">Saving...</span>
          </>
        )}
        
        {status === 'saved' && (
          <>
            <svg
              className="w-5 h-5 text-white flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-white">Saved</span>
          </>
        )}
        
        {status === 'error' && (
          <>
            <svg
              className="w-5 h-5 text-white flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-white">Retrying...</span>
          </>
        )}
      </div>
    </div>
  );
};
```

---

## 3. ANIMATION UTILITIES

```tsx
// utils/animations.ts
import { keyframes } from '@emotion/react';

export const slideInTab = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const pulseRing = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
`;

export const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// CSS for global animations
export const globalAnimationStyles = `
  @layer components {
    .slider::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
      transition: all 0.2s;
      border: none;
    }
    
    .slider::-webkit-slider-thumb:hover {
      transform: scale(1.15);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
    }
    
    .slider::-webkit-slider-thumb:active {
      transform: scale(1.1);
    }
    
    .slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
      transition: all 0.2s;
    }
    
    .slider::-moz-range-thumb:hover {
      transform: scale(1.15);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
    }
    
    /* Scrollbar hiding */
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    
    /* Focus states */
    .focus-ring {
      @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500;
    }
    
    /* Safe area support */
    @supports (padding: max(0px)) {
      .safe-area-inset {
        padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
        padding-right: max(1.5rem, env(safe-area-inset-right));
      }
    }
  }
`;
```

---

## 4. LAYOUT COMPONENTS

### SubcategoryGrid Component

```tsx
// components/Phase2/SubcategoryGrid.tsx
import React from 'react';
import { SubcategoryCard } from './SubcategoryCard';

interface Subcategory {
  id: string;
  name: string;
  description?: string;
}

interface SubcategoryGridProps {
  subcategories: Subcategory[];
  ratings: Record<string, number>;
  onRatingChange: (id: string, value: number) => Promise<void>;
  lastUpdated?: Record<string, Date>;
}

export const SubcategoryGrid: React.FC<SubcategoryGridProps> = ({
  subcategories,
  ratings,
  onRatingChange,
  lastUpdated = {},
}) => {
  return (
    <div className="px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
      <div
        className={`
          grid gap-4 w-full
          
          // Mobile: 1 column
          grid-cols-1
          
          // Tablet & Desktop: 2 columns
          md:grid-cols-2
          md:gap-6
          
          // Extra spacing on desktop
          lg:gap-8
        `}
      >
        {subcategories.map((subcat) => (
          <SubcategoryCard
            key={subcat.id}
            id={subcat.id}
            name={subcat.name}
            description={subcat.description}
            currentValue={ratings[subcat.id] || 0}
            onRatingChange={onRatingChange}
            lastUpdated={lastUpdated[subcat.id]}
          />
        ))}
      </div>
      
      {subcategories.length === 0 && (
        <div className="text-center py-16 md:py-24">
          <p className="text-gray-600 text-lg">
            No subcategories available
          </p>
        </div>
      )}
    </div>
  );
};
```

### NavigationFooter Component

```tsx
// components/Phase2/NavigationFooter.tsx
import React from 'react';

interface NavigationFooterProps {
  onBack: () => void;
  onViewResults: () => void;
  canViewResults: boolean;
  ratedCount: number;
  requiredCount?: number;
}

export const NavigationFooter: React.FC<NavigationFooterProps> = ({
  onBack,
  onViewResults,
  canViewResults,
  ratedCount,
  requiredCount = 8,
}) => {
  return (
    <div className="bg-white border-t border-gray-200 mt-8 md:mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col-reverse md:flex-row gap-4 justify-between items-stretch">
          <button
            onClick={onBack}
            className={`
              px-6 py-3
              border-2 border-gray-300
              rounded-lg
              font-medium
              transition-all duration-200
              
              hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              
              md:order-1
            `}
          >
            ← Back to Phase 1
          </button>
          
          <button
            onClick={onViewResults}
            disabled={!canViewResults}
            className={`
              px-6 py-3
              rounded-lg
              font-semibold
              transition-all duration-200
              min-h-[44px]
              
              flex items-center justify-center gap-2
              
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              
              ${canViewResults
                ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }
              
              md:order-2
            `}
            aria-label={`View results${!canViewResults ? ` (need ${requiredCount - ratedCount} more ratings)` : ''}`}
          >
            View Results
            {canViewResults && ' ✓'}
          </button>
        </div>
        
        {!canViewResults && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Rate {requiredCount - ratedCount} more to unlock results
          </p>
        )}
      </div>
    </div>
  );
};
```

---

## 5. RESULTS PAGE COMPONENTS

### ResultsList - Mobile View

```tsx
// components/Results/ResultsList.tsx
import React from 'react';

interface Result {
  id: string;
  rank: number;
  subject: string;
  subcategory: string;
  score: number;
}

interface ResultsListProps {
  results: Result[];
  onResultClick?: (result: Result) => void;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  results,
  onResultClick,
}) => {
  return (
    <div className="space-y-3 px-4 py-4">
      {results.map((result, idx) => (
        <div
          key={result.id}
          onClick={() => onResultClick?.(result)}
          className={`
            bg-white p-4 rounded-lg border border-gray-200
            transition-all duration-200
            
            ${onResultClick ? 'cursor-pointer hover:shadow-md hover:border-blue-300' : ''}
          `}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="inline-block text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded min-w-[2.5rem] text-center">
                #{result.rank}
              </span>
              <h3 className="text-base font-semibold text-gray-900">
                {result.subcategory}
              </h3>
            </div>
            <span className="text-xl font-bold text-blue-600">
              {result.score}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{result.subject}</p>
          
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
              style={{width: `${result.score}%`}}
              role="progressbar"
              aria-valuenow={result.score}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${result.subcategory}: ${result.score} out of 100`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
```

### ResultsTable - Desktop View

```tsx
// components/Results/ResultsTable.tsx
import React from 'react';

interface Result {
  id: string;
  rank: number;
  subject: string;
  subcategory: string;
  score: number;
}

interface ResultsTableProps {
  results: Result[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b-2 border-gray-300 bg-gray-50">
          <tr className="text-left">
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Rank</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Subject</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Subcategory</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Score</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Match</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, idx) => (
            <tr
              key={result.id}
              className={`
                border-b border-gray-200
                transition-colors duration-200
                hover:bg-blue-50
                
                ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              `}
            >
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                {result.rank}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {result.subject}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {result.subcategory}
              </td>
              <td className="px-6 py-4 text-lg font-bold text-blue-600">
                {result.score}/100
              </td>
              <td className="px-6 py-4">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    style={{width: `${result.score}%`}}
                    role="progressbar"
                    aria-valuenow={result.score}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${result.subcategory}: ${result.score} match`}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

---

## 6. TESTING PATTERNS

### Component Test Example (using React Testing Library)

```tsx
// components/Phase2/__tests__/SubcategoryCard.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubcategoryCard } from '../SubcategoryCard';

describe('SubcategoryCard', () => {
  it('renders with initial value', () => {
    render(
      <SubcategoryCard
        id="test"
        name="Test Subject"
        currentValue={50}
        onRatingChange={jest.fn()}
      />
    );
    
    expect(screen.getByRole('slider')).toHaveValue('50');
  });
  
  it('calls onRatingChange when slider is adjusted', async () => {
    const mockOnChange = jest.fn().mockResolvedValue(undefined);
    
    render(
      <SubcategoryCard
        id="test"
        name="Test Subject"
        onRatingChange={mockOnChange}
      />
    );
    
    const slider = screen.getByRole('slider');
    
    await userEvent.tripleClick(slider);
    fireEvent.change(slider, { target: { value: '75' } });
    
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('test', 75);
    });
  });
  
  it('shows save status', async () => {
    const mockOnChange = jest.fn(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );
    
    render(
      <SubcategoryCard
        id="test"
        name="Test Subject"
        onRatingChange={mockOnChange}
      />
    );
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '50' } });
    
    expect(screen.getByText('Unsaved changes')).toBeInTheDocument();
  });
  
  it('is keyboard accessible', async () => {
    const mockOnChange = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    
    render(
      <SubcategoryCard
        id="test"
        name="Test Subject"
        onRatingChange={mockOnChange}
      />
    );
    
    const slider = screen.getByRole('slider');
    slider.focus();
    
    await user.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}');
    
    expect(mockOnChange).toHaveBeenCalled();
  });
});
```

---

## Summary

This implementation guide provides:
- Production-ready React components
- Complete accessibility support
- Mobile-first responsive design
- Smooth animations and transitions
- Error handling and retry logic
- Comprehensive testing patterns

All components follow Tailwind CSS conventions and are designed to work seamlessly across mobile, tablet, and desktop devices.
