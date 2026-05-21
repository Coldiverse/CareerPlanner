# Scoring Engine Design: Phase 2 Implementation Guide

## Overview
This document provides production-ready answers to all scoring algorithm edge cases, data validation, and performance considerations for Phase 2 of the Career Discovery app.

**Quick Reference - Recommended Approach:**
- **Weighting Formula:** `Score = (Phase1_Rating × 0.4) + (Phase2_Rating × 0.6)`
- **Precision:** Store to full precision, display to 1 decimal
- **Strategy:** Calculate client-side, cache results in Firebase for Phase 3
- **Validation:** Strict input validation on all Firebase reads
- **Ties:** Stable sort by entry order
- **Partial Completion:** Show only rated items, don't impute missing data

---

## 1. CALCULATION EDGE CASES

### 1.1 Missing Phase 1 Rating (User skipped a subject in Phase 1)

**Scenario:** User rates 7 out of 8 subjects in Phase 1, then moves to Phase 2.

**Recommended Approach: TREAT AS 0**
```javascript
const calculateScore = (phase1Rating, phase2Rating) => {
  // If phase1Rating is undefined, missing, or explicitly 0, treat as 0
  const p1 = phase1Rating || 0;
  const p2 = phase2Rating || 0;
  return (p1 * 0.4) + (p2 * 0.6);
};

// Examples:
calculateScore(undefined, 8) // (0 × 0.4) + (8 × 0.6) = 4.8
calculateScore(0, 8)         // Same: 4.8
calculateScore(5, 8)         // (5 × 0.4) + (8 × 0.6) = 6.8
```

**Why not impute missing Phase 1?**
- User explicitly chose not to rate it (intentional signal)
- Imputing (e.g., average of other subjects) introduces false confidence
- 4.8 is still rankable in a top 20 of 32 items (bottom 1/3)
- Preserves honesty—we don't guess user intent

**Data Validation at Load Time:**
```javascript
const loadPhase1 = async (userId) => {
  const userRef = ref(db, `users/${userId}/phase1/ratings`);
  const snapshot = await get(userRef);
  
  if (!snapshot.exists()) {
    console.warn('Phase 1 data missing for user');
    return {}; // Return empty object, not null
  }
  
  const ratings = snapshot.val();
  // Validate each rating is 0-10
  return Object.fromEntries(
    Object.entries(ratings)
      .filter(([key, value]) => isValidRating(value))
      .map(([key, value]) => [key, value])
  );
};

const isValidRating = (rating) => {
  return typeof rating === 'number' && rating >= 0 && rating <= 10;
};
```

---

### 1.2 Phase 2 Rating is 0 or Unrated (Unrated subcategory)

**Scenario:** User rates 5 of 32 subcategories, leaves 27 unrated.

**Recommended Approach: EXCLUDE FROM RESULTS BY DEFAULT**
```javascript
const scoredSubcategories = subcategories
  .filter(sub => phase2Ratings[sub.id] > 0) // Only scored items
  .map(sub => ({
    ...sub,
    phase1: phase1Ratings[getSubjectId(sub.id)] || 0,
    phase2: phase2Ratings[sub.id],
    score: (phase1 * 0.4) + (phase2Ratings[sub.id] * 0.6)
  }));

// Result: Only 5 items shown in "Your Matches"
// Unrated items appear in separate "Not Explored Yet" section below
```

**Why exclude unrated items?**
- They have no Phase 2 signal (user chose not to rate)
- A score of 4.0 (Phase 1 only, Phase 2 = 0) is not meaningful
- Keeps results clean and honest
- Unrated items still visible in "explore these next" section

**UI Flow:**
```
YOUR TOP MATCHES (5 items rated)
┌─────────────────────────────────┐
│ 1. Technology - Software (8.2)  │
│ 2. Art - Digital Design (8.4)   │
│ 3. Math - Applied (6.8)         │
└─────────────────────────────────┘

EXPLORE THESE NEXT (27 unrated)
┌─────────────────────────────────┐
│ • Physics - Astronomy           │
│ • Chemistry - Organic           │
│ [Rate more] [Skip to Phase 3]   │
└─────────────────────────────────┘
```

---

### 1.3 Should unrated subcategories be in the scoring pool at all?

**Answer: NO - They should be excluded from ranking**

```javascript
// DON'T DO THIS:
const allScores = subcategories.map(sub => ({
  score: (phase1 * 0.4) + (phase2Ratings[sub.id] || 0 * 0.6) // ← Wrong
}));

// DO THIS:
const rankedScores = subcategories
  .filter(sub => phase2Ratings[sub.id] && phase2Ratings[sub.id] > 0)
  .map(sub => ({
    score: (phase1 * 0.4) + (phase2Ratings[sub.id] * 0.6)
  }));
```

**Why?**
- Ranking 32 items when only 5 are rated dilutes results
- A user who rated 32 items should see different Top 20 than user who rated 5
- Honesty principle: show what you know, not what you guess

**Gotcha to Watch:**
- Don't show "Top 20 of 32" if only 10 are rated
- Instead show "Your Top Matches (10 rated)" or "Your Top Interests"
- Update UI messaging dynamically based on completion

---

### 1.4 Firebase Load Failure: Can't retrieve Phase 1 data during Phase 2

**Scenario:** Network error or data corruption prevents loading Phase 1 ratings.

**Recommended Approach: GRACEFUL DEGRADATION + CLEAR MESSAGING**

```javascript
const loadPhase2WithValidation = async (userId) => {
  let phase1 = {};
  let phase2 = {};
  let phase1LoadError = null;
  
  // Try to load Phase 1
  try {
    const p1Ref = ref(db, `users/${userId}/phase1/ratings`);
    const p1Snap = await get(p1Ref);
    if (p1Snap.exists()) {
      phase1 = validatePhase1(p1Snap.val());
    }
  } catch (err) {
    console.error('Phase 1 load failed:', err);
    phase1LoadError = err.code;
    // Continue anyway—user can still rate Phase 2
  }
  
  // Load Phase 2 (required)
  try {
    const p2Ref = ref(db, `users/${userId}/phase2/ratings`);
    const p2Snap = await get(p2Ref);
    if (p2Snap.exists()) {
      phase2 = validatePhase2(p2Snap.val());
    }
  } catch (err) {
    console.error('Phase 2 load failed:', err);
    throw new Error('Unable to load your progress. Please refresh and try again.');
  }
  
  return { phase1, phase2, phase1LoadError };
};

// In component:
const { phase1, phase2, phase1LoadError } = await loadPhase2WithValidation(userId);

// Display warning if Phase 1 failed:
{phase1LoadError && (
  <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
    <p className="text-yellow-800">
      We couldn't load your Phase 1 ratings, but you can still rate Phase 2 subcategories.
      Your scores will be calculated when Phase 1 loads.
    </p>
  </div>
)}
```

