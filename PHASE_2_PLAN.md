# Phase 2 Plan: Subject Subcategories & Weighted Ranking

## Overview

Phase 2 takes the 8 subject ratings from Phase 1 and expands each into 3-4 more specific subcategories. User rates these, and they're ranked by a weighted combination of Phase 1 + Phase 2 ratings.

**Example flow:**
1. Phase 1: User rates "Physics" → 8/10
2. Click "Next" button
3. Phase 2: Shows Physics subcategories as tabs:
   - Mechanics & Engineering
   - Astronomy & Space
   - Thermodynamics & Energy
   - Quantum Physics & Modern Physics
4. User rates each subcategory (e.g., Mechanics: 9/10, Astronomy: 6/10)
5. Results sorted by weighted score: Mechanics (9) ranks higher than Astronomy (6)

---

## Subcategories by Subject

### 1. Physics
- **Mechanics & Engineering** — Forces, motion, structures, machines, robotics
- **Astronomy & Space** — Stars, planets, galaxies, space exploration
- **Thermodynamics & Energy** — Heat, energy, entropy, power systems
- **Quantum Physics & Modern Physics** — Atoms, light, relativity, quantum mechanics

### 2. Chemistry
- **Organic Chemistry** — Carbon compounds, synthesis, pharmaceutical chemistry
- **Physical Chemistry** — Reactions, kinetics, thermochemistry, electrochemistry
- **Biochemistry** — Life processes, proteins, metabolism, cell chemistry
- **Environmental & Material Chemistry** — Polymers, metals, environmental remediation, sustainability

### 3. Biology
- **Molecular Biology & Genetics** — DNA, genes, genetic engineering, heredity
- **Ecology & Conservation** — Ecosystems, biodiversity, environmental protection
- **Human Anatomy & Physiology** — Body systems, diseases, medicine, health
- **Marine Biology** — Oceans, sea life, marine ecosystems, aquaculture

### 4. History
- **Ancient History** — Civilizations, empires, archaeology, classical antiquity
- **Modern History** — Recent centuries, industrial age, contemporary events
- **Cultural & Social History** — Societies, art movements, daily life, traditions
- **Military & Political History** — Wars, governments, diplomacy, revolutions

### 5. Mathematics
- **Pure Mathematics** — Algebra, number theory, advanced theory, proofs
- **Applied Mathematics & Statistics** — Data analysis, probability, modeling, predictions
- **Discrete Mathematics & Logic** — Algorithms, set theory, computer science math
- **Geometry & Calculus** — Shapes, space, derivatives, integrals, optimization

### 6. Art & Design
- **Visual Art** — Painting, sculpture, drawing, printmaking, traditional media
- **Digital Design** — Graphic design, UI/UX, web design, illustration
- **Performing Arts** — Music, theater, dance, performance, composition
- **Crafts & Applied Arts** — Pottery, jewelry, textiles, woodworking, fashion design

### 7. Writing & Literature
- **Fiction & Creative Writing** — Novels, short stories, storytelling, screenwriting
- **Academic & Technical Writing** — Research, essays, documentation, proposals
- **Journalism & Content Creation** — News, blogging, social media, podcasting
- **Poetry & Literary Analysis** — Poetry, literary criticism, classics, interpretation

### 8. Technology & Computing
- **Software Development & Programming** — Coding, backend, full-stack, software engineering
- **Data Science & AI** — Machine learning, data analysis, artificial intelligence
- **Web Development & Frontend** — Websites, user interfaces, responsive design
- **Cybersecurity & Systems** — Network security, infrastructure, IT operations, cloud

---

## UI/UX Flow

### Phase 2 Interface

**Step 1: Filter by Phase 1 Ratings**
- Only show subjects where Phase 1 rating >= 4/10 (configurable threshold)
- Example: If Physics=8, Chemistry=5, Biology=3, only show Physics & Chemistry tabs
- If all subjects < 4, show message "Would you like to explore lower-rated subjects too?"

**Step 2: Tab Navigation**
```
[Physics] [Chemistry] [Biology]
```
- Click tab to view that subject's 4 subcategories
- Current tab highlighted
- Badge shows "4/4 rated" or "2/4 rated" per subject

**Step 3: Rate Subcategories**
Similar to Phase 1 UI:
- Card per subcategory with description
- Slider + star rating interface
- Auto-save to Firebase
- Shows "Saving..." → "✓ Saved"

**Step 4: Results Summary & Ranking**
After all rated:
- Show **Top 20 Subcategories by Weighted Score**
- Format:
  ```
  1. Physics - Mechanics & Engineering    [9.2/10]
  2. Physics - Quantum Physics            [8.7/10]
  3. Chemistry - Organic Chemistry        [8.1/10]
  4. Technology - Software Development    [7.9/10]
  ...
  ```
- Show calculation: "Your top match combines Physics (8/10) + Mechanics (9/10)"

---

## Weighting Algorithm

### Weighted Score Formula

```
subCategory_score = (phase1_rating × 0.35) + (phase2_rating × 0.65)
```

**Why these weights?**
- Phase 2 (65%): More specific, reflects actual preference for the narrower topic
- Phase 1 (35%): Context, shows foundational interest

**Example:**
- User rated Physics = 8/10 in Phase 1
- User rated Mechanics = 9/10 in Phase 2
- Score = (8 × 0.35) + (9 × 0.65) = 2.8 + 5.85 = **8.65/10**

### Ranking Logic

1. Calculate score for each rated subcategory
2. Sort descending by score
3. Display top 20 (or all if < 20)
4. Also show unrated subcategories at bottom with note "Not rated yet"

