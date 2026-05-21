# Phase 2 UI/UX Implementation Guide

## Overview
Phase 2 presents 8 tabs (subjects) with 4 subcategories each (32 total). Users rate interests using a slider (0-100) + 5-star interface. The design prioritizes mobile responsiveness, smooth interactions, and clear progress tracking.

---

## 1. LAYOUT MOCKUPS

### Mobile View (< 640px)
```
┌─────────────────────────────────┐
│ Career Interest Assessment       │
│ Phase 2: Your Subjects           │
├─────────────────────────────────┤
│ Progress: 8/32 rated            │
│ ████████░░░░░░░░░░░░ (25%)     │
├─────────────────────────────────┤
│ ◀ [Tech] [Science] [Business]▶  │ (horizontal scroll, shows 2.5 tabs)
│     2/4    1/4      0/4        │ (progress badges)
├─────────────────────────────────┤
│ [Selected Tab: Tech]            │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Subcategory: Web Dev        │ │
│ │ ●○○○○○─────────────── 35   │ │
│ │ ★★★☆☆ (35/100)             │ │
│ │ [Updated 2 min ago]         │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Subcategory: Data Science   │ │
│ │ ●●●●●○────────────── 50    │ │
│ │ ★★★★☆ (50/100)             │ │
│ │ [Updated 1 min ago]         │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Subcategory: Cybersecurity  │ │
│ │ ○○○○○○────────────── 0     │ │
│ │ ☆☆☆☆☆ (Not rated)          │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Subcategory: AI/ML          │ │
│ │ ●●●●○○────────────── 40    │ │
│ │ ★★★★☆ (40/100)             │ │
│ │ [Updated now]               │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ [← Back] [View Results when 8+] │
└─────────────────────────────────┘

// Save feedback (fixed, bottom-right safe area)
└─ ✓ Saved (fades out after 2s)
```

### Tablet View (640px - 1024px)
```
┌──────────────────────────────────────────┐
│ Career Interest Assessment - Phase 2     │
│ Progress: 8/32 rated | ████████░░░░░░░░ │
├──────────────────────────────────────────┤
│ [Tech 2/4] [Science 1/4] [Business 0/4]  │
│ [Arts 2/4] [Social 1/4]  [Physical 3/4]  │
│ [Languages 0/4] [Math 2/4]                │
├──────────────────────────────────────────┤
│                Tech (2/4)                 │
├──────────────────────────────────────────┤
│ ┌────────────────────┐ ┌────────────────┐ │
│ │ Web Dev            │ │ Data Science   │ │
│ │ ●●●●●○─── 35      │ │ ●●●●●●── 50   │ │
│ │ ★★★☆☆ 35/100      │ │ ★★★★☆ 50/100  │ │
│ │ [2 min ago]        │ │ [1 min ago]    │ │
│ └────────────────────┘ └────────────────┘ │
│ ┌────────────────────┐ ┌────────────────┐ │
│ │ Cybersecurity      │ │ AI/ML          │ │
│ │ ○○○○○○─── 0       │ │ ●●●●○○── 40   │ │
│ │ ☆☆☆☆☆ Not rated   │ │ ★★★★☆ 40/100  │ │
│ │                    │ │ [Now]          │ │
│ └────────────────────┘ └────────────────┘ │
├──────────────────────────────────────────┤
│ [← Back to Phase 1] [View Results (16+)] │
└──────────────────────────────────────────┘
```

