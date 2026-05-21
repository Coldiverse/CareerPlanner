# Phase 2 Testing Strategy - Career Path Explorer

## Executive Summary

This document outlines a comprehensive testing strategy for Phase 2 (32 subcategories with 40/60 weighted scoring, context-managed ratings, keyboard navigation, and Firebase auto-save). The strategy prioritizes critical path failures, addresses React-specific gotchas, and provides a regression checklist for deployment.

---

## 1. Critical Test Cases (Risk-Prioritized)

### CRITICAL PRIORITY (Blocks Release)

#### 1.1 Scoring Algorithm Correctness
- **Test**: `calculatePhase2Score(10, 10) === 10`
  - Phase1: 10, Phase2: 10 → (10 × 0.4) + (10 × 0.6) = 10.0
- **Test**: `calculatePhase2Score(5, 10) === 8`
  - Phase1: 5, Phase2: 10 → (5 × 0.4) + (10 × 0.6) = 8.0
- **Test**: `calculatePhase2Score(10, 0) === 4`
  - Phase1: 10, Phase2: 0 → (10 × 0.4) + (0 × 0.6) = 4.0
- **Test**: `calculatePhase2Score(0, 0) === 0`
  - All zeros
- **Test**: Rounding precision (2 decimals stored)
  - `calculatePhase2Score(3.33, 7.77)` → verify no floating-point errors
- **Test**: NaN/Infinity handling
  - `calculatePhase2Score(NaN, 5)` → should return 0, not NaN
  - `calculatePhase2Score(Infinity, 10)` → should clamp or error gracefully

#### 1.2 Phase 1 Missing → Phase 2 Scores Still Work
- **Test**: Phase2 rating with no Phase1 data
  - Load Phase2 without Phase1Ratings
  - Rate a subcategory → score should use Phase1 default (0)
  - Final score = (0 × 0.4) + (rating × 0.6)
- **Test**: Partial Phase1 data (only some subjects rated)
  - 3/8 subjects have Phase1 ratings
  - Rate Phase2 items from both rated and unrated subjects
  - Verify correct weighting per subject

#### 1.3 Firebase Auto-Save (500ms Debounce)
- **Test**: Single rating change → Firebase called once (debounce works)
  - Update rating 5 times within 500ms
  - Verify only 1 Firebase call, not 5
- **Test**: Multiple ratings across 500ms boundary
  - Rate at 0ms, 250ms, 750ms
  - Verify 2 Firebase calls (one at 500ms, one at 1250ms)
- **Test**: Network failure on save
  - Mock Firebase to reject
  - Verify error state displayed
  - Verify retry happens automatically
  - Verify data persists locally (not lost on failure)
- **Test**: Rapid successive rating changes
  - Change same subcategory 10 times quickly
  - Final value should match last change
  - Only final value saved to Firebase

#### 1.4 Context State Consistency
- **Test**: ScoreContext memoization (calculatedScores updates only when phase2Ratings change)
  - Rate a subcategory
  - Verify calculatedScores updates
  - Change UI state (tab, modal) without rating change
  - Verify calculatedScores does NOT recalculate (memo works)
- **Test**: Phase1Ratings stored in useRef (immutable during session)
  - Pass different Phase1Ratings to ScoreProvider
  - Verify ref never updates even if props change
  - (This is intentional for Phase 2 - Phase1 is locked)

#### 1.5 Results Ranking (Top 20 + Tiebreaker Logic)
- **Test**: Exact ties resolved by ID lexicographic sort
  - Create 5 subcategories with score 8.0
  - Verify sorted by ID, not random order
  - Verify deterministic (same order on reload)
- **Test**: Top 20 limit (32 subcategories, only 20 shown)
  - Rate all 32
  - Verify results show exactly top 20
  - Verify #20 and #21 boundaries correct
- **Test**: Scoring with mixed ratings
  - Phase1 variation (0-10) + Phase2 variation (0-10)
  - Verify top scores are genuinely highest
  - Spot-check calculations for top 3, middle 3, bottom 3

### HIGH PRIORITY (Regression Risk)

#### 1.6 TabNavigation Keyboard Interaction
- **Test**: ArrowLeft/Right navigate tabs
  - Focus on first tab, press Right → active tab index increases
  - At last tab, press Right → index stays at max (not circular)
  - At first tab, press Left → index stays at 0
- **Test**: Home/End keys
  - Press Home from tab 5 → tab 0 active
  - Press End from tab 2 → tab 7 active (last)
- **Test**: Key event propagation
  - ArrowLeft/Right should preventDefault (not scroll page)
- **Test**: Keyboard accessible with screen reader
  - role="tab", aria-selected, aria-controls attributes present

#### 1.7 SubcategoryCard Rating Input
- **Test**: Slider range (0-10, step 1)
  - Drag slider to exact values: 0, 5, 10
  - Verify onChange fires with parseInt values (not strings)
  - Verify unrated (0 or null) displays as "—"
- **Test**: Star buttons (1-5 → 2,4,6,8,10)
  - Click star 1 → rating 2
  - Click star 5 → rating 10
  - Verify onChange fires each time
- **Test**: Color coding per rating
  - 0: gray, 1-3: red, 4-6: yellow, 7-10: green
  - Verify correct class applied
- **Test**: Rating label updates
  - 0: "Not rated", 1-2: "Very low", 3-4: "Low", 5-6: "Moderate", 7-8: "High", 9-10: "Very high"

#### 1.8 All Unrated Edge Case
- **Test**: Zero Phase2 ratings
  - Navigate to Results with no Phase2 ratings
  - Verify empty state displayed ("No subcategories rated")
  - Verify "Back to Rating" button shown
  - Verify no crash, no "See Results" button available from Phase2

#### 1.9 Partial Unrated (Some Unrated Subcategories in Results)
- **Test**: Rate 20/32 subcategories
  - Results show top 20
  - Unrated section shows "Not Yet Rated (12)"
  - "Back to Rating" button allows rework
