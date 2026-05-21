# Phase 3 Algorithm - Quick Reference Guide

## One-Page Summary

**Goal:** Match user's 20 Phase 2 ratings to 87 careers

**Formula:**
```
For each career:
  coverage = (# rated requirements) / (# total requirements)
  
  if coverage < 40%:  HIDDEN (show in "Explore")
  else:
    score = SUM(user_score × weight) / SUM(weights)  // 0-10 scale
    if coverage == 100%:
      score += 0.2
    score = MIN(score, 10.0)
```

**Sorting:** Score (desc) → Job Outlook (desc) → Tier (core>adv>niche) → Alphabetical

**Performance:** < 10ms ranking, < 5ms sort

---

## Quick Examples

### Example 1: Simple Case (Software Engineer)

**Career requirements:**
- technology_software: weight 0.95
- mathematics_discrete: weight 0.70
- technology_data: weight 0.40

**User scores:**
```
{
  technology_software: 9,
  mathematics_discrete: 8,
  technology_data: 5
}
```

**Calculation:**
```
Coverage = 3/3 = 100% ✓ (visible)
Score = (9×0.95 + 8×0.70 + 5×0.40) / (0.95+0.70+0.40)
      = (8.55 + 5.6 + 2.0) / 2.05
      = 16.15 / 2.05
      = 7.88
Bonus: 0.2 (100% coverage)
Final: 7.88 + 0.2 = 8.08/10
```

---

### Example 2: Partial Coverage (Nurse)

**Career requirements:**
- biology_anatomy: weight 0.90
- chemistry_biochemistry: weight 0.50
- biology_molecular: weight 0.35

**User scores:**
```
{
  biology_anatomy: 8,
  chemistry_biochemistry: 7
  // biology_molecular NOT rated
}
```

**Calculation:**
```
Coverage = 2/3 = 66.7% ✓ (visible)
Score = (8×0.90 + 7×0.50) / (0.90+0.50)
      = (7.2 + 3.5) / 1.4
      = 10.7 / 1.4
      = 7.64
Bonus: 0.0 (not 100% coverage)
Final: 7.64/10
```

---

### Example 3: Low Coverage (Hidden)

**Career requirements:**
- technology_software: weight 0.95
- mathematics_discrete: weight 0.70
- technology_data: weight 0.40

**User scores:**
```
{
  technology_software: 9
  // Other two NOT rated
}
```

**Calculation:**
```
Coverage = 1/3 = 33.3% ✗ (HIDDEN, < 40%)
Status: "explore"
Score: 0
Reason: "Only 1/3 requirements rated"
```

---

## Code Snippets for Implementation

### Minimal Implementation (50 lines)

```javascript
export function scoreCareer(career, userScores) {
  const requirements = career.requirements || [];
  let totalWeightedScore = 0, totalWeight = 0, ratedCount = 0;

  for (const { subcategoryId, weight } of requirements) {
    if (userScores[subcategoryId] !== undefined) {
      totalWeightedScore += userScores[subcategoryId] * weight;
      totalWeight += weight;
      ratedCount++;
    }
  }

  const coverage = ratedCount / requirements.length;
  
  if (coverage < 0.4) {
    return { careerId: career.id, score: 0, coverage, status: 'explore' };
  }
  
  if (ratedCount === 0) {
    return { careerId: career.id, score: 0, coverage: 0, status: 'show' };
  }

  const baseScore = totalWeightedScore / totalWeight;
  const bonus = coverage === 1.0 ? 0.2 : 0;
  const score = Math.min(baseScore + bonus, 10);

  return { careerId: career.id, score, coverage, ratedCount, status: 'show' };
}

export function rankCareers(careers, userScores) {
  const careerMap = new Map(careers.map(c => [c.id, c]));
  const scores = careers.map(c => scoreCareer(c, userScores));
  
  const visible = scores.filter(s => s.status === 'show');
  visible.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    
    const careerA = careerMap.get(a.careerId);
    const careerB = careerMap.get(b.careerId);
    const tierRank = { core: 4, advanced: 3, niche: 2, exploratory: 1 };
    
    if (tierRank[careerB.tier] !== tierRank[careerA.tier]) {
      return tierRank[careerB.tier] - tierRank[careerA.tier];
    }
    
    return a.careerId.localeCompare(b.careerId);
  });

  return {
    visible,
    explore: scores.filter(s => s.status === 'explore'),
  };
}
```

---

## Debug Checklist

**If a career scores unexpectedly low:**
1. Check coverage: `coverage = ratedCount / totalRequirements`
2. Check if < 40%: If yes, it's hidden (expected)
3. If visible, verify weights: Requirements should be >0.3
4. Calculate score manually: `SUM(score × weight) / SUM(weights)`
5. Check bonus: Was it really 100% coverage?
6. Verify tiebreakers if tied with another career

