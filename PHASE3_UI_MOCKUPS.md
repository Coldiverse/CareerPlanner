# Phase 3 UI/UX Mockups & Component Reference

Visual reference for all Phase 3 screens and components.

---

## 1. Main Results Page (Desktop)

```
╔════════════════════════════════════════════════════════════════════════════╗
║                        Career Path Explorer - Phase 3                      ║
║                           Your Career Matches                              ║
║                   Careers ranked by how well they match                    ║
║                              your interests                                 ║
╚════════════════════════════════════════════════════════════════════════════╝

┌─ SUMMARY CARDS ─────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│   │      42      │  │       8      │  │      18      │  │      7.1     │  │
│   │   matches    │  │  excellent   │  │     good     │  │   average    │  │
│   │    found     │  │     fits     │  │     fits     │  │    match     │  │
│   └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ FILTERS & SORT ────────────────────────────────────────────────────────────┐
│                                                                             │
│  TIER:  ☑ Core  ☑ Advanced  ☐ Niche  ☐ Exploratory                        │
│                                                                             │
│  SALARY: [$0] ──●────────────────────────────── [$500K]                   │
│                                                                             │
│  EDUCATION:  All ▼                                                         │
│                                                                             │
│  SORT BY:  ◉ Score  ○ Salary  ○ Demand  ○ Title                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ CAREER #1 ─────────────────────────────────────────────────────────────────┐
│                                                                             │
│  #1  Software Engineer                                   8.6/10  ★★★★★     │
│       Full Stack | $80-160K | BS Computer Science + bootcamp              │
│                                                                             │
│  MATCH: Excellent Fit (100% coverage)                                     │
│  ✓ Technology: Software Development      [9/10]                           │
│  ✓ Mathematics: Discrete Math            [8/10]                           │
│  ✓ Mathematics: Applied Math             [7/10]                           │
│  ✓ Technology: Web Development           [6/10]                           │
│                                                                             │
│  Demand: Very High  │  Growth: 8% annually  │  Time to entry: 2 years    │
│                                                                             │
│  [▶ Details]  [💼 Learn More]  [★ Save]                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ CAREER #2 ─────────────────────────────────────────────────────────────────┐
│                                                                             │
│  #2  Web Developer (Full Stack)                          8.3/10  ★★★★★    │
│       Web Development | $70-140K | Bootcamp (12 weeks)                    │
│                                                                             │
│  MATCH: Excellent Fit (75% coverage)                                      │
│  ✓ Technology: Web Development           [9/10]                           │
│  ✓ Technology: Software Development      [8/10]                           │
│  ✓ Art & Design: Digital Design          [6/10]                           │
│  ○ Mathematics: Discrete Math            [not rated]                      │
│                                                                             │
│  Demand: Very High  │  Growth: 13% annually  │  Time to entry: 1 year    │
│                                                                             │
│  [▶ Details]  [💼 Learn More]  [★ Save]                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ CAREER #3 ─────────────────────────────────────────────────────────────────┐
│  #3  Data Scientist                                      7.9/10  ★★★★☆    │
│  ... (similar format)                                                     │
└─────────────────────────────────────────────────────────────────────────────┘

                              [↓ Load More]
                         (or infinite scroll)

┌─ EXPLORE FURTHER ───────────────────────────────────────────────────────────┐
│                                                                             │
│  These careers match some of your interests but you haven't rated all     │
│  relevant skills yet. Click to explore missing areas!                     │
│                                                                             │
│  Physicist (50% match)                                                    │
│  You rated: Mechanics, Thermodynamics                                     │
│  Missing: Quantum Physics, Astronomy                                      │
│  [Explore] → Jump to Phase 2, rate missing areas                          │
│                                                                             │
│  Historian (25% match)                                                    │
│  You rated: Modern History                                                │
│  Missing: Ancient, Cultural, Military                                     │
│  [Explore]                                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ ACTION BUTTONS ────────────────────────────────────────────────────────────┐
│                                                                             │
│               [← Back to Phase 2]    [Phase 4: Find Jobs →]                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Career Details Modal (Sidebar)

```
╔════════════════════════════════════╗
║ ✕                                  ║
║ Software Engineer                  ║
║ Full Stack Development             ║
╠════════════════════════════════════╣
║                                    ║
║  Match Score: 8.6/10               ║
║  [████████░] 86%                   ║
║                                    ║
║  Tier: CORE                        ║
║  Demand: VERY HIGH                 ║
║                                    ║
║  ─ DESCRIPTION                     ║
║  Design, build, and maintain       ║
║  software applications across      ║
║  platforms. Write production code, ║
║  solve complex problems, and       ║
║  collaborate with teams.           ║
║                                    ║
║  ─ YOUR FIT                        ║
║  You rated these relevant skills:  ║
║                                    ║
║  • Tech: Software Dev    [9/10] ✓  ║
║  • Math: Discrete Math   [8/10] ✓  ║
║  • Math: Applied Math    [7/10] ✓  ║
║  • Tech: Web Dev         [6/10] ✓  ║
║                                    ║
║  Coverage: 100% (all rated)        ║
║                                    ║
║  ─ CAREER PATH                     ║
║  0-2 years:  Junior Engineer       ║
║  2-5 years:  Mid Engineer          ║
║  5-10 years: Senior Engineer       ║
║  10+ years:  Staff/Lead Engineer   ║
║                                    ║
║  ─ SALARY & OUTLOOK                ║
║  Median: $125,000                  ║
║  Range: $80,000 - $160,000         ║
║                                    ║
║  Entry level (0-2yr): ~$75,000     ║
║  Mid level (2-5yr):   ~$110,000    ║
║  Senior (5-10yr):     ~$150,000    ║
║  Staff (10+yr):       ~$180,000    ║
║                                    ║
║  Job Growth: 8% annually           ║
║  Outlook: EXCELLENT                ║
║                                    ║
║  ─ EDUCATION                       ║
║  Bachelor's degree in CS or        ║
║  bootcamp program (12-24 weeks)    ║
║  or self-taught with portfolio     ║
║                                    ║
║  Time to entry: 2 years typical    ║
║                                    ║
║  ─ KEY SKILLS                      ║
║  • Python / JavaScript / Go        ║
║  • Git & version control           ║
║  • REST API design                 ║
║  • Database design (SQL, NoSQL)    ║
║  • Problem-solving & debugging     ║
║  • System design thinking          ║
║                                    ║
║  ─ RELATED CAREERS                 ║
║  If you like this, explore:        ║
║                                    ║
║  • Web Developer                   ║
║    8.4/10 match (similar focus)    ║
║                                    ║
║  • Backend Engineer                ║
║    8.2/10 match (narrower scope)   ║
║                                    ║
║  • Data Engineer                   ║
║    7.5/10 match (different domain) ║
║                                    ║
║  ─ DISCOVERY TIP                   ║
║  "You seem really interested in    ║
║   building products people use     ║
║   daily. If you like frontend too, ║
║   check out 'UX/UI Designer' next" ║
║                                    ║
║  [Phase 4] Next: Find Jobs →       ║
║  [★ Save] [Share] [Print]          ║
║                                    ║
╚════════════════════════════════════╝
```

---

## 3. Mobile View (Single Column)

```
┌─────────────────────────────────────┐
│  Career Path Explorer - Phase 3     │
│                                     │
│  Your Career Matches                │
│  42 careers ranked by fit           │
│                                     │
└─────────────────────────────────────┘

