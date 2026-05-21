# Phase 3 Architecture: Executive Summary

## Overview

Phase 3 transforms Phase 2 ratings into 50-100 ranked career recommendations. This is a **roadmap-stage architecture document** — full specifications are in `PHASE3_ARCHITECTURE.md`. This document summarizes key decisions and provides a quick-start guide.

---

## The Problem Phase 3 Solves

**Phase 1-2 output:** User rates 8 subjects → 32 subcategories → top 20 ranked by (40% Phase1 + 60% Phase2)

**Missing:** Career paths matching these interests

**Phase 3:** Map the top 20 to 50-100 careers using a smart matching algorithm

---

## Core Architecture Decisions

### 1. Matching Algorithm: Hybrid Scoring (Option D)

**How it works:**
```
For each career:
  1. Count how many requirements user rated (coverage)
  2. If coverage < 40%: Hide (show in "explore" section)
  3. If coverage ≥ 40%: Score = average of (rating × weight)
  4. Label: 7.5+ = excellent, 6.0-7.4 = good, etc.
```

**Why this?**
- Rewards users who rate deeply (100% coverage gets +0.2 bonus)
- Doesn't penalize unrated areas (0 is skipped, not averaged as 0)
- Shows "partial matches" for exploratory users
- Transparent: users see "75% match" with exact breakdown

**Example:**
```
Software Engineer requires: tech_software (0.95), math_discrete (0.75), 
                            math_applied (0.5), tech_data (0.4)

User rated: tech_software=9, math_discrete=8, (other 2 unrated)

Result: 
  Score = (9×0.95 + 8×0.75) / (0.95 + 0.75) = 8.6/10
  Label = "50% match" (2 of 4 areas)
  Shown = YES (50% ≥ 40%)
```

---

### 2. Career Database: Hardcoded (50-100 careers)

**Structure:** `src/data/careers.js`

```javascript
export const CAREERS = [
  {
    id: 'software_engineer',
    title: 'Software Engineer',
    tier: 'core',
    description: '...',
    requirements: [
      { subcategoryId: 'technology_software', weight: 0.95 },
      // ... 3-5 more
    ],
    context: {
      salary: '$80,000 - $160,000',
      salaryMedian: 125000,
      education: 'CS degree or bootcamp',
      jobOutlook: 'Excellent (8% growth)',
      yearsToEntry: 2,
      skills: ['Python', 'Git', 'REST APIs', '...'],
      careerPath: ['Junior → Mid → Senior → Staff'],
      relatedCareers: ['web_developer', 'backend_engineer'],
    },
    discoveryHint: 'If you love building products',
  },
  // ... 49-99 more
];
```

**Why hardcoded?**
- **No latency:** careers.js loaded with app (0ms vs 100-500ms Firebase)
- **Easy versioning:** Git history tracks career changes
- **Simple iteration:** Change career, rebuild, test
- **Safe:** No Firebase quota concerns

---

### 3. Tier System: 4 Tiers

| Tier | Count | Visibility | Examples |
|------|-------|-----------|----------|
| **core** | 15 | Always shown | Software Engineer, Doctor, Teacher |
| **advanced** | 10 | For high scores | ML Engineer, Physicist, Surgeon |
| **niche** | 10 | Optional (checkbox) | Scientific Illustrator, Bioacoustics Engineer |
| **exploratory** | 8 | Discovery mode | Unique combos (Art + Physics → Holographic Artist) |

**UI:** Default filters show Core + Advanced. User clicks "Show niche" to see more.

---

### 4. Matching UI: Cards + Modal

**Main Results Page:**
```
┌─ Summary Cards (4 stat cards)
├─ Filters (tier, salary, education, match type)
├─ Sort (score, salary, demand, alphabetical)
├─ Career Cards Grid (rank #1-50)
│  ├─ Title, score (8.6/10), match type
│  ├─ Quick stats (salary, education)
│  ├─ Match breakdown (which requirements rated)
│  └─ [Details] [Learn More] buttons
├─ Explore Section (partial matches, <40% coverage)
└─ Action Buttons [← Back] [Phase 4 →]
```

**Career Details Modal (click "Details"):**
```
├─ Full description
├─ Your fit (which requirements you rated, with scores)
├─ Career path (junior → senior progression)
├─ Salary breakdown (median, range by experience)
├─ Education requirements
├─ Key skills needed
├─ Related careers (3-5 adjacent roles)
├─ Discovery hint (personalized insight)
└─ [Share] [Save] [Print]
```

---

### 5. Firebase Integration: Lazy Saving