### Desktop View (>1024px)
```
┌────────────────────────────────────────────────────────────┐
│ Career Interest Assessment - Phase 2: Deep Dive             │
│ Global Progress: 16/32 rated (50%)                          │
│ ████████████████░░░░░░░░░░░░░░░░                           │
├────────────────────────────────────────────────────────────┤
│ Tab Navigation (8 tabs with badges):                        │
│ [Tech 3/4]  [Science 2/4] [Business 1/4] [Arts 4/4 ✓]     │
│ [Social 0/4] [Physical 3/4] [Languages 1/4] [Math 2/4]    │
├────────────────────────────────────────────────────────────┤
│ Active Tab: Tech (3/4 rated)                               │
├────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐ ┌──────────────────────────┐  │
│ │ Subcategory: Web Dev    │ │ Subcategory: Data Sci    │  │
│ │                         │ │                          │  │
│ │ ●●●●●○────────── 35/100│ │ ●●●●●●─────── 50/100   │  │
│ │ ★★★☆☆                  │ │ ★★★★☆                   │  │
│ │ Updated: 5 mins ago     │ │ Updated: 2 mins ago      │  │
│ │                         │ │                          │  │
│ │ [Submit]                │ │ [Submit]                 │  │
│ └─────────────────────────┘ └──────────────────────────┘  │
│                                                             │
│ ┌─────────────────────────┐ ┌──────────────────────────┐  │
│ │ Subcategory: Cybersec   │ │ Subcategory: AI/ML       │  │
│ │                         │ │                          │  │
│ │ ○○○○○○────────── 0/100 │ │ ●●●●○○─────── 40/100   │  │
│ │ ☆☆☆☆☆                  │ │ ★★★★☆                   │  │
│ │ Not rated yet           │ │ Updated: Just now        │  │
│ │                         │ │                          │  │
│ │ [Submit]                │ │ [Submit]                 │  │
│ └─────────────────────────┘ └──────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│ [← Back to Phase 1] [View Results ✓] [Continue to Phase 3] │
└────────────────────────────────────────────────────────────┘
```

### Results Page (Desktop)
```
┌────────────────────────────────────────────────────────────┐
│ Your Top 20 Career Matches                                 │
│ Overall Assessment: 42/100 (avg across all categories)     │
├────────────────────────────────────────────────────────────┤
│ Sort: [By Score ▼] [By Subject]  Filter: [All ▼] [Rated]   │
├────────────────────────────────────────────────────────────┤
│ RANK │ SUBJECT     │ SUBCATEGORY      │ SCORE │ MATCH      │
├──────┼─────────────┼──────────────────┼───────┼────────────┤
│  1   │ Tech        │ Data Science     │ 85/100│ ████████░░ │
│  2   │ Tech        │ AI/ML            │ 80/100│ ████████░░ │
│  3   │ Science     │ Bioinformatics   │ 75/100│ ███████░░░ │
│  4   │ Business    │ Strategy         │ 72/100│ ███████░░░ │
│  5   │ Arts        │ Design           │ 70/100│ ███████░░░ │
│  6   │ Physical    │ Engineering      │ 68/100│ ██████░░░░ │
│  7   │ Tech        │ Web Dev          │ 65/100│ ██████░░░░ │
│  8   │ Languages   │ Linguistics      │ 62/100│ ██████░░░░ │
│  9   │ Math        │ Statistics       │ 60/100│ ██████░░░░ │
│ 10   │ Science     │ Physics          │ 58/100│ █████░░░░░ │
│ 11   │ Social      │ Psychology       │ 55/100│ █████░░░░░ │
│ 12   │ Business    │ Finance          │ 52/100│ █████░░░░░ │
│ 13   │ Arts        │ Writing          │ 50/100│ █████░░░░░ │
│ 14   │ Tech        │ Cybersecurity    │ 48/100│ █████░░░░░ │
│ 15   │ Physical    │ Mechanics        │ 45/100│ ████░░░░░░ │
│ 16   │ Languages   │ Translation      │ 42/100│ ████░░░░░░ │
│ 17   │ Math        │ Geometry         │ 40/100│ ████░░░░░░ │
│ 18   │ Science     │ Chemistry        │ 38/100│ ███░░░░░░░ │
│ 19   │ Social      │ Economics        │ 35/100│ ███░░░░░░░ │
│ 20   │ Arts        │ Music            │ 32/100│ ███░░░░░░░ │
├────────────────────────────────────────────────────────────┤
│ 12 more unrated categories below (Show All)                 │
├────────────────────────────────────────────────────────────┤
│ [← Back to Phase 2] [Download Report] [Continue to Phase 3] │
└────────────────────────────────────────────────────────────┘
```

### Results Page (Mobile)
```
┌──────────────────────────────┐
│ Your Top 20 Career Matches   │
│ Avg Score: 42/100            │
│ ████████░░░░░░░░░░░░        │
├──────────────────────────────┤
│ [By Score ▼] [All ▼]        │
├──────────────────────────────┤
│ 1. Data Science (Tech)       │
│    Score: 85/100             │
│    ████████░░                │
│    [+ Show Details]          │
├──────────────────────────────┤
│ 2. AI/ML (Tech)              │
│    Score: 80/100             │
│    ████████░░                │
│    [+ Show Details]          │
├──────────────────────────────┤
│ 3. Bioinformatics (Science)  │
│    Score: 75/100             │
│    ███████░░░                │
│    [+ Show Details]          │
├──────────────────────────────┤
│ ... (scroll to see more)     │
├──────────────────────────────┤
│ [← Back] [Continue ▶]        │
└──────────────────────────────┘
```