---

## Data Structure (Firebase)

### Current (Phase 1 only)
```
users/{userId}/phase1/
  ratings/
    physics: 8
    chemistry: 5
    biology: 3
    history: 6
    mathematics: 7
    art_design: 9
    writing_literature: 5
    technology_computing: 9
  timestamp: 1234567890
```

### Phase 2 Addition
```
users/{userId}/phase2/
  ratings/
    physics_mechanics: 9
    physics_astronomy: 6
    physics_thermodynamics: 7
    physics_quantum: 8
    chemistry_organic: 8
    chemistry_physical: 5
    chemistry_bio: 6
    chemistry_environmental: 4
    ...
    (32 total: 8 subjects × 4 subcategories each)
  timestamp: 1234567890
  calculated_scores/  (optional, for analytics)
    physics_mechanics: 8.65
    ...
```

---

## Implementation Steps (No Build Yet)

1. **Create Phase 2 component structure:**
   ```
   src/components/PhaseTwo.jsx
   ├─ Load Phase 1 ratings from Firebase
   ├─ Filter subjects with rating >= 4
   ├─ Tab navigation component
   └─ Reuse SubjectCard for subcategories
   
   src/data/subcategories.js
   └─ Define all 32 subcategories with descriptions
   
   src/utils/scoring.js
   └─ Weighting algorithm & ranking logic
   ```

2. **Update App.jsx:**
   - Add conditional: if Phase 1 complete & "Next" clicked, show Phase 2
   - Load Phase 1 data before rendering Phase 2

3. **Add "Next" button to Phase 1:**
   - Appears after all 8 subjects rated
   - Navigates to Phase 2

4. **Build Phase 2 Results view:**
   - Show top 20 ranked subcategories
   - Show Phase 1 + Phase 2 scores for context
   - Option: "Start Over" to re-rate

5. **Future: Phase 3**
   - Load top 20 subcategories
   - Map to career paths
   - Same weighted ranking system

---

## UI Mockup (Text)

### Phase 2 - Tab Navigation
```
┌─────────────────────────────────────────────────┐
│  Career Path Explorer - Phase 2                 │
│  Let's narrow down your interests               │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Physics] [Chemistry] [Biology]                │
│   (4/4)     (3/4)       (2/4)                   │
│                                                 │
├─────────────────────────────────────────────────┤
│  Physics Subcategories:                         │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ Mechanics & Engineering                  │  │
│  │ Forces, motion, structures, robotics     │  │
│  │ Rating: [====|====|====] 9/10           │  │
│  │ ⭐⭐⭐⭐⭐                              │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ Astronomy & Space                        │  │
│  │ Stars, planets, space exploration        │  │
│  │ Rating: [===|===|===|] 6/10             │  │
│  │ ⭐⭐⭐                                  │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  [... more cards ...]                          │
│                                                 │
│  Saving... ✓ Saved                             │
└─────────────────────────────────────────────────┘
```

### Phase 2 Results
```
┌─────────────────────────────────────────────────┐
│  Your Top Career Paths                          │
│  Based on your interests in Phase 1 & 2         │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. Physics: Mechanics & Engineering     [9.2] │
│     Physics (8) + Mechanics (9) = 8.65          │
│                                                 │
│  2. Physics: Quantum Physics             [8.7] │
│     Physics (8) + Quantum (8) = 8.00            │
│                                                 │
│  3. Technology: Software Development     [8.1] │
│     Technology (9) + Software (7) = 7.85        │
│                                                 │
│  4. Art & Design: Digital Design         [8.0] │
│     Art (9) + Digital (7) = 8.20                │
│                                                 │
│  [... more ...]                                │
│                                                 │
│  [Start Over] [Continue to Phase 3]            │
└─────────────────────────────────────────────────┘
```

---

## Alternative: Threshold Question

**Instead of auto-hiding low-rated subjects:**

At start of Phase 2, ask:
```
We found you highly interested in:
✓ Physics (8/10)
✓ Art & Design (9/10)

Would you like to also explore your other interests?
[Yes, show all subjects] [No, just my top rated]
```

This respects that even a 3/10 subject might have interesting subcategories.

---

## Configuration (Tweakable)

These can be changed without rebuilding logic:

```javascript
// In Phase 2 config
const PHASE_2_CONFIG = {
  minRatingToShow: 4,           // Hide subjects < 4/10
  phase1Weight: 0.35,           // Weight of Phase 1 rating
  phase2Weight: 0.65,           // Weight of Phase 2 rating
  maxResultsToShow: 20,         // Top N results displayed
  autoSaveDebounce: 500,        // ms before save
};
```

---

## Next Steps When Ready to Build

1. Create `src/data/subcategories.js` with all descriptions
2. Create `src/components/PhaseTwo.jsx` with tab + card UI
3. Create `src/utils/scoring.js` with weighting logic
4. Create `src/components/PhaseTwo/Results.jsx` for ranking display
5. Update `App.jsx` to add Phase 1 → Phase 2 transition
6. Update `PhaseOne.jsx` to add "Next" button
7. Test: Rate Phase 1 → Click Next → Rate Phase 2 → See ranking

---

## Questions to Decide Before Building

1. **Threshold:** Show all subjects in Phase 2, or hide < 4/10?
2. **Weights:** Keep 35/65 split, or adjust?
3. **Results:** Show top 20, or user-configurable?
4. **Future:** Will Phase 3 pick career paths from these top subcategories?
5. **UI:** Tabs, or vertical scrolling with section headers?
