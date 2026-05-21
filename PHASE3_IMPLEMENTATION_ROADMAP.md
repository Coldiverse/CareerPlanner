# Phase 3 Implementation Roadmap

Quick-start guide to build Phase 3 from architecture to deployed feature.

---

## Phase 3A: Foundation (Week 1)

### Task 1: Create Career Database

**File:** `src/data/careers.js`

```javascript
export const CAREERS = [
  // Example structure (add 50-100 total)
  {
    id: 'software_engineer',
    title: 'Software Engineer',
    tier: 'core',
    description: 'Design, build, and maintain software applications...',
    requirements: [
      { subcategoryId: 'technology_software', weight: 0.95 },
      { subcategoryId: 'mathematics_discrete', weight: 0.75 },
      { subcategoryId: 'mathematics_applied', weight: 0.5 },
      { subcategoryId: 'technology_data', weight: 0.4 },
    ],
    context: {
      salary: '$80,000 - $160,000',
      salaryMedian: 125000,
      education: 'CS degree, bootcamp, or self-taught',
      jobOutlook: 'Excellent (8% growth)',
      demandLevel: 'Very High',
      yearsToEntry: 2,
      skills: ['Python/JavaScript/Go', 'Git', 'REST APIs', 'Database design'],
      careerPath: ['Junior (0-2yr) → Mid (2-5yr) → Senior (5-10yr) → Staff (10+yr)'],
      relatedCareers: ['web_developer', 'backend_engineer'],
    },
    discoveryHint: 'If you love programming fundamentals',
  },
  // Add 49-99 more...
];

// Helpers
export const getCareersInTier = (tier) => CAREERS.filter(c => c.tier === tier);
export const getCareerById = (id) => CAREERS.find(c => c.id === id);
export const searchCareers = (query) => {
  const q = query.toLowerCase();
  return CAREERS.filter(c => c.title.toLowerCase().includes(q));
};
```

**Acceptance Criteria:**
- [ ] 50 careers hardcoded with all required fields
- [ ] At least 3 careers per tier (core, advanced, niche)
- [ ] All salaries realistic (check Glassdoor/BLS)
- [ ] Helper functions work

**Time:** 3-4 hours (copy from PHASE3_ARCHITECTURE.md)

---

### Task 2: Create Matching Algorithm

**File:** `src/utils/careerMatching.js`

