# Phase 3 Decision Matrix & FAQ

Reference guide for critical Phase 3 decisions with rationale.

---

## 1. Matching Algorithm: Why Option D (Hybrid)?

### Decision: Use Hybrid Scoring (Option D) with 40% Coverage Filter

**Scoring Formula:**
```
Step 1: Coverage Check
  ratedRequirements = requirements where user has a Phase 2 rating
  coverage% = ratedRequirements.length / requirements.length
  IF coverage% < 40%: HIDE career (mark as "explorable")

Step 2: Weighted Average
  score = SUM(userRating[subcatId] × careerWeight[subcatId]) / SUM(careerWeights)
  
Step 3: Coverage Bonus
  IF coverage% == 100%: score += 0.2 (max 10)
  
Step 4: Match Type Label
  score >= 7.5 → "Excellent Fit"
  score >= 6.0 → "Good Fit"
  score >= 4.5 → "Partial Fit"
  score < 4.5  → "Weak Fit"
```

### Why NOT the other options?

| Reason | Option A | Option B | Option C |
|--------|----------|----------|----------|
| **Penalizes honest unrated** | User rates 2/4 requirements for Software Engineer with 9,8 → score becomes 4.5 instead of ~8 | Shows careers only if 2+/4 requirements rated (strict cutoff) | Multiplies Phase1×Phase2, creating harsh filtering |
| **Doesn't reward exploration** | "If I didn't rate something, I don't care" | ❌ Hides "explorer" careers | N/A |
| **Handles variance poorly** | User rates all 32 subcategories at level 5 → all careers score ~5 | Shows ~40 careers (at coverage threshold) | Scores all similarly |
| **User feedback** | "Why is Software Engineer only 4.5 when I rated everything 8+" | "Why aren't these careers showing?" | "Why does every career score the same?" |
| **Best use case** | Complete data sets | Perfectionist users | Hypothetical scenarios |

### Why Option D Works Best

1. **Rewards honesty:** User who rates 4/4 requirements gets 8.5+ score
2. **Encourages exploration:** "Explore Physicist" shown even if user only rated 2/4 physics subcategories
3. **Handles mixed data:** Works equally well if user rated 5 or 30 subcategories
4. **Matches intuition:** Higher coverage = higher score (with same individual ratings)
5. **Transparent UI:** Users see exactly which requirements they rated

**Example Scenario:**
```
User rated:
- Technology: Software Development: 9/10
- Math: Discrete Math: 8/10
- Math: Applied: 7/10
(3 out of 4 Software Engineer requirements)

Option A: (9×0.95 + 8×0.75 + 7×0.5) / 3 = 4.0 
Result: 4.0/10 (feels wrong!)

Option D: Same calculation BUT shows as 8.4/10 with "75% match"
Result: 8.4/10 + label "75% of relevant areas" (honest!)
```

---

## 2. Career Database: Hardcoded vs Firebase

### Decision: Hardcoded in `src/data/careers.js` (Phase 3)

**Rationale:**

| Aspect | Hardcoded | Firebase |
|--------|-----------|----------|
| **Latency** | 0ms (bundled) | 100-500ms (network) |
| **Size** | 100 careers ≈ 80KB (acceptable) | Same size, but on every load |
| **Versioning** | Easy (Git history) | Hard (requires migrations) |
| **Iteration** | Change careers.js, commit | Change careers in admin panel |
| **Caching** | Browser caches built bundle | Each user fetches independently |
| **User Testing** | Easy: try career tweak, rebuild | Hard: admin pushes, users see new version |

**When to switch to Firebase:**
- Careers change monthly (salary updates, new roles)
- Multiple admins managing careers
- A/B testing career descriptions
- Dynamic career creation (Phase 5+)

**For Phase 3-4:** Hardcoded + semi-annual updates is fine.

---

## 3. Career Count: 50 vs 100

### Decision: Start with 50, expand to 100 by launch

| Count | Pros | Cons | When Use |
|-------|------|------|----------|
| **50** | Curated quality, fast to build, easier to test | Might miss user's niche passion | MVP (3 weeks) |
| **75** | Good breadth + depth balance | Harder to maintain, might have duplicates | Recommended for launch |
| **100** | Comprehensive coverage | Slow to build, duplicates likely, overwhelming UI | 6+ months out |

**Recommended approach:**
1. **Week 1-2:** Build 50 core careers (core + advanced tiers only)
2. **Week 3:** Add 25 niche careers (during user testing feedback)
3. **Week 4:** Add 15 exploratory careers (unusual combinations)
4. **Month 2-3:** Reach 100 with Phase 4 prep

---

## 4. Tier System: 3 vs 4 Tiers

### Decision: Use 4 tiers (core, advanced, niche, exploratory)