---

## 2. RESPONSIVE BREAKPOINTS & TAILWIND CLASSES

### Tab Navigation

```tsx
// Mobile: Horizontal scrollable tabs with overflow indicator
<div className="overflow-x-auto scrollbar-hide md:overflow-visible">
  <div className="flex gap-2 pb-2 min-w-min">
    {tabs.map((tab, idx) => (
      <button
        key={idx}
        onClick={() => setActiveTab(idx)}
        className={`
          flex-shrink-0 px-4 py-2 rounded-lg font-medium
          transition-all duration-200 whitespace-nowrap
          
          ${activeTab === idx
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }
          
          // Responsive sizing
          sm:px-3 sm:py-1.5 sm:text-sm
          md:px-4 md:py-2 md:text-base
          lg:px-5 lg:py-2.5
          
          // Focus state for accessibility
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          
          // Mobile touch target (44px minimum)
          min-h-[44px] flex items-center
        `}
        aria-selected={activeTab === idx}
        aria-label={`${tab.name}, ${tab.rated}/4 rated`}
      >
        <span>{tab.name}</span>
        <span className="ml-2 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
          {tab.rated}/4
        </span>
      </button>
    ))}
  </div>
</div>
```

### Grid Layout

```tsx
// Responsive grid: Mobile (1 col) → Tablet (2 col) → Desktop (2 col)
<div className={`
  grid gap-4 w-full
  
  // Mobile: 1 column (default)
  grid-cols-1
  px-4 py-4
  
  // Tablet: 2 columns starting at 768px
  md:grid-cols-2
  md:gap-6 md:px-6 md:py-6
  
  // Desktop: 2 columns, wider gap, larger padding
  lg:grid-cols-2
  lg:gap-8 lg:px-8 lg:py-8
  
  // Extra large: could add gap reduction if needed
  xl:gap-10 xl:px-10
`}>
  {subcategories.map(subcat => (
    <SubcategoryCard key={subcat.id} {...subcat} />
  ))}
</div>
```

### Progress Bar

```tsx
// Global progress at top, updates in real-time
<div className="w-full bg-white sticky top-0 z-10 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 py-4 md:px-6 lg:px-8">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm md:text-base font-medium text-gray-700">
        Overall Progress: {ratedCount}/32
      </span>
      <span className="text-xs md:text-sm text-gray-500">
        {Math.round((ratedCount / 32) * 100)}%
      </span>
    </div>
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
        style={{width: `${(ratedCount / 32) * 100}%`}}
        role="progressbar"
        aria-valuenow={ratedCount}
        aria-valuemin={0}
        aria-valuemax={32}
      />
    </div>
  </div>
</div>
```

---

## 3. SUBCATEGORY CARD COMPONENT

```tsx
// SubcategoryCard with Slider + Star Rating
export const SubcategoryCard = ({
  id,
  name,
  currentValue = 0,
  onRatingChange,
  lastUpdated,
}) => {
  const [value, setValue] = useState(currentValue);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSliderChange = (newValue) => {
    setValue(newValue);
    setIsSaving(true);
    
    onRatingChange(id, newValue).finally(() => {
      setIsSaving(false);
    });
  };
  
  // Convert 0-100 value to star rating (0-5)
  const starRating = Math.round((value / 100) * 5) / 5;
  
  return (
    <div className={`
      p-4 md:p-6 rounded-lg border border-gray-200
      bg-white hover:shadow-lg hover:border-blue-300
      transition-all duration-200
      
      // Mobile responsive padding
      sm:p-4
      md:p-6
      lg:p-8
    `}>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-gray-500">
          {lastUpdated ? `Updated ${formatTimeAgo(lastUpdated)}` : 'Not rated yet'}
        </p>
      </div>
      
      {/* Slider */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className={`
            w-full h-2 bg-gray-200 rounded-lg cursor-pointer
            appearance-none slider
            
            // Mobile: larger thumb for easier touch
            sm:h-2 md:h-3
            
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          `}
          aria-label={`Rate ${name}: ${value} out of 100`}
          disabled={isSaving}
        />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>0</span>
          <span className="text-sm font-semibold text-blue-600">{value}</span>
          <span>100</span>
        </div>
      </div>
      
      {/* Star Rating Display */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <div key={star} className="relative">
              <span className="text-xl md:text-2xl">☆</span>
              <div
                className="absolute top-0 left-0 overflow-hidden transition-all duration-200"
                style={{width: `${Math.max(0, starRating - star + 1) * 100}%`}}
              >
                <span className="text-xl md:text-2xl text-yellow-400">★</span>
              </div>
            </div>
          ))}
        </div>
        <span className="text-sm md:text-base text-gray-700 ml-2">
          {value > 0 ? `${value}/100` : 'Not rated'}
        </span>
      </div>
      
      {/* Save Status */}
      {isSaving && (
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          Saving...
        </div>
      )}
      
      {/* Loading state */}
      {isSaving && (
        <div className="absolute top-0 right-0 p-2 opacity-50">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  );
};
```