**If career is hidden but should be visible:**
1. Is coverage < 40%? If yes, that's why
2. Did you rate at least 40% of requirements?
3. For 3 requirements: need ≥2 rated (66.7%)
4. For 5 requirements: need ≥2 rated (40%)
5. For 4 requirements: need ≥2 rated (50%)

**If ordering seems wrong:**
1. Check primary sort: Is top career's score really highest?
2. Check outlook tiebreaker: "Excellent" > "Good" > "Moderate"
3. Check tier: core > advanced > niche > exploratory
4. Check alphabetical: If all tied, should be A-Z

---

## Configuration Reference

```javascript
const CONFIG = {
  MIN_COVERAGE_THRESHOLD: 0.40,  // Careers below 40% hidden
  COVERAGE_BONUS: 0.2,            // +0.2 for 100% coverage
  MAX_SCORE: 10.0,                // Score capped at 10
  
  OUTLOOK_WEIGHTS: {
    'Excellent': 4,               // Best job market
    'Strong': 3.5,
    'Good': 3,
    'Emerging': 2.5,              // New fields
    'Moderate': 2,
    'Steady': 2,
    'Competitive': 1,             // Hardest to enter
  },
  
  TIER_RANK: {
    'core': 4,                     // Most accessible
    'advanced': 3,
    'niche': 2,
    'exploratory': 1,             // Emerging fields
  },
};
```

---

## Complexity Analysis

| Operation | Complexity | Time (87 careers) |
|-----------|-----------|-------------------|
| Score single career | O(r) | <0.05ms (r=3-5) |
| Score all careers | O(n×r) | <0.5ms |
| Filter visible | O(n) | <0.1ms |
| Sort visible | O(n log n) | ~1.5ms (60-70 careers) |
| Calculate stats | O(n) | <0.5ms |
| **Total** | **O(n log n)** | **<3ms** |

---

## Test Data

### Minimal Test (1 career, 1 user score)

```javascript
const testCareer = {
  id: 'test',
  requirements: [
    { subcategoryId: 'physics_mechanics', weight: 0.5 },
    { subcategoryId: 'mathematics_geometry', weight: 0.5 }
  ]
};

const testUser = {
  physics_mechanics: 8,
  // mathematics_geometry NOT rated
};

const result = scoreCareer(testCareer, testUser);
// Expected: score = 4.0, coverage = 0.5, status = 'explore'
```

### High-Score Test (Perfect match)

```javascript
const user = {
  physics_mechanics: 10,
  mathematics_geometry: 10
};

const result = scoreCareer(testCareer, user);
// Expected: score = 10.2 (capped at 10.0), coverage = 1.0, status = 'show'
```

### Low-Score Test (Disinterest)

```javascript
const user = {
  physics_mechanics: 2,
  mathematics_geometry: 1
};

const result = scoreCareer(testCareer, user);
// Expected: score = 1.5, coverage = 1.0, status = 'show'
```

---

## Tiebreaker Examples

### Tiebreaker 1 Only (Score differs)

```
Career A: 8.5/10  ← Ranks higher
Career B: 8.4/10
```

### Tiebreaker 2 (Score tied, outlook differs)

```
Career A: 8.5/10, "Excellent (23% growth)" (weight=4)
Career B: 8.5/10, "Good (6% growth)" (weight=3)    ← Ranks lower
```

### Tiebreaker 3 (Score + outlook tied, tier differs)

```
Career A: 8.5/10, "Good", tier=core    ← Ranks higher
Career B: 8.5/10, "Good", tier=niche
```

### Tiebreaker 4 (All tied, alphabetical)

```
Career A: architect    ← Ranks higher (a < d)
Career B: designer
```

---

## Common Mistakes

### Mistake 1: Calculating score on unrated requirements

**WRONG:**
```javascript
// Including unrated requirements in denominator
score = (8×0.9 + 7×0.5) / (0.9 + 0.5 + 0.35)
      = (7.2 + 3.5) / 1.75  // 0.35 weight wrongly included
      = 10.7 / 1.75 = 6.1
```

**RIGHT:**
```javascript
// Only include rated requirements
score = (8×0.9 + 7×0.5) / (0.9 + 0.5)
      = 10.7 / 1.4 = 7.64
```

---

### Mistake 2: Applying bonus when coverage < 100%

**WRONG:**
```javascript
if (coverage > 0.5) {  // NOPE
  score += 0.2;
}
```

**RIGHT:**
```javascript
if (coverage === 1.0) {  // Exactly 100%
  score += 0.2;
}
```