**Score Calculation with Partial Data:**
```javascript
const calculateScoreWithFallback = (
  phase1Rating,
  phase2Rating,
  phase1LoadError
) => {
  if (phase1LoadError) {
    // Use Phase 2 only (60% weight becomes 100%)
    return phase2Rating;
  }
  
  // Normal calculation
  return ((phase1Rating || 0) * 0.4) + (phase2Rating * 0.6);
};

// Example:
calculateScoreWithFallback(undefined, 8, 'network_error') // Returns 8.0
calculateScoreWithFallback(5, 8, null)                     // Returns 6.8
```

**User Experience:**
- Can continue rating Phase 2 even if Phase 1 failed
- Results show: "Based on Phase 2 ratings only (Phase 1 loading...)"
- When Phase 1 eventually loads, scores auto-recalculate
- No data loss

---

## 2. PRECISION & ROUNDING

### 2.1 Storage: Use Full Precision Internally

**Storage Strategy: Always store to full precision**
```javascript
// In Firebase:
users/{userId}/phase2/
  ratings/
    physics_mechanics: 8        // Phase 2 user rating (integer 1-10)
  calculated_scores/
    physics_mechanics: 8.0      // Full precision calculation result
    art_digital: 8.35999...     // Keep all decimals

// In-memory (client state):
const [scores, setScores] = useState({
  physics_mechanics: 8.0,
  art_digital: 8.35999...      // JavaScript number, full precision
});
```

**Why full precision?**
- No accumulated rounding errors during re-calculations
- Ranking is stable (8.35999 vs 8.36 might flip order on rounding)
- Firebase storage is cheap; precision doesn't increase cost
- If you later change weighting (e.g., 40/60 → 45/55), you have clean data to recalculate

---

### 2.2 Display: Round to 1 Decimal Place

```javascript
// Utility function:
const formatScore = (score) => {
  return parseFloat(score.toFixed(1));
};

// UI display:
<div className="text-2xl font-bold">
  {formatScore(8.35999)}/10
</div>
// Shows: "8.4/10"
```

**Implementation in Results:**
```javascript
const scoredSubcategories = phase2Items
  .map(item => ({
    ...item,
    score: (phase1 * 0.4) + (phase2 * 0.6),
    displayScore: formatScore((phase1 * 0.4) + (phase2 * 0.6))
  }))
  .sort((a, b) => b.score - a.score); // Sort by FULL precision

// Render using displayScore:
{scoredSubcategories.map(item => (
  <div key={item.id}>
    <h3>{item.name}</h3>
    <p className="text-xl font-bold">{item.displayScore}/10</p>
  </div>
))}
```

---

### 2.3 Does Precision Matter for Ranking 32 Items?

**Answer: YES, but less than you'd think**

**Analysis:**
```
32 items, scores 1-10 scale:
- If 10 users rate independently, average variance ≈ 1.5 points
- Having 8.35999 vs 8.36 (0.00001 difference) is negligible
- BUT: With 32 items, several WILL be very close (e.g., 6.7, 6.71, 6.72)

Test case:
Item A: (5 × 0.4) + (9 × 0.6) = 2.0 + 5.4 = 7.4
Item B: (6 × 0.4) + (8 × 0.6) = 2.4 + 4.8 = 7.2
Item C: (7 × 0.4) + (7 × 0.6) = 2.8 + 4.2 = 7.0

Ranking is stable and clear.

But edge case:
Item A: (7 × 0.4) + (8 × 0.6) = 2.8 + 4.8 = 7.6
Item B: (8 × 0.4) + (7 × 0.6) = 3.2 + 4.2 = 7.4
Item C: (6.5 × 0.4) + (8.1 × 0.6) = 2.6 + 4.86 = 7.46

If C is at 7.46 and we round to 7.5, it might appear to beat B (7.4).
But in actual ranking, B (7.4) beats C (7.46).
```

**Recommendation:**
- Sort by full-precision `score` (internal)
- Display rounded `displayScore` (UI)
- This prevents "display contradiction" (showing 7.5 but ranked 4th out of 5)

```javascript
// CORRECT:
const sorted = scores
  .map(s => ({ 
    ...s, 
    score: (p1 * 0.4) + (p2 * 0.6),
    displayScore: formatScore((p1 * 0.4) + (p2 * 0.6))
  }))
  .sort((a, b) => b.score - a.score); // Sort by internal score
  
// WRONG:
const sorted = scores
  .map(s => ({ 
    ...s,
    displayScore: formatScore((p1 * 0.4) + (p2 * 0.6))
  }))
  .sort((a, b) => b.displayScore - a.displayScore); // Sort by rounded—can flip!
```

---

## 3. PERFORMANCE CONSIDERATIONS

### 3.1 Client-Side Calculation vs. Firebase Caching

**Recommendation: Calculate client-side, cache in Firebase for Phase 3**

**Why client-side?**
- Phase 2 computation: 32 scores, each is one multiplication + addition = negligible
- No network latency waiting for cloud function
- Instant visual feedback as user rates
- No cold-start delays
- Works offline-first (with localStorage backup)

**Why cache in Firebase?**
- Phase 3 needs Phase 2 scores to match careers
- Avoid re-calculating 32 scores when loading Phase 3
- One read operation instead of reconstructing from Phase 1 + Phase 2

**Architecture:**
```
Phase 2 Component:
  ├─ User rates subcategory → Phase 2 rating saved
  ├─ Calculate score client-side
  ├─ Store score in localStorage (backup)
  └─ Also store in Firebase at `users/{userId}/phase2/calculated_scores/{subId}`

Phase 3 Component:
  ├─ Load Phase 2 calculated_scores from Firebase
  ├─ Map each score to career requirements
  └─ Calculate career match scores
```

**Firebase Schema:**
```javascript
users/{userId}/
  phase2/
    ratings/
      physics_mechanics: 8
      physics_astronomy: 6
      // ... (only rated items)
    calculated_scores/       // Cache—recalculated on each save
      physics_mechanics: 8.0
      physics_astronomy: 6.4
      // ... (all rated items)
    timestamp: 1684089600000
    status: "partial"        // or "complete"
```

**Implementation:**
```javascript
const savePhase2Rating = async (userId, subId, phase2Rating) => {
  // 1. Load Phase 1 for this subject
  const subjectId = extractSubjectId(subId); // e.g., "physics" from "physics_mechanics"
  const phase1Rating = phase1Ratings[subjectId] || 0;
  
  // 2. Calculate score locally
  const score = (phase1Rating * 0.4) + (phase2Rating * 0.6);
  
  // 3. Save both to Firebase
  const updates = {};
  updates[`phase2/ratings/${subId}`] = phase2Rating;
  updates[`phase2/calculated_scores/${subId}`] = score;
  updates[`phase2/timestamp`] = Date.now();
  
  await update(ref(db, `users/${userId}`), updates);
};
```

---

### 3.2 When User Changes One Phase 2 Rating, Recalculate All 32?

