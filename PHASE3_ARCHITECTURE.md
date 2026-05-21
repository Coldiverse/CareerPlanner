# Phase 3 Architecture: Career Path Mapping

## Executive Summary

Phase 3 transforms top 20 subcategories (from Phase 2) into 50-100 ranked career recommendations. This document provides:
- Career database structure with 15 example careers
- Recommended matching algorithm (Hybrid Option D)
- Database design recommendations (hardcoded + Firebase caching)
- Complete UI mockup
- Edge case handling
- Phase 4 integration hints

---

## 1. Career Database Structure

### 1.1 Data Model

Each career needs: title, description, requirements (subcategory weighting), and context (meta info).

```javascript
// careers.js - 50-100 careers with full profiles
export const CAREERS = [
  {
    id: 'software_engineer',
    title: 'Software Engineer',
    tier: 'core', // core, advanced, niche, exploratory
    description: 'Design, build, and maintain software applications across platforms. Write production code, solve complex problems, and collaborate with teams.',
    requirements: [
      { subcategoryId: 'technology_software', weight: 0.95 },      // Core
      { subcategoryId: 'mathematics_discrete', weight: 0.75 },     // Algorithms, logic
      { subcategoryId: 'mathematics_applied', weight: 0.5 },       // Stats for ML/data
      { subcategoryId: 'technology_data', weight: 0.4 },           // Optional: data pipelines
      { subcategoryId: 'physics_thermodynamics', weight: 0.2 },    // Hardware optimization
    ],
    context: {
      salary: '$80,000 - $160,000',
      salaryMedian: 125000,
      education: 'CS degree, bootcamp, or self-taught',
      jobOutlook: 'Excellent (8% growth)',
      demandLevel: 'Very High',
      yearsToEntry: 2,
      skills: ['Python/JavaScript/Go', 'Git', 'REST APIs', 'Database design', 'Problem-solving'],
      careerPath: ['Junior Engineer (0-2yr) → Mid Engineer (2-5yr) → Senior Engineer (5-10yr) → Staff/Lead (10+yr)'],
      relatedCareers: ['web_developer', 'backend_engineer', 'full_stack_engineer'],
    },
    discoveryHint: 'If you love programming fundamentals', // UI helper
  },

  {
    id: 'web_developer',
    title: 'Web Developer (Full Stack)',
    tier: 'core',
    description: 'Build interactive websites and web applications. Work on both frontend (UI) and backend (servers) to create complete experiences.',
    requirements: [
      { subcategoryId: 'technology_web', weight: 0.9 },           // Primary
      { subcategoryId: 'technology_software', weight: 0.8 },      // Backend logic
      { subcategoryId: 'art_design_digital', weight: 0.6 },       // Design sense
      { subcategoryId: 'mathematics_discrete', weight: 0.4 },     // Algorithms
    ],
    context: {
      salary: '$70,000 - $140,000',
      salaryMedian: 105000,
      education: 'Bootcamp (12 weeks), online courses, or CS degree',
      jobOutlook: 'Good (13% growth)',
      demandLevel: 'Very High',
      yearsToEntry: 1,
      skills: ['HTML/CSS/JavaScript', 'React/Vue', 'Node.js', 'Databases', 'Responsive design'],
      careerPath: ['Junior Dev (0-1yr) → Mid Dev (1-3yr) → Senior Dev (3+yr)'],
      relatedCareers: ['frontend_engineer', 'backend_engineer', 'ui_designer'],
    },
    discoveryHint: 'If you like building things users interact with',
  },

  {
    id: 'data_scientist',
    title: 'Data Scientist',
    tier: 'core',
    description: 'Extract insights from data using statistics, machine learning, and visualization. Guide business decisions with data analysis.',
    requirements: [
      { subcategoryId: 'technology_data', weight: 0.95 },         // Core ML/AI
      { subcategoryId: 'mathematics_applied', weight: 0.85 },     // Stats, probability
      { subcategoryId: 'mathematics_pure', weight: 0.5 },         // Mathematical theory
      { subcategoryId: 'technology_software', weight: 0.7 },      // Python/R coding
      { subcategoryId: 'physics_thermodynamics', weight: 0.3 },   // Energy systems analysis
    ],
    context: {
      salary: '$90,000 - $180,000',
      salaryMedian: 135000,
      education: 'MS in CS/Statistics/Math + portfolio, or PhD',
      jobOutlook: 'Excellent (36% growth)',
      demandLevel: 'Very High',
      yearsToEntry: 3,
      skills: ['Python', 'SQL', 'Pandas', 'Scikit-learn', 'Statistics', 'Visualization'],
      careerPath: ['Data Analyst → Junior Data Scientist → Senior Data Scientist → ML Engineer'],
      relatedCareers: ['ml_engineer', 'data_engineer', 'analytics_engineer'],
    },
    discoveryHint: 'If you love finding patterns in numbers',
  },

  {
    id: 'ml_engineer',
    title: 'Machine Learning Engineer',
    tier: 'advanced',
    description: 'Design, train, and deploy machine learning models for production. Optimize algorithms and build scalable ML systems.',
    requirements: [
      { subcategoryId: 'technology_data', weight: 0.95 },
      { subcategoryId: 'mathematics_pure', weight: 0.8 },         // Deep math foundation
      { subcategoryId: 'mathematics_applied', weight: 0.8 },
      { subcategoryId: 'technology_software', weight: 0.85 },     // Strong engineering
      { subcategoryId: 'physics_quantum', weight: 0.3 },          // Quantum ML emerging
    ],
    context: {
      salary: '$120,000 - $220,000',
      salaryMedian: 170000,
      education: 'MS/PhD in CS, Math, or Physics + strong ML portfolio',
      jobOutlook: 'Excellent (35% growth)',
      demandLevel: 'Critical',
      yearsToEntry: 4,
      skills: ['TensorFlow/PyTorch', 'Advanced Python', 'Statistics', 'GPUs', 'Model optimization'],
      careerPath: ['Data Scientist → ML Engineer → Senior ML Engineer → ML Architect'],
      relatedCareers: ['data_scientist', 'ai_researcher', 'nlp_engineer'],
    },
    discoveryHint: 'If you want to teach computers to learn',
  },

  {
    id: 'cybersecurity_analyst',
    title: 'Cybersecurity Analyst',
    tier: 'core',
    description: 'Protect computer systems from cyber attacks. Monitor networks, identify vulnerabilities, and implement security measures.',
    requirements: [
      { subcategoryId: 'technology_security', weight: 0.95 },     // Core
      { subcategoryId: 'technology_software', weight: 0.75 },     // Systems understanding
      { subcategoryId: 'mathematics_discrete', weight: 0.6 },     // Cryptography logic
      { subcategoryId: 'technology_data', weight: 0.4 },          // Threat analytics
    ],
    context: {
      salary: '$75,000 - $145,000',
      salaryMedian: 110000,
      education: 'Security certifications (CompTIA Security+, CEH) + experience',
      jobOutlook: 'Excellent (32% growth)',
      demandLevel: 'Critical',
      yearsToEntry: 2,
      skills: ['Network protocols', 'Encryption', 'Penetration testing', 'Firewalls', 'Incident response'],
      careerPath: ['SOC Analyst → Cybersecurity Analyst → Senior Analyst → Security Manager'],
      relatedCareers: ['network_admin', 'security_architect', 'penetration_tester'],
    },
    discoveryHint: 'If you want to protect systems',
  },

  {
    id: 'physics_engineer',
    title: 'Physics Engineer / Physicist',
    tier: 'core',
    description: 'Apply physics principles to solve engineering problems. Design systems involving energy, mechanics, or quantum phenomena.',
    requirements: [
      { subcategoryId: 'physics_mechanics', weight: 0.95 },       // Core
      { subcategoryId: 'physics_thermodynamics', weight: 0.8 },   // Energy systems
      { subcategoryId: 'mathematics_geometry', weight: 0.85 },    // Calculus crucial
      { subcategoryId: 'mathematics_applied', weight: 0.75 },     // Modeling
      { subcategoryId: 'physics_quantum', weight: 0.5 },          // Modern physics
    ],
    context: {
      salary: '$85,000 - $150,000',
      salaryMedian: 117000,
      education: 'BS Physics + graduate degree for R&D roles',
      jobOutlook: 'Stable (5% growth)',
      demandLevel: 'Moderate',
      yearsToEntry: 3,
      skills: ['MATLAB/Simulink', 'CAD', 'Experimental design', 'Data analysis', 'Physics simulation'],
      careerPath: ['Junior Physicist → Physicist → Senior Physicist → Research Lead'],
      relatedCareers: ['mechanical_engineer', 'aerospace_engineer', 'materials_scientist'],
    },
    discoveryHint: 'If you want to understand how the universe works',
  },

  {
    id: 'mechanical_engineer',
    title: 'Mechanical Engineer',
    tier: 'core',
    description: 'Design and build machines, engines, and mechanical systems. Create solutions for real-world problems using physics and math.',
    requirements: [
      { subcategoryId: 'physics_mechanics', weight: 0.95 },
      { subcategoryId: 'mathematics_geometry', weight: 0.9 },     // Spatial reasoning
      { subcategoryId: 'mathematics_applied', weight: 0.8 },      // Engineering calculations
      { subcategoryId: 'physics_thermodynamics', weight: 0.7 },   // Heat/energy systems
      { subcategoryId: 'technology_software', weight: 0.5 },      // CAD, simulation
    ],
    context: {
      salary: '$75,000 - $135,000',
      salaryMedian: 105000,
      education: 'BS in Mechanical Engineering',
      jobOutlook: 'Stable (4% growth)',
      demandLevel: 'Moderate-High',
      yearsToEntry: 3,
      skills: ['CAD (AutoCAD, SolidWorks)', 'MATLAB', 'Finite Element Analysis', 'Technical drawing'],
      careerPath: ['Junior Engineer → Engineer → Senior Engineer → Engineering Manager'],
      relatedCareers: ['civil_engineer', 'aerospace_engineer', 'automotive_engineer'],
    },
    discoveryHint: 'If you like designing and building physical things',
  },

  {
    id: 'chemist_pharmaceutical',
    title: 'Pharmaceutical Chemist',
    tier: 'core',
    description: 'Develop new drugs and medications. Synthesize compounds, test efficacy, and ensure safety for treating diseases.',
    requirements: [
      { subcategoryId: 'chemistry_organic', weight: 0.95 },       // Drug synthesis
      { subcategoryId: 'chemistry_biochemistry', weight: 0.9 },   // Bio mechanisms
      { subcategoryId: 'chemistry_physical', weight: 0.75 },      // Reactions, kinetics
      { subcategoryId: 'biology_molecular', weight: 0.75 },       // Cellular targets
      { subcategoryId: 'mathematics_applied', weight: 0.6 },      // Data analysis
    ],
    context: {
      salary: '$85,000 - $160,000',
      salaryMedian: 122000,
      education: 'BS Chemistry minimum, MS/PhD for research roles',
      jobOutlook: 'Good (7% growth)',
      demandLevel: 'High',
      yearsToEntry: 3,
      skills: ['Organic synthesis', 'Lab techniques', 'Spectroscopy', 'Regulatory knowledge', 'Chemical modeling'],
      careerPath: ['Chemist → Senior Chemist → Research Scientist → R&D Director'],
      relatedCareers: ['research_chemist', 'chemical_engineer', 'toxicologist'],
    },
    discoveryHint: 'If you want to create life-saving medicines',
  },

  {
    id: 'molecular_biologist',
    title: 'Molecular Biologist',
    tier: 'advanced',
    description: 'Study DNA, genes, and cellular processes at the molecular level. Conduct research to understand disease and develop treatments.',
    requirements: [
      { subcategoryId: 'biology_molecular', weight: 0.95 },       // Core
      { subcategoryId: 'chemistry_biochemistry', weight: 0.9 },   // Biochemistry
      { subcategoryId: 'biology_anatomy', weight: 0.65 },         // Physiological context
      { subcategoryId: 'mathematics_applied', weight: 0.65 },     // Data analysis
      { subcategoryId: 'chemistry_organic', weight: 0.5 },        // Molecular structure
    ],
    context: {
      salary: '$75,000 - $155,000',
      salaryMedian: 115000,
      education: 'BS Biology + MS/PhD for research, BS sufficient for industry roles',
      jobOutlook: 'Good (7% growth)',
      demandLevel: 'High',
      yearsToEntry: 3,
      skills: ['PCR, DNA sequencing', 'Cell culture', 'CRISPR', 'Bioinformatics', 'Lab design'],
      careerPath: ['Research Associate → Senior Research Associate → Scientist → Principal Scientist'],
      relatedCareers: ['genetic_counselor', 'biomedical_engineer', 'bioinformatician'],
    },
    discoveryHint: 'If you want to unlock the secrets of life',
  },

  {
    id: 'environmental_scientist',
    title: 'Environmental Scientist',
    tier: 'core',
    description: 'Study environmental systems and solve ecological problems. Work on conservation, pollution control, and sustainability.',
    requirements: [
      { subcategoryId: 'biology_ecology', weight: 0.95 },         // Core
      { subcategoryId: 'chemistry_environmental', weight: 0.85 }, // Pollution, remediation
      { subcategoryId: 'earth_science', weight: 0.9 },            // (hypothetical - not in subcats)
      { subcategoryId: 'mathematics_applied', weight: 0.7 },      // Modeling
      { subcategoryId: 'physics_thermodynamics', weight: 0.6 },   // Energy systems
    ],
    context: {
      salary: '$65,000 - $125,000',
      salaryMedian: 95000,
      education: 'BS Environmental Science, Biology, or Earth Science',
      jobOutlook: 'Good (8% growth)',
      demandLevel: 'Moderate-High',
      yearsToEntry: 2,
      skills: ['Field sampling', 'GIS mapping', 'Environmental modeling', 'Data analysis', 'Report writing'],
      careerPath: ['Environmental Scientist → Senior Scientist → Project Manager → Director'],
      relatedCareers: ['sustainability_officer', 'conservation_scientist', 'environmental_engineer'],
    },
    discoveryHint: 'If you want to protect the planet',
  },

  {
    id: 'ux_designer',
    title: 'UX/UI Designer',
    tier: 'core',
    description: 'Design user experiences for apps and websites. Conduct research, create prototypes, and ensure interfaces are intuitive and beautiful.',
    requirements: [
      { subcategoryId: 'art_design_digital', weight: 0.95 },      // Core design
      { subcategoryId: 'technology_web', weight: 0.7 },           // Web understanding
      { subcategoryId: 'psychology', weight: 0.8 },               // (hypothetical - user behavior)
      { subcategoryId: 'mathematics_geometry', weight: 0.5 },     // Spatial reasoning
      { subcategoryId: 'technology_software', weight: 0.3 },      // Coding optional
    ],
    context: {
      salary: '$70,000 - $130,000',
      salaryMedian: 100000,
      education: 'Design degree, bootcamp, or self-taught portfolio',
      jobOutlook: 'Good (13% growth)',
      demandLevel: 'High',
      yearsToEntry: 1,
      skills: ['Figma/Adobe XD', 'User research', 'Prototyping', 'Wireframing', 'Accessibility'],
      careerPath: ['Junior Designer → Designer → Senior Designer → Design Lead → Design Manager'],
      relatedCareers: ['graphic_designer', 'product_designer', 'interaction_designer'],
    },
    discoveryHint: 'If you love making beautiful things work perfectly',
  },

  {
    id: 'graphic_designer',
    title: 'Graphic Designer',
    tier: 'core',
    description: 'Create visual content for marketing, branding, and communication. Design logos, layouts, and graphics that tell stories.',
    requirements: [
      { subcategoryId: 'art_design_visual', weight: 0.95 },       // Core visual art
      { subcategoryId: 'art_design_digital', weight: 0.85 },      // Digital tools
      { subcategoryId: 'writing_journalism', weight: 0.5 },       // Communication
      { subcategoryId: 'art_design_crafts', weight: 0.4 },        // Design principles
    ],
    context: {
      salary: '$50,000 - $110,000',
      salaryMedian: 80000,
      education: 'Design degree or strong self-taught portfolio',
      jobOutlook: 'Stable (3% growth)',
      demandLevel: 'Moderate',
      yearsToEntry: 1,
      skills: ['Adobe Creative Suite', 'Typography', 'Color theory', 'Branding', 'Web design basics'],
      careerPath: ['Junior Designer → Designer → Senior Designer → Art Director → Creative Director'],
      relatedCareers: ['art_director', 'motion_designer', 'brand_strategist'],
    },
    discoveryHint: 'If you have a creative eye for visual beauty',
  },

  {
    id: 'writer_author',
    title: 'Writer / Author',
    tier: 'core',
    description: 'Create written content for publication. Write novels, articles, content, or scripts that inform, entertain, or inspire.',
    requirements: [
      { subcategoryId: 'writing_fiction', weight: 0.95 },         // Core for authors
      { subcategoryId: 'art_design_performing', weight: 0.4 },    // Storytelling
      { subcategoryId: 'history_cultural', weight: 0.5 },         // Context, research
      { subcategoryId: 'writing_academic', weight: 0.6 },         // For non-fiction
    ],
    context: {
      salary: '$40,000 - $120,000 (highly variable)',
      salaryMedian: 65000,
      education: 'English/Creative Writing degree or self-taught',
      jobOutlook: 'Competitive (below average growth)',
      demandLevel: 'Moderate',
      yearsToEntry: 2,
      skills: ['Creative writing', 'Editing', 'Research', 'Publishing knowledge', 'Marketing basics'],
      careerPath: ['Junior Writer → Writer → Senior Writer/Editor → Managing Editor'],
      relatedCareers: ['journalist', 'editor', 'content_strategist', 'screenwriter'],
    },
    discoveryHint: 'If you love telling stories through words',
  },

  {
    id: 'historian',
    title: 'Historian / History Professor',
    tier: 'niche',
    description: 'Research and teach history. Uncover historical truths, preserve cultural knowledge, and help people understand the past.',
    requirements: [
      { subcategoryId: 'history_modern', weight: 0.95 },          // Pick modern/ancient
      { subcategoryId: 'history_cultural', weight: 0.85 },        // Cultural context
      { subcategoryId: 'writing_academic', weight: 0.8 },         // Research papers
      { subcategoryId: 'history_military', weight: 0.5 },         // Can specialize
    ],
    context: {
      salary: '$55,000 - $110,000',
      salaryMedian: 75000,
      education: 'PhD in History required for university positions',
      jobOutlook: 'Below average (declining positions)',
      demandLevel: 'Low-Moderate',
      yearsToEntry: 6,
      skills: ['Historical research', 'Archive work', 'Citation mastery', 'Writing', 'Teaching'],
      careerPath: ['PhD student → Assistant Professor → Associate Professor → Full Professor'],
      relatedCareers: ['museum_curator', 'archivist', 'historical_consultant'],
    },
    discoveryHint: 'If you are passionate about understanding our past',
  },

  {
    id: 'data_engineer',
    title: 'Data Engineer',
    tier: 'advanced',
    description: 'Build and maintain data infrastructure. Create pipelines that move and transform data for analytics and ML systems.',
    requirements: [
      { subcategoryId: 'technology_software', weight: 0.95 },     // Strong engineering
      { subcategoryId: 'technology_data', weight: 0.85 },         // Data understanding
      { subcategoryId: 'mathematics_applied', weight: 0.65 },     // Stats knowledge
      { subcategoryId: 'technology_security', weight: 0.5 },      // Data governance
      { subcategoryId: 'mathematics_discrete', weight: 0.6 },     // Algorithms
    ],
    context: {
      salary: '$100,000 - $190,000',
      salaryMedian: 145000,
      education: 'BS CS + strong portfolio, bootcamp possible',
      jobOutlook: 'Excellent (25%+ growth)',
      demandLevel: 'Critical',
      yearsToEntry: 2,
      skills: ['SQL', 'Python', 'Spark/Hadoop', 'ETL', 'Cloud platforms (AWS/GCP)'],
      careerPath: ['Junior Data Engineer → Data Engineer → Senior Data Engineer → Data Architect'],
      relatedCareers: ['backend_engineer', 'database_administrator', 'ml_engineer'],
    },
    discoveryHint: 'If you love building scalable systems',
  },

  {
    id: 'medical_doctor',
    title: 'Medical Doctor / Physician',
    tier: 'core',
    description: 'Diagnose and treat diseases. Help patients live healthier lives through clinical expertise and evidence-based medicine.',
    requirements: [
      { subcategoryId: 'biology_anatomy', weight: 0.95 },         // Human body
      { subcategoryId: 'chemistry_biochemistry', weight: 0.8 },   // Drug mechanisms
      { subcategoryId: 'biology_molecular', weight: 0.6 },        // Disease understanding
      { subcategoryId: 'mathematics_applied', weight: 0.5 },      // Statistics, clinical trials
    ],
    context: {
      salary: '$200,000 - $500,000+ (varies by specialty)',
      salaryMedian: 300000,
      education: 'MD/DO degree + residency (8-11 years total)',
      jobOutlook: 'Good (3% growth, but high demand)',
      demandLevel: 'Critical',
      yearsToEntry: 8,
      skills: ['Diagnosis', 'Patient care', 'Medical knowledge', 'Communication', 'Procedures'],
      careerPath: ['Medical Student → Resident → Board Certified → Specialist/Private Practice'],
      relatedCareers: ['surgeon', 'dentist', 'nurse_practitioner'],
    },
    discoveryHint: 'If you want to heal people',
  },
];
```