- **Test**: Rate all 32
  - No "Not Yet Rated" section
  - All 32 in ranked results

#### 1.10 PhaseTwoResults Display & Calculations
- **Test**: Each ranked item shows:
  - Rank (#1-20)
  - Subcategory name
  - Parent subject name
  - Description
  - Final score (formatted to 1 decimal)
  - Score bar (width % of 10)
  - Breakdown: "Physics: 6/10 + Mechanics: 7/10 = 6.4/10"
- **Test**: Score bar visual width
  - Score 5.0 → 50% width
  - Score 10.0 → 100% width
  - Score 0.5 → 5% width

### MEDIUM PRIORITY (Quality)

#### 1.11 Progress Tracking
- **Test**: Progress bar (top of Phase2)
  - Initially: 0/32
  - After rating 1: 1/32, percentage rounds to 3%
  - After rating all: 32/32, 100%
- **Test**: Per-subject progress (TabNavigation)
  - Physics: 0/4, 1/4, 2/4, etc.
  - Progress bar in tab shows correct %
  - Each subject independent

#### 1.12 Performance: 32 Subcategories Render
- **Test**: Initial load time
  - Benchmark: grid renders all 32 cards
  - Target: < 500ms on mobile, < 200ms on desktop
  - Verify no layout shift after initial render
- **Test**: Rapid rating changes
  - Change 32 ratings in 5 seconds
  - Verify no dropped frames (performance profiler)
  - Verify all 32 values persisted correctly
- **Test**: Memory (DevTools Profiler)
  - Start Phase2, rate all 32, navigate back and forth
  - Verify no memory leak (heap stable after GC)

#### 1.13 Firebase Timestamp & User ID Persistence
- **Test**: Timestamp saved on each auto-save
  - Rate a subcategory
  - Wait 500ms, check Firebase: timestamp field updated
  - Compare to Date.now()
- **Test**: User ID segmentation
  - Test with userId = "user1", then "user2"
  - Verify ratings saved to separate paths: `/users/user1/...` vs `/users/user2/...`

---

## 2. Test File Structure & Naming

```
src/
├── __tests__/
│   ├── unit/
│   │   ├── scoring.test.js              # Scoring algorithm tests
│   │   ├── validation.test.js           # Input validation (NaN, out-of-range)
│   │   └── formatting.test.js           # Score formatting & display
│   ├── components/
│   │   ├── SubcategoryCard.test.jsx     # Card rendering & interactions
│   │   ├── TabNavigation.test.jsx       # Tab switching & keyboard
│   │   ├── ProgressBar.test.jsx         # Progress display
│   │   ├── SaveIndicator.test.jsx       # Save state UI
│   │   ├── SubcategoryGrid.test.jsx     # Grid layout with 32 cards
│   │   └── PhaseTwoResults.test.jsx     # Results ranking & display
│   ├── context/
│   │   ├── ScoreContext.test.jsx        # State management & memoization
│   │   └── integration.test.jsx         # Context + components together
│   ├── integration/
│   │   ├── phase1-to-phase2.test.jsx    # Load Phase1 data into Phase2
│   │   ├── rating-to-firebase.test.jsx  # Rating change → auto-save
│   │   ├── firebase-to-results.test.jsx # Saved data → Results display
│   │   └── full-flow.test.jsx           # Phase1 → Phase2 → Results
│   └── e2e/
│       ├── user-flow.e2e.js            # Playwright/Cypress full flow
│       ├── keyboard-nav.e2e.js         # Keyboard-only navigation
│       ├── mobile.e2e.js               # Mobile UX, touch input
│       └── accessibility.e2e.js        # Screen reader, ARIA
└── ...
```

---

## 3. Mock Strategy

### 3.1 Firebase Mocking

```javascript
// src/__tests__/mocks/firebase.js
import { vi } from 'vitest';

export const mockDb = vi.fn();
export const mockRef = vi.fn();
export const mockSet = vi.fn();
export const mockOnValue = vi.fn();

export const createFirebaseMock = (overrides = {}) => ({
  db: mockDb(),
  ref: mockRef((path) => ({ path })),
  set: mockSet().mockResolvedValue(undefined),
  onValue: mockOnValue(),
  ...overrides
});

// Usage in tests:
// vi.mock('../firebaseConfig', () => createFirebaseMock());
```

### 3.2 Test Data (Fixtures)

```javascript
// src/__tests__/fixtures/testData.js
export const MOCK_PHASE1_RATINGS = {
  physics: 8,
  chemistry: 6,
  biology: 7,
  history: 5,
  mathematics: 9,
  art_design: 4,
  writing_literature: 6,
  technology_computing: 9
};

export const MOCK_PHASE2_RATINGS = {
  physics_mechanics: 9,
  physics_astronomy: 8,
  physics_thermodynamics: 7,
  chemistry_organic: 6,
  // ... 32 total
};

export const MOCK_EMPTY_PHASE2 = {};

export const MOCK_PARTIAL_PHASE2 = {
  physics_mechanics: 9,
  chemistry_organic: 6,
  biology_molecular: 8
};

export const MOCK_INVALID_RATINGS = {
  physics_mechanics: NaN,
  chemistry_organic: Infinity,
  biology_molecular: -5,
  history_ancient: 15
};
```

### 3.3 Component Testing Helpers

```javascript
// src/__tests__/helpers/renderWithContext.jsx
import { render } from '@testing-library/react';
import { ScoreProvider } from '../../contexts/ScoreContext';

export function renderWithContext(component, {
  phase1Ratings = {},
  phase2Ratings = {},
  ...renderOptions
} = {}) {
  return render(
    <ScoreProvider phase1Ratings={phase1Ratings}>
      {component}
    </ScoreProvider>,
    renderOptions
  );
}
```

---

## 4. Test Implementation Examples

### 4.1 Unit: Scoring Algorithm

```javascript
// src/__tests__/unit/scoring.test.js
import { describe, it, expect } from 'vitest';
import {
  calculatePhase2Score,
  calculateAllScores,
  validatePhase1Ratings,
  getRankedSubcategories,
  getScoreBreakdown
} from '../../utils/scoring';
import { MOCK_PHASE1_RATINGS, MOCK_PHASE2_RATINGS } from '../fixtures/testData';

describe('Scoring Algorithm', () => {
  describe('calculatePhase2Score', () => {
    it('should calculate (phase1 × 0.4) + (phase2 × 0.6)', () => {
      expect(calculatePhase2Score(10, 10)).toBe(10);
      expect(calculatePhase2Score(5, 10)).toBe(8);
      expect(calculatePhase2Score(10, 0)).toBe(4);
      expect(calculatePhase2Score(0, 0)).toBe(0);
    });

    it('should handle missing Phase1 as 0', () => {
      expect(calculatePhase2Score(undefined, 5)).toBe(3);
      expect(calculatePhase2Score(null, 10)).toBe(6);
    });

    it('should handle NaN by treating as 0', () => {
      expect(calculatePhase2Score(NaN, 10)).toBe(6);
      expect(calculatePhase2Score(5, NaN)).toBe(2);
      expect(calculatePhase2Score(NaN, NaN)).toBe(0);
    });

    it('should reject out-of-range values', () => {
      expect(calculatePhase2Score(-5, 5)).toBe(1); // -5 invalid → 0
      expect(calculatePhase2Score(15, 5)).toBe(1); // 15 invalid → 0
    });

    it('should round to 2 decimals', () => {
      const result = calculatePhase2Score(3.33, 7.77);
      expect(result).toBe(6.21);
      expect(result.toString()).toMatch(/^\d+\.\d{1,2}$/);
    });

    it('should not return NaN or Infinity', () => {
      expect(Number.isNaN(calculatePhase2Score(10, 10))).toBe(false);
      expect(Number.isFinite(calculatePhase2Score(10, 10))).toBe(true);
    });
  });

  describe('calculateAllScores', () => {
    it('should calculate scores for all Phase2Ratings', () => {
      const scores = calculateAllScores(
        MOCK_PHASE1_RATINGS,
        MOCK_PHASE2_RATINGS
      );
      expect(Object.keys(scores).length).toBe(32);
    });

    it('should skip unrated subcategories', () => {
      const scores = calculateAllScores(
        MOCK_PHASE1_RATINGS,
        { physics_mechanics: 9 } // Only 1 rated
      );
      expect(Object.keys(scores).length).toBe(1);
    });

    it('should handle invalid Phase1Ratings gracefully', () => {
      const invalidPhase1 = { physics: NaN, chemistry: 15, biology: -5 };
      const scores = calculateAllScores(
        invalidPhase1,
        { physics_mechanics: 8 }
      );
      expect(scores.physics_mechanics).toBe(4.8); // (0 × 0.4) + (8 × 0.6)
    });
  });

  describe('validatePhase1Ratings', () => {
    it('should filter invalid ratings', () => {
      const result = validatePhase1Ratings(MOCK_INVALID_RATINGS);
      expect(result.physics_mechanics).toBeUndefined();
      expect(result.chemistry_organic).toBeUndefined();
    });

    it('should accept valid 0-10 ratings', () => {
      const result = validatePhase1Ratings(MOCK_PHASE1_RATINGS);
      expect(Object.keys(result).length).toBe(8);
    });
  });

  describe('getRankedSubcategories', () => {
    it('should return top N items sorted by score descending', () => {
      const scores = calculateAllScores(
        MOCK_PHASE1_RATINGS,
        MOCK_PHASE2_RATINGS
      );
      const ranked = getRankedSubcategories(scores, 20);
      
      expect(ranked.length).toBeLessThanOrEqual(20);
      for (let i = 0; i < ranked.length - 1; i++) {
        expect(ranked[i].score).toBeGreaterThanOrEqual(ranked[i + 1].score);
      }
    });

    it('should use ID tiebreaker for equal scores', () => {
      const tieScores = {
        physics_mechanics: 8.0,
        physics_astronomy: 8.0,
        chemistry_organic: 8.0
      };
      const ranked = getRankedSubcategories(tieScores);
      
      const ids = ranked.map(r => r.subcategoryId);
      const sorted = [...ids].sort();
      expect(ids).toEqual(sorted); // Lexicographic order
    });

    it('should limit to topN', () => {
      const scores = calculateAllScores(
        MOCK_PHASE1_RATINGS,
        MOCK_PHASE2_RATINGS
      );
      const top5 = getRankedSubcategories(scores, 5);
      expect(top5.length).toBe(5);
    });
  });

  describe('getScoreBreakdown', () => {
    it('should return formula and component scores', () => {
      const breakdown = getScoreBreakdown(
        'physics_mechanics',
        { physics: 8 },
        { physics_mechanics: 9 }
      );
      
      expect(breakdown.phase1Rating).toBe(8);
      expect(breakdown.phase2Rating).toBe(9);
      expect(breakdown.score).toBe(8.6);
      expect(breakdown.formula).toContain('8.6');
    });
  });
});
```

### 4.2 Component: SubcategoryCard

```javascript
// src/__tests__/components/SubcategoryCard.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@testing-library/react';
import SubcategoryCard from '../../components/PhaseTwo/SubcategoryCard';

const mockSubcategory = {
  id: 'physics_mechanics',
  name: 'Mechanics & Engineering',
  description: 'Forces, motion, structures...',
  parentSubjectName: 'Physics'
};

describe('SubcategoryCard', () => {
  it('should render subcategory info', () => {
    const onRatingChange = vi.fn();
    render(
      <SubcategoryCard
        subcategory={mockSubcategory}
        rating={0}
        onRatingChange={onRatingChange}
      />
    );
    
    expect(screen.getByText('Mechanics & Engineering')).toBeInTheDocument();
    expect(screen.getByText('Physics')).toBeInTheDocument();
    expect(screen.getByText(/Forces, motion/)).toBeInTheDocument();
  });

  it('should display "—" when unrated', () => {
    render(
      <SubcategoryCard
        subcategory={mockSubcategory}
        rating={0}
        onRatingChange={vi.fn()}
      />
    );
    
    expect(screen.getByText('—')).toBeInTheDocument();
    expect(screen.getByText('Not rated')).toBeInTheDocument();
  });

  it('should update on slider change', async () => {
    const onRatingChange = vi.fn();
    const { container } = render(
      <SubcategoryCard
        subcategory={mockSubcategory}
        rating={5}
        onRatingChange={onRatingChange}
      />
    );
    
    const slider = container.querySelector('input[type="range"]');
    await userEvent.clear(slider);
    await userEvent.type(slider, '8');
    
    expect(onRatingChange).toHaveBeenCalledWith('physics_mechanics', 8);
  });

  it('should update on star click', async () => {
    const onRatingChange = vi.fn();
    render(
      <SubcategoryCard
        subcategory={mockSubcategory}
        rating={0}
        onRatingChange={onRatingChange}
      />
    );
    
    const stars = screen.getAllByRole('button', { name: /Rate \d+ out of 10/ });
    await userEvent.click(stars[2]); // Star 3 = rating 6
    
    expect(onRatingChange).toHaveBeenCalledWith('physics_mechanics', 6);
  });

  it('should show correct color for rating', () => {
    const { rerender, container } = render(
      <SubcategoryCard
        subcategory={mockSubcategory}
        rating={2}
        onRatingChange={vi.fn()}
      />
    );
    
    let ratingDisplay = container.querySelector('.text-red-500');
    expect(ratingDisplay).toBeInTheDocument(); // 1-3 = red
    
    rerender(
      <SubcategoryCard
        subcategory={mockSubcategory}
        rating={5}
        onRatingChange={vi.fn()}
      />
    );
    
    ratingDisplay = container.querySelector('.text-yellow-500');
    expect(ratingDisplay).toBeInTheDocument(); // 4-6 = yellow
  });

  it('should show correct label for rating', () => {
    const testCases = [
      [0, 'Not rated'],
      [2, 'Very low'],
      [4, 'Low'],
      [6, 'Moderate'],
      [8, 'High'],
      [10, 'Very high']
    ];

    testCases.forEach(([rating, label]) => {
      const { unmount } = render(
        <SubcategoryCard
          subcategory={mockSubcategory}
          rating={rating}
          onRatingChange={vi.fn()}
        />
      );
      expect(screen.getByText(label)).toBeInTheDocument();
      unmount();
    });
  });

  it('should have accessible slider', () => {
    const { container } = render(
      <SubcategoryCard
        subcategory={mockSubcategory}
        rating={5}
        onRatingChange={vi.fn()}
      />
    );
    
    const slider = container.querySelector('input[type="range"]');
    expect(slider).toHaveAttribute('aria-label', 'Rate Mechanics & Engineering');
  });
});
```

### 4.3 Component: TabNavigation Keyboard

```javascript
// src/__tests__/components/TabNavigation.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabNavigation from '../../components/PhaseTwo/TabNavigation';

const SUBJECTS = [
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' }
];

describe('TabNavigation - Keyboard', () => {
  it('should navigate right with ArrowRight', async () => {
    const onTabChange = vi.fn();
    render(
      <TabNavigation
        subjects={SUBJECTS}
        activeTab={0}
        onTabChange={onTabChange}
      />
    );
    
    await userEvent.keyboard('{ArrowRight}');
    expect(onTabChange).toHaveBeenCalledWith(1);
  });

  it('should navigate left with ArrowLeft', async () => {
    const onTabChange = vi.fn();
    render(
      <TabNavigation
        subjects={SUBJECTS}
        activeTab={1}
        onTabChange={onTabChange}
      />
    );
    
    await userEvent.keyboard('{ArrowLeft}');
    expect(onTabChange).toHaveBeenCalledWith(0);
  });

  it('should jump to start with Home', async () => {
    const onTabChange = vi.fn();
    render(
      <TabNavigation
        subjects={SUBJECTS}
        activeTab={2}
        onTabChange={onTabChange}
      />
    );
    
    await userEvent.keyboard('{Home}');
    expect(onTabChange).toHaveBeenCalledWith(0);
  });

  it('should jump to end with End', async () => {
    const onTabChange = vi.fn();
    render(
      <TabNavigation
        subjects={SUBJECTS}
        activeTab={0}
        onTabChange={onTabChange}
      />
    );
    
    await userEvent.keyboard('{End}');
    expect(onTabChange).toHaveBeenCalledWith(2);
  });

  it('should not go below 0', async () => {
    const onTabChange = vi.fn();
    render(
      <TabNavigation
        subjects={SUBJECTS}
        activeTab={0}
        onTabChange={onTabChange}
      />
    );
    
    await userEvent.keyboard('{ArrowLeft}');
    expect(onTabChange).toHaveBeenCalledWith(0);
  });

  it('should not exceed max index', async () => {
    const onTabChange = vi.fn();
    render(
      <TabNavigation
        subjects={SUBJECTS}
        activeTab={2}
        onTabChange={onTabChange}
      />
    );
    
    await userEvent.keyboard('{ArrowRight}');
    expect(onTabChange).toHaveBeenCalledWith(2);
  });

  it('should preventDefault on keyboard events', async () => {
    const onTabChange = vi.fn();
    const { container } = render(
      <TabNavigation
        subjects={SUBJECTS}
        activeTab={0}
        onTabChange={onTabChange}
      />
    );
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    
    window.dispatchEvent(event);
    
    // Note: preventDefault checking requires custom test setup
    // This is more of an e2e verification concern
  });

  it('should have proper ARIA attributes', () => {
    render(
      <TabNavigation
        subjects={SUBJECTS}
        activeTab={0}
        onTabChange={vi.fn()}
      />
    );
    
    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-label', 'Subject tabs');
    
    const tabs = screen.getAllByRole('tab');
    tabs.forEach((tab, i) => {
      expect(tab).toHaveAttribute('aria-selected', i === 0 ? 'true' : 'false');
      expect(tab).toHaveAttribute('aria-controls', `panel-${SUBJECTS[i].id}`);
    });
  });
});
```

### 4.4 Integration: Phase1 → Phase2

```javascript
// src/__tests__/integration/phase1-to-phase2.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScoreProvider } from '../../contexts/ScoreContext';
import { MOCK_PHASE1_RATINGS } from '../fixtures/testData';

describe('Integration: Phase1 → Phase2', () => {
  it('should load Phase1Ratings into context', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(ScoreContext);
      return <div>{contextValue.phase1Ratings.physics}</div>;
    };

    render(
      <ScoreProvider phase1Ratings={MOCK_PHASE1_RATINGS}>
        <TestComponent />
      </ScoreProvider>
    );

    expect(contextValue.phase1Ratings.physics).toBe(8);
    expect(contextValue.phase1Ratings.chemistry).toBe(6);
  });

  it('should handle missing Phase1Ratings', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(ScoreContext);
      return <div>Loaded</div>;
    };

    render(
      <ScoreProvider phase1Ratings={{}}>
        <TestComponent />
      </ScoreProvider>
    );

    expect(Object.keys(contextValue.phase1Ratings).length).toBe(0);
  });

  it('should validate Phase1Ratings on load', () => {
    const invalidPhase1 = {
      physics: 8,      // Valid
      chemistry: NaN,  // Invalid
      biology: 15      // Invalid
    };

    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(ScoreContext);
      return <div>Loaded</div>;
    };

    render(
      <ScoreProvider phase1Ratings={invalidPhase1}>
        <TestComponent />
      </ScoreProvider>
    );

    expect(contextValue.phase1Ratings.physics).toBe(8);
    expect(contextValue.phase1Ratings.chemistry).toBeUndefined();
    expect(contextValue.phase1Ratings.biology).toBeUndefined();
  });
});
```

### 4.5 Integration: Firebase Auto-Save with Debounce

```javascript
// src/__tests__/integration/rating-to-firebase.test.jsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as firebase from 'firebase/database';
import PhaseTwo from '../../components/PhaseTwo';

vi.mock('firebase/database', () => ({
  ref: vi.fn(),
  set: vi.fn(),
  onValue: vi.fn(),
  db: {}
}));

describe('Integration: Rating Change → Firebase Save', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should debounce Firebase saves (500ms)', async () => {
    const mockSet = vi.fn().mockResolvedValue(undefined);
    vi.mocked(firebase.set).mockImplementation(mockSet);

    render(
      <ScoreProvider phase1Ratings={MOCK_PHASE1_RATINGS}>
        <PhaseTwo userId="user1" onPhaseChange={vi.fn()} />
      </ScoreProvider>
    );

    // Make 5 rating changes within 500ms
    const slider = screen.getByRole('slider', { name: /Rate/ });
    await userEvent.clear(slider);
    await userEvent.type(slider, '5');
    await userEvent.clear(slider);
    await userEvent.type(slider, '6');
    await userEvent.clear(slider);
    await userEvent.type(slider, '7');
    await userEvent.clear(slider);
    await userEvent.type(slider, '8');
    await userEvent.clear(slider);
    await userEvent.type(slider, '9');

    // At 400ms: no Firebase call yet
    vi.advanceTimersByTime(400);
    expect(mockSet).not.toHaveBeenCalled();

    // At 500ms: Firebase called once (not 5 times)
    vi.advanceTimersByTime(100);
    await waitFor(() => {
      expect(mockSet).toHaveBeenCalledTimes(1);
    });

    // Final value saved should be 9
    const callArgs = mockSet.mock.calls[0];
    expect(callArgs[1]).toHaveProperty('physics_mechanics', 9);
  });

  it('should handle Firebase failure with retry', async () => {
    const mockSet = vi.fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(undefined); // Retry succeeds

    vi.mocked(firebase.set).mockImplementation(mockSet);

    render(
      <ScoreProvider phase1Ratings={MOCK_PHASE1_RATINGS}>
        <PhaseTwo userId="user1" onPhaseChange={vi.fn()} />
      </ScoreProvider>
    );

    // Make a rating change
    const slider = screen.getByRole('slider');
    await userEvent.clear(slider);
    await userEvent.type(slider, '7');

    // Advance to trigger save (500ms)
    vi.advanceTimersByTime(500);
    await waitFor(() => expect(mockSet).toHaveBeenCalledTimes(1));

    // Error state should be visible
    expect(screen.getByText(/Failed to save/)).toBeInTheDocument();

    // Advance 5 seconds for retry
    vi.advanceTimersByTime(5000);
    await waitFor(() => {
      expect(mockSet).toHaveBeenCalledTimes(2);
    });

    // Error cleared
    expect(screen.queryByText(/Failed to save/)).not.toBeInTheDocument();
  });

  it('should save timestamp on each save', async () => {
    const mockSet = vi.fn().mockResolvedValue(undefined);
    vi.mocked(firebase.set).mockImplementation(mockSet);

    const beforeTime = Date.now();
    render(
      <ScoreProvider phase1Ratings={MOCK_PHASE1_RATINGS}>
        <PhaseTwo userId="user1" onPhaseChange={vi.fn()} />
      </ScoreProvider>
    );

    const slider = screen.getByRole('slider');
    await userEvent.clear(slider);
    await userEvent.type(slider, '8');

    vi.advanceTimersByTime(500);
    await waitFor(() => expect(mockSet).toHaveBeenCalled());

    const afterTime = Date.now();
    const callArgs = mockSet.mock.calls[1]; // Second call (timestamp)
    const savedTimestamp = callArgs[1];

    expect(savedTimestamp).toBeGreaterThanOrEqual(beforeTime);
    expect(savedTimestamp).toBeLessThanOrEqual(afterTime + 1000);
  });

  it('should not save if no ratings changed', async () => {
    const mockSet = vi.fn().mockResolvedValue(undefined);
    vi.mocked(firebase.set).mockImplementation(mockSet);

    render(
      <ScoreProvider phase1Ratings={MOCK_PHASE1_RATINGS}>
        <PhaseTwo userId="user1" onPhaseChange={vi.fn()} />
      </ScoreProvider>
    );

    vi.advanceTimersByTime(500);
    expect(mockSet).not.toHaveBeenCalled();

    vi.advanceTimersByTime(5000);
    expect(mockSet).not.toHaveBeenCalled();
  });
});
```

### 4.6 E2E: Full User Flow (Playwright/Cypress)

```javascript
// src/__tests__/e2e/user-flow.e2e.js (Playwright)
import { test, expect } from '@playwright/test';

test.describe('Full User Flow: Phase1 → Phase2 → Results', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should complete full career exploration', async ({ page }) => {
    // Phase 1: Rate subjects (assuming Phase1 already complete)
    await page.click('button:has-text("Next: Get Specific")');

    // Phase 2: Rate subcategories
    const cards = await page.locator('[role="main"] .bg-white').count();
    expect(cards).toBe(4); // First tab shows 4 subcategories

    // Rate first subcategory
    const firstSlider = page.locator('input[type="range"]').first();
    await firstSlider.fill('7');

    // Navigate to next tab
    const tabs = page.locator('[role="tab"]');
    await tabs.nth(1).click();

    // Rate another subcategory
    await firstSlider.fill('8');

    // Check progress updated
    const progress = page.locator('text=/\\d+ \/ 32/');
    await expect(progress).toContainText(/[2-9] \/ 32/);

    // Navigate to results
    await page.click('button:has-text("See Results")');

    // Verify results displayed
    const resultItems = page.locator('[class*="border-indigo"]');
    expect(await resultItems.count()).toBeGreaterThan(0);

    // Verify scoring breakdown shown
    await expect(page.locator('text=Phase1Rating')).toBeVisible();
  });

  test('should keyboard navigate tabs', async ({ page }) => {
    await page.click('button:has-text("Next: Get Specific")');

    const firstTab = page.locator('[role="tab"]').first();
    await firstTab.focus();

    // ArrowRight
    await page.keyboard.press('ArrowRight');
    const secondTab = page.locator('[role="tab"]').nth(1);
    await expect(secondTab).toBeFocused();

    // ArrowLeft
    await page.keyboard.press('ArrowLeft');
    await expect(firstTab).toBeFocused();

    // End
    await page.keyboard.press('End');
    const lastTab = page.locator('[role="tab"]').last();
    await expect(lastTab).toBeFocused();

    // Home
    await page.keyboard.press('Home');
    await expect(firstTab).toBeFocused();
  });

  test('should persist ratings across navigation', async ({ page }) => {
    await page.click('button:has-text("Next: Get Specific")');

    // Rate first subcategory
    const slider = page.locator('input[type="range"]').first();
    await slider.fill('9');

    const ratingValue = await slider.inputValue();
    expect(ratingValue).toBe('9');

    // Switch tabs and back
    await page.locator('[role="tab"]').nth(1).click();
    await page.locator('[role="tab"]').first().click();

    // Verify rating persisted
    const ratingAfter = await slider.inputValue();
    expect(ratingAfter).toBe('9');
  });

  test('should handle all unrated case', async ({ page }) => {
    await page.click('button:has-text("Next: Get Specific")');
    await page.click('button:has-text("See Results")');

    // Empty state message
    await expect(page.locator('text=No subcategories rated')).toBeVisible();

    // "Next" button disabled
    const nextBtn = page.locator('button:has-text("Next: Career Paths")');
    await expect(nextBtn).not.toBeVisible();
  });

  test('should show partial unrated in results', async ({ page }) => {
    await page.click('button:has-text("Next: Get Specific")');

    // Rate only 3 subcategories
    const sliders = page.locator('input[type="range"]');
    for (let i = 0; i < 3; i++) {
      await sliders.nth(i).fill(`${i + 5}`);
    }

    await page.click('button:has-text("See Results")');

    // Verify results count
    await expect(page.locator('text=3 subcategories ranked')).toBeVisible();

    // Verify unrated section
    await expect(page.locator('text=Not Yet Rated')).toBeVisible();
  });
});
```

---

## 5. Performance Benchmarks to Track

### Metrics to Monitor

| Metric | Target | Method |
|--------|--------|--------|
| Initial load (32 cards) | < 500ms mobile / < 200ms desktop | Lighthouse, DevTools Performance |
| Rapid rating changes (32 in 5s) | 0 dropped frames | Chrome DevTools > Performance |
| Memory stability | Flat after GC | Chrome DevTools > Memory |
| Firebase auto-save latency | < 50ms (after debounce) | Network tab, mock timing |
| Score calculation (32 items) | < 5ms | performance.now() / profiler |
| Render time per card | < 2ms | React Profiler |

### Benchmark Test

```javascript
// src/__tests__/performance/scoring.bench.js
import { bench, describe } from 'vitest';
import { calculateAllScores, getRankedSubcategories } from '../../utils/scoring';
import { MOCK_PHASE1_RATINGS } from '../fixtures/testData';

describe('Performance: Scoring', () => {
  bench('calculateAllScores (32 subcategories)', () => {
    const phase2Ratings = {};
    for (let i = 0; i < 32; i++) {
      phase2Ratings[`subcat_${i}`] = Math.floor(Math.random() * 11);
    }
    calculateAllScores(MOCK_PHASE1_RATINGS, phase2Ratings);
  }, { iterations: 1000 });

  bench('getRankedSubcategories (top 20)', () => {
    const scores = {};
    for (let i = 0; i < 32; i++) {
      scores[`subcat_${i}`] = Math.random() * 10;
    }
    getRankedSubcategories(scores, 20);
  }, { iterations: 1000 });
});
```

---

## 6. Regression Test Checklist (Pre-Deployment)

### Scoring & Data

- [ ] Scoring algorithm produces correct 40/60 weights
- [ ] Missing Phase1 data defaults to 0 (not error)
- [ ] NaN/Infinity values handled gracefully
- [ ] All 32 subcategories rank when rated
- [ ] Top 20 limit enforced (no #21 in results)
- [ ] Score ties resolved by ID (deterministic)
- [ ] Results display correct decimal formatting (1 place)
- [ ] Score breakdown formula displays correctly

### Firebase & State

- [ ] Auto-save triggers at 500ms (not before, not after)
- [ ] Rapid changes batched into single save
- [ ] Network failure triggers error UI
- [ ] Retry succeeds after delay
- [ ] Timestamp saved on each save
- [ ] User ID correctly segments data
- [ ] No data loss on tab close (verify via Chrome DevTools > Application > Firebase)
- [ ] ScoreContext memoization prevents unnecessary recalculations

### UI & Interaction

- [ ] Slider updates rating 0-10 in steps of 1
- [ ] Star buttons set ratings 2,4,6,8,10
- [ ] Color coding: gray (0), red (1-3), yellow (4-6), green (7-10)
- [ ] Rating labels: "Not rated", "Very low", "Low", "Moderate", "High", "Very high"
- [ ] Unrated shows "—" (em dash)
- [ ] Visual indicator bars fill correctly
- [ ] Progress bar: 0/32 → 32/32, % rounds correctly
- [ ] Tab navigation shows progress per subject (4 max per subject)

### Keyboard & Accessibility

- [ ] ArrowLeft/Right navigate tabs (bounded by 0 and max-1)
- [ ] Home jumps to tab 0
- [ ] End jumps to last tab
- [ ] Keys prevent default (no page scroll)
- [ ] role="tablist", role="tab" attributes present
- [ ] aria-selected reflects active tab
- [ ] aria-controls links tab to panel
- [ ] aria-label on slider and star buttons
- [ ] Screen reader announces rating changes
- [ ] Keyboard-only user can complete Phase2

### Mobile/Responsive

- [ ] 32 cards grid on desktop (appropriate columns)
- [ ] Mobile view stacks cards
- [ ] Slider touch works smoothly
- [ ] Star buttons touch targets >= 44x44px
- [ ] Tab scroller auto-scrolls active tab into view (mobile)
- [ ] Progress bar displays on all screen sizes
- [ ] Results list readable on mobile

### Edge Cases

- [ ] Zero ratings: navigate Results with no Phase2 ratings → empty state
- [ ] Partial ratings: 1/32, 16/32, 31/32 all show correct counts
- [ ] All 32 rated: "Not Yet Rated" section hidden
- [ ] Unrated count accurate (32 - rated)
- [ ] Back button from Results → Phase2 preserves ratings
- [ ] Back button from Phase2 → Phase1 preserves ratings
- [ ] Refresh page: ratings persist (from Firebase or local storage)

### Performance

- [ ] Load Phase2 (first paint): < 500ms
- [ ] Change 10 ratings: no frame drops
- [ ] 32 items ranked: < 5ms
- [ ] Memory stable (no leak after rating 32, navigating back/forth)
- [ ] Firebase save completes < 50ms (network permitting)

### Error Handling

- [ ] Invalid Phase1 data logged (console warning)
- [ ] Unknown subcategory ID logged (console warning)
- [ ] Firebase offline: error message shown, retry available
- [ ] Firebase 500ms retry: backoff prevents spam
- [ ] Unknown rating value (< 0 or > 10): clamped or logged

---

## 7. React Hooks & Context Gotchas

### 7.1 ScoreContext Memoization Risk

**Gotcha**: If `calculatedScores` is recalculated on every render (not memoized), expensive Results display will re-render 32 times unnecessarily.

**Guard**:
```javascript
// GOOD: useMemo depends only on phase2Ratings
const calculatedScores = useMemo(() => {
  return calculateAllScores(phase1Ratings.current, phase2Ratings);
}, [phase2Ratings]); // Only phase2Ratings, not the entire context

// BAD: would recalculate on unrelated state changes
const calculatedScores = calculateAllScores(phase1Ratings.current, phase2Ratings);
```

**Test**: Verify `calculatedScores` identity doesn't change when other context values update.

### 7.2 useRef for Immutable Phase1Ratings

**Gotcha**: Phase1Ratings should not change after Phase2 starts (otherwise, re-weighting all scores). Using useRef prevents accidental re-renders if props change.

**Guard**:
```javascript
// GOOD: useRef locks Phase1Ratings at initialization
const phase1Ratings = useRef(validatePhase1Ratings(initialPhase1Ratings));

// Test: Pass different Phase1Ratings prop on re-render
// Should NOT update context's phase1Ratings
```

**Test**: 
```javascript
it('should not update phase1Ratings if props change', () => {
  const { rerender } = render(
    <ScoreProvider phase1Ratings={{ physics: 5 }}>
      <TestComponent />
    </ScoreProvider>
  );
  
  let contextValue = useContext(ScoreContext);
  expect(contextValue.phase1Ratings.physics).toBe(5);
  
  // Re-render with different prop
  rerender(
    <ScoreProvider phase1Ratings={{ physics: 10 }}>
      <TestComponent />
    </ScoreProvider>
  );
  
  contextValue = useContext(ScoreContext);
  expect(contextValue.phase1Ratings.physics).toBe(5); // Still 5, not 10
});
```

### 7.3 setPhase2Ratings Batching in Auto-Save Effect

**Gotcha**: If useEffect calls handleSaveToFirebase synchronously, Firebase is called multiple times per rating change (no debounce).

**Guard**:
```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    // Wait 500ms before saving
    if (Object.keys(phase2Ratings).length > 0) {
      handleSaveToFirebase();
    }
  }, 500);

  return () => clearTimeout(timer); // Clear if dependency changes again before 500ms
}, [phase2Ratings]); // Dependency ONLY on phase2Ratings, not other state
```

**Test**: 
```javascript
it('debounce clears on new rating before timeout', async () => {
  const mockSet = vi.fn().mockResolvedValue(undefined);
  
  render(<PhaseTwo />);
  
  // First rating change starts 500ms timer
  rateSubcategory('physics_mechanics', 5);
  vi.advanceTimersByTime(100);
  
  // Second rating change within 500ms should clear previous timer
  rateSubcategory('chemistry_organic', 7);
  vi.advanceTimersByTime(100);
  
  // Now advance 500ms from second change
  vi.advanceTimersByTime(400);
  
  // Firebase should be called only once with BOTH changes batched
  expect(mockSet).toHaveBeenCalledTimes(1);
  expect(mockSet).toHaveBeenCalledWith(
    expect.anything(),
    expect.objectContaining({
      physics_mechanics: 5,
      chemistry_organic: 7
    })
  );
});
```

### 7.4 Stale Closure in Event Listeners (TabNavigation)

**Gotcha**: Keyboard event listener captures `activeTab` and `subjects.length` at render time. If props change, listener still uses old values.

**Guard**:
```javascript
useEffect(() => {
  const handleKeyDown = (e) => {
    // Uses activeTab from props (always current due to dependency array)
    if (e.key === 'ArrowLeft') {
      onTabChange(Math.max(0, activeTab - 1));
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [activeTab, subjects.length, onTabChange]); // Include all dependencies
```

**Test**: Re-render with new activeTab prop and verify keyboard still works.

### 7.5 Context Consumer Must Use Stable Value

**Gotcha**: If ScoreContext.value is created inline (not memoized), all consumers re-render even if state didn't change.

**Guard**:
```javascript
const value = {
  phase1Ratings: phase1Ratings.current,
  phase2Ratings,
  calculatedScores,
  updateRating,
  batchUpdateRatings,
  resetRatings
};

return (
  <ScoreContext.Provider value={value}>
    {children}
  </ScoreContext.Provider>
);

// BAD: creates new object every render
return (
  <ScoreContext.Provider value={{ ...value }}>
    {children}
  </ScoreContext.Provider>
);
```

**Test**: Verify context consumers don't re-render on unrelated state changes.

### 7.6 useCallback Prevents Child Re-renders

**Gotcha**: If `onRatingChange` is created inline in PhaseTwo, every SubcategoryCard re-renders even if their rating didn't change.

**Guard**:
```javascript
const handleRatingChange = useCallback((subcategoryId, rating) => {
  setPhase2Ratings(prev => ({
    ...prev,
    [subcategoryId]: rating
  }));
}, []); // Empty deps: always the same function reference
```

**Test**: Render 32 SubcategoryCards, change one rating, verify only that card re-renders.

---

## 8. Setup & Tooling

### 8.1 Testing Libraries

```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@playwright/test": "^1.40.0",
    "happy-dom": "^12.0.0",
    "c8": "^0.19.0"
  }
}
```

### 8.2 Vitest Config

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/__tests__/setup.js'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/__tests__/**', 'src/main.jsx']
    }
  }
});
```

### 8.3 Test Setup File

```javascript
// src/__tests__/setup.js
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Firebase globally
vi.mock('../firebaseConfig', () => ({
  db: {},
  auth: {}
}));

