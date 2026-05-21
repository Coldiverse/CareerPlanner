# Phase 2-3 Deep Analysis: Weighting, Career Mapping, & Discovery Flow

## Executive Summary

**Phase 1 → Phase 2 → Phase 3** creates a progressive narrowing from vague to specific:
- **Phase 1:** 8 broad subjects (rating how interested in the category)
- **Phase 2:** 32 subcategories (rating specific aspects within each subject)
- **Phase 3:** Actual career paths (mapped from subcategories, filtered by Phase 2 matches)

The key insight: **Show all subjects/subcategories to enable discovery of "hidden interests"** — cases where Phase 1 rating is low but Phase 2 rating is high.

---

## Part 1: Weighting Strategy Analysis

### The Discovery Problem

**Scenario:** Girlfriend rates Biology 3/10 (thinks "not for me"), but rates "Marine Biology" 9/10 when she sees it.
- **Goal:** Bubble this up high enough to rank in top 20 results
- **Challenge:** How much weight does low Phase 1 rating matter?

### Weighting Options Evaluated

| Option | Formula | Bio 3+Marine 9 | Bio 9+Marine 2 | Bio 9+Marine 9 | Trade-off |
|--------|---------|---|---|---|---|
| **Additive 35/65** | (P1×0.35) + (P2×0.65) | **6.9** | 5.15 | 8.65 | ✓ Allows discovery, respects P1 |
| **Additive 40/60** | (P1×0.4) + (P2×0.6) | **6.6** | 5.4 | 8.4 | Slightly more P1 weight |
| **Additive 50/50** | (P1×0.5) + (P2×0.5) | **6.0** | 5.5 | 9.0 | Balanced, less discovery |
| **Multiplicative** | (P1×P2)/10 | **2.7** | **1.8** | **8.1** | ✗ Kills discovery unless P1 also high |
| **Max(P1,P2)** | max(P1, P2) | **9.0** | **9.0** | **9.0** | ✗ Treats all high-rated equally |
| **Conditional 40/80** | If P1≥5: 40/60, else 30/70 | **6.9** | 5.4 | 8.4 | Complex, different weights by threshold |

### Recommendation: **40/60 Weighting**

```javascript
const calculatePhase2Score = (phase1Rating, phase2Rating) => {
  return (phase1Rating * 0.4) + (phase2Rating * 0.6);
};

// Examples:
calculatePhase2Score(3, 9);  // 6.6 (discovery case — bubbles up)
calculatePhase2Score(9, 9);  // 8.4 (double interest — top tier)
calculatePhase2Score(9, 2);  // 5.4 (interested in subject, not this angle)
calculatePhase2Score(2, 2);  // 2.0 (low everywhere)
```

