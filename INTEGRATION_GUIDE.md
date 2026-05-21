# Phase 3 Careers Database Integration Guide

## Quick Start

### 1. Import the Database
```javascript
// In your Phase 3 component
import { 
  CAREERS, 
  CAREERS_BY_TIER, 
  getCareersForSubcategory,
  getCareersForTier,
  getCareerById 
} from './data/careers.js';
```

### 2. Query Careers
```javascript
// Get all core careers
const coreCareers = CAREERS_BY_TIER.core;

// Get careers for a specific subcategory
const biologyJobs = getCareersForSubcategory('biology_anatomy');

// Get all careers in a tier
const advancedCareers = getCareersForTier('advanced');

// Get a specific career
const softwareEngineer = getCareerById('software-engineer');
```

---

## Database Structure

### Career Object
```javascript
{
  id: 'software-engineer',                    // Unique identifier
  title: 'Software Engineer',                 // Display name
  tier: 'core',                               // 'core' | 'advanced' | 'niche' | 'exploratory'
  description: 'Design, develop...',          // Brief description (1-2 sentences)
  
  requirements: [                             // Array of {subcategoryId, weight}
    { subcategoryId: 'technology_software', weight: 0.95 },
    { subcategoryId: 'mathematics_discrete', weight: 0.70 },
    { subcategoryId: 'technology_data', weight: 0.40 }
  ],
  
  context: {
    salary: {                                 // USD salary ranges
      entry: 85000,
      mid: 130000,
      senior: 180000
    },
    education: "Bachelor's in CS...",         // Education/certification path
    jobOutlook: 'Excellent (22% growth...)',  // Job market outlook
    yearsToEntry: 4,                          // Years to first job
    skills: [                                 // Key skills (3-5+)
      'Problem-solving',
      'System design',
      'Version control',
      'Testing',
      'Code review'
    ],
    careerPath: 'Junior → Engineer → Senior → Tech Lead → Architect',
    relatedCareers: [                         // Adjacent career options
      'Full Stack Developer',
      'Backend Engineer',
      'Mobile Developer',
      'DevOps Engineer'
    ],
    discoveryHint: 'If you enjoy solving puzzles...'  // Phase 2 bridge
  }
}
```

---

## Matching Algorithm

### Basic Score Calculation
```javascript
function scoreCareerMatch(userScores, career) {
  let totalScore = 0;
  
  // Sum weighted user scores for each requirement
  for (const requirement of career.requirements) {
    const userScore = userScores[requirement.subcategoryId] || 0;  // 0-100
    totalScore += userScore * requirement.weight;
  }
  
  // Normalize by requirement count
  return totalScore / career.requirements.length;
}

// Example:
const userScores = {
  'technology_software': 85,
  'mathematics_discrete': 70,
  'technology_data': 45,
  // ... other subcategories
};

const engineerScore = scoreCareerMatch(userScores, CAREERS[0]);
// Result: (85*0.95 + 70*0.70 + 45*0.40) / 3 ≈ 73.2
```

### Recommendation Engine
```javascript
function recommendCareers(userScores, options = {}) {
  const { 
    topN = 5,
    tier = null,           // Optional: filter by tier
    minScore = 0           // Optional: minimum match score
  } = options;
  
  let careersList = CAREERS;
  
  // Filter by tier if specified
  if (tier) {
    careersList = CAREERS_BY_TIER[tier];
  }
  
  // Score and sort all careers
  const scored = careersList
    .map(career => ({
      career,
      score: scoreCareerMatch(userScores, career)
    }))
    .filter(item => item.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
  
  return scored;
}

// Usage:
const topMatches = recommendCareers(userScores);
const topCoreCareers = recommendCareers(userScores, { tier: 'core' });
const topInteresting = recommendCareers(userScores, { topN: 10, minScore: 60 });
```

---

## UI/UX Integration Patterns

### Career Card Component
```jsx
function CareerCard({ career }) {
  return (
    <div className="career-card">
      <h3>{career.title}</h3>
      <span className={`tier-badge tier-${career.tier}`}>
        {career.tier.toUpperCase()}
      </span>
      
      <p className="description">{career.description}</p>
      
      <div className="salary-range">
        <strong>Salary Range:</strong>
        ${career.context.salary.entry}k - ${career.context.salary.senior}k
      </div>
      
      <div className="education">
        <strong>Education:</strong>
        {career.context.education}
      </div>
      
      <div className="job-outlook">
        <strong>Job Outlook:</strong>
        {career.context.jobOutlook}
      </div>
      
      <div className="requirements">
        <strong>Key Subcategories:</strong>
        {career.requirements.map(req => (
          <span key={req.subcategoryId}>
            {req.subcategoryId} ({Math.round(req.weight * 100)}%)
          </span>
        ))}
      </div>
      
      <div className="skills">
        <strong>Key Skills:</strong>
        <ul>
          {career.context.skills.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      
      <div className="related">
        <strong>Related Careers:</strong>
        {career.context.relatedCareers.join(', ')}
      </div>
      
      <div className="hint">
        <em>💡 {career.context.discoveryHint}</em>
      </div>
    </div>
  );
}
```

