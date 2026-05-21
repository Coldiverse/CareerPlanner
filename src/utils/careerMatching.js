import { CAREERS } from '../data/careers';

// Matching algorithm constants
const MIN_COVERAGE_TO_SHOW = 0.4;
const PERFECT_COVERAGE_BONUS = 0.2;

/**
 * Calculate match score for a single career against user's Phase 2 ratings
 * Returns { score, coverage, tier, shown }
 */
export const calculateCareerMatch = (career, phase2Ratings = {}) => {
  // Find which requirements user has rated
  const ratedRequirements = career.requirements.filter(
    req => phase2Ratings[req.subcategoryId] !== undefined &&
           typeof phase2Ratings[req.subcategoryId] === 'number'
  );

  const totalRequirements = career.requirements.length;
  const coverage = totalRequirements > 0 ? ratedRequirements.length / totalRequirements : 0;

  // Determine if career should be shown or hidden
  const shown = coverage >= MIN_COVERAGE_TO_SHOW;

  // Calculate score only if shown
  let score = 0;
  if (shown && ratedRequirements.length > 0) {
    // Weighted average of rated requirements
    const weightedSum = ratedRequirements.reduce((sum, req) => {
      const userScore = phase2Ratings[req.subcategoryId];
      return sum + (userScore * req.weight);
    }, 0);

    const weightsSum = ratedRequirements.reduce((sum, req) => sum + req.weight, 0);

    score = weightsSum > 0 ? weightedSum / weightsSum : 0;

    // Perfect coverage bonus
    if (coverage === 1.0) {
      score = Math.min(10, score + PERFECT_COVERAGE_BONUS);
    }

    // Ensure score is in valid range
    score = Math.max(0, Math.min(10, score));
  }

  return {
    careerTitle: career.title,
    score: parseFloat(score.toFixed(2)),
    coverage: parseFloat((coverage * 100).toFixed(0)),
    coverageFraction: `${ratedRequirements.length}/${totalRequirements}`,
    shown,
    tier: career.tier,
    ratedRequirementCount: ratedRequirements.length
  };
};

/**
 * Calculate matches for all careers
 * Returns array of {careerId, ...matchData, ...careerData}
 */
export const calculateAllCareerMatches = (phase2Ratings = {}) => {
  const allMatches = CAREERS.map(career => ({
    careerID: career.id,
    description: career.description,
    ...calculateCareerMatch(career, phase2Ratings),
    salary: career.context?.salary || 'N/A',
    education: career.context?.education || 'N/A',
    jobOutlook: career.context?.jobOutlook || 'Not available',
    yearsToEntry: career.context?.yearsToEntry || 'Varies'
  }));

  return allMatches;
};

/**
 * Get shown careers only (coverage >= 40%)
 */
export const getShownCareers = (careerMatches) => {
  return careerMatches.filter(m => m.shown);
};

/**
 * Get hidden careers (exploration section, coverage < 40%)
 */
export const getHiddenCareers = (careerMatches) => {
  return careerMatches.filter(m => !m.shown);
};

/**
 * Sort careers with 4-level tiebreaker
 * 1. Score descending
 * 2. Job outlook (convert to sortable value)
 * 3. Tier (core > advanced > niche > exploratory)
 * 4. Alphabetical by title
 */
export const sortCareers = (careers) => {
  const tierOrder = { core: 0, advanced: 1, niche: 2, exploratory: 3 };

  const jobOutlookValue = (outlook) => {
    if (!outlook) return 0;
    // Parse "Excellent (8% growth)" → 8
    const match = outlook.match(/(\d+)%/);
    return match ? parseInt(match[1]) : 0;
  };

  return [...careers].sort((a, b) => {
    // Primary: score descending
    if (b.score !== a.score) return b.score - a.score;

    // Secondary: job outlook descending
    const outlookA = jobOutlookValue(a.jobOutlook);
    const outlookB = jobOutlookValue(b.jobOutlook);
    if (outlookB !== outlookA) return outlookB - outlookA;

    // Tertiary: tier
    const tierA = tierOrder[a.tier] ?? 4;
    const tierB = tierOrder[b.tier] ?? 4;
    if (tierA !== tierB) return tierA - tierB;

    // Quaternary: alphabetical
    return a.careerTitle.localeCompare(b.careerTitle);
  });
};

