import { SUBCATEGORIES } from '../data/subcategories';

// Weighting constants (configurable for Phase 3+)
const PHASE1_WEIGHT = 0.4;
const PHASE2_WEIGHT = 0.6;

// Validate a rating value
const isValidRating = (rating) => {
  return typeof rating === 'number' && rating >= 0 && rating <= 10 && !isNaN(rating);
};

// Calculate weighted score for a single subcategory
export const calculatePhase2Score = (phase1Rating, phase2Rating) => {
  // Handle missing Phase 1 rating
  const p1 = isValidRating(phase1Rating) ? phase1Rating : 0;
  const p2 = isValidRating(phase2Rating) ? phase2Rating : 0;

  const score = (p1 * PHASE1_WEIGHT) + (p2 * PHASE2_WEIGHT);

  // Return rounded to 2 decimals for storage, but use full precision for ranking
  return Math.round(score * 100) / 100;
};

// Calculate all scores based on phase2Ratings and phase1Ratings
export const calculateAllScores = (phase1Ratings = {}, phase2Ratings = {}) => {
  const calculatedScores = {};

  // Validate inputs
  const validPhase1 = validatePhase1Ratings(phase1Ratings);

  // Calculate score for each rated subcategory
  Object.entries(phase2Ratings).forEach(([subcategoryId, phase2Rating]) => {
    // Find the parent subject
    const subcat = SUBCATEGORIES.find(sc => sc.id === subcategoryId);

    if (!subcat) {
      console.warn(`Unknown subcategory ID: ${subcategoryId}`);
      return;
    }

    const phase1Rating = validPhase1[subcat.parentSubjectId] || 0;
    calculatedScores[subcategoryId] = calculatePhase2Score(phase1Rating, phase2Rating);
  });

  return calculatedScores;
};

// Validate phase1Ratings on load (filter NaN, out-of-range)
export const validatePhase1Ratings = (ratings = {}) => {
  const validated = {};
  Object.entries(ratings).forEach(([subjectId, rating]) => {
    if (isValidRating(rating)) {
      validated[subjectId] = rating;
    } else {
      console.warn(`Invalid Phase 1 rating for ${subjectId}: ${rating}`);
    }
  });
  return validated;
};

// Get ranked subcategories (top N)
export const getRankedSubcategories = (calculatedScores = {}, topN = 20) => {
  const ranked = Object.entries(calculatedScores)
    .map(([subcategoryId, score]) => ({
      subcategoryId,
      score,
      subcategory: SUBCATEGORIES.find(sc => sc.id === subcategoryId)
    }))
    .filter(item => item.subcategory) // Remove unknown IDs
    .sort((a, b) => {
      // Primary sort: by score descending
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Tiebreaker: stable sort by ID (deterministic)
      return a.subcategoryId.localeCompare(b.subcategoryId);
    })
    .slice(0, topN);

  return ranked;
};

// Get all rated subcategories sorted by score (for results page)
export const getAllRankedSubcategories = (calculatedScores = {}) => {
  return getRankedSubcategories(calculatedScores, Object.keys(calculatedScores).length);
};

// Get unrated subcategories
export const getUnratedSubcategories = (phase2Ratings = {}) => {
  return SUBCATEGORIES.filter(sc => !phase2Ratings[sc.id]);
};

// Format score for display (1 decimal place)
export const formatScore = (score) => {
  return typeof score === 'number' ? score.toFixed(1) : 'N/A';
};

// Get score breakdown (for results page explanation)
export const getScoreBreakdown = (subcategoryId, phase1Ratings = {}, phase2Ratings = {}) => {
  const subcat = SUBCATEGORIES.find(sc => sc.id === subcategoryId);
  if (!subcat) return null;

  const phase1Rating = phase1Ratings[subcat.parentSubjectId] || 0;
  const phase2Rating = phase2Ratings[subcategoryId] || 0;
  const score = calculatePhase2Score(phase1Rating, phase2Rating);

  return {
    phase1Rating: isValidRating(phase1Rating) ? phase1Rating : 0,
    phase2Rating: isValidRating(phase2Rating) ? phase2Rating : 0,
    score,
    formula: `(${phase1Rating} × 0.4) + (${phase2Rating} × 0.6) = ${formatScore(score)}`
  };
};

// Count progress
export const countProgress = (phase2Ratings = {}) => {
  const rated = Object.keys(phase2Ratings).length;
  const total = SUBCATEGORIES.length;
  return { rated, total, percentage: Math.round((rated / total) * 100) };
};

// Get progress by subject
export const getProgressBySubject = (phase2Ratings = {}) => {
  const subjects = {};

  // Initialize all subjects
  ['physics', 'chemistry', 'biology', 'history', 'mathematics', 'art_design', 'writing_literature', 'technology_computing'].forEach(id => {
    subjects[id] = { rated: 0, total: 4 };
  });

  // Count rated per subject
  Object.entries(phase2Ratings).forEach(([subcategoryId, rating]) => {
    const subcat = SUBCATEGORIES.find(sc => sc.id === subcategoryId);
    if (subcat && subjects[subcat.parentSubjectId]) {
      subjects[subcat.parentSubjectId].rated++;
    }
  });

  return subjects;
};