┌─ STATS ─────────────────────────────┐
│                                     │
│  42 matches    8 excellent fits    │
│                                     │
│  18 good fits   7.1 avg score      │
│                                     │
└─────────────────────────────────────┘

┌─ FILTERS ───────────────────────────┐
│  Tier: [Core ✓] [Adv ✓] [Niche]   │
│                                     │
│  Salary: $0 ──●──── $500K          │
│                                     │
│  [Sort ▼: Score]                    │
│                                     │
└─────────────────────────────────────┘

┌─ CAREER #1 ─────────────────────────┐
│                                     │
│  #1  Software Engineer              │
│       8.6/10  ★★★★★                 │
│                                     │
│  Full Stack | $80-160K              │
│  BS CS + bootcamp                   │
│                                     │
│  100% match (4 of 4 areas)          │
│                                     │
│  [▶ View Full Details]              │
│                                     │
└─────────────────────────────────────┘

┌─ CAREER #2 ─────────────────────────┐
│                                     │
│  #2  Web Developer                  │
│       8.3/10  ★★★★★                 │
│                                     │
│  Web Development | $70-140K         │
│  Bootcamp (12 weeks)                │
│                                     │
│  75% match (3 of 4 areas)           │
│                                     │
│  [▶ View Full Details]              │
│                                     │
└─────────────────────────────────────┘

       [↓ Load More Careers]

