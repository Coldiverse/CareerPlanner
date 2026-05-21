# Phase 3 Component Architecture Deep Dive
## State Management, Data Flow, and Implementation Patterns

**Purpose**: Answer the 10 critical architecture questions with concrete code examples, diagrams, and best practices.

**Context**: Phase 2 has passed 32 subcategory ratings via ScoreContext. Phase 3 must calculate ~87 career matches, display results with filters/sorting, and allow modal details view.

---

## 1. State Management Strategy

### 1.1 Where Do 87 Careers Live?

**Decision: IMPORT STATIC DATA ONCE AT MODULE LEVEL**

```javascript
// src/data/careers.js (never changes, ~30KB)
export const CAREERS = [
  {
    id: 1,
    title: "Software Engineer",
    tier: "high",
    salary: { min: 80, max: 160, median: 125 },
    skillWeights: {
      technology_software: 0.95,
      mathematics_discrete: 0.75,
      problem_solving: 0.70,
      // ... 10-15 weights total
    },
    // ... other fields
  },
  // ... 86 more careers
];

// src/phases/PhaseThree/index.jsx (main container)
import { CAREERS } from '../../data/careers.js';

export default function PhaseThree() {
  const { phase2Ratings } = useContext(ScoreContext);
  
  // Calculate matches ONCE when ratings change
  const [careerMatches, setCareerMatches] = useState([]);
  
  useEffect(() => {
    if (!phase2Ratings || Object.keys(phase2Ratings).length === 0) return;
    
    const matches = CAREERS.map(career => ({
      ...career,
      matchScore: calculateMatch(career, phase2Ratings),
      phase2Contribution: calculateContribution(career, phase2Ratings),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
    
    setCareerMatches(matches);
  }, [phase2Ratings]); // Only recalculate when ratings change
  
  // Rest of component...
}
```

**Why this approach:**
- ✅ Careers are static data (no mutations)
- ✅ Load once, reuse forever
- ✅ Single source of truth
- ✅ No memory duplication
- ✅ Fast imports (bundler optimizes)

---

### 1.2 Caching: Calculate Once, Filter Many Times

**Decision: CALCULATE ALL MATCHES ONCE (via useEffect), CACHE IN STATE, FILTER IN-MEMORY (via useMemo)**

```javascript
// PhaseThree.jsx
export default function PhaseThree() {
  const { phase2Ratings } = useContext(ScoreContext);
  
  // ==== CALCULATED STATE ====
  // Recalculate only when phase2Ratings changes (rare)
  const [careerMatches, setCareerMatches] = useState([]); // All 87
  
  useEffect(() => {
    if (!phase2Ratings || Object.keys(phase2Ratings).length === 0) return;
    
    console.time('Calculate matches');
    const newMatches = CAREERS.map(career => ({
      ...career,
      matchScore: calculateMatch(career, phase2Ratings),
    })).sort((a, b) => b.matchScore - a.matchScore);
    console.timeEnd('Calculate matches'); // Usually 2-5ms
    
    setCareerMatches(newMatches);
  }, [phase2Ratings]);
  
  // ==== UI CONTROL STATE ====
  // These are transient, never recalculate scores
  const [filters, setFilters] = useState({
    tier: "all",           // "high" | "mid" | "low" | "all"
    salaryRange: [30, 200], // [min_k, max_k]
    education: "all",      // "hs" | "bs" | "ms" | "phd" | "all"
    matchType: "all",      // "high" (80+) | "medium" (50-79) | "low" (<50) | "all"
  });
  const [sortBy, setSortBy] = useState("matchScore");
  
  // ==== DERIVED STATE (MEMOIZED) ====
  // Recalculate when careers, filters, or sort changes (instant)
  const filteredMatches = useMemo(() => {
    let results = careerMatches;
    
    // Apply each filter
    if (filters.tier !== "all") {
      results = results.filter(c => c.tier === filters.tier);
    }
    if (filters.salaryRange[0] > 30 || filters.salaryRange[1] < 200) {
      results = results.filter(c =>
        c.salary.median >= filters.salaryRange[0] * 1000 &&
        c.salary.median <= filters.salaryRange[1] * 1000
      );
    }
    if (filters.education !== "all") {
      results = results.filter(c => c.educationLevel === filters.education);
    }
    if (filters.matchType !== "all") {
      results = results.filter(c => {
        const score = c.matchScore;
        if (filters.matchType === "high") return score >= 80;
        if (filters.matchType === "medium") return 50 <= score && score < 80;
        if (filters.matchType === "low") return score < 50;
      });
    }
    
    // Sort
    const comparators = {
      matchScore: (a, b) => b.matchScore - a.matchScore,
      salary: (a, b) => b.salary.median - a.salary.median,
      demand: (a, b) => (b.demandScore || 0) - (a.demandScore || 0),
      name: (a, b) => a.title.localeCompare(b.title),
    };
    results.sort(comparators[sortBy]);
    
    return results;
  }, [careerMatches, filters, sortBy]);
  
  // ==== MODAL STATE ====
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const selectedCareer = selectedCareerId
    ? filteredMatches.find(c => c.id === selectedCareerId)
    : null;
  
  // ... rest of component
}
```

**Performance Impact:**
- Calculate: ~3-5ms (once per phase visit)
- Filter: ~1ms (per filter change)
- Sort: ~0.5ms (per sort change)
- Total: <10ms for any action ✓

---

### 1.3 Filter State Structure

**Decision: SINGLE FILTER OBJECT, UPDATE via useCallback**

```javascript
const [filters, setFilters] = useState({
  tier: "all",              // Career tier
  salaryRange: [30, 200],   // Min/max in thousands
  education: "all",         // Education requirement
  matchType: "all",         // Score bracket
});

// Handler: merge updates (not replace entire object)
const handleFilterChange = useCallback((updates) => {
  setFilters(prev => ({ ...prev, ...updates }));
}, []);

// Usage in FilterControls
<TierSelect
  value={filters.tier}
  onChange={(tier) => handleFilterChange({ tier })}
/>
<SalarySlider
  min={filters.salaryRange[0]}
  max={filters.salaryRange[1]}
  onChange={(min, max) => handleFilterChange({ salaryRange: [min, max] })}
/>

// Reset button
const handleResetFilters = useCallback(() => {
  setFilters({
    tier: "all",
    salaryRange: [30, 200],
    education: "all",
    matchType: "all",
  });
}, []);
```