```javascript
import { CAREERS } from '../data/careers.js';

// Core scoring function
export function scoreCareerForUser(career, userScores, allUserPhase2Ratings) {
  // Step 1: Check coverage
  const ratedRequirements = career.requirements.filter(
    req => req.subcategoryId in allUserPhase2Ratings
  );
  
  if (ratedRequirements.length === 0) return null;
  
  const coveragePercent = ratedRequirements.length / career.requirements.length;
  
  // Hide if < 40% coverage
  if (coveragePercent < 0.4) {
    return {
      careerId: career.id,
      score: 0,
      matchType: 'partial_coverage',
      hidden: true,
    };
  }
  
  // Step 2: Calculate weighted score
  let totalScore = 0;
  let totalWeight = 0;
  
  for (const req of career.requirements) {
    const userScore = userScores[req.subcategoryId] || 0;
    const weight = req.weight;
    totalScore += userScore * weight;
    totalWeight += weight;
  }
  
  const baseScore = totalWeight > 0 ? (totalScore / totalWeight) : 0;
  
  // Step 3: Apply coverage bonus
  const coverageBonus = coveragePercent === 1 ? 0.2 : 0;
  const finalScore = Math.min(10, baseScore + coverageBonus);
  
  // Step 4: Determine match type
  let matchType = 'no_match';
  if (finalScore >= 7.5) matchType = 'excellent_fit';
  else if (finalScore >= 6.0) matchType = 'good_fit';
  else if (finalScore >= 4.5) matchType = 'partial_fit';
  else matchType = 'weak_fit';
  
  return {
    careerId: career.id,
    score: Math.round(finalScore * 10) / 10,
    matchType,
    matchPercent: Math.round(coveragePercent * 100),
    ratedReqs: ratedRequirements.length,
    totalReqs: career.requirements.length,
    hidden: false,
  };
}

// Main function
export function generateCareerMatches(
  phase1Ratings = {},
  phase2Ratings = {},
  phase2CalculatedScores = {}
) {
  const userScores = phase2CalculatedScores;
  
  const scoredCareers = CAREERS
    .map(career => ({
      ...career,
      matchData: scoreCareerForUser(career, userScores, phase2Ratings)
    }))
    .filter(c => c.matchData !== null);
  
  const visibleCareers = scoredCareers
    .filter(c => !c.matchData.hidden)
    .sort((a, b) => b.matchData.score - a.matchData.score);
  
  const hiddenCareers = scoredCareers
    .filter(c => c.matchData.hidden)
    .sort((a, b) => b.matchData.matchPercent - a.matchData.matchPercent);
  
  return {
    matches: visibleCareers,
    explorable: hiddenCareers,
    summary: {
      totalMatches: visibleCareers.length,
      excellentFitCount: visibleCareers.filter(c => c.matchData.matchType === 'excellent_fit').length,
      goodFitCount: visibleCareers.filter(c => c.matchData.matchType === 'good_fit').length,
      averageMatch: visibleCareers.length > 0
        ? (visibleCareers.reduce((sum, c) => sum + c.matchData.score, 0) / visibleCareers.length).toFixed(1)
        : 0,
    }
  };
}

// Filter helpers
export function filterCareers(careers, filters) {
  let result = careers;
  
  if (filters.tier && filters.tier.length > 0) {
    result = result.filter(c => filters.tier.includes(c.tier));
  }
  
  if (filters.minSalary || filters.maxSalary) {
    result = result.filter(c => {
      const salary = c.context.salaryMedian;
      const passMin = !filters.minSalary || salary >= filters.minSalary;
      const passMax = !filters.maxSalary || salary <= filters.maxSalary;
      return passMin && passMax;
    });
  }
  
  if (filters.education) {
    result = result.filter(c => c.context.education.includes(filters.education));
  }
  
  return result;
}

// Sort helpers
export function sortCareers(careers, sortBy) {
  const sorted = [...careers];
  
  switch (sortBy) {
    case 'score':
      return sorted.sort((a, b) => b.matchData.score - a.matchData.score);
    case 'salary':
      return sorted.sort((a, b) => b.context.salaryMedian - a.context.salaryMedian);
    case 'demand':
      return sorted.sort((a, b) => a.context.yearsToEntry - b.context.yearsToEntry);
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}
```

**Acceptance Criteria:**
- [ ] Algorithm scores all careers
- [ ] Coverage filter works (40% threshold)
- [ ] Match type labels correct
- [ ] Filter/sort helpers work
- [ ] Unit tests pass

**Test Cases:**
```javascript
// Test 1: User rated 4/4 requirements for Software Engineer
const userScores = {
  technology_software: 9,
  mathematics_discrete: 8,
  mathematics_applied: 7,
  technology_data: 6,
};
const result = scoreCareerForUser(softwareEngineer, userScores, userScores);
expect(result.matchPercent).toBe(100);
expect(result.score).toBeGreaterThan(7.5);

// Test 2: User rated 1/4 requirements (should hide)
const userScores2 = { technology_software: 9 };
const result2 = scoreCareerForUser(softwareEngineer, userScores2, userScores2);
expect(result2.hidden).toBe(true);

// Test 3: No ratings (should return null)
const result3 = scoreCareerForUser(softwareEngineer, {}, {});
expect(result3).toBeNull();
```

**Time:** 2-3 hours

---

### Task 3: Create Phase 3 Main Component

**File:** `src/components/PhaseThree.jsx`