**What gets saved:**
- User clicks "Save Career" → save to `users/{userId}/phase3/savedMatches`
- User advances to Phase 4 → auto-save top 5 matches
- Otherwise: NOT saved (Phase 3 results are temporary/computed)

**Why?** Phase 3 is computed every time (from Phase 2 scores). No need to persist unless user explicitly saves.

---

## Key Data: 15 Example Careers

Below are 15 fully-fleshed career profiles to use as templates:

```javascript
// Category: Technology (3 core careers)
1. Software Engineer
2. Web Developer (Full Stack)
3. Data Scientist

// Category: Technology (2 advanced)
4. ML Engineer
5. Data Engineer

// Category: Security (1 core)
6. Cybersecurity Analyst

// Category: Science (3 core)
7. Physics Engineer
8. Mechanical Engineer
9. Pharmaceutical Chemist

// Category: Biology (2 advanced)
10. Molecular Biologist
11. Environmental Scientist

// Category: Design (2 core)
12. UX/UI Designer
13. Graphic Designer

// Category: Writing (1 core, 1 niche)
14. Writer/Author
15. Historian (niche)

(Expand to 75 total by end of development)
```

See `PHASE3_ARCHITECTURE.md` section 1 for full profiles.

---

## Algorithm Comparison: Why Option D?

| Aspect | Option A (Average) | Option B (Filter) | Option C (Multiply) | **Option D (Hybrid)** |
|--------|---|---|---|---|
| **Unrated treatment** | As 0 (harsh) | Ignored | As 0 (harsh) | Normalized (fair) |
| **Partial matches** | All shown, low score | Filtered out | Filtered hard | Shown with label |
| **Coverage reward** | None | Built-in filter | None | +0.2 bonus |
| **Transparency** | No coverage label | Binary (show/hide) | Score only | Score + % label |
| **Works with 5 ratings?** | Yes (poor results) | Yes (better) | Yes (poor results) | **Yes (excellent)** |
| **User intuition** | ❌ "Why is SE only 4.0?" | ❌ "Why hidden?" | ❌ "Why so many low?" | ✓ "8.4 makes sense!" |

---

## Edge Case Handling

| Scenario | Behavior |
|----------|----------|
| Zero Phase 2 ratings | Empty state: "Rate subcategories first" |
| All ratings 1-2/10 | Show all careers (all scores <4.5), banner: "No strong matches" |
| Only 2-3 ratings | Show careers matching those, banner: "Showing careers that match your X rated areas" |
| Conflicting interests (e.g., Physics + Design) | Algorithm finds intersection careers naturally |
| All ratings equal (e.g., all 5/10) | Show all careers sorted by demand, banner: "Try rating more selectively" |

---

## Implementation Phases

### Phase 3A: Foundation (6-7 hours)
- [ ] Create `src/data/careers.js` (50 careers)
- [ ] Create `src/utils/careerMatching.js` (scoring algorithm)
- [ ] Create `src/components/PhaseThree.jsx` (main container)

### Phase 3B: UI (4-5 hours)
- [ ] `CareerSummary.jsx` (stat cards)
- [ ] `FilterBar.jsx` (filters + sort)
- [ ] `CareerCard.jsx` (individual card)
- [ ] `CareerDetailsModal.jsx` (details sidebar)
- [ ] `ExploreSection.jsx` (partial matches)

### Phase 3C: Integration & Tests (4-5 hours)
- [ ] Integrate with `App.jsx` (Phase 2 → Phase 3 navigation)
- [ ] Unit tests for matching algorithm
- [ ] Integration tests (Phase 2 → Phase 3 data flow)

### Phase 3D: Polish & Launch (4-5 hours)
- [ ] Performance optimization (memoization, lazy loading)
- [ ] Firebase integration (optional)
- [ ] Accessibility testing (WCAG 2.1 AA)
- [ ] User testing with girlfriend

**Total:** 18-22 hours (3-4 weeks with testing)

---

## File Structure (After Phase 3)

```
src/
├─ data/
│  ├─ subcategories.js (existing)
│  └─ careers.js (NEW)
│
├─ utils/
│  ├─ scoring.js (existing)
│  └─ careerMatching.js (NEW)
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
```

---

## Success Criteria

1. **Functional:** Phase 3 loads, scores, and displays careers
2. **Accurate:** Top 3 careers feel like genuine matches to girlfriend
3. **Usable:** Filters/sort work smoothly, no lag
4. **Complete:** 50+ careers with rich data (salary, skills, path)
5. **Polished:** Responsive design, professional UI, no errors
6. **Tested:** >90% code coverage for matching logic