**Why this structure:**
- ✅ Single source of truth for filters
- ✅ Partial updates (no accidental overwrites)
- ✅ Easy to add new filters later
- ✅ Serialize/deserialize for URL params (future Phase 4)

---

### 1.4 Sort State (Simple + Scalable)

**Decision: SINGLE STRING (field name), TOGGLE ASC/DESC WITH SECONDARY STATE**

```javascript
const [sortBy, setSortBy] = useState("matchScore"); // "matchScore" | "salary" | "demand" | "name"
const [sortAsc, setSortAsc] = useState(false); // false = descending (default)

const SORT_COMPARATORS = {
  matchScore: (a, b) => sortAsc
    ? a.matchScore - b.matchScore
    : b.matchScore - a.matchScore,
  salary: (a, b) => sortAsc
    ? a.salary.median - b.salary.median
    : b.salary.median - a.salary.median,
  demand: (a, b) => sortAsc
    ? (a.demandScore || 0) - (b.demandScore || 0)
    : (b.demandScore || 0) - (a.demandScore || 0),
  name: (a, b) => sortAsc
    ? a.title.localeCompare(b.title)
    : b.title.localeCompare(a.title),
};

// Handler
const handleSortChange = useCallback((field) => {
  if (sortBy === field) {
    // Toggle direction if same field clicked
    setSortAsc(!sortAsc);
  } else {
    // New field: sort descending by default
    setSortBy(field);
    setSortAsc(false);
  }
}, [sortBy, sortAsc]);

// Usage
<button
  onClick={() => handleSortChange("matchScore")}
  className={sortBy === "matchScore" ? "active" : ""}
>
  Score {sortBy === "matchScore" && (sortAsc ? "↑" : "↓")}
</button>
```

**Alternative (more compact):**
```javascript
const [sort, setSort] = useState({ field: "matchScore", asc: false });

const handleSortChange = useCallback((field) => {
  setSort(prev => ({
    field,
    asc: prev.field === field ? !prev.asc : false,
  }));
}, []);
```

---

### 1.5 Modal State (ID-based, Derive on Demand)

**Decision: STORE ONLY CAREER ID, DERIVE SELECTED OBJECT FROM FILTERED MATCHES**

```javascript
const [selectedCareerId, setSelectedCareerId] = useState(null);

// Derive the selected career object (memoized)
const selectedCareer = useMemo(() => {
  if (!selectedCareerId) return null;
  return filteredMatches.find(c => c.id === selectedCareerId);
}, [selectedCareerId, filteredMatches]);

// Handler: toggle (click same career twice to close)
const handleCareerClick = useCallback((careerId) => {
  setSelectedCareerId(prev => prev === careerId ? null : careerId);
}, []);

// Handler: always close
const handleCloseModal = useCallback(() => {
  setSelectedCareerId(null);
}, []);

// Render
{selectedCareer && (
  <CareerModal
    career={selectedCareer}
    isSaved={savedCareerIds.includes(selectedCareer.id)}
    onClose={handleCloseModal}
    onSaveToggle={() => toggleSaveCareer(selectedCareer.id)}
  />
)}
```

**Why ID instead of object:**
- ✅ Detect double-click (same ID → close)
- ✅ Lighter memory footprint
- ✅ Can re-fetch details if needed (future)
- ✅ Clear intent: "select by ID"

---

### 1.6 Saved Careers State (Persist to localStorage)

**Decision: ARRAY OF IDS, PERSIST TO LOCALSTORAGE, SYNC ON CHANGE**

```javascript
const STORAGE_KEY = "phase3_savedCareers";

const [savedCareerIds, setSavedCareerIds] = useState(() => {
  // Initialize from localStorage
  if (typeof window === 'undefined') return []; // SSR safety
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
});

// Persist whenever it changes
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCareerIds));
}, [savedCareerIds]);

// Handler: toggle save
const toggleSaveCareer = useCallback((careerId) => {
  setSavedCareerIds(prev =>
    prev.includes(careerId)
      ? prev.filter(id => id !== careerId)
      : [...prev, careerId]
  );
}, []);

// Handler: export saved careers
const exportSavedCareers = useCallback(() => {
  const saved = filteredMatches.filter(c => savedCareerIds.includes(c.id));
  // Download as JSON / PDF / etc.
}, [filteredMatches, savedCareerIds]);
```

**Optional: Sync with Firebase**
```javascript
useEffect(() => {
  if (!userId) return;
  
  const saveToFirebase = async () => {
    const db = getFirestore();
    await setDoc(doc(db, 'users', userId, 'saved_careers'), {
      ids: savedCareerIds,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  };
  
  const debounce = setTimeout(saveToFirebase, 1000);
  return () => clearTimeout(debounce);
}, [savedCareerIds, userId]);
```

---

### 1.7 Summary Table: What State Goes Where?

| State | Type | Location | Purpose | Recalc? | Persist? | Dependencies |
|-------|------|----------|---------|---------|----------|---|
| `careerMatches` | Calculated | PhaseThree useState | All 87 careers with scores | Yes (useEffect) | No | phase2Ratings |
| `filters` | UI Control | PhaseThree useState | Active filters | No | No (could add) | User input |
| `sortBy` | UI Control | PhaseThree useState | Sort field & direction | No | No | User click |
| `selectedCareerId` | UI Control | PhaseThree useState | Modal open state | No | No | User click |
| `savedCareerIds` | User Data | PhaseThree useState | Favorite careers | No | Yes (localStorage) | User action |
| `filteredMatches` | Derived | useMemo | Filtered + sorted careers | Yes (useMemo) | No | careerMatches, filters, sortBy |
| `selectedCareer` | Derived | useMemo | Selected career object | Yes (useMemo) | No | selectedCareerId, filteredMatches |

---

## 2. Component Hierarchy & Responsibilities

### 2.1 Recommended Tree Structure