### Career Comparison View
```jsx
function CareerComparison({ careers }) {
  return (
    <table className="comparison">
      <thead>
        <tr>
          <th>Career</th>
          <th>Tier</th>
          <th>Entry Salary</th>
          <th>Senior Salary</th>
          <th>Education</th>
          <th>Years to Entry</th>
        </tr>
      </thead>
      <tbody>
        {careers.map(career => (
          <tr key={career.id}>
            <td>{career.title}</td>
            <td>{career.tier}</td>
            <td>${career.context.salary.entry}k</td>
            <td>${career.context.salary.senior}k</td>
            <td>{career.context.education}</td>
            <td>{career.context.yearsToEntry}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Matched Careers Display
```jsx
function MatchedCareers({ userScores }) {
  const topMatches = recommendCareers(userScores, { topN: 5 });
  
  return (
    <div className="matched-careers">
      <h2>Your Top Career Matches</h2>
      {topMatches.map(({ career, score }) => (
        <div key={career.id} className="match-item">
          <div className="match-score">
            <div className="score-circle">
              {Math.round(score * 10) / 10}%
            </div>
            <span>Match Score</span>
          </div>
          <CareerCard career={career} />
        </div>
      ))}
    </div>
  );
}
```

---

## Database Statistics for Display

### Tier Overview
```javascript
const tierStats = {
  core: {
    count: CAREERS_BY_TIER.core.length,          // 15
    avgEntry: Math.round(
      CAREERS_BY_TIER.core.reduce((sum, c) => sum + c.context.salary.entry, 0) /
      CAREERS_BY_TIER.core.length
    ),
    avgSenior: Math.round(
      CAREERS_BY_TIER.core.reduce((sum, c) => sum + c.context.salary.senior, 0) /
      CAREERS_BY_TIER.core.length
    )
  },
  // ... repeat for advanced, niche, exploratory
};
```

### Subcategory Coverage
```javascript
function getSubcategoryStats() {
  const stats = {};
  
  // Count careers per subcategory
  for (const subcategoryId of Object.keys(subcategoryMap)) {
    stats[subcategoryId] = {
      count: getCareersForSubcategory(subcategoryId).length,
      careers: getCareersForSubcategory(subcategoryId)
    };
  }
  
  return stats;
}
```

---

## Filtering & Search

### Filter by Tier
```javascript
function filterByTier(tier) {
  return CAREERS_BY_TIER[tier];
}
```

### Filter by Salary Range
```javascript
function filterBySalaryRange(min, max) {
  return CAREERS.filter(career => 
    career.context.salary.entry >= min &&
    career.context.salary.senior <= max
  );
}
```

### Filter by Education Level
```javascript
function filterByEducationYears(maxYears) {
  return CAREERS.filter(career => 
    career.context.yearsToEntry <= maxYears
  );
}
```

### Search by Keywords
```javascript
function searchCareers(keyword) {
  const lower = keyword.toLowerCase();
  
  return CAREERS.filter(career =>
    career.title.toLowerCase().includes(lower) ||
    career.description.toLowerCase().includes(lower) ||
    career.context.skills.some(skill => 
      skill.toLowerCase().includes(lower)
    ) ||
    career.context.jobOutlook.toLowerCase().includes(lower)
  );
}
```

---

## Data Export & Analytics

### Export for Analytics
```javascript
function exportCareersCSV() {
  let csv = 'ID,Title,Tier,Entry Salary,Senior Salary,Years to Entry,Job Outlook\n';
  
  CAREERS.forEach(career => {
    csv += `${career.id},${career.title},${career.tier},${career.context.salary.entry},${career.context.salary.senior},${career.context.yearsToEntry},"${career.context.jobOutlook}"\n`;
  });
  
  return csv;
}
```

### Calculate Statistics
```javascript
function calculateStats() {
  return {
    totalCareers: CAREERS.length,
    byTier: {
      core: CAREERS.filter(c => c.tier === 'core').length,
      advanced: CAREERS.filter(c => c.tier === 'advanced').length,
      niche: CAREERS.filter(c => c.tier === 'niche').length,
      exploratory: CAREERS.filter(c => c.tier === 'exploratory').length
    },
    avgSalaryByTier: {
      core: Math.round(CAREERS_BY_TIER.core.reduce((s, c) => s + c.context.salary.mid, 0) / CAREERS_BY_TIER.core.length),
      advanced: Math.round(CAREERS_BY_TIER.advanced.reduce((s, c) => s + c.context.salary.mid, 0) / CAREERS_BY_TIER.advanced.length),
      niche: Math.round(CAREERS_BY_TIER.niche.reduce((s, c) => s + c.context.salary.mid, 0) / CAREERS_BY_TIER.niche.length),
      exploratory: Math.round(CAREERS_BY_TIER.exploratory.reduce((s, c) => s + c.context.salary.mid, 0) / CAREERS_BY_TIER.exploratory.length)
    }
  };
}
```

---

## Phase 2 to Phase 3 Flow

### Discovery Hint Usage
Each career's `discoveryHint` bridges Phase 2 exploration to Phase 3 selection:

**Phase 2 State**: User rates subcategories
- `biology_anatomy`: 85
- `chemistry_biochemistry`: 70
- `writing_academic`: 60

**Phase 3 Recommendation**:
- Career: **Physician** (score: 78)
- Discovery Hint: *"Medicine combines deep human anatomy knowledge with the ultimate purpose: saving and improving lives."*
- This validates their Phase 2 choices and motivates Phase 3 exploration

---

## Testing & Validation

### Unit Tests
```javascript
// Test career structure
describe('CAREERS database', () => {
  it('should have 87 careers', () => {
    expect(CAREERS.length).toBe(87);
  });
  
  it('should have valid tiers', () => {
    CAREERS.forEach(career => {
      expect(['core', 'advanced', 'niche', 'exploratory'])
        .toContain(career.tier);
    });
  });
  
  it('should have 3-5 requirements per career', () => {
    CAREERS.forEach(career => {
      expect(career.requirements.length).toBeGreaterThanOrEqual(3);
      expect(career.requirements.length).toBeLessThanOrEqual(5);
    });
  });
  
  it('should have all valid subcategoryIds', () => {
    CAREERS.forEach(career => {
      career.requirements.forEach(req => {
        expect(SUBCATEGORIES.map(s => s.id))
          .toContain(req.subcategoryId);
      });
    });
  });
  
  it('should cover all 32 subcategories', () => {
    const covered = new Set();
    CAREERS.forEach(career => {
      career.requirements.forEach(req => {
        covered.add(req.subcategoryId);
      });
    });
    expect(covered.size).toBe(32);
  });
});
```

---

## Performance Considerations

### Data Size
- **File size**: ~95KB (gzipped: ~20KB)
- **Load time**: <100ms
- **Memory footprint**: ~2-3MB in RAM

### Query Optimization
```javascript
// Create index on first load for faster lookups
const careerIndex = {};
CAREERS.forEach(career => {
  careerIndex[career.id] = career;
});