### 1.2 Career Tier System

| Tier | Characteristics | Count | When to Show |
|------|-----------------|-------|-------------|
| **core** | High demand, clear path, diverse backgrounds | 12-15 | Everyone |
| **advanced** | Requires more education, specialized skills | 8-12 | High total scores |
| **niche** | Specific to certain interests, lower demand | 8-12 | When exact fit (70%+ match) |
| **exploratory** | Emerging/unusual, curiosity-driven | 5-8 | Always available as "deep dives" |

---

## 2. Matching Algorithm Analysis

### 2.1 Option Comparison

| Aspect | Option A | Option B | Option C | Option D (Recommended) |
|--------|----------|----------|----------|--------|
| **How it works** | Average: Sum(user × weight) / count | Filter first, then score | Multiply Phase 1 × Phase 2 | Score + Coverage filter |
| **Formula** | (user[tech_soft]×0.95 + user[math_discrete]×0.75) / 2 | Show only if 50%+ reqs rated | score × (rated_reqs / total_reqs)² | Hybrid: score if >40% coverage |
| **Handles unrated** | As 0 (penalizes) | Ignored (neutral) | As 0 (harsh) | Normalized (fair) |
| **Partial matches** | Shows all | Filters out | Filters hard | Shows with "70% match" label |
| **Example** | SE: 6.8 if you rated only tech_soft | Only shows careers where 2+/4 reqs rated | SE: 5.2 if Phase2>Phase1 interests | SE: 8.2 with "Excellent fit" + breakdown |
| **Best for** | Complete data | Data-driven users | Balanced approach | **Mixed data + discovery** |