```
App.jsx (router, theme provider)
  ├─ ScoreProvider (context)
  │
  └─ PhaseThreeRouter (/phase/3)
      └─ PhaseThree.jsx ⭐ STATE CONTAINER
          ├─ SummaryStats.jsx (read-only display)
          │   └─ StatCard.jsx × 4
          │
          ├─ ControlBar.jsx (layout + mobile toggle)
          │   ├─ FilterControls.jsx (tier, salary, education, match)
          │   │   ├─ TierSelect.jsx
          │   │   ├─ SalarySlider.jsx
          │   │   ├─ EducationSelect.jsx
          │   │   └─ MatchTypeButtons.jsx
          │   │
          │   └─ SortControls.jsx (radio group)
          │       └─ SortButton.jsx × 4
          │
          ├─ CareerGrid.jsx (responsive grid, virtualized?)
          │   └─ CareerCard.jsx × N (memoized)
          │       ├─ MatchBadge
          │       ├─ TierBadge
          │       └─ SaveButton
          │
          └─ CareerModal.jsx (portaled, fixed overlay)
              ├─ ModalHeader
              ├─ ModalBody (scrollable sections)
              │   ├─ AboutSection
              │   ├─ SalarySection
              │   ├─ EducationSection
              │   ├─ DemandSection
              │   └─ SkillsBreakdown
              └─ ModalFooter (buttons)
```

### 2.2 Component Responsibilities

**PhaseThree.jsx** (250 lines)
```
STATE:
  - Read phase2Ratings from ScoreContext
  - Hold careerMatches (calculated)
  - Hold filters, sortBy, selectedCareerId, savedCareerIds
  
COMPUTE:
  - Memoize filteredMatches (filtered + sorted)
  - Memoize selectedCareer (from ID)
  - Calculate summaryStats (avg, high count, etc.)
  
HANDLE:
  - handleFilterChange → setFilters
  - handleSortChange → setSortBy
  - handleCareerClick → setSelectedCareerId
  - handleCloseModal → setSelectedCareerId(null)
  - toggleSaveCareer → setSavedCareerIds
  
ORCHESTRATE:
  - Pass data down to children
  - Pass handlers (memoized via useCallback)
  - Conditional render modal
```

**SummaryStats.jsx** (100 lines)
```
RECEIVES:
  - careerMatches (all 87)
  - savedCareerIds
  - filteredMatches (optional, for filtered stats)
  
DISPLAYS:
  - 4 stat cards (avg match, high matches, saved count, top career)
  - No state, no handlers
  
MEMOIZE:
  - React.memo() to avoid re-render on irrelevant prop changes
```

**ControlBar.jsx** (150 lines, responsive layout)
```
STATE:
  - filterOpen (mobile toggle)
  
RENDERS:
  - Mobile: "Filters" toggle button + FilterControls (conditional)
  - Desktop: FilterControls + SortControls side-by-side
  
RECEIVES:
  - filters, sortBy (values)
  - onFilterChange, onSortChange (handlers from PhaseThree)
  
PASSES DOWN:
  - All to child controls
```

**FilterControls.jsx** (200 lines)
```
RECEIVES:
  - filters (all filter values)
  - onFilterChange (handler)
  
RENDERS:
  - TierSelect dropdown
  - SalarySlider range slider
  - EducationSelect dropdown
  - MatchTypeButtons radio group
  - Reset button
  
CALLS:
  - onFilterChange({ tier: "high" })
  - onFilterChange({ salaryRange: [50, 150] })
  - etc.
```

**SortControls.jsx** (120 lines)
```
RECEIVES:
  - sortBy (current sort field)
  - onSortChange (handler)
  
RENDERS:
  - 4 sort buttons (Score, Salary, Demand, Name)
  - Each shows direction indicator (↑↓)
  
CALLS:
  - onSortChange("matchScore")
  - onSortChange("salary")
  - etc.
```

**CareerGrid.jsx** (200 lines, includes virtualization decision)
```
RECEIVES:
  - careers (filtered matches, usually 20-60 items)
  - savedCareerIds
  - onCardClick (handler)
  - onSaveToggle (handler)
  
RENDERS:
  - If <20 items: simple grid (no virtualization)
  - If ≥20 items: consider react-window List (optional)
  - CSS Grid: auto-fill, responsive columns
  
LOGIC:
  - Map careers to CareerCard
  - Each card is memoized
  - Pass isSelected state
```

**CareerCard.jsx** (120 lines, memoized)
```
RECEIVES:
  - career (one career object)
  - isSaved (boolean)
  - isSelected (boolean, optional)
  - onSave (handler)
  - onClick (handler)
  
RENDERS:
  - Compact display: name, match %, tier badge, salary, demand
  - Heart icon (save button)
  - Hover effect, selected border
  
MEMOIZED:
  - React.memo with custom comparison
  - Re-render only if career or isSaved changed
```

**CareerModal.jsx** (350 lines, portaled)
```
RECEIVES:
  - career (selected career)
  - isSaved (boolean)
  - onClose (handler)
  - onSaveToggle (handler)
  - phase2Ratings (optional, from context for skills)
  
RENDERS:
  - Portal to document.body
  - Overlay + modal content
  - Fixed position or mobile full-screen
  - Smooth entrance animation
  
FEATURES:
  - ESC key closes modal
  - Click outside closes modal
  - Focus trap (tab cycling)
  - Scroll lock (body overflow: hidden)
  - Sections: About, Salary, Education, Demand, Skills
  
HANDLERS:
  - Close button, background click, ESC
  - Save button (onSaveToggle)
```

---

## 3. Data Flow Diagram

### 3.1 ASCII Diagram

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ScoreContext (global, from Phase 2) ┃
┃ ├─ phase1Ratings                     ┃
┃ └─ phase2Ratings (32 subcats)        ┃
┗━━━━━━━━┬━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
         │ useContext
         ▼
┌─────────────────────────────────────────────────┐
│ PhaseThree Container (main orchestrator)        │
├─────────────────────────────────────────────────┤
│ STATE:                                          │
│  • careerMatches ← calculate() once             │
│  • filters ← useState (user input)              │
│  • sortBy ← useState (user input)               │
│  • selectedCareerId ← useState (click)          │
│  • savedCareerIds ← useState + localStorage     │
│                                                 │
│ MEMOIZED:                                       │
│  • filteredMatches ← useMemo (filter+sort)     │
│  • selectedCareer ← useMemo (derive object)    │
│  • summaryStats ← useMemo (calc stats)         │
└────────┬────────────────────────────────────────┘
         │
    ┌────┴────────────────────────────┬─────────────┐
    │                                  │             │
    ▼                                  ▼             ▼