---

### Mistake 3: Rescaling score when dividing by weights

**WRONG:**
```javascript
// User scores are already 0-10, don't rescale
score = (totalWeightedScore / totalWeight) * (10 / maxWeight);  // Over-scaling!
```

**RIGHT:**
```javascript
// User scores are 0-10, weights just average them
score = totalWeightedScore / totalWeight;  // Already 0-10 scale
```

---

## Performance Tips

1. **Cache career map** (O(1) lookups for tiebreakers)
   ```javascript
   const careerMap = new Map(careers.map(c => [c.id, c]));
   ```

2. **Filter before sort** (Sort smaller dataset)
   ```javascript
   const visible = allScores.filter(s => s.status === 'show');
   visible.sort(...);  // Sort ~60-70 items, not 87
   ```

3. **Reuse calculations** (Don't recalculate for display)
   ```javascript
   // Store baseScore, coverageBonus, coverage in result object
   // Use for explanation without recalculating
   ```

4. **Memoize outlook parsing** (Same outlooks for multiple careers)
   ```javascript
   const outlookCache = {};
   for (const career of careers) {
     const outlook = career.context.jobOutlook;
     outlookCache[outlook] = outlookCache[outlook] || parseOutlook(outlook);
   }
   ```

---

## User Communication

### In Results Page

**Visible Careers:**
```
Career Name: 7.8/10
Your match: You rated 3/3 required interests (100% coverage). 
            Score: 7.8/10
```

**Explore Section:**
```
Career Name: [Explore]
Your match: You rated only 1/3 required interests (33% coverage).
            Rate more interests to see full matches.
```

### In Career Detail

```
Score Breakdown:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Requirement           Your Rating  Weight  Contribution
physics_mechanics     9/10         75%     6.75 pts
mathematics_geometry  8/10         75%     6.00 pts
art_design_visual     [unrated]    75%     0.00 pts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Coverage: 2/3 (66.7%)
Base Score: 6.38/10
Coverage Bonus: 0 (need 100% for +0.2)
Final Score: 6.38/10
```

---

## API Reference

### scoreCareer(career, userScores, minCoverage?)

```javascript
scoreCareer(
  {
    id: 'software-engineer',
    requirements: [
      { subcategoryId: 'technology_software', weight: 0.95 },
      // ...
    ]
  },
  {
    technology_software: 9,
    mathematics_discrete: 8
  },
  0.40  // Optional: override min coverage threshold
)

// Returns:
{
  careerId: 'software-engineer',
  score: 8.08,
  coverage: 0.6667,
  ratedCount: 2,
  totalRequirements: 3,
  baseScore: 7.88,
  coverageBonus: 0.2,
  status: 'show',
  reason: null
}
```

### rankCareers(userScores, careersList?)

```javascript
rankCareers(
  {
    technology_software: 9,
    mathematics_discrete: 8,
    // ... up to 32 subcategories
  },
  CAREERS  // Optional: defaults to all 87 careers
)

// Returns:
{
  visible: [
    { careerId: 'software-engineer', score: 8.08, ... },
    { careerId: 'data-analyst', score: 7.94, ... },
    // ... sorted by score + tiebreakers
  ],
  explore: [
    { careerId: 'nurse', score: 0, coverage: 0.33, status: 'explore', ... },
    // ... all < 40% coverage
  ],
  stats: {
    visibleCount: 42,
    exploreCount: 45,
    averageScore: 6.2,
    maxScore: 8.08,
    // ...
  },
  userScoresCount: 8
}
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| All careers hidden | Too few interests rated | Remind user to rate more |
| Career visible but low score | Conflicting/low interests | Show "other interests to explore" |
| Wrong ranking order | Tiebreaker logic issue | Verify outlook weights, tier ranks |
| Score not matching calculation | Unrated requirements | Only include rated in SUM |
| Bonus not applied | Coverage ≠ 100% exactly | Check for off-by-one errors |

---

## Glossary

- **Coverage:** (# rated requirements) / (# total requirements)
- **Base Score:** Weighted average of user scores for rated requirements
- **Coverage Bonus:** +0.2 points if coverage = 100%
- **Final Score:** min(base + bonus, 10.0)
- **Visible:** Career with status='show' (coverage ≥ 40%, ranked)
- **Explore:** Career with status='explore' (coverage < 40%, hidden in dedicated section)
- **Weight:** Importance of requirement (0-1 scale, sum ≈ 1-3 per career)
- **Tiebreaker:** Secondary sort criterion when scores are equal
- **Tier:** Career category (core, advanced, niche, exploratory)
- **Outlook:** Job market growth/demand percentage