### 2.2 Recommended: Option D (Hybrid)

**Why Option D?**
1. Rewards careers matching user's actual interests (scored path)
2. Hides "phantom matches" from unrated subcategories
3. Shows partial matches with transparency ("70% of requirements rated")
4. Enables "discovery mode" for curious exploration
5. Scales well for users with any rating completion level

**Algorithm Pseudocode**

```javascript
// Phase 3: Match careers to Phase 2 results
// Input: user's Phase 2 scores (top 20 subcategories)
// Output: 50-100 ranked careers with match scores

function scoreCareerForUser(career, userScores, allUserPhase2Ratings) {
  // Step 1: Check coverage
  const ratedRequirements = career.requirements.filter(
    req => req.subcategoryId in allUserPhase2Ratings
  );
  
  if (ratedRequirements.length === 0) {
    // User didn't rate ANY of this career's requirements
    return null; // Hide completely
  }
  
  const coveragePercent = ratedRequirements.length / career.requirements.length;
  
  // Only proceed if 40%+ of requirements are rated
  if (coveragePercent < 0.4) {
    return {
      careerId: career.id,
      score: 0,
      matchType: 'partial_coverage', // "3/4 relevant areas rated"
      hidden: true, // Show in "explore further" section
    };
  }
  
  // Step 2: Calculate weighted match score
  let totalScore = 0;
  let totalWeight = 0;
  
  for (const req of career.requirements) {
    const userScore = userScores[req.subcategoryId] || 0;
    const weight = req.weight;
    
    totalScore += userScore * weight;
    totalWeight += weight;
  }
  
  // Average the weighted scores (normalize to 0-10)
  const baseScore = totalWeight > 0 ? (totalScore / totalWeight) : 0;
  
  // Step 3: Apply coverage bonus (rewards "depth")
  // If user rated ALL career requirements, small bonus
  const coverageBonus = coveragePercent === 1 ? 0.2 : 0;
  
  const finalScore = Math.min(10, baseScore + coverageBonus);
  
  // Step 4: Determine match strength label
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
function generateCareerMatches(
  phase1Ratings,
  phase2Ratings,
  phase2CalculatedScores,
  allCareers = CAREERS
) {
  // Convert calculated scores to user-friendly format
  const userScores = phase2CalculatedScores; // e.g., { technology_software: 8.2, ... }
  
  // Score all careers
  const scoredCareers = allCareers
    .map(career => ({
      ...career,
      matchData: scoreCareerForUser(career, userScores, phase2Ratings)
    }))
    .filter(c => c.matchData !== null);
  
  // Separate into visible and hidden
  const visibleCareers = scoredCareers
    .filter(c => !c.matchData.hidden)
    .sort((a, b) => b.matchData.score - a.matchData.score);
  
  const hiddenCareers = scoredCareers
    .filter(c => c.matchData.hidden)
    .sort((a, b) => {
      // Sort by coverage % first, then by tier
      const tierOrder = { core: 0, advanced: 1, niche: 2, exploratory: 3 };
      if (b.matchData.matchPercent !== a.matchData.matchPercent) {
        return b.matchData.matchPercent - a.matchData.matchPercent;
      }
      return tierOrder[a.tier] - tierOrder[b.tier];
    });
  
  return {
    matches: visibleCareers,      // Top 30-50 careers
    explorable: hiddenCareers,    // Partial matches (explore if curious)
    summary: {
      totalMatches: visibleCareers.length,
      excellentFitCount: visibleCareers.filter(c => c.matchData.matchType === 'excellent_fit').length,
      goodFitCount: visibleCareers.filter(c => c.matchData.matchType === 'good_fit').length,
      averageMatch: (visibleCareers.reduce((sum, c) => sum + c.matchData.score, 0) / visibleCareers.length).toFixed(1),
    }
  };
}
```