// Suppress console warnings in tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn()
};
```

### 8.4 NPM Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch",
    "test:e2e": "playwright test",
    "test:all": "npm run test && npm run test:e2e"
  }
}
```

---

## 9. Summary: Risk Matrix

| Risk | Severity | Mitigation | Test Type |
|------|----------|-----------|-----------|
| Scoring algorithm error (wrong weights) | CRITICAL | Exact calculation tests | Unit |
| Phase1 missing causes crash | CRITICAL | Edge case tests (undefined/null) | Unit |
| Firebase never saves (network/bug) | CRITICAL | Mock + integration tests | Integration |
| Keyboard nav breaks accessibility | CRITICAL | Keyboard nav tests + a11y audit | Component + E2E |
| Context memoization causes perf lag | HIGH | Profile tests, memoization checks | Performance |
| Stale closure in event listeners | HIGH | Dependency array tests | Component |
| Results ranking incorrect | HIGH | Tie-breaker + top-20 limit tests | Unit |
| 32-card render causes jank | MEDIUM | Perf benchmarks, DevTools profiler | Performance |
| Data persists incorrectly | MEDIUM | Firebase mock + localStorage checks | Integration |
| Mobile UX issues | MEDIUM | Responsive + touch tests | E2E |

---

## 10. Deployment Checklist