```javascript
import React, { useState, useMemo, useContext } from 'react';
import { ScoreContext } from '../contexts/ScoreContext.jsx';
import { generateCareerMatches, filterCareers, sortCareers } from '../utils/careerMatching.js';
import PhaseThreeResults from './PhaseThreeResults.jsx';

export default function PhaseThree({ onBack, onNext }) {
  const { phase1Ratings, phase2Ratings, calculatedScores } = useContext(ScoreContext);
  const [filters, setFilters] = useState({ tier: ['core', 'advanced'] });
  const [sortBy, setSortBy] = useState('score');

  // Generate matches
  const allMatches = useMemo(() => {
    return generateCareerMatches(phase1Ratings, phase2Ratings, calculatedScores);
  }, [phase1Ratings, phase2Ratings, calculatedScores]);

  // Apply filters
  const visibleMatches = useMemo(() => {
    let result = filterCareers(allMatches.matches, filters);
    result = sortCareers(result, sortBy);
    return result;
  }, [allMatches, filters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  // Edge case: No Phase 2 ratings
  if (Object.keys(phase2Ratings).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Rate Subcategories First</h1>
          <p className="text-gray-600 mb-6">
            Phase 3 matches careers to your Phase 2 ratings. Go back and rate some subcategories!
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          >
            ← Back to Phase 2
          </button>
        </div>
      </div>
    );
  }

  return (
    <PhaseThreeResults
      allMatches={allMatches}
      visibleMatches={visibleMatches}
      filters={filters}
      sortBy={sortBy}
      onFilterChange={handleFilterChange}
      onSortChange={handleSortChange}
      onBack={onBack}
      onNext={onNext}
    />
  );
}
```

**Time:** 1-2 hours

---

## Phase 3B: UI Components (Week 2)

### Task 4: Create Results Page Layout

**File:** `src/components/PhaseThreeResults.jsx`

```javascript
import React, { useState } from 'react';
import CareerSummary from './PhaseThree/CareerSummary.jsx';
import FilterBar from './PhaseThree/FilterBar.jsx';
import CareerGrid from './PhaseThree/CareerGrid.jsx';
import ExploreSection from './PhaseThree/ExploreSection.jsx';

export default function PhaseThreeResults({
  allMatches,
  visibleMatches,
  filters,
  sortBy,
  onFilterChange,
  onSortChange,
  onBack,
  onNext,
}) {
  const [expandedCareer, setExpandedCareer] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Career Matches
          </h1>
          <p className="text-xl text-gray-600">
            Careers ranked by how well they match your interests
          </p>
        </div>

        {/* Summary Cards */}
        <CareerSummary summary={allMatches.summary} />

        {/* Filters */}
        <FilterBar
          filters={filters}
          sortBy={sortBy}
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
        />

        {/* Results */}
        {visibleMatches.length > 0 ? (
          <>
            <CareerGrid
              careers={visibleMatches}
              expandedCareer={expandedCareer}
              onCareerClick={setExpandedCareer}
            />

            {/* Explore Section */}
            {allMatches.explorable.length > 0 && (
              <ExploreSection careers={allMatches.explorable} />
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              No careers match your filters. Try adjusting them!
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center gap-4 pb-8">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition"
          >
            ← Back to Phase 2
          </button>
          {visibleMatches.length > 0 && (
            <button
              onClick={onNext}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
            >
              Next: Find Jobs →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Time:** 1 hour

---

### Task 5: Create Sub-Components

Create in `src/components/PhaseThree/`:

**CareerSummary.jsx** (30 min)
```javascript
export default function CareerSummary({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-3xl font-bold text-indigo-600">{summary.totalMatches}</div>
        <div className="text-gray-600">Career matches found</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-3xl font-bold text-green-600">{summary.excellentFitCount}</div>
        <div className="text-gray-600">Excellent fits (7.5+)</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-3xl font-bold text-blue-600">{summary.goodFitCount}</div>
        <div className="text-gray-600">Good fits (6.0-7.4)</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-3xl font-bold text-orange-600">{summary.averageMatch}</div>
        <div className="text-gray-600">Average match score</div>
      </div>
    </div>
  );
}
```

**FilterBar.jsx** (1 hour)
- Tier checkboxes (Core, Advanced, Niche, Exploratory)
- Salary range slider
- Education dropdown
- Sort radio buttons

**CareerCard.jsx** (1 hour)
- Career title, score, match type
- Quick stats (salary, education, demand)
- Match breakdown
- Action buttons [Details] [Learn More]

**CareerDetailsModal.jsx** (1.5 hours)
- Expandable sidebar/modal
- Full career details
- Salary chart, education requirements
- Related careers, discovery hints

**ExploreSection.jsx** (30 min)
- "Partial matches" heading
- Grid of careers with <40% coverage
- Coverage % shown

**Time:** 4-5 hours total

---

## Phase 3C: Integration & Testing (Week 3)

### Task 6: Integrate with App.jsx

Update `src/App.jsx`:

```javascript
import PhaseThree from './components/PhaseThree.jsx';