**Answer: YES, but only the affected item + recache**

**Why recalculate all?**
- Actually only ONE item changes (the one user just rated)
- But you need to re-sort all 32 to show correct ranking

**Implementation - Debounced Batch Update:**
```javascript
const [scores, setScores] = useState({});
const [saveQueue, setSaveQueue] = useState({});
const saveTimerRef = useRef(null);

const handlePhase2RatingChange = (subId, phase2Rating) => {
  // 1. Update local state immediately
  const subjectId = extractSubjectId(subId);
  const phase1 = phase1Ratings[subjectId] || 0;
  const newScore = (phase1 * 0.4) + (phase2Rating * 0.6);
  
  setScores(prev => ({
    ...prev,
    [subId]: newScore
  }));
  
  // 2. Queue for Firebase save (debounced)
  setSaveQueue(prev => ({
    ...prev,
    [subId]: { phase2Rating, score: newScore }
  }));
  
  // 3. Clear existing timer
  if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
  
  // 4. Debounce: save after 500ms of inactivity
  saveTimerRef.current = setTimeout(async () => {
    const updates = {};
    Object.entries(saveQueue).forEach(([subId, { phase2Rating, score }]) => {
      updates[`phase2/ratings/${subId}`] = phase2Rating;
      updates[`phase2/calculated_scores/${subId}`] = score;
    });
    updates[`phase2/timestamp`] = Date.now();
    
    await update(ref(db, `users/${userId}`), updates);
    setSaveQueue({});
  }, 500);
};
```

**Performance Impact:**
- Re-sort 32 items: < 1ms (JavaScript array sort)
- Re-render UI: < 100ms (React reconciliation)
- Firebase write: ~100-500ms network
- **Total time to see updated ranking: < 600ms**

**Gotcha: useMemo to prevent re-sorting on every render**
```javascript
// DON'T DO THIS (re-sorts on every render):
const sortedScores = scores
  .sort((a, b) => b.score - a.score);

// DO THIS (only re-sorts when scores change):
const sortedScores = useMemo(() => {
  return Object.entries(scores)
    .map(([subId, score]) => ({ subId, score }))
    .sort((a, b) => b.score - a.score);
}, [scores]);
```

---

### 3.3 Risk of useMemo Thrashing or Stale Closures?

**Answer: LOW RISK with correct implementation, but watch these patterns**

**Anti-Pattern 1: Closure over stale phase1Ratings**
```javascript
// WRONG: phase1Ratings in closure is stale
useEffect(() => {
  const calculateScore = (subId, phase2Rating) => {
    const subjectId = extractSubjectId(subId);
    const phase1 = phase1Ratings[subjectId]; // ← STALE if phase1Ratings not in dependency
    return (phase1 * 0.4) + (phase2Rating * 0.6);
  };
  
  // ... use calculateScore
}, []); // ← Missing dependency!
```

**CORRECT: Include all dependencies**
```javascript
// RIGHT: Add to dependency array
useEffect(() => {
  const calculateScore = (subId, phase2Rating) => {
    const subjectId = extractSubjectId(subId);
    const phase1 = phase1Ratings[subjectId];
    return (phase1 * 0.4) + (phase2Rating * 0.6);
  };
  
  // ... use calculateScore
}, [phase1Ratings]); // ← Include dependency
```

**Anti-Pattern 2: useMemo with inline dependency object**
```javascript
// WRONG: Creates new object on every render
const sortedScores = useMemo(() => {
  return scores.sort((a, b) => b.score - a.score);
}, [{ someConfig }]); // ← Object reference changes every render!
```

**CORRECT: Use stable dependencies**
```javascript
const sortedScores = useMemo(() => {
  return Object.entries(scores)
    .map(([subId, score]) => ({ subId, score }))
    .sort((a, b) => b.score - a.score);
}, [scores]); // ← scores is stable
```

**Anti-Pattern 3: Callback inside useMemo causing re-renders**
```javascript
// WRONG: Callback changes on every render
const handleRatingChange = (subId, rating) => {
  const score = (phase1 * 0.4) + (rating * 0.6);
  // ...
};

const memoizedList = useMemo(() => {
  return scores.map(s => (
    <SubcategoryCard
      onChange={handleRatingChange} // ← New function every render
    />
  ));
}, [scores]); // ← handleRatingChange not in deps, but used in JSX
```

**CORRECT: useCallback for callbacks**
```javascript
const handleRatingChange = useCallback((subId, rating) => {
  const subjectId = extractSubjectId(subId);
  const phase1 = phase1Ratings[subjectId] || 0;
  const score = (phase1 * 0.4) + (rating * 0.6);
  // ...
}, [phase1Ratings]);

const memoizedList = useMemo(() => {
  return scores.map(s => (
    <SubcategoryCard
      onChange={handleRatingChange}
    />
  ));
}, [scores, handleRatingChange]);
```

**Safe Pattern for Phase 2:**
```javascript
const PhaseTwo = ({ phase1Ratings }) => {
  const [phase2Ratings, setPhase2Ratings] = useState({});
  const [scores, setScores] = useState({});
  
  // 1. Calculate scores whenever phase1 or phase2 change
  const allScores = useMemo(() => {
    return Object.entries(phase2Ratings)
      .reduce((acc, [subId, phase2Rating]) => {
        const subjectId = extractSubjectId(subId);
        const phase1 = phase1Ratings[subjectId] || 0;
        acc[subId] = (phase1 * 0.4) + (phase2Rating * 0.6);
        return acc;
      }, {});
  }, [phase2Ratings, phase1Ratings]); // ← Both dependencies
  
  // 2. Sort scores for display
  const sortedScores = useMemo(() => {
    return Object.entries(allScores)
      .map(([subId, score]) => ({ subId, score }))
      .sort((a, b) => b.score - a.score);
  }, [allScores]); // ← Only depends on allScores
  
  // 3. Handler with proper dependencies
  const handleRatingChange = useCallback((subId, phase2Rating) => {
    setPhase2Ratings(prev => ({
      ...prev,
      [subId]: phase2Rating
    }));
  }, []);
  
  return (
    // Render sortedScores and handleRatingChange
  );
};
```

---

## 4. HANDLING PARTIAL PHASE 2 COMPLETION

### 4.1 User Only Rates 5 of 32 Subcategories

**Recommended Approach: Show Partial Results Honestly**

```javascript
const getPhase2Results = (phase2Ratings, phase1Ratings) => {
  const scoredItems = Object.entries(phase2Ratings)
    .map(([subId, phase2Rating]) => {
      const subjectId = extractSubjectId(subId);
      const phase1 = phase1Ratings[subjectId] || 0;
      return {
        subId,
        phase1,
        phase2: phase2Rating,
        score: (phase1 * 0.4) + (phase2Rating * 0.6)
      };
    })
    .sort((a, b) => b.score - a.score);
  
  return {
    scored: scoredItems,
    unrated: getAllSubcategories().filter(
      sub => !phase2Ratings[sub.id]
    ),
    completionPercentage: Math.round(
      (scoredItems.length / 32) * 100
    )
  };
};

// Usage:
const { scored, unrated, completionPercentage } = getPhase2Results(
  phase2Ratings,
  phase1Ratings
);

// scored.length = 5
// unrated.length = 27
// completionPercentage = 15%
```