---

## 4. SAVE FEEDBACK SYSTEM

```tsx
// Global Save Indicator (positioned bottom-right, safe area on mobile)
export const SaveIndicator = ({ status = 'idle' }) => {
  return (
    <div className={`
      fixed bottom-6 right-6
      md:bottom-8 md:right-8
      lg:bottom-10 lg:right-10
      
      // Safe area for notch/island
      safe-area-inset
      
      z-50
      
      transition-all duration-300
      ${status === 'idle' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
    `}>
      <div className={`
        px-4 py-2 md:px-6 md:py-3
        rounded-full
        text-sm font-medium
        flex items-center gap-2
        
        // Shadow for depth
        shadow-lg
        
        // Backdrop blur for modern feel
        backdrop-blur-sm
      `}>
        {status === 'saving' && (
          <>
            <div className="w-4 h-4 border-2 border-blue-400 border-t-blue-600 rounded-full animate-spin" />
            <span className="text-gray-700">Saving...</span>
          </>
        )}
        
        {status === 'saved' && (
          <>
            <span className="text-green-600">✓</span>
            <span className="text-gray-700">Saved</span>
          </>
        )}
        
        {status === 'error' && (
          <>
            <span className="text-red-600">✕</span>
            <span className="text-gray-700">Failed. Retrying...</span>
          </>
        )}
      </div>
    </div>
  );
};

// Hook to manage save status
export const useSaveStatus = (autoHideDelay = 2000) => {
  const [status, setStatus] = useState('idle');
  
  const saveData = useCallback(async (callback) => {
    setStatus('saving');
    try {
      await callback();
      setStatus('saved');
      
      // Auto-hide after delay
      setTimeout(() => setStatus('idle'), autoHideDelay);
    } catch (error) {
      setStatus('error');
      
      // Auto-hide error after delay
      setTimeout(() => setStatus('idle'), autoHideDelay);
    }
  }, [autoHideDelay]);
  
  return { status, saveData, setStatus };
};
```

---

## 5. RESULTS PAGE COMPONENT

```tsx
export const ResultsPage = ({ results, sortBy = 'score', filterBy = 'all' }) => {
  const [displayResults, setDisplayResults] = useState(results.slice(0, 20));
  const [sortOption, setSortOption] = useState(sortBy);
  const [filterOption, setFilterOption] = useState(filterBy);
  
  const handleSort = (newSort) => {
    setSortOption(newSort);
    // Re-sort and update display
  };
  
  const handleFilter = (newFilter) => {
    setFilterOption(newFilter);
    // Re-filter and update display
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Your Top 20 Career Matches
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Average Score: {Math.round(results[0]?.avgScore || 0)}/100
          </p>
          
          {/* Overall Progress */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden max-w-xs">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                style={{width: `${Math.round(results[0]?.avgScore || 0)}%`}}
              />
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {Math.round(results[0]?.avgScore || 0)}%
            </span>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex gap-2 flex-1">
              <select
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="score">Sort by Score</option>
                <option value="subject">Sort by Subject</option>
                <option value="name">Sort by Name</option>
              </select>
              
              <select
                value={filterOption}
                onChange={(e) => handleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="rated">Rated Only</option>
                <option value="high">High (70+)</option>
                <option value="medium">Medium (40-70)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results List - Desktop View (Table) */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        <table className="w-full">
          <thead className="border-b-2 border-gray-300">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="pb-3 pl-0">Rank</th>
              <th className="pb-3">Subject</th>
              <th className="pb-3">Subcategory</th>
              <th className="pb-3">Score</th>
              <th className="pb-3">Match</th>
            </tr>
          </thead>
          <tbody>
            {displayResults.map((result, idx) => (
              <tr 
                key={result.id}
                className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
              >
                <td className="py-4 pl-0 font-semibold text-gray-900">{idx + 1}</td>
                <td className="py-4">{result.subject}</td>
                <td className="py-4">{result.subcategory}</td>
                <td className="py-4 font-semibold text-lg text-blue-600">{result.score}/100</td>
                <td className="py-4">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{width: `${result.score}%`}}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Results List - Mobile View (Cards) */}
      <div className="md:hidden max-w-7xl mx-auto px-4 py-4 space-y-3">
        {displayResults.map((result, idx) => (
          <div
            key={result.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="inline-block text-sm font-bold text-gray-500 mr-2">#{idx + 1}</span>
                <h3 className="inline text-base font-semibold text-gray-900">{result.subcategory}</h3>
              </div>
              <span className="text-lg font-bold text-blue-600">{result.score}</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-2">{result.subject}</p>
            
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{width: `${result.score}%`}}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* "Show More" if unrated items */}
      {results.length > 20 && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <button className="w-full py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Show All {results.length} Items
          </button>
        </div>
      )}
      
      {/* Navigation Footer */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-4 justify-between">
          <button className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
            ← Back to Phase 2
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Continue to Phase 3 ▶
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 6. ANIMATION & TRANSITION STRATEGY

```tsx
// Global animation utilities
const animations = {
  // Tab transitions
  tabSwitch: `
    transition-all duration-300 ease-out
    animate-in fade-in-50 slide-in-from-bottom-2 duration-300
  `,
  
  // Card hover effects (desktop only)
  cardHover: `
    hover:shadow-lg hover:border-blue-300 hover:-translate-y-1
    transition-all duration-200 ease-out
  `,
  
  // Slider interactions
  sliderFocus: `
    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    transition-all duration-150
  `,
  
  // Star interactions
  starHover: `
    hover:scale-110 hover:text-yellow-400
    transition-transform duration-150
  `,
  
  // Save status
  saveFadeOut: `
    animate-out fade-out slide-out-to-right-1 duration-500
  `,
  
  // Results stagger
  resultStagger: `
    [animation-timeline: view()]
    [animation-range: entry 0% cover 30%]
    animate-in fade-in-50 slide-in-from-left-4 duration-500
  `,
};

// CSS animations (in Tailwind config or global styles)
const globalStyles = `
  @keyframes slideInTab {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse-ring {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  /* Slider thumb styling */
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
    transition: all 0.2s;
  }
  
  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
    transition: all 0.2s;
  }
  
  input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
  }
`;
```

---

## 7. ACCESSIBILITY CHECKLIST

### Keyboard Navigation
- [ ] Tab key cycles through tabs
- [ ] Arrow keys (← →) navigate between tabs
- [ ] Enter/Space activates tab selection
- [ ] Slider responds to ← → arrow keys for value changes
- [ ] All buttons focusable (tab order logical)
- [ ] Focus visible on all interactive elements

### ARIA Labels & Roles
```tsx
// Tab navigation
<div role="tablist" aria-label="Subject tabs">
  <button
    role="tab"
    aria-selected={activeTab === idx}
    aria-controls={`tabpanel-${idx}`}
    id={`tab-${idx}`}
  >
    {tab.name}
  </button>
</div>
<div
  role="tabpanel"
  id={`tabpanel-${idx}`}
  aria-labelledby={`tab-${idx}`}
  aria-label={`Content for ${tab.name}`}
>
  {/* Content */}
</div>

// Rating slider
<input
  type="range"
  aria-label={`Rate ${name}: currently ${value} out of 100`}
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow={value}
  aria-valuetext={`${value} out of 100`}
/>

// Progress bars
<div
  role="progressbar"
  aria-valuenow={ratedCount}
  aria-valuemin={0}
  aria-valuemax={32}
  aria-label="Overall progress: 16 out of 32 rated"
/>
```

### Color Contrast
- [ ] Text: minimum 4.5:1 contrast ratio (normal text)
- [ ] UI components: minimum 3:1 contrast ratio
- [ ] Progress bars: sufficient contrast between filled/empty
- [ ] Badge colors readable on background
- [ ] Test with tools: WebAIM, axe DevTools, Lighthouse

### Screen Reader Testing
- [ ] Progress updates announced ("16 of 32 rated")
- [ ] Save status announced ("Saving", "Saved", "Error")
- [ ] Tab switches announced ("Tech tab, 3 of 4 rated, selected")
- [ ] Form fields labeled descriptively
- [ ] Error messages clear and associated with fields

---

## 8. PERFORMANCE OPTIMIZATION TIPS

### Lazy Loading (Tabs)
```tsx
// Only render the active tab's content
const [activeTab, setActiveTab] = useState(0);

const TabContent = React.lazy(() => 
  import(`./tabs/Tab${activeTab}`)
);

return (
  <Suspense fallback={<CardSkeleton />}>
    <TabContent />
  </Suspense>
);
```

### Debounced Saves
```tsx
// Debounce slider changes to reduce API calls
const debouncedSave = useMemo(
  () => debounce((id, value) => {
    saveRating(id, value);
  }, 500),
  []
);

const handleSliderChange = (newValue) => {
  setValue(newValue);
  debouncedSave(id, newValue);
};
```

### Image Optimization
```tsx
// Use responsive images with proper sizing
<img
  src="subcategory-icon.svg"
  alt="Icon"
  className="w-6 h-6 md:w-8 md:h-8"
  loading="lazy"
/>
```

### Scroll Position Memory
```tsx
// Preserve scroll position per tab
const scrollPositions = useRef({});

const handleTabChange = (newTab) => {
  scrollPositions.current[activeTab] = window.scrollY;
  setActiveTab(newTab);
  
  // Restore scroll position for new tab
  setTimeout(() => {
    window.scrollTo(0, scrollPositions.current[newTab] || 0);
  }, 0);
};
```

### Code Splitting
```tsx
// Lazy load results page
const ResultsPage = React.lazy(() => import('./ResultsPage'));

// In router
<Suspense fallback={<LoadingPage />}>
  <ResultsPage />
</Suspense>
```

### CSS Optimization
- Use `will-change` sparingly for animated elements
- Minimize layout thrashing (batch DOM reads/writes)
- Use transforms instead of position changes
- Debounce resize handlers

---

## 9. MOBILE-FIRST IMPLEMENTATION APPROACH

### Strategy: Progressive Enhancement
1. **Start with mobile layout** (1 column, linear)
2. **Layer in tablet improvements** (2 columns, better spacing)
3. **Add desktop enhancements** (3+ columns, advanced interactions)

### Breakpoint Strategy
```tsx
const breakpoints = {
  sm: '640px',   // Small phones
  md: '768px',   // Tablets
  lg: '1024px',  // Small laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px', // Large monitors
};

// Usage pattern
<div className={`
  // Mobile (default)
  px-4 py-4 grid grid-cols-1 gap-4
  
  // Tablet and up
  md:px-6 md:py-6 md:grid-cols-2 md:gap-6
  
  // Desktop and up
  lg:px-8 lg:py-8 lg:gap-8
`}>
  {/* Content */}
</div>
```

### Touch-First Interactions
```tsx
// Larger touch targets on mobile
const touchTarget = 'min-h-[44px] min-w-[44px]'; // 44x44px minimum

// Reduce on desktop
<button className={`
  ${touchTarget}
  md:min-h-[40px] md:min-w-auto
  lg:min-h-[36px]
`}>
  {/* Content */}
</button>
```

### Viewport Meta Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

---

## 10. COMPONENT STRUCTURE & PATTERNS

### Directory Structure
```
src/
├── components/
│   ├── Phase2/
│   │   ├── Phase2.tsx              (main container)
│   │   ├── TabNavigation.tsx        (tab bar with badges)
│   │   ├── SubcategoryGrid.tsx      (responsive grid)
│   │   ├── SubcategoryCard.tsx      (slider + stars)
│   │   ├── ProgressBar.tsx          (global progress)
│   │   └── SaveIndicator.tsx        (save status)
│   │
│   ├── Results/
│   │   ├── ResultsPage.tsx          (main results view)
│   │   ├── ResultsList.tsx          (mobile card list)
│   │   ├── ResultsTable.tsx         (desktop table)
│   │   ├── ResultsControls.tsx      (sort, filter)
│   │   └── ResultCard.tsx           (individual result)
│   │
│   └── Common/
│       ├── Button.tsx
│       ├── Select.tsx
│       └── Spinner.tsx
│
├── hooks/
│   ├── useSaveStatus.ts             (save indicator logic)
│   ├── useTabNavigation.ts          (tab keyboard nav)
│   └── useResponsive.ts             (breakpoint detection)
│
├── styles/
│   ├── animations.css               (global animations)
│   ├── form-elements.css            (slider, inputs)
│   └── accessibility.css            (focus states)
│
└── utils/
    ├── formatters.ts                (time ago, score formatting)
    └── animations.ts                (animation helpers)
```

### Example: Complete Phase 2 Component
```tsx
export const Phase2 = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [ratings, setRatings] = useState({});
  const { status, saveData } = useSaveStatus();
  
  const tabs = [
    { name: 'Tech', id: 'tech' },
    { name: 'Science', id: 'science' },
    // ... 6 more
  ];
  
  const subcategories = {
    tech: [
      { id: 'web', name: 'Web Development' },
      // ... 3 more
    ],
    // ... other subjects
  };
  
  const handleRatingChange = async (id, value) => {
    setRatings(prev => ({ ...prev, [id]: value }));
    
    await saveData(async () => {
      await api.saveRating({ id, value });
    });
  };
  
  const ratedCount = Object.keys(ratings).filter(k => ratings[k] > 0).length;
  const activeSubcategories = subcategories[tabs[activeTab].id];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <ProgressBar ratedCount={ratedCount} total={32} />
      
      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        ratings={ratings}
      />
      
      {/* Grid Content */}
      <div className="max-w-7xl mx-auto">
        <SubcategoryGrid
          subcategories={activeSubcategories}
          ratings={ratings}
          onRatingChange={handleRatingChange}
        />
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between mt-8 px-4">
        <button className="btn btn-outline">← Back to Phase 1</button>
        <button 
          className="btn btn-primary"
          disabled={ratedCount < 8}
        >
          View Results {ratedCount >= 8 ? '✓' : ''}
        </button>
      </div>
      
      {/* Save Indicator */}
      <SaveIndicator status={status} />
    </div>
  );
};
```

---

## 11. EMPTY STATES

```tsx
// Phase 2 First Load
<div className="text-center py-16 md:py-24">
  <div className="text-5xl mb-4">🎯</div>
  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
    Let's Discover Your Interests
  </h2>
  <p className="text-lg text-gray-600 mb-6">
    Rate 8 or more subcategories to see your personalized results
  </p>
  <p className="text-sm text-gray-500">
    Move the slider and watch the stars light up. There's no wrong answer!
  </p>