// In App component, add route
const [phase, setPhase] = useState('phase2'); // or load from localStorage

return (
  <ScoreProvider phase1Ratings={loadedPhase1}>
    {phase === 'phase2' && (
      <PhaseTwo
        onNext={() => setPhase('phase3')}
        onBack={() => setPhase('phase1')}
      />
    )}
    {phase === 'phase3' && (
      <PhaseThree
        onNext={() => setPhase('phase4')}
        onBack={() => setPhase('phase2')}
      />
    )}
  </ScoreProvider>
);
```

**Time:** 30 min

---

### Task 7: Unit Tests

Create `src/utils/careerMatching.test.js`:

```javascript
import { scoreCareerForUser, generateCareerMatches } from './careerMatching.js';
import { CAREERS } from '../data/careers.js';

describe('Career Matching', () => {
  test('scores career when all requirements rated', () => {
    const career = CAREERS[0];
    const userScores = {
      [career.requirements[0].subcategoryId]: 9,
      [career.requirements[1].subcategoryId]: 8,
      [career.requirements[2].subcategoryId]: 7,
      [career.requirements[3].subcategoryId]: 6,
    };
    const result = scoreCareerForUser(career, userScores, userScores);
    expect(result.matchPercent).toBe(100);
    expect(result.matchType).toBe('excellent_fit');
  });

  test('hides career when <40% requirements rated', () => {
    const career = CAREERS[0];
    const userScores = {
      [career.requirements[0].subcategoryId]: 9,
    };
    const result = scoreCareerForUser(career, userScores, userScores);
    expect(result.hidden).toBe(true);
  });

  test('returns null when no requirements rated', () => {
    const career = CAREERS[0];
    const result = scoreCareerForUser(career, {}, {});
    expect(result).toBeNull();
  });

  test('generates all matches correctly', () => {
    const phase2Ratings = {
      technology_software: 9,
      mathematics_discrete: 8,
      mathematics_applied: 7,
      technology_data: 6,
    };
    const scores = {
      technology_software: 8.4,
      mathematics_discrete: 7.2,
      mathematics_applied: 6.4,
      technology_data: 5.6,
    };
    const result = generateCareerMatches({}, phase2Ratings, scores);
    expect(result.matches.length).toBeGreaterThan(0);
    expect(result.summary.totalMatches).toBe(result.matches.length);
  });
});
```

Run: `npm test -- careerMatching.test.js`

**Time:** 1.5 hours

---

### Task 8: Integration Tests

Test Phase 2 → Phase 3 flow:

```javascript
import { render, screen, waitFor } from '@testing-library/react';
import App from './App.jsx';

test('Phase 2 → Phase 3 navigation works', async () => {
  const { getByText, getByRole } = render(<App />);
  
  // Rate some Phase 2 subcategories
  const ratingButtons = getByRole('button', { name: /rating/i });
  ratingButtons[0].click();
  
  // Navigate to Phase 3
  const nextButton = getByText(/Next: Career Paths/i);
  nextButton.click();
  
  // Verify Phase 3 loaded
  await waitFor(() => {
    expect(screen.getByText(/Career Matches/i)).toBeInTheDocument();
  });
});
```

**Time:** 1 hour

---

## Phase 3D: Polish & Launch (Week 4)

### Task 9: Performance Optimization

- [ ] Memoize career matching (useMemo)
- [ ] Lazy load career details modal
- [ ] Virtualize career grid if >100 careers
- [ ] Minify careers.js

**Time:** 1-2 hours

---

### Task 10: Firebase Integration (Optional)

Add lazy saving to Phase 3:

```javascript
// src/components/PhaseThree.jsx
async function savePhase3Match(careerId) {
  const db = getDatabase();
  const userId = localStorage.getItem('careerUserId');
  const matchRef = ref(db, `users/${userId}/phase3/savedMatches/${careerId}`);
  
  await set(matchRef, {
    timestamp: Date.now(),
  });
  
  // Show toast: "Career saved ★"
}
```

**Time:** 1 hour

---

### Task 11: Documentation & README

Update `CLAUDE.md`:

```markdown
## Phase 3 (Complete)