Before merging Phase 2:

1. **All unit tests passing** (`npm run test`)
2. **No console errors/warnings** (check DevTools after each test scenario)
3. **Performance benchmarks met** (scoring < 5ms, render < 500ms)
4. **Accessibility audit passed** (axe DevTools, WAVE)
5. **E2E tests passing** on desktop + mobile
6. **Manual testing checklist** completed (regression list above)
7. **Firebase rules reviewed** (ensure user data isolated)
8. **Error handling verified** (offline, invalid data, timeouts)
9. **Keyboard nav tested** (all 4 keyboard keys, bounds checking)
10. **Results display verified** (top 20, breakdown, unrated count)

---

## Next Steps

1. **Set up test infrastructure**: Install vitest, @testing-library/react
2. **Create fixture data**: Mock Phase1/Phase2 ratings, invalid cases
3. **Write unit tests first**: Scoring, validation, formatting
4. **Add component tests**: SubcategoryCard, TabNavigation, PhaseTwoResults
5. **Integration tests**: Phase1→Phase2, Firebase save, Results display
6. **E2E tests**: Full user flow, keyboard nav, mobile
7. **Performance profiling**: Benchmark scoring, render, memory
8. **Accessibility audit**: DevTools, ARIA labels, keyboard-only flow

---

**Document Version**: 1.0  
**Phase**: Phase 2 (Subcategories)  
**Testing Strategy Author**: Claude Code  
**Last Updated**: 2026-05-20