### 2.3 Edge Case Handling

| Scenario | Algorithm Behavior | UI Action |
|----------|-------------------|-----------|
| User rated only 3 subcategories | Shows careers matching those 3 (even if only 1/5 reqs) | "Only viewing careers matching your rated interests" |
| User rated all 32 subcategories | All careers visible, ranked by score | Standard "top 50" view |
| All ratings are 1-2 (low interest) | All scores <4, careers still ranked | "No strong matches found—explore tiers below" |
| User rated 0 subcategories | No careers shown | Button to "Go rate subcategories first" |
| Conflicting interests (e.g., physics + design) | Shows careers at intersection | "Unique match: Physics Designer" |
| High variance (3 ratings at 9, rest at 1) | Shows specialized careers for niche interest | Highlights "Specialist path" vs "Generalist" |

---

## 3. Database Design Recommendations

### 3.1 Hardcoded Careers (Recommended for Phase 3)

**Pros:**
- Zero latency (careers loaded with app)
- No Firebase dependency
- Easy to version control
- Simple to iterate and test

**Cons:**
- Manual updates required
- File size grows with career count (50-100 careers ≈ 80KB JSON)
- All users see same careers

**Implementation:**

```javascript
// src/data/careers.js
export const CAREERS = [ ... 100 careers ... ];

// src/data/careerCategories.js
export const CAREER_CATEGORIES = {
  CORE: 'core',
  ADVANCED: 'advanced',
  NICHE: 'niche',
  EXPLORATORY: 'exploratory',
};

// Helper functions
export const getCareersInTier = (tier) => 
  CAREERS.filter(c => c.tier === tier);

export const getCareerById = (id) => 
  CAREERS.find(c => c.id === id);
```