---

### 4.2 Results Display for Partial Completion

**DO: Show "Your Top Matches" + "Explore Next"**
```jsx
<div className="results-container">
  <h2>Your Top Matches ({scored.length} rated)</h2>
  {scored.length > 0 ? (
    <div className="results-grid">
      {scored.slice(0, 20).map((item, idx) => (
        <ResultCard key={item.subId} rank={idx + 1} item={item} />
      ))}
    </div>
  ) : (
    <p className="text-gray-500">Rate some subcategories to see your matches.</p>
  )}
  
  <div className="progress-bar">
    <div className="progress-fill" style={{ width: `${completionPercentage}%` }} />
  </div>
  <p className="text-sm text-gray-600">
    {scored.length}/32 rated ({completionPercentage}%)
  </p>
  
  {unrated.length > 0 && (
    <>
      <h3 className="mt-8 mb-4">Explore These Next</h3>
      <div className="unrated-grid">
        {unrated.slice(0, 10).map(sub => (
          <UnratedCard key={sub.id} sub={sub} />
        ))}
      </div>
      <button onClick={scrollToTab(unrated[0].subjectId)}>
        Rate more subcategories
      </button>
    </>
  )}
</div>
```

---

### 4.3 Should Results Show "Top 20" When Only 5 Are Rated?

**NO - Update messaging dynamically**

**Messaging Rules:**
```javascript
const getResultsMessage = (completionPercentage, scoredCount) => {
  if (completionPercentage === 100) {
    return `Your Top ${Math.min(scoredCount, 20)} Matches`;
  } else if (scoredCount === 0) {
    return 'No matches yet—rate some subcategories above';
  } else if (scoredCount < 10) {
    return `Your Top Matches (${scoredCount} rated)`;
  } else {
    return `Your Top ${Math.min(scoredCount, 20)} Matches (${completionPercentage}% complete)`;
  }
};

// Examples:
getResultsMessage(100, 32) // "Your Top 20 Matches"
getResultsMessage(15, 5)   // "Your Top Matches (5 rated)"
getResultsMessage(50, 16)  // "Your Top 16 Matches (50% complete)"
```

---

### 4.4 Do Unrated Subcategories Appear in Results or Not?

**Answer: Separate section, not in ranked results**

**Data Structure:**
```javascript
{
  rankedMatches: [
    { subId: 'tech_software', score: 8.2 },
    { subId: 'art_digital', score: 8.0 },
    // ... (only items with phase2 > 0)
  ],
  unratedOptions: [
    { subId: 'physics_quantum', description: '...' },
    { subId: 'history_ancient', description: '...' },
    // ... (items where phase2Ratings[subId] is undefined)
  ]
}
```

**Gotcha: If user rates all 32, don't show "Explore These Next"**
```javascript
{unratedOptions.length > 0 && (
  <div className="explore-section">
    <h3>Continue Exploring</h3>
    {/* Show unrated items */}
  </div>
)}

// When unratedOptions.length === 0, section is hidden
```

---

## 5. DATA VALIDATION

### 5.1 Invalid Firebase Data (rating > 10, negative, NaN)

**Implement Strict Validation on Every Load**

```javascript
const isValidRating = (value) => {
  // Must be a number, between 0-10 inclusive
  if (typeof value !== 'number') return false;
  if (isNaN(value)) return false;
  if (value < 0 || value > 10) return false;
  return true;
};

const validatePhase1Ratings = (data) => {
  if (!data || typeof data !== 'object') return {};
  
  return Object.fromEntries(
    Object.entries(data)
      .filter(([key, value]) => {
        if (!isValidRating(value)) {
          console.warn(`Invalid Phase 1 rating: ${key}=${value}`);
          return false;
        }
        return true;
      })
  );
};

const validatePhase2Ratings = (data) => {
  if (!data || typeof data !== 'object') return {};
  
  return Object.fromEntries(
    Object.entries(data)
      .filter(([subId, phase2Value]) => {
        if (!isValidRating(phase2Value)) {
          console.warn(`Invalid Phase 2 rating: ${subId}=${phase2Value}`);
          return false;
        }
        return true;
      })
  );
};

// Usage in load function:
const loadPhase2 = async (userId) => {
  try {
    const p1Ref = ref(db, `users/${userId}/phase1/ratings`);
    const p1Snap = await get(p1Ref);
    const phase1 = validatePhase1Ratings(p1Snap.val());
    
    const p2Ref = ref(db, `users/${userId}/phase2/ratings`);
    const p2Snap = await get(p2Ref);
    const phase2 = validatePhase2Ratings(p2Snap.val());
    
    return { phase1, phase2 };
  } catch (err) {
    console.error('Load error:', err);
    return { phase1: {}, phase2: {} };
  }
};
```

---

### 5.2 Handling Corruption (Missing Subcategory Definitions)

**Scenario:** Firebase has a rating for `physics_unknown_field` which doesn't exist in SUBCATEGORIES_DEFINED.

**Approach: Silent Filtering**
```javascript
const VALID_SUBCATEGORIES = {
  physics_mechanics: { ... },
  physics_astronomy: { ... },
  art_digital: { ... },
  // ... (all 32)
};

const validatePhase2AgainstDefinitions = (phase2Ratings) => {
  return Object.fromEntries(
    Object.entries(phase2Ratings)
      .filter(([subId, rating]) => {
        if (!VALID_SUBCATEGORIES[subId]) {
          console.warn(`Unknown subcategory: ${subId}`);
          return false;
        }
        if (!isValidRating(rating)) {
          console.warn(`Invalid rating for ${subId}: ${rating}`);
          return false;
        }
        return true;
      })
  );
};
```

**Benefit:** Handles schema changes gracefully
- User upgraded app but old data has obsolete subcategories
- Old subcategories are silently filtered
- New subcategories are initialized as unrated
- No crashes, no data loss

---

### 5.3 Should You Validate Phase 1 When Calculating Phase 2 Scores?

**YES - Always validate before using**