---

## Next Steps (In Order)

1. **Review & approve** this architecture (PHASE3_ARCHITECTURE.md)
2. **Decide career list:** Use 15 examples as seed, expand to 50-75
3. **Implement Phase 3A:** Build database + algorithm (1 week)
4. **Build Phase 3B:** Create UI components (1 week)
5. **Integration & testing:** Phase 3C (1 week)
6. **Polish & launch:** Phase 3D (1 week)
7. **User testing:** Get girlfriend feedback early + often
8. **Phase 4 planning:** Job listings, learning paths, mentors

---

## Documents in This Phase 3 Design

| Document | Purpose | Audience |
|----------|---------|----------|
| **PHASE3_ARCHITECTURE.md** | Complete technical specification (2,500 lines) | Developers, architects |
| **PHASE3_IMPLEMENTATION_ROADMAP.md** | Week-by-week implementation plan (800 lines) | Developers, project leads |
| **PHASE3_DECISION_MATRIX.md** | Rationale for each decision + FAQ (1,200 lines) | Decision makers, stakeholders |
| **PHASE3_SUMMARY.md** (this file) | Quick reference guide (600 lines) | Everyone |

---

## FAQ (Short Version)

**Q: Why Hybrid algorithm over the other 3 options?**
A: It handles mixed data (some rated, some not), rewards exploration, and is transparent. See PHASE3_DECISION_MATRIX.md for full comparison.

**Q: Why hardcoded careers instead of Firebase?**
A: Zero latency, easy versioning, simple iteration. If careers change monthly, switch to Firebase in Phase 5+.

**Q: How many careers should I include?**
A: Start with 50, expand to 75-100 by launch. Quality > quantity.

**Q: What if girlfriend says "These don't match me"?**
A: Check: (1) weights in career.requirements, (2) career descriptions, (3) missing careers. Iterate fast.

**Q: When do I add Phase 4 (job listings)?**
A: After Phase 3 is solid. Phase 4 uses top 5 careers to pull job listings from APIs.

**See PHASE3_DECISION_MATRIX.md for 12 more Q&As.**

---

## Recommended Reading Order

1. **This file (PHASE3_SUMMARY.md)** — 5 min read, get the gist
2. **PHASE3_ARCHITECTURE.md sections 1-4** — 20 min, understand matching algorithm
3. **PHASE3_DECISION_MATRIX.md** — 15 min, confirm decisions
4. **PHASE3_IMPLEMENTATION_ROADMAP.md** — 10 min, understand implementation steps
5. **PHASE3_ARCHITECTURE.md full** — 30 min, detailed specs when building

**Total:** 80 minutes to understand full Phase 3 architecture

---

## Risk Mitigation

| Risk | Mitigation |
|------|---|
| Matching algorithm wrong | Build unit tests first, test with sample user data |
| Careers feel generic | Source real salary/outlook from BLS, Glassdoor, Levels.fyi |
| Missing niche careers | Gather user feedback, add quarterly |
| Performance slow | Profile with DevTools, memoize career matching |
| Firebase schema mismatch | Test data flow Phase 2 → Phase 3 early |
| Accessibility fails | Test with axe DevTools + NVDA screen reader |

---

## Contact for Questions

All architecture questions are answered in the three detailed documents:

- **"How should I score careers?"** → PHASE3_ARCHITECTURE.md §2
- **"What's the data model?"** → PHASE3_ARCHITECTURE.md §1
- **"Why not hardcode to Firebase?"** → PHASE3_DECISION_MATRIX.md §2
- **"What's the UI layout?"** → PHASE3_ARCHITECTURE.md §4 + mock-ups
- **"How do I handle edge cases?"** → PHASE3_ARCHITECTURE.md §9
- **"What's the week-by-week plan?"** → PHASE3_IMPLEMENTATION_ROADMAP.md

---

## Quick Start Checklist

- [ ] Read PHASE3_SUMMARY.md (this file)
- [ ] Review 15 example careers in PHASE3_ARCHITECTURE.md §1
- [ ] Decide: Approve Hybrid algorithm + hardcoded + 75 careers?
- [ ] Create `src/data/careers.js` with 50+ careers
- [ ] Create `src/utils/careerMatching.js` with scoring function
- [ ] Build Phase 3 UI components (Phase 3B)
- [ ] Write unit tests for matching algorithm
- [ ] User test with girlfriend
- [ ] Iterate based on feedback

---

**Ready to build Phase 3?** Start with PHASE3_IMPLEMENTATION_ROADMAP.md and begin Phase 3A.