### 3.2 Firebase Caching Strategy (for Phase 4+)

Once careers are finalized, optionally cache pre-calculated scores:

```javascript
// Firebase structure for Phase 3
users/
  {userId}/
    phase2/
      ratings/
        {subcategoryId}: {number}
      calculatedScores/
        {subcategoryId}: {number}
      timestamp: {milliseconds}
    phase3/
      careerMatches/
        {careerId}: {
          score: {number},
          matchType: "excellent_fit|good_fit|...",
          matchPercent: {number},
        }
      topMatches: [
        { careerId: "...", score: 8.5 },
        ...
      ]
      timestamp: {milliseconds}

// Query for user's Phase 3 matches:
const phase3Ref = ref(db, `users/${userId}/phase3/careerMatches`);
onValue(phase3Ref, (snapshot) => {
  const matches = snapshot.val();
  // Process matches...
});
```

---

## 4. UI/UX Design for Phase 3

### 4.1 Main Results Page Layout

```
┌─────────────────────────────────────────────┐
│  Career Path Explorer - Phase 3 Results    │
├─────────────────────────────────────────────┤
│                                             │
│  📊 SUMMARY CARD                            │
│  ├─ 42 career matches found                 │
│  ├─ 8 excellent fits (7.5+)                │
│  ├─ 18 good fits (6.0-7.4)                 │
│  └─ "Deep Dive" mode available             │
│                                             │
├─────────────────────────────────────────────┤
│  FILTERS & SORT                             │
│  ┌─ By Tier: ☑ Core ☑ Advanced ☐ Niche   │
│  ├─ By Salary: $0 ——●———— $500K            │
│  ├─ By Education: All ▼                     │
│  └─ Sort: Score↓ | Salary↓ | Title         │
│                                             │
├─────────────────────────────────────────────┤
│  RESULTS                                    │
│                                             │
│  #1 | Software Engineer           8.6/10 ★★ │
│  ├─ Full Stack | $80-160K | BS CS + boot   │
│  ├─ Match: Tech Software (0.95), Math Disc │
│  │          Tech Web (0.7)                  │
│  └─ [VIEW DETAILS] [LEARN MORE]            │
│                                             │
│  #2 | Web Developer (Full Stack)  8.3/10 ★★ │
│  ├─ ...                                     │
│  ├─ [VIEW DETAILS] [LEARN MORE]            │
│                                             │
│  #3 | Data Scientist              7.9/10 ★★ │
│  ├─ ...                                     │
│                                             │
│  [Load More] or infinite scroll...          │
│                                             │
├─────────────────────────────────────────────┤
│  EXPLORE FURTHER                            │
│  "70% match: Physicist" (only 3/4 rated)   │
│  "50% match: Historian" (only 2/4 rated)   │
│  [View Partial Matches →]                   │
│                                             │
└─────────────────────────────────────────────┘
```