┌─ EXPLORE FURTHER ───────────────────┐
│                                     │
│  Physicist (50% match)              │
│  Rate more physics subcategories    │
│  [Explore this path]                │
│                                     │
└─────────────────────────────────────┘

┌─ ACTIONS ───────────────────────────┐
│  [← Back]      [Phase 4 →]          │
└─────────────────────────────────────┘
```

---

## 4. Career Card Component (Expanded View)

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  #1  Software Engineer                             8.6/10     │
│       ★★★★★                                                    │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Full Stack | $80-160K | BS CS + bootcamp                    │
│                                                                │
│  MATCH: Excellent Fit (100% coverage)                         │
│                                                                │
│  ✓ Technology: Software Development      [9/10]  weight 0.95  │
│  ✓ Mathematics: Discrete Math            [8/10]  weight 0.75  │
│  ✓ Mathematics: Applied Math             [7/10]  weight 0.5   │
│  ✓ Technology: Web Development           [6/10]  weight 0.4   │
│                                                                │
│  Weighted score: (9×0.95 + 8×0.75 + 7×0.5 + 6×0.4) / 3.6    │
│                = 8.4/10 + 0.2 bonus = 8.6/10 final           │
│                                                                │
│  Demand Level: Very High  │  Growth: 8% annually              │
│  Years to Entry: 2        │  Job Outlook: Excellent           │
│                                                                │
│  [▶ View Full Details] [💼 Learn More] [★ Save this Career]  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 5. Filter UI Components

### Tier Filter
```
┌─ TIER ────────────────────────────────────────┐
│                                               │
│  ☑ Core (15 careers)                         │
│     High demand, clear paths                 │
│                                               │
│  ☑ Advanced (10 careers)                     │
│     Specialized education required           │
│                                               │
│  ☐ Niche (10 careers)                        │
│     Specific interests, rarer roles          │
│                                               │
│  ☐ Exploratory (8 careers)                   │
│     Unusual combinations, emerging fields    │
│                                               │
│  [Apply Filters]                              │
│                                               │
└───────────────────────────────────────────────┘
```

### Salary Filter
```
┌─ SALARY RANGE ─────────────────────────────┐
│                                            │
│  Min: $50,000       Max: $200,000          │
│                                            │
│  [$50K] ──────●────────────── [$500K]     │
│       Drag to adjust range                 │
│                                            │
│  Presets: [Entry] [Mid] [Senior] [Expert] │
│                                            │
│  [Apply]                                   │
│                                            │
└────────────────────────────────────────────┘
```

### Education Filter
```
┌─ EDUCATION REQUIRED ───────┐
│                            │
│  All ▼                     │
│                            │
│  Options:                  │
│  • All                     │
│  • High school             │
│  • Associate/Certificate   │
│  • Bachelor's degree       │
│  • Master's degree         │
│  • PhD/Professional        │
│                            │
│  [Apply]                   │
│                            │
└────────────────────────────┘
```

### Sort Options
```
┌─ SORT BY ──────────────────┐
│                            │
│  ◉ Score (highest first)   │
│                            │
│  ○ Salary (highest first)  │
│                            │
│  ○ Demand (easiest entry)  │
│                            │
│  ○ Title (A-Z)             │
│                            │
│  [Apply]                   │
│                            │
└────────────────────────────┘
```

---

## 6. Empty States

### No Phase 2 Ratings
```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║                  Rate Subcategories First              ║
║                                                        ║
║  Phase 3 matches careers to your Phase 2 ratings.     ║
║  Go back and rate some subcategories!                 ║
║                                                        ║
║         [← Back to Phase 2: Rate Subcategories]        ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

### No Matches After Filtering
```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║              No careers match your filters             ║
║                                                        ║
║  Try:                                                  ║
║  • Adjust the salary range                            ║
║  • Show "Niche" careers                               ║
║  • Lower education requirement filter                 ║
║                                                        ║
║              [Reset Filters]  [Back to Full List]      ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

### Low Interest Scores
```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║          No strong matches found at your levels        ║
║                                                        ║
║  This often means you haven't found your passion yet. ║
║                                                        ║
║  Try:                                                  ║
║  • Rate things you LOVE as 8-10                       ║
║  • Rate things less interesting as 1-3                ║
║  • Explore "Niche" & "Exploratory" tiers             ║
║  • Rate more subcategories                            ║
║                                                        ║
║  But here are all careers ranked by your scores:      ║
║  (Career list continues below...)                     ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## 7. Match Type Badges