| Tier | Count | Visibility | Examples |
|------|-------|-----------|----------|
| **Core** | 15 | Default (always shown) | Software Engineer, Doctor, Teacher |
| **Advanced** | 10 | Default (shown for good matches) | ML Engineer, Physicist, Surgeon |
| **Niche** | 10 | Optional (checkbox: "Show niche") | Scientific Illustrator, Bioacoustics Engineer |
| **Exploratory** | 8 | Special section (partial matches) | Art + Physics → Holographic Artist |

**Why 4 tiers?**
- **Core:** Safe discoveries (everyone knows these)
- **Advanced:** Challenge seekers (PhD/specialized training required)
- **Niche:** Interest-driven (high match % but rare roles)
- **Exploratory:** Curiosity box (unusual combinations)

---

## 5. UI: Cards vs Table vs List

### Decision: Cards (Tailwind grid) + Modal details

**Why cards?**
- Mobile-friendly (responsive 1-col → 2-col → 3-col)
- Match score visible at a glance (8.6/10 in large font)
- Action buttons clearly visible
- Matches current design language (Phase 1-2 use cards)

**Alternative considered:**
- **Table:** Information-dense, but bad on mobile, harder to scan
- **List:** Too linear, hides key info (salary, education) unless scrolled

---

## 6. Search vs Filter vs Sort

### Decision: All three (filters + sort, no full-text search)

**Components:**
1. **Filters** (checkboxes + sliders):
   - Tier (Core, Advanced, Niche, Exploratory)
   - Salary range (slider $0-$500K)
   - Education (dropdown)
   - Match type (≥7.5, ≥6.0, ≥4.5, <4.5)

2. **Sort** (radio buttons):
   - Score (highest first) — default
   - Salary (highest first)
   - Demand (lowest entry time first)
   - Alphabetical (A-Z)

3. **Search** (NOT included in Phase 3):
   - Reason: Only 50-100 careers, scanning is fine
   - Add in Phase 4 if > 500 careers

---

## 7. Firebase Saving: Immediate vs Lazy

### Decision: Lazy save (only on explicit action)

**Actions that trigger Phase 3 save:**
- [ ] User clicks "Save Career" (stars it)
- [ ] User advances to Phase 4 (auto-save top 5)
- [ ] User clicks "Share Results"

**Why NOT auto-save all matches?**
- Adds Firebase quota load (100 careers × users × recalculations)
- Phase 3 changes frequently during iteration (test salary, careers, etc.)
- Users rarely need to revisit Phase 3 results (they move to Phase 4)

**Firebase schema (when saving):**
```
users/{userId}/phase3/
├─ savedMatches/
│  ├─ software_engineer/
│  │  └─ timestamp: 1234567890
│  ├─ data_scientist/
│  │  └─ timestamp: 1234567890
│  └─ ...
│
├─ topMatches/
│  └─ [{ careerId: "software_engineer", score: 8.6 }]
│
└─ timestamp: 1234567890
```

---

## 8. Edge Cases: Handling

### 8.1 User Rated Zero Subcategories

**UI:** Empty state screen
```
"Rate subcategories first"
"Phase 3 matches careers to your Phase 2 ratings."
[← Back to Phase 2]
```

**Code:**
```javascript
if (Object.keys(phase2Ratings).length === 0) {
  return <EmptyState />;
}
```

---

### 8.2 All Ratings Low (Everything 1-3/10)

**UI:** Show all careers ranked, with banner
```
"No strong matches found at your interest levels.
Try: Adjust ratings (6-10 for true interests), 
     explore niche/exploratory tiers,
     or rate more subcategories."
```

**Algorithm:** Still scores/ranks, but all scores < 4.5 → "Weak Fit" label

---

### 8.3 Very Few Ratings (Only 2-3 Subcategories)

**UI:** Show careers matching those few, with banner
```
"Showing careers matching your 2 rated areas.
Rate more subcategories for broader matches."
```

**Algorithm:** Show careers where ≥40% of requirements match the 2-3 rated areas

---

### 8.4 Conflicting Interests (e.g., Physics + Design)

**Expected behavior:** Algorithm finds careers at intersection
- "Architectural Visualization Engineer"
- "Scientific Illustrator"
- "Product Designer (Hardware)"

**No special handling needed:** Algorithm naturally surfaces these due to requirement weighting.

---

### 8.5 All Ratings Equal (Everything 5-6/10)

**UI:** Show all careers sorted by demand (lowest entry time first)
```
"You seem equally interested in everything!
Try this: Rate things you LOVE as 8-10 
and things you're less sure about as 1-3."
```

**Code:**
```javascript
const variance = standardDeviation(Object.values(calculatedScores));
if (variance < 0.5) {
  return <Banner message="Try rating more selectively" />;
}
```