┌─────────────┐                ┌──────────────┐  ┌──────────┐
│SummaryStats │                │ControlBar    │  │CareerGrid│
├─────────────┤                ├──────────────┤  ├──────────┤
│Props:       │                │Props:        │  │Props:    │
│ careerMatch │                │ filters      │  │ careers  │
│ savedCount  │                │ sortBy       │  │ savedIds │
│             │                │ onFilter()   │  │ onClick()│
│Read-only    │                │ onSort()     │  │ onSave() │
└─────────────┘                │              │  │          │
                               │Contains:     │  │Contains: │
                               │ FilterCtrl   │  │ CareerCard
                               │ SortCtrl     │  │  (×20-60)│
                               └──────────────┘  └──────────┘
                                    │                    │
                    ┌───────────────┴──────────────────┐
                    │ User interaction                 │
                    │ (onChange, onClick handlers)     │
                    ▼                                  ▼
              ┌──────────────┐            ┌──────────────────┐
              │setFilters()  │            │setSelectedCareerId
              │setSortBy()   │            │setSelectedCareer()
              └──────────────┘            └──────────────────┘
                    │                                  │
                    └──────────────┬───────────────────┘
                                   │
                                   ▼
                        (useMemo re-calculates
                         filteredMatches)
                                   │
                                   ▼
        ┌──────────────────────────┴─────────────┐
        │ Components re-render with new props    │
        └──────────────────────────┬─────────────┘
                                   │
                   ┌───────────────┴───────────────┐
                   ▼                               ▼
        ┌──────────────────┐        ┌──────────────────────┐
        │CareerGrid        │        │CareerModal (portaled)│
        │(shows filtered)  │        │(shows selected)      │
        └──────────────────┘        └──────────────────────┘
```

### 3.2 Event Flow Sequence

```
1. MOUNT
   ├─ PhaseThree reads phase2Ratings from ScoreContext
   ├─ useEffect triggers → calculate all 87 matches
   ├─ setCareerMatches([...]) → triggers render
   ├─ useMemo filters (default: all, sort by score)
   └─ CareerGrid renders 87 cards

2. USER FILTERS (e.g., "tier = high")
   ├─ FilterControls onChange → handleFilterChange({ tier: "high" })
   ├─ setFilters(prev => { ...prev, tier: "high" })
   ├─ Triggers PhaseThree re-render
   ├─ useMemo(filteredMatches) recalculates → filters to ~20 careers
   ├─ CareerGrid re-renders with 20 cards
   └─ Display: "Showing 20 of 87"

3. USER SORTS (e.g., "by salary")
   ├─ SortControls onChange → handleSortChange("salary")
   ├─ setSortBy("salary")
   ├─ Triggers PhaseThree re-render
   ├─ useMemo(filteredMatches) re-sorts (no recalc)
   ├─ CareerGrid re-renders (same cards, different order)
   └─ Cards fade/slide into new positions (CSS transition optional)

4. USER CLICKS CAREER CARD
   ├─ CareerCard onClick → handleCareerClick(careerId)
   ├─ setSelectedCareerId(careerId)
   ├─ Triggers PhaseThree re-render
   ├─ useMemo(selectedCareer) finds object from filtered matches
   ├─ CareerModal renders (portaled to document.body)
   ├─ Modal enters with animation (slideIn from right)
   └─ Body overflow: hidden (scroll locked)

5. USER CLICKS SAVE IN MODAL
   ├─ CareerModal button onClick → onSaveToggle()
   ├─ PhaseThree toggleSaveCareer(careerId)
   ├─ setSavedCareerIds(prev => [...prev, careerId])
   ├─ useEffect → localStorage.setItem()
   ├─ Triggers PhaseThree re-render
   ├─ CareerCard heart icon updates (❤️ vs 🤍)
   ├─ CareerModal button text updates (Saved vs Save)
   └─ SummaryStats "Saved" count increases

6. USER CLOSES MODAL (ESC, click outside, close button)
   ├─ ESC handler / onClick → handleCloseModal()
   ├─ setSelectedCareerId(null)
   ├─ Triggers PhaseThree re-render
   ├─ CareerModal exits with animation (slideOut to right)
   ├─ Body overflow: auto (scroll restored)
   └─ Focus returns to grid (optional)