```javascript
// WRONG: Trusts phase1Ratings implicitly
const calculateScore = (subId, phase2Rating) => {
  const phase1 = phase1Ratings[extractSubjectId(subId)];
  return (phase1 * 0.4) + (phase2Rating * 0.6); // ← NaN if phase1 undefined
};

// RIGHT: Validate before use
const calculateScore = (subId, phase2Rating) => {
  const subjectId = extractSubjectId(subId);
  const phase1Raw = phase1Ratings[subjectId];
  
  // Validate phase1
  if (!isValidRating(phase1Raw)) {
    console.warn(`Invalid Phase 1 for ${subjectId}: ${phase1Raw}`);
    return phase2Rating; // Fall back to Phase 2 only
  }
  
  // Validate phase2
  if (!isValidRating(phase2Rating)) {
    console.warn(`Invalid Phase 2 for ${subId}: ${phase2Rating}`);
    return 0;
  }
  
  return (phase1Raw * 0.4) + (phase2Rating * 0.6);
};
```

**Test Case:**
```javascript
// Corrupted data
const corruptedPhase1 = {
  physics: NaN,
  chemistry: 999,
  biology: "high",
  history: 5
};

const phase2 = { physics_mechanics: 8 };

// Graceful handling:
calculateScore('physics_mechanics', phase2.physics_mechanics);
// Returns: 8.0 (Phase 2 only, Phase 1 treated as 0)
```

---

## 6. HANDLING RANKING TIES

### 6.1 Two Subcategories with Identical Scores (e.g., both 8.65)

**Recommended Approach: Stable Sort by Phase 2 Rating (Primary Tiebreaker)**

```javascript
const sortByScoreWithTiebreaker = (items) => {
  return items.sort((a, b) => {
    // Primary: sort by calculated score (descending)
    if (Math.abs(a.score - b.score) > 0.0001) {
      return b.score - a.score;
    }
    
    // Tiebreaker 1: Phase 2 rating (higher Phase 2 = more specific interest)
    if (a.phase2 !== b.phase2) {
      return b.phase2 - a.phase2;
    }
    
    // Tiebreaker 2: Phase 1 rating (higher Phase 1 = broader interest)
    if (a.phase1 !== b.phase1) {
      return b.phase1 - a.phase1;
    }
    
    // Tiebreaker 3: Stable order (save order)
    return a.savedOrder - b.savedOrder;
  });
};

// Example with ties:
const items = [
  { subId: 'A', phase1: 7, phase2: 8, score: 7.6, savedOrder: 1 },
  { subId: 'B', phase1: 8, phase2: 7, score: 7.6, savedOrder: 2 }, // Tie
  { subId: 'C', phase1: 9, phase2: 6, score: 7.2, savedOrder: 3 },
];

sortByScoreWithTiebreaker(items);
// Result: [
//   { subId: 'A', ... score: 7.6 }, // Phase 2 is 8 > B's 7, so A wins
//   { subId: 'B', ... score: 7.6 }, // Phase 2 is 7, lower
//   { subId: 'C', ... score: 7.2 },
// ]
```

**Why Phase 2 as Primary Tiebreaker?**
- Phase 2 rating is the specific interest the user just expressed
- If tied (7.6), user who rated Phase 2 = 8 is more interested in this specific thing
- Phase 1 = 7 + Phase 2 = 8 → more specific than Phase 1 = 8 + Phase 2 = 7

**Example Reasoning:**
```
Tie case: Both score 8.0
  Item A: Physics (7) + Mechanics (8.5) = (7×0.4) + (8.5×0.6) = 8.0
  Item B: Physics (8) + Mechanics (8.0) = (8×0.4) + (8.0×0.6) = 8.0

User perspective: "Both are 8.0, which do I prefer?"
  A: I specifically rated Mechanics 8.5 (high specific interest)
  B: I rated Physics 8 broadly, but Mechanics only 8.0

Decision: A should rank higher (8.5 vs 8.0 Phase 2 rating)
```

---

### 6.2 Should You Have a Tiebreaker?

**YES - Here's why**
```javascript
// Without tiebreaker (stable sort by save order):
const unsorted = [
  { name: 'Math - Applied', score: 7.4, savedAt: 5 },
  { name: 'Chemistry - Org', score: 7.4, savedAt: 2 },
  { name: 'Physics - Mech', score: 7.4, savedAt: 8 },
];

unsorted.sort((a, b) => b.score - a.score);
// Result depends on JavaScript engine's sort stability (unreliable)
// Different browsers might order differently

// With tiebreaker (Phase 2 rating):
const sorted = unsorted
  .map(item => ({ ...item, phase2: phase2Ratings[item.id] }))
  .sort((a, b) => {
    if (Math.abs(a.score - b.score) > 0.0001) {
      return b.score - a.score;
    }
    return b.phase2 - a.phase2; // Phase 2 rating tiebreaker
  });

// Result: Consistent across browsers, meaningful ordering
```

---

### 6.3 Implementation: Add Saved Order for Stability

```javascript
const loadAndEnrichPhase2 = async (userId) => {
  const phase2Ratings = await loadPhase2Ratings(userId);
  const phase1Ratings = await loadPhase1Ratings(userId);
  
  // Enrich with meta-data for sorting
  const enrichedScores = Object.entries(phase2Ratings)
    .map(([subId, phase2Rating], index) => {
      const subjectId = extractSubjectId(subId);
      const phase1 = phase1Ratings[subjectId] || 0;
      const score = (phase1 * 0.4) + (phase2Rating * 0.6);
      
      return {
        subId,
        subjectId,
        phase1,
        phase2: phase2Rating,
        score,
        displayScore: formatScore(score),
        savedOrder: index // Order they appear in Firebase (stable)
      };
    });
  
  // Sort with tiebreaker
  return enrichedScores.sort((a, b) => {
    if (Math.abs(a.score - b.score) > 0.0001) {
      return b.score - a.score;
    }
    if (a.phase2 !== b.phase2) {
      return b.phase2 - a.phase2;
    }
    if (a.phase1 !== b.phase1) {
      return b.phase1 - a.phase1;
    }
    return a.savedOrder - b.savedOrder;
  });
};
```

---

## 7. REUSE FOR PHASE 3+

### 7.1 Will Phase 3 Careers Be Matched to Subcategories by IDs?

**YES - Careers reference subcategory IDs directly**

**Phase 3 Career Profile Structure:**
```javascript
const CAREERS = [
  {
    id: 'mechanical_engineer',
    title: 'Mechanical Engineer',
    description: '...',
    requirements: [
      { subcategoryId: 'physics_mechanics', weight: 0.95 },
      { subcategoryId: 'mathematics_applied', weight: 0.85 },
      { subcategoryId: 'technology_systems', weight: 0.60 },
    ]
  },
  {
    id: 'ui_ux_designer',
    title: 'UI/UX Designer',
    requirements: [
      { subcategoryId: 'art_design_digital', weight: 0.95 },
      { subcategoryId: 'technology_web', weight: 0.75 },
      { subcategoryId: 'mathematics_discrete', weight: 0.40 },
    ]
  },
  // ... 50-100 careers
];

// In Phase 3: Match careers to Phase 2 scores
const phase2Scores = {
  physics_mechanics: 8.4,
  art_design_digital: 8.9,
  technology_web: 8.6,
  // ... (all rated items)
};

const careerMatches = CAREERS.map(career => {
  let totalScore = 0;
  let matchCount = 0;
  
  for (const req of career.requirements) {
    const phase2Score = phase2Scores[req.subcategoryId] || 0;
    totalScore += (phase2Score * req.weight);
    if (phase2Score > 0) matchCount++;
  }
  
  return {
    careerId: career.id,
    title: career.title,
    matchScore: totalScore / career.requirements.length,
    coverage: matchCount / career.requirements.length
  };
});
```