```
┌──────────────────────────────────────┐
│  MATCH INDICATORS                    │
│                                      │
│  🟩 Excellent Fit (7.5+)            │
│     Perfect match, pursue this!      │
│                                      │
│  🟦 Good Fit (6.0-7.4)              │
│     Strong match, worth exploring    │
│                                      │
│  🟨 Partial Fit (4.5-5.9)           │
│     Some interest, maybe later       │
│                                      │
│  🟥 Weak Fit (<4.5)                 │
│     Limited match, skip for now      │
│                                      │
│  ◉ Partial Coverage (X% rated)      │
│     You haven't rated all relevant   │
│     areas — explore to see more      │
│                                      │
└──────────────────────────────────────┘
```

---

## 8. Star Rating System

```
Score: 8.6/10

Visual representation:
★★★★★ (5 full stars)

Alternative (if using half-stars):
★★★★☆ (4.5 stars)

Color-coded:
🟢 7.5-10.0 (Excellent)  ★★★★★
🟡 6.0-7.4  (Good)       ★★★★☆
🟠 4.5-5.9  (Fair)       ★★★☆☆
🔴 < 4.5    (Weak)       ★★☆☆☆
```

---

## 9. Responsive Grid Layout

### Desktop (3 columns)
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Career Card  │ │ Career Card  │ │ Career Card  │
├──────────────┤ ├──────────────┤ ├──────────────┤
│ Card content │ │ Card content │ │ Card content │
└──────────────┘ └──────────────┘ └──────────────┘

┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Career Card  │ │ Career Card  │ │ Career Card  │
└──────────────┘ └──────────────┘ └──────────────┘
```

### Tablet (2 columns)
```
┌─────────────────────┐ ┌─────────────────────┐
│ Career Card         │ │ Career Card         │
├─────────────────────┤ ├─────────────────────┤
│ Card content        │ │ Card content        │
└─────────────────────┘ └─────────────────────┘

┌─────────────────────┐ ┌─────────────────────┐
│ Career Card         │ │ Career Card         │
└─────────────────────┘ └─────────────────────┘
```

### Mobile (1 column)
```
┌──────────────────────┐
│ Career Card          │
├──────────────────────┤
│ Card content         │
└──────────────────────┘

┌──────────────────────┐
│ Career Card          │
├──────────────────────┤
│ Card content         │
└──────────────────────┘