### 4.2 Career Card Component

```jsx
<CareerCard
  rank={1}
  career={softwareEngineer}
  matchData={{
    score: 8.6,
    matchType: 'excellent_fit',
    matchPercent: 100,
    ratedReqs: 4,
    totalReqs: 4,
  }}
  onViewDetails={() => openModal(softwareEngineer)}
/>
```

**Card Visual:**
```
┌──────────────────────────────────────────┐
│ #1  Software Engineer          8.6/10    │
│     ★★★★★                                │
├──────────────────────────────────────────┤
│ Full Stack | $80-160K | BS CS + bootcamp│
│                                          │
│ Match: Excellent Fit (100% coverage)    │
│ ✓ Technology: Software Development      │
│ ✓ Mathematics: Discrete Math            │
│ ✓ Mathematics: Applied Math             │
│ ✓ Technology: Web Development           │
│                                          │
│ Demand: Very High | Growth: 8% annually │
│                                          │
│ [▶ Details] [💼 Explore] [★ Save]       │
└──────────────────────────────────────────┘
```

### 4.3 Career Details Modal

Click "Details" → Opens sidebar/modal:

```
┌────────────────────────────────────────────┐
│ ✕                                          │
│ Software Engineer (Full Stack Development) │
├────────────────────────────────────────────┤
│                                            │
│ Match Score: 8.6/10 [████████░] 86%       │
│ Tier: CORE | Demand: VERY HIGH            │
│                                            │
│ ─ DESCRIPTION                              │
│ Design, build, and maintain software...   │
│                                            │
│ ─ YOUR FIT                                 │
│ You rated these relevant skills:          │
│ • Technology: Software Dev    [9/10] ✓    │
│ • Math: Discrete Math         [8/10] ✓    │
│ • Math: Applied Math          [7/10] ✓    │
│ • Tech: Web Development       [6/10] ✓    │
│                                            │
│ Not yet rated:                            │
│ • Physics: Thermodynamics (0.2 weight)    │
│                                            │
│ ─ CAREER PATH                              │
│ Junior (0-2yr) → Mid (2-5yr) →             │
│ Senior (5-10yr) → Staff/Lead (10+yr)      │
│                                            │
│ ─ SALARY & OUTLOOK                         │
│ Median: $125,000                          │
│ Range: $80,000 - $160,000                 │
│ Job Growth: 8% (Excellent)                │
│ Demand Level: Very High                   │
│                                            │
│ ─ EDUCATION & SKILLS                      │
│ Education: CS degree, bootcamp, or       │
│            self-taught with portfolio    │
│ Entry Time: 2 years typical               │
│                                            │
│ Key Skills:                               │
│ • Python/JavaScript/Go                    │
│ • Git & version control                   │
│ • REST API design                         │
│ • Database design                         │
│ • Problem-solving                         │
│                                            │
│ ─ RELATED CAREERS                         │
│ If you like this, explore:                │
│ • Web Developer (8.4/10 match)            │
│ • Backend Engineer (8.2/10 match)         │
│ • Full Stack Engineer (8.3/10 match)      │
│                                            │
│ ─ DISCOVERY TIP                           │
│ "You seem drawn to building products     │
│  people interact with. Try the UX/UI     │
│  Designer career (7.1/10)."               │
│                                            │
│ [Phase 4] Next: Find Job Listings →       │
│ [★ Save] [Share] [Print]                  │
│                                            │
└────────────────────────────────────────────┘
```

### 4.4 Filters & Discovery UX

**Tier Filter:**
- ☑ Core (default checked)
- ☑ Advanced (default checked)
- ☐ Niche (checked only if user clicks)
- ☐ Exploratory (special "deep dive" mode)

**Salary Filter:**
- Interactive slider (min/max range selector)
- Or preset buttons: [Entry Level $0-75K] [Mid $75-150K] [Senior $150K+]

**Education Filter:**
- ▼ All
- High school equivalent
- Associate/Certificate
- Bachelor's degree
- Master's degree
- PhD/Professional

**Sort Options:**
- Score (highest first) — default
- Salary (highest first)
- Demand (lowest entry time first)
- Alphabetical

### 4.5 "Explore Further" Section

For partial matches (30-40% coverage), show in separate section:

```
┌─────────────────────────────────────────┐
│ EXPLORE FURTHER                          │
│ These careers match some of your        │
│ interests but you haven't rated all     │
│ relevant skills yet.                     │
├─────────────────────────────────────────┤
│                                         │
│ Physicist               [Explore]       │
│ You rated: Mechanics, Thermodynamics   │
│ Missing: Quantum Physics, Astronomy    │
│ Match: 50% coverage                    │
│ Discovery: "Great fit if you explore  │
│ quantum and space physics"              │
│                                         │
│ Historian               [Explore]       │
│ You rated: Modern History              │
│ Missing: Ancient, Cultural, Military   │
│ Match: 25% coverage                    │
│                                         │
└─────────────────────────────────────────┘
```