---

## 9. Career Salary Ranges: Data Source

### Decision: Use BLS + Glassdoor + Levels.fyi (Q1 2026)

**Recommended sources:**
1. **BLS Occupational Outlook Handbook** (https://www.bls.gov/ooh/)
   - Official, reliable, updated annually
   - Shows: median salary, job outlook, education required
   
2. **Glassdoor** (https://www.glassdoor.com)
   - Real employee data, updated constantly
   - Shows: range by company, location adjustments
   
3. **Levels.fyi** (https://levels.fyi)
   - Tech-specific, very accurate
   - Shows: salary by level (junior/mid/senior)

**Update schedule:** Annually (after BLS updates in Q1)

**Example data entry:**
```javascript
{
  id: 'software_engineer',
  context: {
    salary: '$80,000 - $160,000',
    salaryMedian: 125000,
    salaryByExperience: {
      junior_0_2yr: 75000,
      mid_2_5yr: 110000,
      senior_5_10yr: 150000,
      staff_10yr: 180000,
    },
    jobOutlook: 'Excellent (8% growth)',
    source: 'BLS 2026 OOH, Glassdoor Q1 2026',
  }
}
```

---

## 10. Career Descriptions: Length & Tone

### Decision: 1-2 sentences, friendly + professional

**Bad:** 
```
"Software engineering is a field that involves..."
(too long, generic)
```

**Good:**
```
"Design, build, and maintain software applications across platforms. 
Write production code, solve complex problems, and collaborate with teams."
(2 sentences, action-oriented)
```

**Tone guidelines:**
- ✓ Action verbs (Design, Build, Create, Solve)
- ✓ Real-world context (users, problems, impact)
- ✓ Friendly (accessible, not jargon-heavy)
- ✗ Boring (avoid "A person who...")
- ✗ Jargon (unless defined)

---

## 11. Related Careers: How Many?

### Decision: 3-5 related careers per role

**Example:**
```javascript
{
  id: 'software_engineer',
  relatedCareers: [
    'web_developer',      // Similar but more specialized
    'backend_engineer',   // Narrower specialization
    'full_stack_engineer',// Broader version
    'data_engineer',      // Parallel tech track
  ],
}
```

**Guidelines:**
- Include siblings (same tier, different focus)
- Include progression (junior → mid → senior)
- Include parallel tracks (SW Eng → Data Engineer)
- Avoid unrelated (SW Eng → Teacher)

---

## 12. Discovery Hints: When to Show?

### Decision: 1 hint per career, shown in details modal

**Example hints:**
- **For Software Engineer:** "If you love building products people interact with daily"
- **For Data Scientist:** "If you love finding hidden patterns in data"
- **For Designer:** "If you have an eye for beauty and function"
- **For Historian:** "If you're curious about how humans shape civilization"

**Purpose:** Help users self-assess fit without reading full description

---

## 13. Performance: Memoization Strategy

### Decision: Memoize career matching, not individual careers

**Good:**
```javascript
const allMatches = useMemo(
  () => generateCareerMatches(phase1, phase2, scores),
  [phase2Ratings] // Recalculate only if Phase 2 changes
);
```

**Avoid:**
```javascript
const careerCard = useMemo(() => <CareerCard career={c} />, [c]);
// Overdoing memoization for small components
```

**Why:** Career matching is expensive (100 careers × scoring), but rendering is cheap.

---

## 14. Accessibility: WCAG Standards

### Decision: WCAG 2.1 Level AA (minimum)

**Checklist:**
- [ ] Color contrast ≥4.5:1 (normal text), ≥3:1 (large text)
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Alt text for icons
- [ ] Form labels associated with inputs
- [ ] Error messages clear and actionable
- [ ] Mobile-friendly (≥48px touch targets)

**Tools:**
- axe DevTools (browser extension)
- Lighthouse (Chrome DevTools)
- NVDA screen reader testing

---

## FAQ

### Q1: What if a career requires 5 requirements and user only rated 2?

**A:** Covered% = 2/5 = 40%. Since 40% >= 40%, career is VISIBLE (not hidden).
But users see "2 of 5 relevant areas rated" in the UI, so they know it's partial.

---

### Q2: Should I include "Generic" careers like "Engineer" or "Analyst"?

**A:** No. Be specific:
- ✗ "Engineer" → ✓ "Software Engineer", "Mechanical Engineer", "Data Engineer"
- ✗ "Analyst" → ✓ "Data Analyst", "Financial Analyst", "Business Analyst"

Reason: User can't act on "Engineer" (what would they learn?).

---

### Q3: What if girlfriend rates "Technology: Web" at 10/10 but everything else 1?

**A:** Algorithm shows Web Developer (9.5/10) + other tech careers. This is correct behavior!
UI shows: "Showing 8 careers that match your strong interest in Web Development."

---

### Q4: Should I show salary for each career immediately or in details modal?

**A:** Show median salary on card ($125K), full range in modal ($80K-$160K).

**Card:** `"$80-160K"` (takes up space)
**Modal:** 
```
Median: $125,000
Range: $80,000 - $160,000
Entry level: $75,000
Senior: $150,000
```

---

### Q5: How often should I update career data?

**A:** 
- **Salary & outlook:** Annually (after BLS updates)
- **Skills:** Quarterly (tech changes fast)
- **Job descriptions:** Annually
- **New careers:** As needed (quarterly review)

---

### Q6: Can I A/B test career descriptions?

**A:** Not in Phase 3 (too complex). In Phase 4+, add A/B testing:

```javascript
// Phase 4+ feature
const descriptions = {
  software_engineer: {
    formal: "Design and implement...",
    narrative: "Your day: morning standup → code review → debugging → ship to production",
  },
};
```

---

### Q7: What if two careers have the exact same score?

**A:** Tiebreaker: alphabetical by title.

```javascript
.sort((a, b) => {
  if (b.matchData.score !== a.matchData.score) {
    return b.matchData.score - a.matchData.score;
  }
  return a.title.localeCompare(b.title); // Tiebreaker
});
```

---

### Q8: Should I include salary in the matching algorithm?

**A:** No. Keep matching pure (based on skills/interests only).
Salary is a filter (user chooses their target), not part of fit.

---

### Q9: How should I handle careers that disappear (e.g., "Floppy Disk Technician")?

**A:** Include 1-2 "sunset" careers with warning:

```javascript
{
  id: 'travel_agent',
  title: 'Travel Agent',
  tier: 'niche',
  deprecationWarning: 'This role is declining (job outlook: -8%). Consider similar roles instead.',
  relatedCareers: ['travel_coordinator', 'tourism_manager'],
}
```

---

### Q10: Phase 4 — how do I get job listings?

**A:** Use job board APIs:
- **LinkedIn API** (paid, official)
- **RapidAPI** (aggregators, paid)
- **Indeed API** (limited free tier)
- **Web scraping** (brittle, last resort)

For Phase 4, recommended: start with Indeed API (free tier) + manual curation.

---

### Q11: Should I include "Entrepreneur" / "Start Your Own Business"?

**A:** As exploratory tier only:

```javascript
{
  id: 'entrepreneur',
  title: 'Entrepreneur',
  tier: 'exploratory',
  description: 'Build your own business. Combine your passions and skills into a company or venture.',
  requirements: [
    // All subcategories weighted at 0.3 (all interests matter)
  ],
  context: {
    salary: 'Highly variable ($0 - $1M+)',
    education: 'No formal requirement (but relevant skills help)',
    jobOutlook: 'N/A (depends on market)',
  },
}
```

Reason: Entrepreneur path is "any 2+ of your interests + business skills."

---

### Q12: Phase 3 launch — what if users say "These don't match me at all"?

**A:** Likely issues:
1. **Matching algorithm miscalibrated** → Adjust weights in career.requirements
2. **Careers poorly described** → Rewrite descriptions
3. **User misunderstood Phase 2** → Add explanatory banner
4. **Missing careers** → Add new careers that match user's unique profile

Quick fix: Add "Doesn't match you?" button → feedback form → collect data.

---

## Decision Summary Table

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| Matching algorithm | Hybrid (Option D) | Handles mixed data + rewards depth + transparent |
| Database | Hardcoded careers.js | Fast, easy to iterate, versioned with Git |
| Career count | 75 by launch | Breadth + depth, manageable to maintain |
| Tier system | 4 tiers (core/adv/niche/exp) | Caters to all user types |
| UI paradigm | Cards + modal details | Mobile-friendly, matches Phase 1-2 design |
| Search/filter/sort | All three | Complete discovery experience |
| Firebase saving | Lazy (on action) | Reduce quota, user controls persistence |
| Salary source | BLS + Glassdoor + Levels.fyi | Official + real data |
| Description length | 2 sentences | Scannable, informative |
| Related careers | 3-5 per role | Avoids overwhelm, enables pivots |
| Accessibility | WCAG 2.1 AA | Inclusive, professional |
| Update cadence | Annually (salary/outlook), quarterly (skills) | Timely + maintainable |

---

## Next Steps

1. **Decision confirmation:** Do you agree with Option D + hardcoded + 75 careers?
2. **Career curation:** Build career list (use provided 15 examples as template)
3. **Implementation:** Start with Phase 3A (scores + algorithm + container)
4. **User testing:** Get feedback from girlfriend early
5. **Iterate:** Refine careers, adjust weights, improve descriptions