---

### 7.2 Should Scoring Functions Support Generic Weighting?

**YES - Extract weights to constants for reuse**

```javascript
// src/utils/scoring.js

export const SCORING_WEIGHTS = {
  phase1_to_phase2: {
    phase1: 0.4,
    phase2: 0.6,
  },
  phase2_to_career: {
    // Used in Phase 3: each career's requirement has its own weight
    // E.g., mechanical engineer weights: physics_mechanics 0.95, math 0.85
  }
};

// Generic scoring function
export const calculateWeightedScore = (values, weights) => {
  let total = 0;
  Object.entries(weights).forEach(([key, weight]) => {
    total += (values[key] || 0) * weight;
  });
  return total;
};

// Phase 2 usage
export const calculatePhase2Score = (phase1Rating, phase2Rating) => {
  return calculateWeightedScore(
    { phase1: phase1Rating, phase2: phase2Rating },
    SCORING_WEIGHTS.phase1_to_phase2
  );
};

// Phase 3 usage (same generic function)
export const calculateCareerMatch = (requirements, phase2Scores) => {
  const requirementWeights = Object.fromEntries(
    requirements.map(req => [req.subcategoryId, req.weight])
  );
  
  const values = Object.fromEntries(
    requirements.map(req => [
      req.subcategoryId,
      phase2Scores[req.subcategoryId] || 0
    ])
  );
  
  return calculateWeightedScore(values, requirementWeights);
};
```

**Test:**
```javascript
import { calculatePhase2Score, calculateCareerMatch } from './scoring';

// Phase 2
const p2Score = calculatePhase2Score(8, 9);
// = (8 * 0.4) + (9 * 0.6) = 8.6

// Phase 3
const careerScore = calculateCareerMatch(
  [
    { subcategoryId: 'physics_mechanics', weight: 0.95 },
    { subcategoryId: 'math_applied', weight: 0.85 },
    { subcategoryId: 'tech_systems', weight: 0.60 },
  ],
  {
    physics_mechanics: 8.4,
    math_applied: 6.8,
    tech_systems: 5.0,
  }
);
// = ((8.4*0.95) + (6.8*0.85) + (5.0*0.60)) / 3
```

---

### 7.3 Foresight for Phase 4+

**Build to support variable-length career chains**

```javascript
// Future-proof schema for Phases 4+
{
  user/{userId}/
    phase1/
      ratings: { subject: rating, ... }
      timestamp: ms
    phase2/
      ratings: { subcategory: rating, ... }
      calculated_scores: { subcategory: score, ... }
      timestamp: ms
    phase3/  (future)
      ratings: { career: rating, ... }
      calculated_scores: { career: score, ... }
      timestamp: ms
    phase4/  (future)
      ratings: { job_listing: rating, ... }
      timestamp: ms
}

// Generic load function to support any phase
export const loadPhaseRatings = async (userId, phaseNumber) => {
  const ref = database.ref(`users/${userId}/phase${phaseNumber}/ratings`);
  const snapshot = await ref.once('value');
  return validateRatings(snapshot.val());
};

export const loadPhaseScores = async (userId, phaseNumber) => {
  const ref = database.ref(`users/${userId}/phase${phaseNumber}/calculated_scores`);
  const snapshot = await ref.once('value');
  return snapshot.val() || {};
};
```

---

## 8. TESTING STRATEGY

### 8.1 Critical Unit Tests for Scoring Algorithm