</div>

// Partial Progress
<div className="text-center py-8">
  <p className="text-gray-600">
    You've rated <strong>{ratedCount}/32</strong> categories.
    Rate <strong>{32 - ratedCount}</strong> more to unlock results!
  </p>
</div>
```

---

## 12. QUICK REFERENCE: RESPONSIVE CLASSES

```
Mobile-first base classes (apply by default)
├─ Text: text-sm → md:text-base → lg:text-lg
├─ Padding: p-4 → md:p-6 → lg:p-8
├─ Gap: gap-4 → md:gap-6 → lg:gap-8
├─ Grid: grid-cols-1 → md:grid-cols-2 → lg:grid-cols-2
└─ Width: w-full → md:w-auto → lg:max-w-7xl

Touch targets (mobile)
├─ Minimum 44x44px (min-h-[44px] min-w-[44px])
└─ Reduce on desktop: md:min-h-[40px]

Spacing system (8px grid)
├─ 1 = 8px,  2 = 16px,  3 = 24px
├─ 4 = 32px, 6 = 48px,  8 = 64px
└─ Tablet: +1 step (p-4 → md:p-6)
   Desktop: +2 steps (p-4 → lg:p-8)

Focus states (accessibility)
└─ focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
```

---

## Summary: Design Philosophy

1. **Mobile-First** - Design for small screens, enhance for larger
2. **Progressive Enhancement** - Core experience works on all devices
3. **Accessibility First** - Keyboard nav, ARIA labels, color contrast
4. **Performance Focused** - Lazy load, debounce, minimal re-renders
5. **Micro-interactions** - Smooth transitions, clear feedback
6. **Data-Driven** - Real-time progress, live save status
7. **User-Centered** - Clear progress, encouraging feedback, intuitive controls

This ensures Phase 2 feels polished, responsive, and delightful across all devices.