Clicking [Explore] → Jumps back to Phase 2, shows unrated subcategories highlighted.

---

## 5. Component Architecture

```
src/components/
├─ PhaseThree.jsx              (main container)
│  ├─ state: matchResults, filters, sortBy, expandedCareer
│  ├─ handlers: onFilterChange, onSort, onCareerClick
│  └─ computed: visibleCareers (apply filters/sort)
│
├─ PhaseThreeResults.jsx       (results page, wraps below)
│  ├─ CareerSummary.jsx        (stat cards at top)
│  ├─ FilterBar.jsx            (tier, salary, education, sort)
│  ├─ CareerCard.jsx           (individual career card)
│  │  ├─ score display (8.6/10)
│  │  ├─ match type badge
│  │  ├─ quick stats
│  │  └─ action buttons
│  │
│  ├─ CareerDetailsModal.jsx   (full career info, sidebar)
│  │  ├─ description
│  │  ├─ fit breakdown
│  │  ├─ career path
│  │  ├─ salary/outlook
│  │  ├─ education/skills
│  │  ├─ related careers
│  │  └─ discovery hints
│  │
│  ├─ ExploreSection.jsx       (partial matches)
│  │  └─ PartialCareerCard.jsx
│  │
│  └─ EmptyState.jsx           (if no matches)
│
├─ utils/careerMatching.js     (scoring algorithm)
├─ data/careers.js             (100 careers hardcoded)
└─ data/careerCategories.js    (tier system)
```

---

## 6. Phase 3 Implementation Checklist

### 6.1 Data Layer
- [ ] Create `src/data/careers.js` with 50-100 careers (see examples above)
- [ ] Create `src/data/careerCategories.js` with tier system
- [ ] Add helper functions: `getCareersInTier()`, `getCareerById()`, `searchCareers()`

### 6.2 Logic Layer
- [ ] Create `src/utils/careerMatching.js` with scoring algorithm
  - [ ] `scoreCareerForUser()` function
  - [ ] `generateCareerMatches()` function
  - [ ] Edge case handlers
- [ ] Add tests for matching algorithm

### 6.3 UI Layer
- [ ] `CareerSummary.jsx` — stat cards
- [ ] `FilterBar.jsx` — tier, salary, education, sort
- [ ] `CareerCard.jsx` — individual card component
- [ ] `CareerDetailsModal.jsx` — sidebar with full details
- [ ] `ExploreSection.jsx` — partial matches
- [ ] `PhaseThreeResults.jsx` — main page layout

### 6.4 Integration
- [ ] Update `App.jsx` to include Phase 3 route
- [ ] Add navigation from Phase 2 Results → Phase 3
- [ ] Pass `phase2CalculatedScores` to Phase 3 component
- [ ] Cache Phase 3 results to Firebase (optional Phase 4)

### 6.5 Testing
- [ ] Unit tests: scoring algorithm with various user inputs
- [ ] Integration tests: Phase 2 → Phase 3 data flow
- [ ] UI tests: filter, sort, modal interactions
- [ ] Edge cases: no ratings, all low scores, conflicting interests

---

## 7. Firebase Integration (Optional, Phase 4+)

### 7.1 Save Phase 3 Results (Lazy)

Only save if user clicks "Save Match" or "Explore Phase 4":

```javascript
async function savePhase3Results(userId, careerMatches) {
  const db = getDatabase();
  const phase3Ref = ref(db, `users/${userId}/phase3`);
  
  await set(phase3Ref, {
    careerMatches: careerMatches.reduce((acc, c) => {
      acc[c.id] = {
        score: c.matchData.score,
        matchType: c.matchData.matchType,
        matchPercent: c.matchData.matchPercent,
      };
      return acc;
    }, {}),
    topMatches: careerMatches.slice(0, 10).map(c => ({
      careerId: c.id,
      score: c.matchData.score,
    })),
    timestamp: Date.now(),
  });
}
```

### 7.2 Load Phase 3 on Revisit

```javascript
async function loadPhase3Data(userId) {
  const db = getDatabase();
  const phase3Ref = ref(db, `users/${userId}/phase3`);
  
  onValue(phase3Ref, (snapshot) => {
    if (snapshot.exists()) {
      const phase3Data = snapshot.val();
      // Reconstruct career matches from cached data
      restoreCareerMatches(phase3Data);
    }
  });
}
```

---

## 8. Phase 4 Architecture Hints

### 8.1 Job Listings Integration

```javascript
// Phase 4: Map top 10 careers to job listings
// Data sources: LinkedIn API, ZipRecruiter, Indeed, Levels.fyi, Glassdoor

function Phase4JobListings({ topCareers }) {
  // For each career in user's top 5:
  // 1. Search job boards using career.title
  // 2. Filter by salary (user's target?) and location
  // 3. Show: title, company, salary, location, link
  
  return (
    <div>
      <h2>Active Job Listings</h2>
      {topCareers.map(career => (
        <JobListingsForCareer key={career.id} career={career} />
      ))}
    </div>
  );
}
```

### 8.2 Learning Paths Integration

```javascript
// Phase 4: Courses & skills to reach top career

const learningPaths = {
  software_engineer: {
    current: 'beginner', // Inferred from Phase 2 ratings
    target: 'mid',
    courses: [
      { title: 'Python Fundamentals', platform: 'freeCodeCamp', hours: 4 },
      { title: 'Data Structures', platform: 'Coursera', hours: 30 },
      { title: 'Web Dev Bootcamp', platform: 'Udemy', hours: 40 },
    ],
    timeline: '6-12 months',
    cost: '$500-2000',
  },
};
```

### 8.3 Mentor Matching

```javascript
// Phase 4: Connect with people in target careers
// Data: scrape LinkedIn, build mentor database, match by:
// 1. Career (must be in user's top 5)
// 2. Location (optional)
// 3. Availability (availability hours/week)

function MentorMatching({ userTop5Careers, userLocation }) {
  // Query: SELECT * FROM mentors 
  //        WHERE career IN userTop5Careers
  //        ORDER BY years_in_role DESC, rating DESC
  
  return (
    <div>
      <h2>Mentors in Your Path</h2>
      {mentors.map(m => (
        <MentorCard key={m.id} mentor={m} />
      ))}
    </div>
  );
}
```