- Load Phase 2 scores from Firebase
- Score all 50-100 careers using Hybrid matching algorithm
- Display ranked careers with filters (tier, salary, education)
- Click career → see details (salary, education, career path, skills)
- Explore partial matches (for curious users)

### Data Files
- `src/data/careers.js` (50-100 careers)
- `src/utils/careerMatching.js` (scoring + filtering)

### Components
- `src/components/PhaseThree.jsx` (main container)
- `src/components/PhaseThreeResults.jsx` (results page)
- `src/components/PhaseThree/*` (sub-components)
```

**Time:** 30 min

---

### Task 12: User Testing & Refinement

- [ ] Test with girlfriend's actual Phase 2 ratings
- [ ] Verify career descriptions are accurate
- [ ] Check salary ranges
- [ ] Gather feedback on UI
- [ ] Fix any blocking issues

**Time:** 2-3 hours

---

## Deployment Checklist

- [ ] All unit tests pass
- [ ] Integration tests pass
- [ ] Careers.js has 50+ careers with complete data
- [ ] Matching algorithm handles all edge cases
- [ ] UI responsive on mobile/tablet/desktop
- [ ] Firebase saves Phase 3 data (optional)
- [ ] Navigation works (Phase 2 → Phase 3 → Phase 4 stub)
- [ ] No console errors
- [ ] Accessibility checks pass (WCAG A)

---

## File Structure After Phase 3A-D

```
src/
├─ data/
│  ├─ subcategories.js (existing)
│  └─ careers.js (NEW - 50-100 careers)
│
├─ utils/
│  ├─ scoring.js (existing)
│  └─ careerMatching.js (NEW - matching algorithm)
│
├─ components/
│  ├─ PhaseOne.jsx (existing)
│  ├─ PhaseTwo.jsx (existing)
│  ├─ PhaseTwoResults.jsx (existing)
│  ├─ PhaseThree.jsx (NEW)
│  ├─ PhaseThreeResults.jsx (NEW)
│  └─ PhaseThree/
│     ├─ CareerSummary.jsx (NEW)
│     ├─ FilterBar.jsx (NEW)
│     ├─ CareerCard.jsx (NEW)
│     ├─ CareerDetailsModal.jsx (NEW)
│     ├─ ExploreSection.jsx (NEW)
│     └─ CareerGrid.jsx (NEW)
│
└─ contexts/
   └─ ScoreContext.jsx (existing)

tests/
├─ utils/
│  └─ careerMatching.test.js (NEW)
└─ components/
   └─ PhaseThree.test.js (NEW)
```

---

## Success Metrics

1. **Functional:** Phase 3 loads careers from Phase 2 ratings
2. **Accurate:** Top 3 careers feel like genuine matches
3. **Usable:** Filters/sort work without lag
4. **Complete:** All 50+ careers have complete data
5. **Polished:** UI looks professional, no broken layouts
6. **Tested:** >90% code coverage for matching logic

---

## Risk Mitigation

| Risk | Mitigation |
|------|---|
| Careers feel irrelevant | Build careers incrementally, test each batch with girlfriend |
| Matching algorithm wrong | Unit test thoroughly before UI |
| UI breaks on mobile | Test on real devices, use responsive Tailwind |
| Performance slow | Profile with DevTools, memoize career matching |
| Firebase schema mismatch | Test data flow Phase 2 → Phase 3 early |

---

## Timeline Summary

| Phase | Duration | Deliverable |
|-------|----------|---|
| **3A** | 6-7 hours | Career DB + Matching algorithm + Phase 3 container |
| **3B** | 4-5 hours | UI components (5 sub-components) |
| **3C** | 4-5 hours | Integration, tests, navigation |
| **3D** | 4-5 hours | Polish, Firebase (optional), docs, user testing |
| **Total** | 18-22 hours | Complete Phase 3 |

**With testing & refinement:** 3-4 weeks for polish launch