┌──────────────────────┐
│ Career Card          │
└──────────────────────┘
```

---

## 10. Color Scheme

```
Primary Colors:
- Indigo (#4f46e5)     — Headers, primary buttons, accents
- Blue (#3b82f6)       — Secondary accents
- Green (#10b981)      — Success, match icons

Background:
- Gradient: indigo-50 → blue-100
- Cards: white (#ffffff)
- Borders: gray-200 (#e5e7eb)

Text:
- Primary: gray-900 (#111827)
- Secondary: gray-600 (#4b5563)
- Tertiary: gray-500 (#6b7280)
- Light: gray-400 (#9ca3af)

Score Colors:
- 7.5-10.0: Green (#10b981)
- 6.0-7.4:  Blue (#3b82f6)
- 4.5-5.9:  Orange (#f59e0b)
- < 4.5:    Red (#ef4444)

Match Type Badges:
- Excellent: bg-green-100, text-green-800
- Good:      bg-blue-100, text-blue-800
- Partial:   bg-orange-100, text-orange-800
- Weak:      bg-red-100, text-red-800
```

---

## 11. Animation & Interaction

```
On Page Load:
- Summary cards: fade in + slide up (200ms)
- Career cards: stagger in (100ms each)

On Filter/Sort Change:
- Cards re-order with smooth transition (300ms)
- No full page reload

On Career Card Hover (desktop):
- Shadow increases (md → lg)
- Cursor becomes pointer
- Details button highlights

On Click Career Card:
- Modal slides in from right (300ms)
- Background dims
- Modal is dismissible (click X or click outside)

On Save Career:
- Star icon fills with animation (100ms)
- Toast notification: "Career saved ★" (3 second auto-dismiss)

On Apply Filters:
- Loading spinner while re-calculating
- Results list updates smoothly
- "Showing X matches" text updates
```

---

## 12. Error States

```
Firebase Loading Error:
┌──────────────────────────────────────┐
│  ⚠️  Couldn't load your ratings      │
│                                      │
│  We had trouble connecting to the    │
│  server. Your data might not be      │
│  saved.                              │
│                                      │
│  [Try Again]  [Continue Offline]     │
└──────────────────────────────────────┘

Matching Algorithm Error:
┌──────────────────────────────────────┐
│  ⚠️  Error calculating career matches │
│                                      │
│  Something went wrong. Please try    │
│  going back and returning.           │
│                                      │
│  [← Back to Phase 2]                 │
└──────────────────────────────────────┘

No Internet Connection:
┌──────────────────────────────────────┐
│  📡  No internet connection           │
│                                      │
│  You can still view cached results   │
│  from your last session.             │
│                                      │
│  [Continue with cached data]         │
└──────────────────────────────────────┘
```

---

## 13. Accessibility Features

```
Focus Indicators:
- All buttons: ring-2 ring-offset-2 ring-indigo-500
- Input fields: border-2 border-indigo-500
- Career cards: keyboard navigation (Tab → Enter)

ARIA Labels:
- <button aria-label="View details for Software Engineer">
- <div role="banner" aria-label="Career matches summary">
- <main aria-label="Career search results">

Skip Links (mobile):
[Skip to main content]
[Skip to filters]
[Skip to results]

Color Contrast:
- All text ≥ 4.5:1 ratio (WCAG AA)
- Links underlined + color (not color alone)
- Icons + text labels (not icons alone)

Keyboard Navigation:
- Tab through all interactive elements
- Escape closes modals
- Enter activates buttons/links
- Arrow keys scroll/navigate lists

Screen Reader Support:
- Heading hierarchy (h1, h2, h3)
- Alt text for score icons
- Form labels (explicit <label> tags)
- Live regions for dynamic updates
```

---

## Component Usage Examples

### Use CareerCard
```jsx
<CareerCard
  rank={1}
  career={softwareEngineer}
  matchData={{
    score: 8.6,
    matchType: 'excellent_fit',
    matchPercent: 100,
    ratedReqs: 4,
    totalReqs: 4,
  }}
  onViewDetails={() => setExpandedCareer(softwareEngineer)}
/>
```

### Use CareerDetailsModal
```jsx
<CareerDetailsModal
  career={softwareEngineer}
  matchData={matchData}
  phase1Ratings={phase1Ratings}
  phase2Ratings={phase2Ratings}
  onClose={() => setExpandedCareer(null)}
  onSave={() => saveCareer(softwareEngineer.id)}
/>
```

### Use FilterBar
```jsx
<FilterBar
  filters={{tier: ['core', 'advanced'], minSalary: 50000}}
  sortBy='score'
  onFilterChange={(newFilters) => setFilters(newFilters)}
  onSortChange={(newSort) => setSortBy(newSort)}
/>
```

---

## Responsive Breakpoints

```
Mobile: < 640px (sm)
  - 1 column layout
  - Filters: stacked vertically
  - No hover effects (touch-friendly)
  - Larger touch targets (48px minimum)

Tablet: 640px - 1024px (md)
  - 2 column layout
  - Filters: grid of 2
  - Subtle hover effects

Desktop: > 1024px (lg)
  - 3+ column layout
  - Filters: grid of 4
  - Full hover effects
  - Sidebar modals (not full-screen)

Large Desktop: > 1280px (xl)
  - 4 column layout
  - More spacing
  - Sidebar can be wider
```

---

## Summary: Key Visual Principles

1. **Card-based:** All content in cards (matches Phase 1-2)
2. **Grid layout:** Responsive (1-3 columns based on screen)
3. **Color-coded:** Score colors (green/blue/orange/red)
4. **Matching UI:** Same interaction patterns throughout
5. **Modal details:** Click card → see sidebar details
6. **Accessible:** WCAG 2.1 AA minimum (focus, contrast, ARIA)
7. **Mobile-first:** Responsive design, touch-friendly
8. **Performance:** Smooth animations, no jank