```javascript
// __tests__/scoring.test.js

import { calculatePhase2Score, isValidRating, sortByScore } from '../utils/scoring';

describe('Phase 2 Scoring', () => {
  
  // Test the basic formula
  describe('calculatePhase2Score', () => {
    it('should calculate 40/60 weighting correctly', () => {
      expect(calculatePhase2Score(8, 9)).toBeCloseTo(8.6, 1);
      expect(calculatePhase2Score(5, 8)).toBeCloseTo(6.8, 1);
    });
    
    it('should handle missing Phase 1 rating', () => {
      expect(calculatePhase2Score(undefined, 8)).toBeCloseTo(4.8, 1);
      expect(calculatePhase2Score(0, 8)).toBeCloseTo(4.8, 1);
    });
    
    it('should handle missing Phase 2 rating', () => {
      expect(calculatePhase2Score(8, 0)).toBeCloseTo(3.2, 1);
      expect(calculatePhase2Score(8, undefined)).toBeCloseTo(3.2, 1);
    });
    
    it('should support discovery case: low Phase 1, high Phase 2', () => {
      const score = calculatePhase2Score(3, 9);
      expect(score).toBeCloseTo(6.6, 1);
      // Should be rankable in top 20 of 32 (top 63%)
      expect(score).toBeGreaterThan(5.0);
    });
    
    it('should return 0 when both ratings are 0', () => {
      expect(calculatePhase2Score(0, 0)).toBe(0);
    });
    
    it('should cap at 10 when both ratings are 10', () => {
      expect(calculatePhase2Score(10, 10)).toBe(10);
    });
  });
  
  // Test validation
  describe('isValidRating', () => {
    it('should accept integers 0-10', () => {
      expect(isValidRating(0)).toBe(true);
      expect(isValidRating(5)).toBe(true);
      expect(isValidRating(10)).toBe(true);
    });
    
    it('should accept decimals 0-10', () => {
      expect(isValidRating(5.5)).toBe(true);
      expect(isValidRating(8.99)).toBe(true);
    });
    
    it('should reject negative numbers', () => {
      expect(isValidRating(-1)).toBe(false);
      expect(isValidRating(-0.1)).toBe(false);
    });
    
    it('should reject > 10', () => {
      expect(isValidRating(10.1)).toBe(false);
      expect(isValidRating(11)).toBe(false);
    });
    
    it('should reject non-numbers', () => {
      expect(isValidRating('5')).toBe(false);
      expect(isValidRating(null)).toBe(false);
      expect(isValidRating(undefined)).toBe(false);
      expect(isValidRating(NaN)).toBe(false);
    });
  });
  
  // Test ranking/sorting
  describe('sortByScore', () => {
    it('should sort by score descending', () => {
      const items = [
        { id: 'a', phase1: 5, phase2: 8, score: 6.8 },
        { id: 'b', phase1: 8, phase2: 9, score: 8.6 },
        { id: 'c', phase1: 3, phase2: 9, score: 6.6 },
      ];
      
      const sorted = sortByScore(items);
      expect(sorted[0].id).toBe('b');
      expect(sorted[1].id).toBe('a');
      expect(sorted[2].id).toBe('c');
    });
    
    it('should handle ties with Phase 2 tiebreaker', () => {
      const items = [
        { id: 'a', phase1: 7, phase2: 8, score: 7.6, savedOrder: 1 },
        { id: 'b', phase1: 8, phase2: 7, score: 7.6, savedOrder: 2 },
      ];
      
      const sorted = sortByScore(items);
      // A should rank higher (higher phase2: 8 vs 7)
      expect(sorted[0].id).toBe('a');
      expect(sorted[1].id).toBe('b');
    });
    
    it('should handle multiple tiebreakers', () => {
      const items = [
        { id: 'a', phase1: 8, phase2: 8, score: 8.0, savedOrder: 2 },
        { id: 'b', phase1: 8, phase2: 8, score: 8.0, savedOrder: 1 },
        { id: 'c', phase1: 7, phase2: 8, score: 7.6, savedOrder: 3 },
      ];
      
      const sorted = sortByScore(items);
      // A and B tie on score and phase2, but B saved first
      expect(sorted[0].id).toBe('b');
      expect(sorted[1].id).toBe('a');
      expect(sorted[2].id).toBe('c');
    });
  });
  
  // Test precision/rounding
  describe('formatScore', () => {
    it('should round to 1 decimal', () => {
      expect(formatScore(8.35999)).toBe(8.4);
      expect(formatScore(8.34999)).toBe(8.3);
      expect(formatScore(8.0)).toBe(8.0);
    });
    
    it('should not lose ranking precision internally', () => {
      const a = calculatePhase2Score(5, 9);
      const b = calculatePhase2Score(6, 8);
      
      // Internal: 5.4 vs 5.2
      expect(a).toBeGreaterThan(b);
      
      // Displayed: both round to 5.4 and 5.2 respectively
      expect(formatScore(a)).toBe(5.4);
      expect(formatScore(b)).toBe(5.2);
    });
  });
  
  // Integration test: phase2 scores with real subcategories
  describe('Integration: Phase2 Results', () => {
    const phase1Ratings = {
      physics: 8,
      art_design: 9,
      technology_computing: 9,
    };
    
    const phase2Ratings = {
      physics_mechanics: 8,
      physics_astronomy: 6,
      art_design_visual: 9,
      art_design_digital: 9,
      technology_software: 7,
      technology_web: 9,
    };
    
    it('should rank top matches correctly', () => {
      const results = calculatePhase2Results(
        phase1Ratings,
        phase2Ratings
      );
      
      // Expected ranking:
      // 1. art_design_digital: (9×0.4) + (9×0.6) = 9.0
      // 2. technology_web: (9×0.4) + (9×0.6) = 9.0
      // 3. art_design_visual: (9×0.4) + (9×0.6) = 9.0
      // (tie on score, should use phase2 tiebreaker if equal)
      // 4. physics_mechanics: (8×0.4) + (8×0.6) = 8.0
      // 5. technology_software: (9×0.4) + (7×0.6) = 8.2
      // 6. physics_astronomy: (8×0.4) + (6×0.6) = 6.8
      
      expect(results[0].displayScore).toBe(9.0);
      expect(results[1].displayScore).toBe(9.0);
      expect(results[2].displayScore).toBe(9.0);
      expect(results[3].displayScore).toBe(8.2);
      expect(results[4].displayScore).toBe(8.0);
      expect(results[5].displayScore).toBe(6.8);
    });
    
    it('should handle partial Phase 2 completion', () => {
      const partialPhase2 = {
        physics_mechanics: 8,
        art_design_digital: 9,
      };
      
      const results = calculatePhase2Results(
        phase1Ratings,
        partialPhase2
      );
      
      // Only 2 items scored
      expect(results.length).toBe(2);
    });
  });
});
```

---

### 8.2 Edge Cases to Unit Test Before Deploying

**Critical tests:**
```javascript
describe('Edge Cases', () => {
  
  // Corruption handling
  it('should filter out invalid Phase 1 ratings', () => {
    const corrupted = {
      physics: 8,
      chemistry: NaN,
      biology: 999,
      history: 'high',
      math: undefined,
    };
    
    const valid = validatePhase1(corrupted);
    expect(valid).toEqual({ physics: 8 });
  });
  
  // Firebase load failure
  it('should return empty object if Phase 2 load fails', async () => {
    // Mock Firebase error
    const result = await loadPhase2WithFallback(userId, 'network_error');
    expect(result).toEqual({});
    expect(result).not.toThrow();
  });
  
  // Very skewed ratings
  it('should still rank items if all ratings identical', () => {
    const allTen = {
      physics_mechanics: 10,
      physics_astronomy: 10,
      art_digital: 10,
    };
    
    const results = calculatePhase2Results(
      { physics: 10, art_design: 10 },
      allTen
    );
    
    // All score 10.0, but order is stable
    expect(results.length).toBe(3);
    expect(results.every(r => r.score === 10.0)).toBe(true);
  });
  
  // Partial completion
  it('should show correct message for partial Phase 2', () => {
    const results = calculatePhase2Results(
      { physics: 8, art_design: 9 },
      { physics_mechanics: 8 } // Only 1 of 32
    );
    
    expect(results.completionPercentage).toBe(3); // 1/32 ≈ 3%
    expect(results.message).toMatch(/1 rated/);
  });
  
  // Scoring precision doesn't flip ranking
  it('should rank correctly despite rounding', () => {
    // Two items with very close scores
    const a = calculatePhase2Score(6.1, 8.6); // 7.46
    const b = calculatePhase2Score(6.2, 8.5); // 7.48
    
    const sorted = [
      { id: 'a', score: a, displayScore: formatScore(a) },
      { id: 'b', score: b, displayScore: formatScore(b) },
    ].sort((x, y) => y.score - x.score);
    
    // B should be first (higher true score)
    expect(sorted[0].id).toBe('b');
    
    // But both might display as 7.5
    expect(formatScore(a)).toBe(7.5);
    expect(formatScore(b)).toBe(7.5);
    // ← This is OK because we sort by internal score, not displayScore
  });
});
```

---

### 8.3 Integration Tests Before Phase 3

```javascript
describe('Phase 2 → Phase 3 Integration', () => {
  it('should save calculated_scores in Firebase for Phase 3 consumption', async () => {
    const userId = 'test-user';
    const phase2Ratings = {
      physics_mechanics: 8,
      art_digital: 9,
    };
    
    await savePhase2WithCalculatedScores(userId, phase2Ratings, phase1Ratings);
    
    // Verify in Firebase:
    // users/test-user/phase2/ratings/physics_mechanics = 8
    // users/test-user/phase2/calculated_scores/physics_mechanics = 8.0
    // users/test-user/phase2/calculated_scores/art_digital = 8.6 or similar
    
    const scores = await loadCalculatedScores(userId);
    expect(scores.physics_mechanics).toBeDefined();
    expect(scores.art_digital).toBeDefined();
  });
  
  it('should load Phase 2 scores for Phase 3 career matching', async () => {
    const phase2Scores = await loadCalculatedScores(userId);
    
    // Phase 3 should be able to use these scores directly
    const careerMatch = calculateCareerMatch(
      mechanicalEngineerRequirements,
      phase2Scores
    );
    
    expect(careerMatch).toBeGreaterThan(0);
    expect(careerMatch).toBeLessThanOrEqual(10);
  });
});
```