**Why 40/60 over 35/65?**
- **40% Phase 1:** Shows that broad interest matters (if she rates Physics 2/10, even a 10/10 Mechanics subrates to 6.0—still rankable but not top)
- **60% Phase 2:** Specific interest matters MORE (she's rating what she actually want to explore)
- **Discovery friendly:** Biology 3 + Marine 9 = 6.6 can rank in top 20 of 32 total (25th percentile)
- **Avoids over-correction:** Physics 9 + Mechanics 2 = 5.4 (lower than 6.6 because Phase 2 is low) is fair

**Why not 35/65?** It works too, but 40/60 gives slightly more respect to her initial broad interests. If she rated Physics 3/10, there might be a reason—letting 60% Phase 2 dominate could surface interests that conflict with her actual goals.

**Why not 50/50?** Reduces discovery signal. Bio 3 + Marine 9 = 6.0 is less compelling than 6.6.

**Why not multiplicative?** It contradicts your explicit request to "show all subjects just in case she likes something." Multiplicative (3×9)/10 = 2.7 would bury the discovery case.

---

## Part 2: Phase 2 Complete Flow & Edge Cases

### Phase 2 Screen Structure

```
TAB ROW (Always visible):
┌─ [Physics] [Chemistry] [Biology] [History] [Math] [Art] [Writing] [Tech] ─┐
│  (0/4 rated) (0/4)      (0/4)      (0/4)    (0/4)  (0/4) (0/4)    (0/4)   │
└──────────────────────────────────────────────────────────────────────────┘

CURRENT TAB CONTENT (Click tab to switch):
┌─ Physics Subcategories ──────────────────────────────────────────────────┐
│                                                                            │
│  ┌─ Mechanics & Engineering ──────────────────────────────────────────┐  │
│  │ Forces, motion, machines, robotics, structures                     │  │
│  │ [====|====|====|=] 8/10    ⭐⭐⭐⭐                               │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌─ Astronomy & Space ────────────────────────────────────────────────┐  │
│  │ Stars, planets, galaxies, space exploration, cosmos                │  │
│  │ [===|===|] 6/10    ⭐⭐⭐                                         │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  [... Thermodynamics, Quantum ...]                                        │
│                                                                            │
│  Status: 3/4 rated   [Saving...] ✓ Saved                                │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

PROGRESS & NAVIGATION:
Overall: 12/32 rated (37%)   [← Previous Tab] [Next Tab →]   [See Results]
```

### Edge Case: Not Rating All 32

**What if she only rates 10 out of 32 subcategories?**

**Approach:**
- Only scored/ranked subcategories appear in top results
- Unrated ones appear at bottom with "Not rated yet — want to explore these?"
- This is honest (we don't guess her interest) and offers discovery

**Data saved:**
```
users/{userId}/phase2/
  ratings/
    physics_mechanics: 8
    physics_astronomy: 6
    chemistry_organic: 7
    // ... 7 more rated
    // The other 22 are NOT in the object
  timestamp: 1234567890
  status: "partial"  // Optional flag
```

### Edge Case: Changing Her Mind

**What if she goes back and changes a rating?**
- Auto-save on change (500ms debounce, like Phase 1)
- Results auto-update in real-time
- She can iterate until satisfied

**What if she wants to re-do Phase 1?**
- Add "Go Back" button on Phase 2
- Clicking it takes back to Phase 1 with her current ratings pre-filled
- Updating Phase 1 automatically re-calculates Phase 2 scores

### Edge Case: Very Skewed Ratings

**What if she rates everything 1/10 or 10/10?**
- System still works, just less discrimination
- Results still show ranked order (even if all 8.0-8.1)
- Encourage her: "Try spreading your ratings 1-10 to discover clearer patterns"

---

## Part 3: Phase 3 - Career Mapping Strategy

### Career Database Structure

Each career has a "profile":

```javascript
const careerProfiles = [
  {
    id: "mechanical_engineer",
    title: "Mechanical Engineer",
    description: "Design and build machines, engines, robots, structures",
    requirements: [
      { subcategoryId: "physics_mechanics", weight: 0.9 },
      { subcategoryId: "mathematics_applied", weight: 0.8 },
      { subcategoryId: "technology_systems", weight: 0.6 },
    ],
    context: {
      salary: "$70-130K",
      education: "Bachelor's in Mechanical Engineering",
      jobOutlook: "Growing 4% through 2033",
      skills: ["CAD", "Problem-solving", "Physics", "Design thinking"],
    }
  },
  {
    id: "ui_ux_designer",
    title: "UI/UX Designer",
    description: "Design digital experiences that are beautiful and usable",
    requirements: [
      { subcategoryId: "art_design_digital", weight: 0.95 },
      { subcategoryId: "technology_web", weight: 0.7 },
      { subcategoryId: "mathematics_discrete", weight: 0.4 }, // Logic
    ],
    context: {
      salary: "$65-120K",
      education: "Portfolio-based (bootcamp or self-taught OK)",
      jobOutlook: "Growing 15% through 2033",
      skills: ["Design tools (Figma)", "User research", "Prototyping", "Code awareness"],
    }
  },
  // ... 50-100 total careers
];
```

### Phase 3 Matching Algorithm

**Step 1: Load Phase 2 scores**
```
User's Phase 2 scores:
  physics_mechanics: 8.4
  art_design_digital: 9.1
  technology_web: 8.8
  technology_software: 7.9
  mathematics_applied: 6.6
  // ... others
```

**Step 2: Calculate match score for each career**
```javascript
const calculateCareerMatch = (career, phase2Scores) => {
  // Sum up weighted matches
  let totalScore = 0;
  let matchedRequirements = 0;
  
  for (const req of career.requirements) {
    const userScore = phase2Scores[req.subcategoryId] || 0;
    totalScore += (userScore * req.weight);
    if (userScore > 0) matchedRequirements++;
  }
  
  // Normalize to 0-10
  const avgScore = career.requirements.length > 0 
    ? totalScore / career.requirements.length 
    : 0;
  
  // Require at least 50% of requirements to be rated
  const coverageRatio = matchedRequirements / career.requirements.length;
  const isCovered = coverageRatio >= 0.5;
  
  return {
    careerTitle: career.title,
    matchScore: avgScore,  // 0-10 scale
    isCovered: isCovered,
    matchedReqs: career.requirements.filter(r => phase2Scores[r.subcategoryId]),
    reasoning: `Matches your interests in: 
      ${career.requirements
        .filter(r => phase2Scores[r.subcategoryId])
        .map(r => `${r.subcategoryId} (${phase2Scores[r.subcategoryId]}/10)`)
        .join(', ')}`
  };
};
```

**Step 3: Rank and display**

```
YOUR TOP CAREER PATHS
Based on your Phase 2 ratings

1. Mechanical Engineer               [8.2/10] ✓
   Matches: Physics-Mechanics (8.4), Applied Math (6.6), Systems (5.0)
   "Your engineering and physics interests align perfectly"
   [Explore] [Not interested]

2. Software Engineer                 [8.0/10] ✓
   Matches: Tech-Software (7.9), Tech-Web (8.8), Discrete Math (6.0)
   "Your strong tech interest maps to engineering roles"
   [Explore] [Not interested]

3. Robot Designer                    [7.8/10] ✓
   Matches: Physics-Mechanics (8.4), Tech-Systems (7.2), Engineering (7.0)
   [Explore] [Not interested]

...

[Careers with lower coverage:]
UI/UX Designer                       [6.4/10] (needs Art-Digital: not rated yet)
   "You haven't rated digital art, but this role uses those skills"
   [Rate it first] [Explore anyway]
```

### Why This Design?

1. **Transparency:** User sees EXACTLY why a career ranks high (which Phase 2 areas it matches)
2. **Discovery:** Even if she didn't rate digital art, she can explore UI/UX and be prompted to rate
3. **Progression:** Each phase is less vague than the last:
   - Phase 1: "Do you like Physics?" (broad)
   - Phase 2: "Do you like Mechanics within Physics?" (specific)
   - Phase 3: "Here are Mechanical Engineer, Roboticist, etc." (very specific)

---

## Part 4: Data Structure for All 3 Phases

### Complete Firebase Schema

```
users/{userId}/
  ├─ createdAt: 1234567890000
  ├─ lastUpdated: 1234567890000
  │
  ├─ phase1/
  │  ├─ ratings/
  │  │  ├─ physics: 8
  │  │  ├─ chemistry: 5
  │  │  ├─ biology: 3
  │  │  ├─ history: 6
  │  │  ├─ mathematics: 7
  │  │  ├─ art_design: 9
  │  │  ├─ writing_literature: 5
  │  │  └─ technology_computing: 9
  │  ├─ timestamp: 1234567890000
  │  └─ completed: true
  │
  ├─ phase2/
  │  ├─ ratings/
  │  │  ├─ physics_mechanics: 8
  │  │  ├─ physics_astronomy: 6
  │  │  ├─ physics_thermodynamics: 7
  │  │  ├─ physics_quantum: 8
  │  │  ├─ art_design_visual: 9
  │  │  ├─ art_design_digital: 9
  │  │  └─ ... (other rated ones, only if rated)
  │  ├─ timestamp: 1234567890000
  │  ├─ completed: false  // Until all visible subcats rated or user clicks "Done"
  │  └─ calculated_scores/  // Cache for performance
  │     ├─ physics_mechanics: 8.0  // (8*0.4) + (8*0.6)
  │     ├─ physics_astronomy: 6.4
  │     └─ ... (all phase2 rated)
  │
  ├─ phase3/ (future)
  │  ├─ ratings/
  │  │  ├─ mechanical_engineer: 9
  │  │  ├─ ui_ux_designer: 8
  │  │  └─ ... (explored careers she rates)
  │  ├─ timestamp: 1234567890000
  │  └─ completed: true/false
  │
  └─ sessionHistory/ (optional)
     ├─ phase1_startedAt: 1234567890000
     ├─ phase1_completedAt: 1234567890123
     ├─ phase2_startedAt: 1234567890456
     └─ ... (for analytics later)
```

### Why This Structure?

- **Normalized:** Each phase only stores what users rate
- **Calculable:** `calculated_scores` cache Phase 2 scores for fast display
- **Timestamped:** Can track when each phase was completed
- **Ready for Phase 3:** Career ratings also stored same way
- **Future-proof:** Easy to add Phase 4, 5, etc.

---

## Part 5: Complete User Journey (3-Phase Flow)

### Phase 1: Discovery (10 min)
```
START
  ↓
[Rate 8 subjects on 1-10 scale]
  Physics: 8
  Chemistry: 5
  Biology: 3
  History: 6
  Math: 7
  Art: 9
  Writing: 5
  Tech: 9
  ↓
"Great! You're most interested in Art, Tech, and Physics"
  ↓
[Click "Next Phase"] → Phase 2
```

### Phase 2: Refinement (15 min)
```
START (with Phase 1 loaded)
  ↓
[Show all 8 subject tabs]
  ↓
[Click tabs, rate subcategories you care about]
  Physics → Click → Mechanics (8), Astronomy (6), Thermodynamics (—), Quantum (—)
  Art → Click → Visual (9), Digital (9), Performing (—), Crafts (—)
  Tech → Click → Software (8), Data Science (7), Web (9), Cybersecurity (—)
  ↓
[Auto-calculate Phase 2 scores]
  physics_mechanics: 8.0  (8*0.4 + 8*0.6)
  art_design_visual: 9.0  (9*0.4 + 9*0.6)
  art_design_digital: 9.0 (9*0.4 + 9*0.6)
  technology_software: 8.2 (9*0.4 + 8*0.6)
  technology_web: 8.6    (9*0.4 + 9*0.6)
  ... (others)
  ↓
[Click "See Results"] → Top 20 Subcategories Ranked
  1. Art - Digital Design [9.0]
  2. Technology - Web Development [8.6]
  3. Physics - Mechanics [8.0]
  4. Technology - Software [8.2]
  5. Art - Visual Art [9.0]
  ... etc
  ↓
[Click "Next Phase"] → Phase 3
```

### Phase 3: Career Matching (10 min, future)
```
START (with Phase 2 scores loaded)
  ↓
[System maps top Phase 2 matches to careers]
  ↓
[Show Top Career Paths Ranked]
  1. UX/UI Designer [8.9/10]
     Matches: Digital Design (9), Web Dev (8.6), User Research (7)
  
  2. Web Developer [8.7/10]
     Matches: Web Dev (8.6), Software (8.2), Tech-Web (9)
  
  3. Mechanical Engineer [7.9/10]
     Matches: Physics-Mechanics (8.0), Applied Math (6.6)
  
  4. Product Manager [7.8/10]
     Matches: Tech (high), Design (high), Communication (inferred)
  ↓
[User can click on each career to explore details]
  Salary, education path, job outlook, required skills
  ↓
[Optional: Rate careers, add to favorites, get next steps]
```

---

## Part 6: Critical Design Decisions

### Decision 1: Show ALL Subjects in Phase 2 (or filter by Phase 1)?
**Choice: SHOW ALL**
- User requested: "show all just in case she likes something"
- Supports discovery of hidden interests (Bio 3 + Marine 9)
- Tab UI doesn't become overwhelming—still organized
- **Implementation:** Show all 8 tabs always

### Decision 2: Require All 32 Rated?
**Choice: NO, let her rate selectively**
- Not everything interests her; forcing all 32 creates friction
- Show 32 options, let her rate what matters
- Results show "X/32 rated" progress
- **Implementation:** Only rank/show rated subcategories

### Decision 3: Unrated Subcategories in Results?
**Choice: Show at bottom with prompt**
- Example: "UI/UX Designer needs Digital Design rated"
- Let her jump back and rate if curious
- Or she can explore it "anyway"
- **Implementation:** Two sections: "Highly Matched" (all reqs rated) and "Partial Matches" (missing some)

### Decision 4: Can She Skip Phase 2, Go Straight to Phase 3?
**Choice: NO**
- Phase 2 data is required for Phase 3 matching
- But could allow partial Phase 2 (as discussed above)
- **Implementation:** Can start Phase 3 after rating at least 5 subcategories

### Decision 5: Can She Go Back and Edit Phase 1?
**Choice: YES**
- Edit Phase 1 → Phase 2 scores auto-recalculate
- This encourages iteration / self-reflection
- **Implementation:** "Edit Phase 1" link in Phase 2, auto-recomputes Phase 2 scores

---

## Part 7: Edge Cases & Solutions

### Edge Case: Multiplicative Scoring Temptation
**The trap:** "What if we use (Phase1 × Phase2) / 10 to only show strong matches?"
- **Problem:** Kills the Bio 3 + Marine 9 = 2.7 discovery case
- **Solution:** Stick with 40/60 blend. It's discovery-friendly by design.

### Edge Case: Career Missing Ratings
**What if she doesn't rate a required subcategory for a career?**
- **Solution:** Career still appears, but flagged as "Partial Match"
- Example: "UI/UX matches your Tech (8), Digital Design (9), but needs User Research (not rated yet)"
- **UX:** Show on separate "Partial" section with prompt to rate it

### Edge Case: 32 Subcategories Feels Like Too Much?
**Feedback risk:** "Ugh, 32 things to rate?"
- **Solution:** Design as optional exploration
  - Show all 32 as tabs (optional)
  - Encourage rating top interest areas first
  - Progress bar: "3/32 rated — want to rate more?"
  - Button: "Skip to results with what I've rated" (if 5+ rated)

### Edge Case: Conflicting Interests
**Example:** Rates Physics 9, but all Physics subcategories 2-3
- **What it means:** Interested in physics concept, not the execution
- **Solution:** Results show this honestly
- **Career impact:** Careers requiring those aspects rank lower
- **UX:** Offer: "You like Physics but not our subcategories. What aspects interest you?" (free-form text option for Phase 4 customization)

### Edge Case: All Phase 2 Scores Same (8.0, 8.0, 8.0...)
**What it means:** She rated everything consistently (less discrimination)
- **Solution:** Still ranks them (order matters even if scores close)
- **UX:** Suggest: "Try spreading your ratings more to see clearer patterns"

---

## Part 8: Future Enhancements (Phase 4+)

### Phase 4: Job Listings (Future)
Take top careers from Phase 3 → show actual job postings filtered to those roles

### Phase 4b: Salary/Education Timeline
Show: "Here's the path to become X: education needed, salary growth, typical timeline"

### Phase 5: Mentor Matching
Connect with people in those careers for interviews

### Phase 6: Custom Exploration
"None of these feel right? Let me create a custom subcategory" → free-form text

---

## Summary: Weighting Recommendation

**Use 40/60 additive weighting:**

```javascript
const score = (phase1Rating * 0.4) + (phase2Rating * 0.6);
```

**Reasoning:**
- ✓ Allows discovery (Bio 3 + Marine 9 = 6.6, rankable in top 20)
- ✓ Respects foundational interest (Phase 1 still matters 40%)
- ✓ Prioritizes specific interest (Phase 2 is 60%, what she actually wants)
- ✓ Mathematically simple and transparent
- ✓ Not punitive (Physics 9 + Mechanics 2 = 5.4 is still reasonable)
- ✓ Contradicts multiplicative (which would bury discovery)
- ✓ Better than 50/50 (more discovery signal)
- ✓ Better than 35/65 (slightly more respect to Phase 1)

---

## Ready to Build?

All these pieces fit together:
1. Phase 2 UI: Tabs, show all subjects
2. Phase 2 Scoring: 40/60 weighting
3. Phase 2 Data: 32 subcategories, store only rated
4. Phase 3 Mapping: Career profiles with requirements
5. Phase 3 Matching: Calculate match score for each career
6. Phase 3 Display: Ranked by match, show reasoning

Next steps when building:
- [ ] Create subcategories.js with all 32
- [ ] Create Phase 2 component with tab UI
- [ ] Implement 40/60 scoring algorithm
- [ ] Create results display (ranked top 20)
- [ ] Build career profiles database (50-100 careers)
- [ ] Build Phase 3 matching algorithm
- [ ] Test end-to-end flow