// O(1) lookup instead of O(n)
const quick = careerIndex['software-engineer'];
```

### Caching Strategy
```javascript
// Cache tier-based queries
const tierCache = {};
['core', 'advanced', 'niche', 'exploratory'].forEach(tier => {
  tierCache[tier] = CAREERS_BY_TIER[tier];
});
```

---

## Troubleshooting

### Common Issues

**Q: How do I check if all subcategories are covered?**
```javascript
const allSubcats = new Set(SUBCATEGORIES.map(s => s.id));
const coveredSubcats = new Set();
CAREERS.forEach(c => {
  c.requirements.forEach(r => coveredSubcats.add(r.subcategoryId));
});
console.log('Missing:', [...allSubcats].filter(s => !coveredSubcats.has(s)));
```

**Q: How do I validate weight ranges?**
```javascript
CAREERS.forEach(career => {
  career.requirements.forEach(req => {
    if (req.weight < 0.3 || req.weight > 1.0) {
      console.warn(`Invalid weight in ${career.id}: ${req.weight}`);
    }
  });
});
```

**Q: How do I handle missing salaries in display?**
```javascript
function displaySalary(salary) {
  if (!salary || !salary.entry) return 'N/A';
  return `$${salary.entry}k–$${salary.senior}k`;
}
```

---

## Resources

- **Database File**: `/src/data/careers.js`
- **Specification**: `CAREERS_DATABASE_SPECIFICATION.md`
- **Validation Report**: `VALIDATION_REPORT.md`
- **Subcategories Reference**: `/src/data/subcategories.js`

---

**Status**: ✅ Ready for Phase 3 integration  
**Last Updated**: 2026-05-20