```

---

## 4. React Hooks Usage Patterns

### 4.1 PhaseThree Master Hook Pattern

```javascript
export default function PhaseThree() {
  // ==================== CONTEXT ====================
  const { phase2Ratings } = useContext(ScoreContext);
  const navigate = useNavigate();
  
  // ==================== STATE ====================
  // Calculated (recalc when ratings change)
  const [careerMatches, setCareerMatches] = useState([]);
  
  // UI controls (user input)
  const [filters, setFilters] = useState({
    tier: "all",
    salaryRange: [30, 200],
    education: "all",
    matchType: "all",
  });
  const [sortBy, setSortBy] = useState("matchScore");
  
  // Modal state
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  
  // Saved careers (persist to localStorage)
  const [savedCareerIds, setSavedCareerIds] = useState(() => {
    const saved = localStorage.getItem("phase3_savedCareers");
    return saved ? JSON.parse(saved) : [];
  });
  
  // ==================== EFFECTS ====================
  // Validate phase 2 completion
  useEffect(() => {
    if (!phase2Ratings || Object.keys(phase2Ratings).length === 0) {
      navigate('/phase/2', {
        replace: true,
        state: { message: 'Please complete Phase 2 first' },
      });
    }
  }, [phase2Ratings, navigate]);
  
  // Calculate all career matches (expensive, do once)
  useEffect(() => {
    if (!phase2Ratings || Object.keys(phase2Ratings).length === 0) return;
    
    console.time('Calculate all matches');
    const newMatches = CAREERS.map(career => ({
      ...career,
      matchScore: calculateMatch(career, phase2Ratings),
      phase2Contribution: calculateContribution(career, phase2Ratings),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
    console.timeEnd('Calculate all matches');
    
    setCareerMatches(newMatches);
  }, [phase2Ratings]);
  
  // Persist saved careers to localStorage
  useEffect(() => {
    localStorage.setItem("phase3_savedCareers", JSON.stringify(savedCareerIds));
  }, [savedCareerIds]);
  
  // Scroll to top when modal opens (optional UX)
  useEffect(() => {
    if (selectedCareerId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCareerId]);
  
  // ==================== MEMOIZED CALLBACKS ====================
  // Filter handler (merge updates)
  const handleFilterChange = useCallback((updates) => {
    setFilters(prev => ({ ...prev, ...updates }));
  }, []);
  
  // Sort handler (toggle or change)
  const handleSortChange = useCallback((field) => {
    setSortBy(field);
  }, []);
  
  // Career click (toggle modal)
  const handleCareerClick = useCallback((careerId) => {
    setSelectedCareerId(prev => prev === careerId ? null : careerId);
  }, []);
  
  // Close modal explicitly
  const handleCloseModal = useCallback(() => {
    setSelectedCareerId(null);
  }, []);
  
  // Toggle save
  const toggleSaveCareer = useCallback((careerId) => {
    setSavedCareerIds(prev =>
      prev.includes(careerId)
        ? prev.filter(id => id !== careerId)
        : [...prev, careerId]
    );
  }, []);
  
  // Reset filters
  const handleResetFilters = useCallback(() => {
    setFilters({
      tier: "all",
      salaryRange: [30, 200],
      education: "all",
      matchType: "all",
    });
  }, []);
  
  // ==================== MEMOIZED DERIVED DATA ====================
  // Filter and sort careers (recalc when any control changes)
  const filteredMatches = useMemo(() => {
    let results = careerMatches;
    
    // Apply filters
    if (filters.tier !== "all") {
      results = results.filter(c => c.tier === filters.tier);
    }
    if (filters.salaryRange[0] > 30 || filters.salaryRange[1] < 200) {
      results = results.filter(c =>
        c.salary.median >= filters.salaryRange[0] * 1000 &&
        c.salary.median <= filters.salaryRange[1] * 1000
      );
    }
    if (filters.education !== "all") {
      results = results.filter(c => c.educationLevel === filters.education);
    }
    if (filters.matchType !== "all") {
      results = results.filter(c => {
        const score = c.matchScore;
        if (filters.matchType === "high") return score >= 80;
        if (filters.matchType === "medium") return 50 <= score && score < 80;
        if (filters.matchType === "low") return score < 50;
      });
    }
    
    // Sort
    const comparators = {
      matchScore: (a, b) => b.matchScore - a.matchScore,
      salary: (a, b) => b.salary.median - a.salary.median,
      demand: (a, b) => (b.demandScore || 0) - (a.demandScore || 0),
      name: (a, b) => a.title.localeCompare(b.title),
    };
    results.sort(comparators[sortBy]);
    
    return results;
  }, [careerMatches, filters, sortBy]);
  
  // Derive selected career object
  const selectedCareer = useMemo(() => {
    if (!selectedCareerId) return null;
    return filteredMatches.find(c => c.id === selectedCareerId);
  }, [selectedCareerId, filteredMatches]);
  
  // Calculate summary stats (4 cards at top)
  const summaryStats = useMemo(() => {
    const scores = careerMatches.map(c => c.matchScore);
    return {
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      highMatches: careerMatches.filter(c => c.matchScore >= 80).length,
      savedCount: savedCareerIds.length,
      topCareer: careerMatches[0],
    };
  }, [careerMatches, savedCareerIds]);
  
  // ==================== ERROR STATE ====================
  if (!phase2Ratings || Object.keys(phase2Ratings).length === 0) {
    return (
      <div className="error-state">
        <h2>Phase 2 Not Completed</h2>
        <p>Please complete Phase 2 to see career matches.</p>
        <button onClick={() => navigate('/phase/2')}>Go to Phase 2</button>
      </div>
    );
  }
  
  if (careerMatches.length === 0) {
    return <div className="loading">Calculating career matches...</div>;
  }
  
  // ==================== EMPTY FILTERED STATE ====================
  if (filteredMatches.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Careers Match Your Filters</h2>
        <p>Try adjusting filters to see more results.</p>
        <button onClick={handleResetFilters}>Clear All Filters</button>
      </div>
    );
  }
  
  // ==================== RENDER ====================
  return (
    <div className="phase-three">
      <header className="phase-header">
        <h1>Career Matches</h1>
        <p>Based on your Phase 2 assessment</p>
      </header>
      
      <SummaryStats stats={summaryStats} />
      
      <ControlBar
        filters={filters}
        sortBy={sortBy}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onResetFilters={handleResetFilters}
      />
      
      <div className="results-info">
        Showing {filteredMatches.length} of {careerMatches.length} careers
      </div>
      
      <CareerGrid
        careers={filteredMatches}
        selectedCareerId={selectedCareerId}
        savedCareerIds={savedCareerIds}
        onCardClick={handleCareerClick}
        onSaveToggle={toggleSaveCareer}
      />
      
      {selectedCareer && (
        <CareerModal
          career={selectedCareer}
          isSaved={savedCareerIds.includes(selectedCareer.id)}
          onClose={handleCloseModal}
          onSaveToggle={() => toggleSaveCareer(selectedCareer.id)}
        />
      )}
    </div>
  );
}
```

### 4.2 Child Component Hook Patterns

**SummaryStats.jsx** (simple, memoized)
```javascript
const SummaryStats = React.memo(function SummaryStats({ stats }) {
  return (
    <div className="summary-stats">
      <StatCard title="Average Match" value={`${stats.averageScore}%`} />
      <StatCard title="High Matches (80+)" value={stats.highMatches} />
      <StatCard title="Saved Careers" value={stats.savedCount} />
      <StatCard title="Top Match" value={stats.topCareer.title} />
    </div>
  );
});
```

**CareerCard.jsx** (memoized with custom comparison)
```javascript
const CareerCard = React.memo(
  function CareerCard({ career, isSaved, isSelected, onSave, onClick }) {
    return (
      <div
        className={`career-card ${isSelected ? 'selected' : ''}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onClick()}
      >
        <div className="card-header">
          <h3>{career.title}</h3>
          <button
            className="save-button"
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            aria-label={isSaved ? 'Remove from saved' : 'Save career'}
          >
            {isSaved ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div className="card-stats">
          <div
            className="match-score"
            role="meter"
            aria-valuenow={career.matchScore}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {career.matchScore}%
          </div>
          <div className="tier-badge">{career.tier}</div>
          <div className="salary">${(career.salary.median / 1000).toFixed(0)}k</div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Re-render if career ID or save status changed
    return prevProps.career.id === nextProps.career.id &&
           prevProps.isSaved === nextProps.isSaved &&
           prevProps.isSelected === nextProps.isSelected;
  }
);
```

**FilterControls.jsx** (handlers passed from parent)
```javascript
export function FilterControls({ filters, onFilterChange }) {
  return (
    <div className="filter-controls">
      <select
        value={filters.tier}
        onChange={(e) => onFilterChange({ tier: e.target.value })}
      >
        <option value="all">All Tiers</option>
        <option value="high">High Tier</option>
        <option value="mid">Mid Tier</option>
        <option value="low">Low Tier</option>
      </select>
      
      <input
        type="range"
        min={30}
        max={200}
        value={filters.salaryRange[1]}
        onChange={(e) =>
          onFilterChange({
            salaryRange: [filters.salaryRange[0], parseInt(e.target.value)],
          })
        }
      />
      
      {/* More filters... */}
    </div>
  );
}
```

---

## 5. Performance Optimizations

### 5.1 When to Virtualize CareerGrid

**Rule: Virtualize if filtered results > 100 items**

```javascript
// CareerGrid.jsx
import { FixedSizeList as List } from 'react-window';

export function CareerGrid({ careers, ...props }) {
  // Only virtualize on desktop with many items
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const shouldVirtualize = isDesktop && careers.length > 100;
  
  if (shouldVirtualize) {
    const Row = ({ index, style }) => (
      <div style={style}>
        <CareerCard
          career={careers[index]}
          {...props}
        />
      </div>
    );
    
    return (
      <List
        height={600}
        itemCount={careers.length}
        itemSize={200}
        width="100%"
      >
        {Row}
      </List>
    );
  }
  
  // Simple grid for small result sets
  return (
    <div className="career-grid">
      {careers.map(career => (
        <CareerCard key={career.id} career={career} {...props} />
      ))}
    </div>
  );
}
```

### 5.2 Memoization Checklist

```javascript
// ✅ Memoize: expensive calculations
const filteredMatches = useMemo(() => {
  // Filter + sort 87 items: ~1-5ms
}, [careerMatches, filters, sortBy]);

// ✅ Memoize: callbacks passed to children
const handleCareerClick = useCallback((careerId) => {
  setSelectedCareerId(prev => prev === careerId ? null : careerId);
}, []);

// ✅ Memoize: child components (if many re-renders expected)
const CareerCard = React.memo(function CareerCard(props) {
  // ...
});

// ❌ DON'T memoize: simple renders, single prop access
// CareerCard doesn't need useMemo if career object is stable

// ❌ DON'T memoize: dependencies as long as computation
// const bad = useMemo(() => x * 2, [x]); // Not worth it
```

### 5.3 Debounce Slider Changes

```javascript
const debouncedSalaryChange = useMemo(
  () => debounce((min, max) => {
    onFilterChange({ salaryRange: [min, max] });
  }, 300),
  []
);

// In slider onChange:
onChange={(min, max) => debouncedSalaryChange(min, max)}
```

---

## 6. Mobile-First Responsive Design

### 6.1 Breakpoints & useMediaQuery

```javascript
// src/hooks/useMediaQuery.js
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia(query).matches
      : false
  );
  
  useEffect(() => {
    const media = window.matchMedia(query);
    const handleChange = (e) => setMatches(e.matches);
    
    if (media.addListener) {
      media.addListener(handleChange); // Old API
    } else {
      media.addEventListener('change', handleChange); // New API
    }
    
    return () => {
      if (media.removeListener) {
        media.removeListener(handleChange);
      } else {
        media.removeEventListener('change', handleChange);
      }
    };
  }, [query]);
  
  return matches;
}

// Usage
const isTablet = useMediaQuery('(min-width: 640px)');
const isDesktop = useMediaQuery('(min-width: 1024px)');
```

### 6.2 ControlBar: Mobile vs Desktop

```javascript
export function ControlBar({ filters, sortBy, onFilterChange, onSortChange }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  return (
    <div className="control-bar">
      {/* Mobile: Toggle button + collapsible */}
      {!isDesktop && (
        <button
          className="filter-toggle"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          Filters {filterOpen ? '▲' : '▼'}
        </button>
      )}
      
      {/* Filters: conditional on desktop, toggleable on mobile */}
      <div className={`filters ${isDesktop || filterOpen ? 'visible' : 'hidden'}`}>
        <FilterControls
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>
      
      {/* Sorts: always visible */}
      <div className="sorts">
        <SortControls sortBy={sortBy} onSortChange={onSortChange} />
      </div>
    </div>
  );
}
```

### 6.3 CSS Grid: Responsive Auto-Fill

```css
.career-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem 1rem;
  width: 100%;
}

/* Auto-fill handles responsiveness: */
/* 320px device → 1 column */
/* 640px device → 2 columns */
/* 1024px device → 3 columns */
/* 1440px device → 4 columns */

/* Mobile: reduce padding and gaps */
@media (max-width: 640px) {
  .career-grid {
    padding: 1rem 0.5rem;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

/* Touch: bigger tap targets */
@media (hover: none) {
  .career-card {
    min-height: 250px; /* Larger target on touch */
  }
  
  .save-button {
    width: 50px;
    height: 50px; /* 44px minimum for accessibility */
  }
}
```

### 6.4 Modal: Full-Screen on Mobile, Side-Panel on Desktop

```javascript
export function CareerModal({ career, onClose }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${isDesktop ? 'desktop' : 'mobile'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal content */}
      </div>
    </div>,
    document.body
  );
}
```

```css
/* Mobile: Full-screen from bottom */
@media (max-width: 1024px) {
  .modal-overlay {
    align-items: flex-end;
  }
  
  .modal-content.mobile {
    width: 100%;
    height: 90vh;
    border-radius: 16px 16px 0 0;
    animation: slideUp 0.3s ease-out;
  }
  
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
}

/* Desktop: Side panel */
@media (min-width: 1024px) {
  .modal-content.desktop {
    width: 45%;
    max-width: 600px;
    height: 100vh;
    border-radius: 0;
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
}
```

---

## 7. Accessibility Implementation

### 7.1 ARIA Labels & Semantic HTML

```javascript
// CareerCard
<div
  className="career-card"
  role="button"
  tabIndex={0}
  onKeyPress={(e) => e.key === 'Enter' && onClick()}
  aria-label={`${career.title}, ${career.matchScore}% match`}
>
  <div className="match-score" role="meter" aria-valuenow={career.matchScore} />
  <button
    aria-label={isSaved ? 'Remove from saved careers' : 'Save this career'}
    aria-pressed={isSaved}
  >
    {isSaved ? '❤️' : '🤍'}
  </button>
</div>

// Modal
<div
  role="dialog"
  aria-labelledby="modal-title"
  aria-modal="true"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">{career.title}</h2>
  <p id="modal-description">{career.description}</p>
</div>

// Filter controls
<fieldset>
  <legend>Filter by Career Tier</legend>
  <label>
    <input
      type="radio"
      name="tier"
      value="all"
      checked={filters.tier === 'all'}
      onChange={(e) => onFilterChange({ tier: e.target.value })}
    />
    All Tiers
  </label>
  {/* More options */}
</fieldset>
```

### 7.2 Keyboard Navigation

```javascript
// Career grid: arrow keys to navigate
export function CareerGrid({ careers, onCardClick }) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const gridRef = useRef(null);
  
  const handleKeyDown = (e) => {
    const maxIndex = careers.length - 1;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        setFocusedIndex(i => Math.min(i + 1, maxIndex));
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        setFocusedIndex(i => Math.max(i - 1, 0));
        e.preventDefault();
        break;
      case 'Enter':
        onCardClick(careers[focusedIndex].id);
        e.preventDefault();
        break;
      default:
        break;
    }
  };
  
  useEffect(() => {
    gridRef.current?.addEventListener('keydown', handleKeyDown);
    return () => gridRef.current?.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, careers]);
  
  return (
    <div className="career-grid" ref={gridRef}>
      {careers.map((career, index) => (
        <div
          key={career.id}
          tabIndex={focusedIndex === index ? 0 : -1}
          ref={el => index === focusedIndex && el?.focus()}
        >
          <CareerCard career={career} />
        </div>
      ))}
    </div>
  );
}
```

### 7.3 Focus Management in Modal

```javascript
export function CareerModal({ onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  
  // Focus trap: keep tab within modal
  useEffect(() => {
    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      
      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleTab);
    closeButtonRef.current?.focus(); // Focus close button on open
    
    return () => window.removeEventListener('keydown', handleTab);
  }, []);
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Close career details"
      >
        ✕
      </button>
      {/* Modal content */}
    </div>
  );
}
```

---

## 8. Integration with ScoreContext & App Router

### 8.1 App.jsx Setup

```javascript
// App.jsx
import { ScoreProvider } from './contexts/ScoreContext';
import PhaseTwo from './phases/PhaseTwo';
import PhaseThree from './phases/PhaseThree';

function App() {
  return (
    <ScoreProvider>
      <Router>
        <Routes>
          <Route path="/phase/2" element={<PhaseTwo />} />
          <Route path="/phase/3" element={<PhaseThree />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ScoreProvider>
  );
}

export default App;
```

### 8.2 PhaseThree: Reading ScoreContext

```javascript
import { ScoreContext } from '../../contexts/ScoreContext';

export default function PhaseThree() {
  const { phase1Ratings, phase2Ratings } = useContext(ScoreContext);
  
  // Validate completion
  useEffect(() => {
    if (!phase2Ratings || Object.keys(phase2Ratings).length === 0) {
      navigate('/phase/2', {
        replace: true,
        state: { message: 'Please complete Phase 2 first' },
      });
      return;
    }
  }, [phase2Ratings, navigate]);
  
  // If you need phase1Ratings for weighting verification:
  // const usePhase1For = (subcategoryId) => {
  //   return phase1Ratings?.[subcategoryId] || null;
  // };
  
  // Calculate and render phase 3...
}
```

### 8.3 Optional: Save Phase 3 Results to Firebase

```javascript
// After user completes Phase 3
async function savePhaseThreeCompletion(userId, phase2Ratings, savedCareers) {
  const db = getFirestore();
  
  await setDoc(
    doc(db, 'users', userId, 'assessments', 'phase3'),
    {
      phase2Ratings,
      savedCareers: savedCareers.map(id => ({
        careerId: id,
        savedAt: serverTimestamp(),
      })),
      completedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// On Phase 3 mount: load previously saved careers
useEffect(() => {
  const loadPhase3Data = async () => {
    if (!userId) return;
    
    const doc = await getDoc(
      getFirestore(),
      'users',
      userId,
      'assessments',
      'phase3'
    );
    
    if (doc.exists()) {
      const savedCareers = doc.data().savedCareers || [];
      setSavedCareerIds(savedCareers.map(c => c.careerId));
    }
  };
  
  loadPhase3Data();
}, [userId]);
```

---

## 9. Edge Cases & Error Handling

### 9.1 No Phase 2 Ratings

```javascript
if (!phase2Ratings || Object.keys(phase2Ratings).length === 0) {
  return (
    <div className="error-container">
      <h2>Phase 2 Not Completed</h2>
      <p>Please complete Phase 2 to see career matches.</p>
      <button onClick={() => navigate('/phase/2')}>
        Go to Phase 2
      </button>
    </div>
  );
}
```

### 9.2 All Careers Have Low Matches

```javascript
const highMatches = careerMatches.filter(c => c.matchScore >= 80).length;

if (highMatches === 0 && phase2Ratings) {
  return (
    <div className="warning-container">
      <h2>No High-Match Careers Found</h2>
      <p>
        Based on your Phase 2 assessment, no careers have an 80%+ match.
        This may indicate:
      </p>
      <ul>
        <li>Your interests are still developing</li>
        <li>You might benefit from retaking Phase 2</li>
        <li>Exploring all careers (including lower matches) might help</li>
      </ul>
      <button onClick={() => navigate('/phase/2')}>
        Review Phase 2 Responses
      </button>
    </div>
  );
}
```

### 9.3 No Careers Match Filters

```javascript
if (filteredMatches.length === 0) {
  return (
    <div className="empty-state-container">
      <h2>No Careers Match Your Filters</h2>
      <p>Try adjusting your filters to see more results.</p>
      <button onClick={handleResetFilters}>Clear All Filters</button>
      <p>Results by filter:</p>
      <ul>
        <li>Tier: {careerMatches.filter(c => c.tier === filters.tier).length}</li>
        <li>Salary: {careerMatches.filter(c => /* ... */).length}</li>
        {/* More debug info */}
      </ul>
    </div>
  );
}
```

### 9.4 Missing Skill Weights on Career

```javascript
function calculateMatch(career, phase2Ratings) {
  // Defensive: handle missing weights
  const weights = career.skillWeights || {};
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  
  if (totalWeight === 0) {
    console.warn(`Career ${career.id} has no skill weights`);
    return 50; // Default middle score
  }
  
  const weightedSum = Object.entries(weights).reduce((sum, [skill, weight]) => {
    const rating = phase2Ratings[skill] ?? 5; // Default 5
    return sum + (rating * weight);
  }, 0);
  
  return Math.min(100, Math.max(0, Math.round((weightedSum / totalWeight) * 10)));
}
```

---

## 10. File Structure & Organization

```
src/
├── phases/
│   ├── PhaseTwo.jsx
│   └── PhaseThree/
│       ├── index.jsx                    ⭐ Main container (250 lines)
│       ├── components/
│       │   ├── SummaryStats.jsx         (100 lines, memoized)
│       │   ├── StatCard.jsx             (50 lines)
│       │   ├── ControlBar.jsx           (120 lines)
│       │   ├── FilterControls.jsx       (180 lines)
│       │   │   ├── TierSelect.jsx       (50 lines)
│       │   │   ├── SalarySlider.jsx     (80 lines)
│       │   │   ├─── EducationSelect.jsx (50 lines)
│       │   │   └─ MatchTypeButtons.jsx  (60 lines)
│       │   ├── SortControls.jsx         (100 lines)
│       │   ├── CareerGrid.jsx           (180 lines, handles virtualization)
│       │   ├── CareerCard.jsx           (120 lines, memoized)
│       │   └── CareerModal.jsx          (350 lines, portaled)
│       │       ├── ModalHeader.jsx      (60 lines)
│       │       ├── ModalBody.jsx        (200 lines)
│       │       │   ├── AboutSection.jsx
│       │       │   ├── SalarySection.jsx
│       │       │   ├── EducationSection.jsx
│       │       │   ├── DemandSection.jsx
│       │       │   └── SkillsBreakdown.jsx
│       │       └── ModalFooter.jsx      (60 lines)
│       ├── hooks/
│       │   ├── useCareerMatches.js      (30 lines)
│       │   ├── useFilters.js            (40 lines)
│       │   ├── useSavedCareers.js       (50 lines)
│       │   └── useMediaQuery.js         (40 lines)
│       ├── utils/
│       │   ├── calculate.js             (Match algorithm)
│       │   ├── filter.js                (Filter logic)
│       │   ├── sort.js                  (Sort comparators)
│       │   └── constants.js             (Tiers, education levels, etc.)
│       └── styles/
│           ├── phase-three.css          (Layout)
│           ├── card.css                 (CareerCard styles)
│           ├── modal.css                (Modal styles)
│           ├── responsive.css           (Media queries)
│           └── animations.css           (Transitions)
├── data/
│   └── careers.js                       (87 careers, 30KB)
├── contexts/
│   └── ScoreContext.jsx                 (Already exists)
└── hooks/
    └── useMediaQuery.js                 (Shared utility)
```

---

## 11. Summary: State at a Glance

| What | Where | Why | Recalculate? | Persist? |
|-----|-------|-----|-------------|----------|
| 87 careers | CAREERS import | Static data | No | No |
| Calculated matches (87 with scores) | PhaseThree useState | Pure calc result | On ratings change | No |
| Filters (tier, salary, etc.) | PhaseThree useState | UI transient | No | No* |
| Sort (field + direction) | PhaseThree useState | UI transient | No | No |
| Selected career ID | PhaseThree useState | Modal state | No | No |
| Saved career IDs | PhaseThree useState | User data | No | Yes (localStorage) |
| Filtered matches (derived) | useMemo | Avoid recalc | When needed | No |
| Selected career object | useMemo | Avoid lookup | When needed | No |
| Summary stats (avg, etc.) | useMemo | Avoid calc | When needed | No |

*Could persist filters/sort to URL params for sharing: `/phase/3?tier=high&sort=salary`

---

## 12. Next Steps for Implementation

1. **Create `/src/data/careers.js`** with 87 careers + skill weights
2. **Build match calculation** in `/src/phases/PhaseThree/utils/calculate.js`
3. **Build PhaseThree container** with all hooks (copy 4.1 pattern)
4. **Build CardCard component** (memoized, copy from 4.2)
5. **Build CareerGrid** (with virtualization decision)
6. **Build CareerModal** (portaled, copy from 7.4)
7. **Build filters & sorts** (simple controlled components)
8. **Add CSS** (responsive grid, animations, mobile-first)
9. **Test** on all devices (desktop, tablet, mobile)
10. **Connect ScoreContext** and validate data flow

---

## References

- React Hooks: useState, useEffect, useContext, useMemo, useCallback, useRef
- Performance: React.memo, useMemo dependencies, virtualization with react-window
- Accessibility: ARIA labels, keyboard nav, focus management (MDN, WCAG 2.1 AA)
- Responsive: CSS Grid auto-fill, useMediaQuery hook, mobile-first
- Modal: createPortal, focus trap, scroll lock
- localStorage: JSON.stringify/parse, useEffect sync