---

## SUMMARY TABLE: Questions & Answers

| Question | Answer | Key Implementation |
|----------|--------|-------------------|
| **Phase 1 missing/0?** | Treat as 0, don't impute | `(phase1 \|\| 0) * 0.4` |
| **Phase 2 = 0 or unrated?** | Exclude from results | `filter(sub => phase2Ratings[sub.id] > 0)` |
| **Unrated in scoring pool?** | NO, exclude entirely | Only rank rated items |
| **Firebase load fails?** | Graceful degradation | Use Phase 2 only, show warning |
| **Precision: storage?** | Full precision always | Store as JavaScript Number |
| **Precision: display?** | Round to 1 decimal | `formatScore(score.toFixed(1))` |
| **Precision matters?** | Only for sorting | Sort by internal score, display rounded |
| **Cache or recalculate?** | Cache in Firebase for Phase 3 | Store in `calculated_scores/` |
| **Recalc all 32 on change?** | Yes, but only 1 changes | Debounce 500ms, batch updates |
| **useMemo thrashing?** | Low risk if deps correct | Include `[phase1Ratings, phase2Ratings]` |
| **Partial Phase 2?** | Show results for rated only | Message: "Your Top Matches (5 rated)" |
| **"Top 20" if 5 rated?** | NO, update messaging | Dynamic message based on completion |
| **Unrated appear in results?** | Separate "Explore Next" | Two sections: scored + unrated |
| **Invalid Firebase data?** | Validate on load | Filter NaN, <0, >10 entries |
| **Missing subcategories?** | Silent filter | Filter unknown IDs before calc |
| **Validate Phase 1 in Phase 2?** | YES, always validate | Check before use |
| **Ties: how break?** | Phase 2 rating primary | `sort((a,b) => b.phase2 - a.phase2)` |
| **Have tiebreaker?** | YES, needed | Multiple levels: score → p2 → p1 → order |
| **Phase 3 reference subcats?** | By subcategoryId | `{ subcategoryId: 'physics_mechanics', ... }` |
| **Generic weighting?** | YES, extract to constants | `SCORING_WEIGHTS.phase1_to_phase2` |
| **Foresight Phase 4+?** | Build variable-phase schema | `loadPhaseRatings(userId, phaseNumber)` |
| **Critical tests?** | 8 main areas + integration | Validation, precision, ties, partial |

---

## CODE TEMPLATE: Ready-to-Implement Scoring Module

```javascript
// src/utils/scoring.js

export const SCORING_WEIGHTS = {
  phase1_to_phase2: { phase1: 0.4, phase2: 0.6 }
};

const EPSILON = 0.0001; // For float comparison

// Validation
export const isValidRating = (value) => {
  return typeof value === 'number' && !isNaN(value) && value >= 0 && value <= 10;
};

export const validatePhase1Ratings = (data) => {
  if (!data || typeof data !== 'object') return {};
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => isValidRating(v))
  );
};

export const validatePhase2Ratings = (data) => {
  if (!data || typeof data !== 'object') return {};
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => isValidRating(v))
  );
};

// Scoring
export const calculatePhase2Score = (phase1Rating, phase2Rating) => {
  const p1 = isValidRating(phase1Rating) ? phase1Rating : 0;
  const p2 = isValidRating(phase2Rating) ? phase2Rating : 0;
  return (p1 * SCORING_WEIGHTS.phase1_to_phase2.phase1) +
         (p2 * SCORING_WEIGHTS.phase1_to_phase2.phase2);
};

export const formatScore = (score) => {
  return Math.round(score * 10) / 10;
};

// Sorting with tiebreakers
export const sortByScoreWithTiebreaker = (items) => {
  return items.sort((a, b) => {
    // Primary: score
    if (Math.abs(a.score - b.score) > EPSILON) {
      return b.score - a.score;
    }
    // Tiebreaker 1: Phase 2
    if (a.phase2 !== b.phase2) {
      return b.phase2 - a.phase2;
    }
    // Tiebreaker 2: Phase 1
    if (a.phase1 !== b.phase1) {
      return b.phase1 - a.phase1;
    }
    // Tiebreaker 3: Save order
    return a.savedOrder - b.savedOrder;
  });
};

// Main calculation function
export const calculatePhase2Results = (phase1Ratings, phase2Ratings) => {
  const valid1 = validatePhase1Ratings(phase1Ratings);
  const valid2 = validatePhase2Ratings(phase2Ratings);
  
  const scored = Object.entries(valid2)
    .map(([subId, phase2], idx) => {
      const subjectId = extractSubjectId(subId);
      const phase1 = valid1[subjectId] || 0;
      const score = calculatePhase2Score(phase1, phase2);
      
      return {
        subId,
        subjectId,
        phase1,
        phase2,
        score,
        displayScore: formatScore(score),
        savedOrder: idx
      };
    });
  
  const sorted = sortByScoreWithTiebreaker(scored);
  
  return {
    results: sorted,
    count: scored.length,
    completionPercentage: Math.round((scored.length / 32) * 100),
    message: getResultsMessage(scored.length)
  };
};

const getResultsMessage = (count) => {
  if (count === 0) return 'No matches yet—rate some subcategories';
  if (count < 10) return `Your Top Matches (${count} rated)`;
  return `Your Top ${Math.min(count, 20)} Matches (${Math.round((count/32)*100)}% complete)`;
};

const extractSubjectId = (subId) => {
  // 'physics_mechanics' → 'physics'
  return subId.split('_')[0];
};
```

---

## DEPLOYMENT CHECKLIST

- [ ] Implement `scoring.js` with all validation
- [ ] Unit tests: 20+ test cases covering all edge cases
- [ ] Integration tests: Phase2Results end-to-end
- [ ] Firebase caching: Store `calculated_scores` on save
- [ ] UI messages: Dynamic completion percentage
- [ ] Error handling: Network failures, corrupted data
- [ ] Performance: useMemo for sorting, debounced saves
- [ ] Documentation: Add scoring logic comments to Phase 2 component
- [ ] Testing: Manual test with girlfriend's feedback
- [ ] Phase 3 prep: Load and verify calculated_scores work

---

**Ready to build?** Start with the scoring.js template above, then build PhaseTwo.jsx around it. The architecture supports Phase 3+ career matching with minimal changes.