---

## 9. Edge Cases & Fallback Behaviors

### 9.1 No Phase 2 Ratings

**Scenario:** User tries Phase 3 without rating any subcategories.

**Behavior:**
```jsx
if (Object.keys(phase2Ratings).length === 0) {
  return (
    <EmptyState
      title="Rate subcategories first"
      message="Phase 3 matches careers to your Phase 2 ratings."
      action={<Button onClick={goToPhase2}>← Go Rate Subcategories</Button>}
    />
  );
}
```

### 9.2 Very Low Ratings

**Scenario:** User rated all subcategories 1-2/10 (low interest).

**Behavior:**
```javascript
const matches = generateCareerMatches(...);

if (matches.summary.averageMatch < 3) {
  return (
    <CareersFound>
      <Alert>
        No strong matches found at your interest levels.
        <Details>
          This often means you haven't found your passion area yet.
          Try: Adjust ratings (6-10 for interests), explore "Niche" tier,
          or revisit Phase 2 subcategories.
        </Details>
      </Alert>
      {/* Still show careers, but ranked */}
    </CareersFound>
  );
}
```

### 9.3 Conflicting Interests

**Scenario:** High scores in Physics (9) + Visual Art (8), creating a unique profile.

**Behavior:**
```javascript
// Algorithm naturally finds careers at intersection
// e.g., "Architectural Visualization", "Scientific Illustrator", "Physics Animator"

const uniqueMatches = matches.filter(
  c => c.matchData.matchPercent === 100 && 
       c.requirements.length > 2 && 
       c.requirements.some(r => r.parentSubject === 'physics') &&
       c.requirements.some(r => r.parentSubject === 'art_design')
);

// Show with special badge: "Unique Match"
```

### 9.4 User Only Rated 1-2 Subcategories

**Scenario:** User rated only "Tech Software" (9/10) and nothing else.

**Behavior:**
```javascript
const ratedCount = Object.keys(phase2Ratings).length;

if (ratedCount < 4) {
  return (
    <CareersFound>
      <Alert>
        Showing careers matching your {ratedCount} rated area(s).
        Rate more subcategories for broader matches!
        <Button onClick={goToPhase2}>Rate More →</Button>
      </Alert>
      {/* Show all careers that use Tech Software, ranked by that single criterion */}
    </CareersFound>
  );
}
```

### 9.5 All Ratings Equal (User Can't Decide)

**Scenario:** User rated everything 5/10 (undecided).

**Behavior:**
```javascript
const scores = Object.values(calculatedScores);
const variance = standardDeviation(scores);

if (variance < 0.5) {
  return (
    <CareersFound>
      <Alert>
        You seem equally interested in everything!
        <Details>
          Try this: In Phase 2, rate things you LOVE as 8-10 and things 
          you're less sure about as 1-3. This will reveal your true passions.
        </Details>
      </Alert>
      {/* Show all careers sorted by their tier/demand, since user can't distinguish */}
    </CareersFound>
  );
}
```

---

## 10. Performance & Optimization

### 10.1 Scoring Performance

- **Career count:** 100 careers × 4 avg requirements = 400 calculations
- **Time:** < 100ms on client (JavaScript)
- **Caching:** Memoize results if user doesn't change Phase 2 ratings

```javascript
const memoizedMatches = useMemo(
  () => generateCareerMatches(phase1, phase2, scores, CAREERS),
  [phase2Ratings] // Recalculate only if Phase 2 changes
);
```

### 10.2 Firebase Lazy Loading

Don't fetch Phase 3 data on initial load. Only save if user:
1. Clicks "Save Career"
2. Advances to Phase 4
3. Shares results

---

## 11. Duplicate & Career Ladder Prevention

### 11.1 Avoid Duplicates

Don't have both "Software Engineer" and "Full Stack Engineer" unless they serve different purposes.

**Strategy:**
- "Software Engineer" = generalist (backend + frontend + systems)
- "Web Developer" = specialist (web stack: HTML/CSS/JS/React)
- "Backend Engineer" = specialist (servers, APIs, databases)
- Only include both if they have significantly different requirements

### 11.2 Career Ladders

Represent progression via `relatedCareers` field (not as separate careers):

```javascript
{
  id: 'junior_software_engineer',
  title: 'Junior Software Engineer',
  // ...
  relatedCareers: [
    'software_engineer', // Mid-level (natural progression)
    'senior_software_engineer',
    'staff_engineer',
  ],
}
```

**Or:** Skip junior/senior labels and infer from salary/yearsToEntry.

---

## 12. Data Governance & Updates

### 12.1 Career Data Maintenance

**Salary data:** Update annually (check BLS, Glassdoor, Levels.fyi)
**Job outlook:** Update annually (check BLS Occupational Outlook Handbook)
**Skills list:** Update quarterly (tech changes faster)

**Location:** Currently ignore location. For Phase 4+, add `salaryByLocation` field.

### 12.2 A/B Testing Career Descriptions

Phase 3 is a good place to A/B test career descriptions:
- Variant A: Formal description (education-first)
- Variant B: Story-based (day-in-life narrative)

---

## Summary

| Aspect | Recommendation |
|--------|---|
| **Matching Algorithm** | Option D (Hybrid) — Score with 40% coverage filter |
| **Database** | Hardcoded careers (50-100) in `src/data/careers.js` |
| **Firebase Role** | Cache Phase 3 results for Phase 4+ |
| **UI Approach** | Cards (main) + modal (details) + filters + discovery |
| **Career Count** | Start with 50, expand to 100 as needed |
| **Tier System** | Core (15), Advanced (10), Niche (10), Exploratory (8) |
| **Testing** | Unit tests for scoring, E2E tests for Phase 2 → 3 flow |
| **Phase 4 Preview** | Job listings, learning paths, mentor matching |

**Implementation Time Estimate:**
- Phase 3 Core (scoring + UI): 2-3 weeks
- Full Phase 3 (100 careers + all features): 4-5 weeks
- Phase 4 (job listings, etc.): 3-6 weeks