/**
 * Filter careers by criteria
 */
export const filterCareers = (careers, filters = {}) => {
  let result = careers;

  // Tier filter
  if (filters.tiers && filters.tiers.length > 0) {
    result = result.filter(c => filters.tiers.includes(c.tier));
  }

  // Salary range filter (simple: $X,XXX = Xk)
  if (filters.salaryMin || filters.salaryMax) {
    result = result.filter(c => {
      if (!c.salary || c.salary === 'N/A') return true;
      // Parse "$80,000 - $160,000" → min: 80000, max: 160000
      const matches = c.salary.match(/\$(\d+,?\d*)/g);
      if (!matches || matches.length === 0) return true;

      const salaryMin = parseInt(matches[0].replace(/\D/g, '')) || 0;
      const salaryMax = matches.length > 1 ? parseInt(matches[1].replace(/\D/g, '')) : salaryMin;

      if (filters.salaryMin && salaryMax < filters.salaryMin) return false;
      if (filters.salaryMax && salaryMin > filters.salaryMax) return false;

      return true;
    });
  }

  // Education filter
  if (filters.educations && filters.educations.length > 0) {
    result = result.filter(c => {
      if (!c.education) return false;
      return filters.educations.some(ed =>
        c.education.toLowerCase().includes(ed.toLowerCase())
      );
    });
  }

  // Match type filter
  if (filters.matchType === 'perfect') {
    result = result.filter(c => c.coverage === 100);
  } else if (filters.matchType === 'strong') {
    result = result.filter(c => c.score >= 7);
  } else if (filters.matchType === 'good') {
    result = result.filter(c => c.score >= 5);
  }

  return result;
};

/**
 * Sort by specific field
 */
export const sortCareersBy = (careers, field = 'score', direction = 'desc') => {
  const sorted = [...careers].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];

    // Handle different types
    if (typeof aVal === 'string') {
      return direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  return sorted;
};

/**
 * Get summary statistics
 */
export const getSummaryStats = (careerMatches) => {
  const shown = careerMatches.filter(m => m.shown);
  const hidden = careerMatches.filter(m => !m.shown);

  const scores = shown.map(m => m.score);
  const avgScore = scores.length > 0
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
    : 'N/A';

  const topScore = scores.length > 0 ? Math.max(...scores) : 0;
  const topCareers = shown.filter(m => m.score === topScore);

  return {
    totalMatches: shown.length,
    shownCount: shown.length,
    hiddenCount: hidden.length,
    avgScore,
    topScore,
    topCareersCount: topCareers.length,
    bestMatchTitle: topCareers.length > 0 ? topCareers[0].careerTitle : 'None'
  };
};

/**
 * Get a specific career with full details
 */
export const getCareerDetails = (careerID) => {
  return CAREERS.find(c => c.id === careerID);
};

/**
 * Calculate coverage message for UI
 */
export const getCoverageMessage = (coverage) => {
  if (coverage === 100) return 'Perfect match! You rated all required areas.';
  if (coverage >= 80) return 'Excellent match. You rated most areas.';
  if (coverage >= 60) return 'Good match. You rated several key areas.';
  if (coverage >= 40) return 'Partial match. Some exploration needed.';
  return 'Limited match. More exploration recommended.';
};

/**
 * Validate that phase2Ratings has valid data
 */
export const validatePhase2Ratings = (ratings) => {
  if (!ratings || typeof ratings !== 'object') return false;

  const values = Object.values(ratings);
  if (values.length === 0) return false;

  return values.every(v => typeof v === 'number' && v >= 0 && v <= 10);
};
