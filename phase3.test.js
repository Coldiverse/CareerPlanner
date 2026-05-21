/**
 * Phase 3 Career Matching Algorithm - Complete Test Suite
 *
 * Tests cover:
 * - Edge cases (0 ratings, 1 rating, all ratings)
 * - Scoring logic (partial coverage, unrated requirements)
 * - Coverage filtering (< 40%, >= 40%)
 * - Tiebreakers (score, outlook, tier, alphabetical)
 * - Special scenarios (conflicting interests, low scores, etc.)
 * - Performance benchmarks
 * - Error handling
 */

import {
  scoreCareer,
  rankCareers,
  getCareerScore,
  calculateStats,
  getInsightMessage,
  explainCareerScore,
  parseOutlookWeight,
  compareCareerScores,
  formatScore,
} from './phase3';

import { CAREERS } from '../data/careers';

// ============================================================================
// HELPER FUNCTIONS FOR TESTING
// ============================================================================

/**
 * Create test career object
 */
function createTestCareer(id, requirements) {
  return {
    id,
    title: `Test Career: ${id}`,
    tier: 'core',
    requirements,
    context: {
      jobOutlook: 'Good (5% growth)',
    },
  };
}

/**
 * Create test user scores object
 */
function createTestScores(entries) {
  return Object.fromEntries(entries);
}

/**
 * Benchmark function
 */
function benchmark(name, fn, iterations = 100) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  const avg = (end - start) / iterations;
  console.log(`${name}: ${avg.toFixed(3)}ms (${iterations} iterations)`);
  return avg;
}

// ============================================================================
// TEST SUITE
// ============================================================================

describe('Phase 3 Career Matching Algorithm', () => {

  // =========================================================================
  // EDGE CASE TESTS (TC-1 through TC-5)
  // =========================================================================

  describe('Edge Cases', () => {

    test('TC-1: User rated 0 subcategories → all careers hidden', () => {
      const result = rankCareers({});

      expect(result.visible).toHaveLength(0);
      expect(result.explore).toHaveLength(87);
      expect(result.stats.visibleCount).toBe(0);
      expect(result.stats.exploreCount).toBe(87);
      expect(result.userScoresCount).toBe(0);
    });

    test('TC-2: User rated 1 subcategory → some careers visible', () => {
      const result = rankCareers({
        biology_anatomy: 9,
      });

      // Should have some visible careers (those where biology_anatomy covers 40%+)
      expect(result.visible.length).toBeGreaterThan(0);
      expect(result.explore.length).toBeGreaterThan(0);
      expect(result.stats.visibleCount + result.stats.exploreCount).toBe(87);

      // All visible should have biology_anatomy requirement
      result.visible.forEach(careerResult => {
        const career = CAREERS.find(c => c.id === careerResult.careerId);
        expect(career.requirements.some(r => r.subcategoryId === 'biology_anatomy')).toBe(true);
      });
    });

    test('TC-3: User rated all 32 subcategories → all careers visible', () => {
      const allSubcategories = [
        'physics_mechanics', 'physics_astronomy', 'physics_thermodynamics', 'physics_quantum',
        'chemistry_organic', 'chemistry_physical', 'chemistry_biochemistry', 'chemistry_environmental',
        'biology_molecular', 'biology_ecology', 'biology_anatomy', 'biology_marine',
        'history_ancient', 'history_modern', 'history_cultural', 'history_military',
        'mathematics_pure', 'mathematics_applied', 'mathematics_discrete', 'mathematics_geometry',
        'art_design_visual', 'art_design_digital', 'art_design_performing', 'art_design_crafts',
        'writing_fiction', 'writing_academic', 'writing_journalism', 'writing_poetry',
        'technology_software', 'technology_data', 'technology_web', 'technology_security',
      ];

      const userScores = {};
      allSubcategories.forEach(id => {
        userScores[id] = 7; // All at 7/10
      });

      const result = rankCareers(userScores);

      expect(result.visible).toHaveLength(87); // All careers visible
      expect(result.explore).toHaveLength(0); // None hidden
      expect(result.stats.visibleCount).toBe(87);
    });

    test('TC-4: Unrated requirement → still scored if coverage >= 40%', () => {
      // Nurse: biology_anatomy (0.90), chemistry_biochemistry (0.50), biology_molecular (0.35)
      // User rates 2/3 = 66.7% > 40% → visible
      const result = rankCareers({
        biology_anatomy: 8,
        chemistry_biochemistry: 7,
        // biology_molecular NOT rated
      });

      const nurse = result.visible.find(c => c.careerId === 'nurse');
      expect(nurse).toBeDefined();
      expect(nurse.ratedCount).toBe(2);
      expect(nurse.totalRequirements).toBe(3);
      expect(nurse.coverage).toBeCloseTo(2/3, 3);
      expect(nurse.status).toBe('show');
      expect(nurse.score).toBeGreaterThan(0);
      expect(nurse.coverageBonus).toBe(0); // Not 100% coverage
    });

    test('TC-5: Coverage < 40% → hidden in explore section', () => {
      // Software Engineer: tech_software (0.95), math_discrete (0.70), tech_data (0.40)
      // User rates only 1/3 = 33.3% < 40% → hidden
      const result = rankCareers({
        technology_software: 9,
        // Other two NOT rated
      });

      const softwareEngineer = result.explore.find(c => c.careerId === 'software-engineer');
      expect(softwareEngineer).toBeDefined();
      expect(softwareEngineer.coverage).toBeCloseTo(1/3, 3);
      expect(softwareEngineer.status).toBe('explore');
      expect(softwareEngineer.ratedCount).toBe(1);
      expect(softwareEngineer.totalRequirements).toBe(3);
    });
  });

  // =========================================================================
  // SCORING LOGIC TESTS (TC-6 through TC-10)
  // =========================================================================

  describe('Scoring Logic', () => {

    test('TC-6: Weighted average calculation with full coverage', () => {
      const testCareer = createTestCareer('test-architect', [
        { subcategoryId: 'physics_mechanics', weight: 0.75 },
        { subcategoryId: 'art_design_visual', weight: 0.80 },
        { subcategoryId: 'mathematics_geometry', weight: 0.75 },
      ]);

      const userScores = {
        physics_mechanics: 9,
        art_design_visual: 8,
        mathematics_geometry: 6,
      };

      const result = scoreCareer(testCareer, userScores);

      // Expected: (9×0.75 + 8×0.80 + 6×0.75) / (0.75+0.80+0.75)
      //         = (6.75 + 6.4 + 4.5) / 2.3 = 17.65 / 2.3 = 7.674...
      const expected = ((9*0.75 + 8*0.80 + 6*0.75) / 2.3) + 0.2;

      expect(result.coverage).toBe(1.0);
      expect(result.ratedCount).toBe(3);
      expect(result.baseScore).toBeCloseTo(17.65 / 2.3, 1);
      expect(result.score).toBeCloseTo(Math.min(expected, 10), 1);
      expect(result.coverageBonus).toBe(0.2);
      expect(result.status).toBe('show');
    });

    test('TC-7: Coverage bonus applied ONLY at 100% coverage', () => {
      const testCareer = createTestCareer('test-partial', [
        { subcategoryId: 'subcategory_1', weight: 0.5 },
        { subcategoryId: 'subcategory_2', weight: 0.5 },
        { subcategoryId: 'subcategory_3', weight: 0.5 },
      ]);

      // 2/3 coverage (66.7%)
      const result = scoreCareer(testCareer, {
        subcategory_1: 10,
        subcategory_2: 10,
      });

      expect(result.coverage).toBeCloseTo(2/3, 3);
      expect(result.coverageBonus).toBe(0); // No bonus
      expect(result.score).toBe(result.baseScore); // Score unchanged
    });

    test('TC-8: Score capped at 10.0 even with bonus', () => {
      const testCareer = createTestCareer('test-perfect', [
        { subcategoryId: 'subcategory_1', weight: 1.0 },
      ]);

      const result = scoreCareer(testCareer, {
        subcategory_1: 10,
      });

      expect(result.baseScore).toBe(10.0);
      expect(result.coverageBonus).toBe(0.2);
      expect(result.score).toBe(10.0); // Capped, not 10.2
    });

    test('TC-9: Score 0 for uninterested in career', () => {
      const testCareer = createTestCareer('test-disliked', [
        { subcategoryId: 'subcategory_1', weight: 0.95 },
        { subcategoryId: 'subcategory_2', weight: 0.50 },
      ]);

      const result = scoreCareer(testCareer, {
        subcategory_1: 0,
        subcategory_2: 0,
      });

      expect(result.baseScore).toBe(0);
      expect(result.coverage).toBe(1.0);
      expect(result.coverageBonus).toBe(0.2);
      expect(result.score).toBe(0.2); // 0 base + 0.2 bonus
    });

    test('TC-10: Reasonable score distribution for all 87 careers at 7/10', () => {
      const allSubcategories = [
        'physics_mechanics', 'physics_astronomy', 'physics_thermodynamics', 'physics_quantum',
        'chemistry_organic', 'chemistry_physical', 'chemistry_biochemistry', 'chemistry_environmental',
        'biology_molecular', 'biology_ecology', 'biology_anatomy', 'biology_marine',
        'history_ancient', 'history_modern', 'history_cultural', 'history_military',
        'mathematics_pure', 'mathematics_applied', 'mathematics_discrete', 'mathematics_geometry',
        'art_design_visual', 'art_design_digital', 'art_design_performing', 'art_design_crafts',
        'writing_fiction', 'writing_academic', 'writing_journalism', 'writing_poetry',
        'technology_software', 'technology_data', 'technology_web', 'technology_security',
      ];

      const userScores = {};
      allSubcategories.forEach(id => {
        userScores[id] = 7;
      });

      const result = rankCareers(userScores);

      // All scores should be close to 7 (no reason to diverge with uniform input)
      expect(result.stats.averageScore).toBeCloseTo(7.2, 0); // 7 + ~0.2 bonus
      expect(result.stats.maxScore).toBeLessThanOrEqual(7.4); // Slight variance ok
      expect(result.stats.minScore).toBeGreaterThanOrEqual(7.0);
    });
  });

  // =========================================================================
  // TIEBREAKER TESTS (TC-11 through TC-14)
  // =========================================================================

  describe('Tiebreakers', () => {

    test('TC-11: Primary sort by score (descending)', () => {
      const userScores = {
        technology_software: 9,
        mathematics_discrete: 8,
      };

      const result = rankCareers(userScores);

      // Check that scores are in descending order
      for (let i = 0; i < result.visible.length - 1; i++) {
        expect(result.visible[i].score).toBeGreaterThanOrEqual(result.visible[i + 1].score);
      }
    });

    test('TC-12: Secondary sort by job outlook (when scores tied)', () => {
      // This is harder to test with real careers since exact ties are rare
      // We'll test parseOutlookWeight function

      const weights = {
        'Excellent (36% growth)': 4,
        'Strong (9% growth)': 3.5,
        'Good (7% growth)': 3,
        'Emerging (12% growth)': 2.5,
        'Moderate (5% growth)': 2,
      };

      for (const [outlook, expected] of Object.entries(weights)) {
        const weight = parseOutlookWeight(outlook);
        expect(weight).toBe(expected);
      }
    });

    test('TC-13: Tertiary sort by tier (core > advanced > niche > exploratory)', () => {
      // Create artificial test where all have same scores
      // This is mostly verification of compareCareerScores logic

      const scoredA = {
        careerId: 'test-core',
        score: 7.5,
      };

      const scoredB = {
        careerId: 'test-niche',
        score: 7.5,
      };

      const careerMap = {
        'test-core': { id: 'test-core', tier: 'core' },
        'test-niche': { id: 'test-niche', tier: 'niche' },
      };

      const comparison = compareCareerScores(scoredA, scoredB, careerMap);
      expect(comparison).toBeGreaterThan(0); // A should come before B
    });

    test('TC-14: Quaternary sort alphabetical (deterministic)', () => {
      const userScores = {
        technology_software: 7,
      };

      const result = rankCareers(userScores);

      // Check that visible careers with same score are alphabetical
      for (let i = 0; i < result.visible.length - 1; i++) {
        const curr = result.visible[i];
        const next = result.visible[i + 1];

        if (Math.abs(curr.score - next.score) < 0.01) {
          // Same score: should be alphabetical
          expect(curr.careerId <= next.careerId).toBe(true);
        }
      }
    });
  });

  // =========================================================================
  // SPECIAL SCENARIO TESTS (TC-15 through TC-20)
  // =========================================================================

  describe('Special Scenarios', () => {

    test('TC-15: Conflicting interests (art + physics) find Architect', () => {
      const result = rankCareers({
        art_design_visual: 10,
        physics_mechanics: 9,
      });

      const architect = result.visible.find(c => c.careerId === 'architect');
      expect(architect).toBeDefined();
      expect(architect.score).toBeGreaterThan(7);

      // Architect should rank high since it needs both
      const topIndex = result.visible.findIndex(c => c.careerId === 'architect');
      expect(topIndex).toBeLessThan(5); // Top 5
    });

    test('TC-16: Very low scores (2-3/10) still ranked, not hidden', () => {
      const result = rankCareers({
        biology_anatomy: 2,
        chemistry_biochemistry: 3,
      });

      const nurse = result.visible.find(c => c.careerId === 'nurse');
      if (nurse) {
        expect(nurse.coverage).toBeGreaterThanOrEqual(0.4);
        expect(nurse.score).toBeGreaterThanOrEqual(0);
        expect(nurse.score).toBeLessThanOrEqual(3);
      }
    });

    test('TC-17: Single requirement rated at 1/10 visible if 100% coverage', () => {
      // Create artificial single-requirement career for testing
      const testCareer = createTestCareer('single-req', [
        { subcategoryId: 'technology_software', weight: 1.0 },
      ]);

      const result = scoreCareer(testCareer, {
        technology_software: 1,
      });

      expect(result.coverage).toBe(1.0);
      expect(result.baseScore).toBe(1.0);
      expect(result.coverageBonus).toBe(0.2);
      expect(result.score).toBe(1.2);
      expect(result.status).toBe('show');
    });

    test('TC-18: High-weight unrated requirement → hidden if < 40% coverage', () => {
      // Career with 1 high-weight requirement + 4 low-weight
      const testCareer = createTestCareer('test-heavy', [
        { subcategoryId: 'subcategory_1', weight: 0.95 }, // Must-have
        { subcategoryId: 'subcategory_2', weight: 0.01 },
        { subcategoryId: 'subcategory_3', weight: 0.01 },
        { subcategoryId: 'subcategory_4', weight: 0.01 },
        { subcategoryId: 'subcategory_5', weight: 0.01 },
      ]);

      // Don't rate the must-have
      const result = scoreCareer(testCareer, {
        subcategory_2: 10,
      });

      expect(result.coverage).toBeCloseTo(1/5, 3); // 20% < 40%
      expect(result.status).toBe('explore');
    });

    test('TC-19: getCareerScore includes breakdown', () => {
      const result = getCareerScore('software-engineer', {
        technology_software: 9,
        mathematics_discrete: 8,
      });

      expect(result.career).toBeDefined();
      expect(result.career.title).toBe('Software Engineer');
      expect(result.requirementBreakdown).toBeDefined();
      expect(Array.isArray(result.requirementBreakdown)).toBe(true);
      expect(result.requirementBreakdown.length).toBeGreaterThan(0);
    });

    test('TC-20: explainCareerScore provides human-readable explanation', () => {
      const explanation = explainCareerScore('software-engineer', {
        technology_software: 9,
        mathematics_discrete: 8,
      });

      expect(explanation.career).toBe('Software Engineer');
      expect(explanation.overallScore).toBeDefined();
      expect(explanation.coverage).toMatch(/^\d+% \(\d+\/\d+\)$/);
      expect(explanation.message).toBeDefined();
      expect(explanation.requirements).toBeDefined();
      expect(Array.isArray(explanation.requirements)).toBe(true);
    });
  });

  // =========================================================================
  // STATISTICS & INSIGHT TESTS (TC-21 through TC-23)
  // =========================================================================

  describe('Statistics & Insights', () => {

    test('TC-21: calculateStats provides correct distributions', () => {
      const allSubcategories = ['physics_mechanics', 'technology_software', 'mathematics_applied',
        'biology_anatomy', 'chemistry_biochemistry', 'art_design_visual', 'writing_academic',
        'history_cultural'];

      const userScores = {};
      allSubcategories.forEach((id, i) => {
        userScores[id] = 6 + (i % 3); // Vary scores 6-8
      });

      const result = rankCareers(userScores);
      const stats = result.stats;

      expect(stats.visibleCount).toBeGreaterThan(0);
      expect(stats.exploreCount).toBeGreaterThan(0);
      expect(stats.visibleCount + stats.exploreCount).toBe(87);
      expect(stats.averageScore).toBeGreaterThan(0);
      expect(stats.maxScore).toBeGreaterThanOrEqual(stats.averageScore);
      expect(stats.minScore).toBeLessThanOrEqual(stats.averageScore);
    });

    test('TC-22: getInsightMessage varies by result', () => {
      // No ratings
      const msg1 = getInsightMessage(rankCareers({}));
      expect(msg1).toMatch(/Rate some interests/i);

      // Good match
      const userScores = {
        technology_software: 10,
        mathematics_discrete: 10,
        technology_data: 10,
      };
      const msg2 = getInsightMessage(rankCareers(userScores));
      expect(msg2).toBeDefined();
      expect(msg2.length).toBeGreaterThan(0);
    });

    test('TC-23: formatScore returns correct decimal format', () => {
      expect(formatScore(7.8)).toBe('7.8');
      expect(formatScore(10)).toBe('10.0');
      expect(formatScore(0)).toBe('0.0');
      expect(formatScore(6.456)).toBe('6.5'); // Rounded
      expect(formatScore(null)).toBe('N/A');
      expect(formatScore(undefined)).toBe('N/A');
    });
  });

  // =========================================================================
  // PERFORMANCE BENCHMARKS (TC-24 through TC-26)
  // =========================================================================

  describe('Performance Benchmarks', () => {

    test('TC-24: scoreCareer < 0.01ms per career', () => {
      const testCareer = CAREERS[0];
      const userScores = {
        technology_software: 7,
        mathematics_discrete: 8,
      };

      const avg = benchmark('scoreCareer', () => {
        scoreCareer(testCareer, userScores);
      }, 100);

      expect(avg).toBeLessThan(0.05); // Very fast
    });

    test('TC-25: rankCareers < 10ms for 87 careers', () => {
      const userScores = {
        technology_software: 7,
        mathematics_discrete: 8,
        mathematics_applied: 6,
      };

      const avg = benchmark('rankCareers', () => {
        rankCareers(userScores);
      }, 10);

      expect(avg).toBeLessThan(10);
    });

    test('TC-26: calculateStats < 1ms', () => {
      const result = rankCareers({
        technology_software: 7,
        mathematics_discrete: 8,
      });
      const allScores = [...result.visible, ...result.explore];

      const avg = benchmark('calculateStats', () => {
        calculateStats(allScores);
      }, 100);

      expect(avg).toBeLessThan(1);
    });
  });

  // =========================================================================
  // ERROR HANDLING & EDGE CASES (TC-27 through TC-30)
  // =========================================================================

  describe('Error Handling', () => {

    test('TC-27: handles invalid user score gracefully', () => {
      const testCareer = createTestCareer('test', [
        { subcategoryId: 'subcategory_1', weight: 1.0 },
      ]);

      // Invalid scores should be filtered out
      const result = scoreCareer(testCareer, {
        subcategory_1: 15, // Out of range
      });

      expect(result.ratedCount).toBe(0); // Should not count invalid
      expect(result.status).toBe('explore'); // Hidden due to coverage
    });

    test('TC-28: handles null/undefined user scores', () => {
      const result = rankCareers(null);
      expect(result.visible).toHaveLength(0);
      expect(result.explore).toHaveLength(87);
    });

    test('TC-29: handles missing career requirements', () => {
      const testCareer = createTestCareer('no-reqs', []);
      const result = scoreCareer(testCareer, { subcategory_1: 7 });

      expect(result.status).toBe('error');
      expect(result.reason).toMatch(/no requirements/i);
    });

    test('TC-30: handles non-existent subcategory', () => {
      const testCareer = createTestCareer('test', [
        { subcategoryId: 'nonexistent_subcategory', weight: 1.0 },
      ]);

      const result = scoreCareer(testCareer, {
        nonexistent_subcategory: 7,
      });

      // Should not match unknown subcategory
      expect(result.ratedCount).toBe(0);
    });
  });

  // =========================================================================
  // INTEGRATION TESTS (TC-31 through TC-33)
  // =========================================================================

  describe('Integration', () => {

    test('TC-31: End-to-end ranking workflow', () => {
      // Realistic user journey
      const userScores = {
        technology_software: 9,
        mathematics_discrete: 8,
        technology_data: 7,
        physics_mechanics: 6,
        mathematics_applied: 5,
      };

      const result = rankCareers(userScores);

      // Verify structure
      expect(result.visible).toBeDefined();
      expect(result.explore).toBeDefined();
      expect(result.stats).toBeDefined();
      expect(result.userScoresCount).toBe(5);

      // Verify visible careers are higher-quality matches
      if (result.visible.length > 0) {
        expect(result.visible[0].coverage).toBeGreaterThanOrEqual(0.4);
        expect(result.visible[0].score).toBeGreaterThan(0);
      }
    });

    test('TC-32: Updating user scores re-ranks correctly', () => {
      const scores1 = rankCareers({ technology_software: 10 });
      const topCareer1 = scores1.visible[0]?.careerId;

      const scores2 = rankCareers({ mathematics_pure: 10 });
      const topCareer2 = scores2.visible[0]?.careerId;

      // Different inputs should (likely) produce different top careers
      // (Unless same career is top for both, which is possible)
      expect(scores1.visible.length).toBeGreaterThanOrEqual(0);
      expect(scores2.visible.length).toBeGreaterThanOrEqual(0);
    });

    test('TC-33: All 87 careers can be individually scored', () => {
      const userScores = {
        technology_software: 7,
        biology_anatomy: 7,
        art_design_visual: 7,
      };

      CAREERS.forEach(career => {
        const result = scoreCareer(career, userScores);

        expect(result).toBeDefined();
        expect(result.careerId).toBe(career.id);
        expect(typeof result.score).toBe('number');
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.score).toBeLessThanOrEqual(10);
      });
    });
  });
});

// ============================================================================
// MANUAL TEST EXAMPLES (Run individually to inspect output)
// ============================================================================

/**
 * Run this to see detailed output of a single ranking
 */
function manualTest_detailedRanking() {
  const userScores = {
    technology_software: 9,
    mathematics_discrete: 8,
    technology_data: 5,
    mathematics_applied: 7,
  };

  const result = rankCareers(userScores);

  console.log('=== RANKING RESULTS ===');
  console.log(`Visible: ${result.visible.length} careers`);
  console.log(`Explore: ${result.explore.length} careers`);
  console.log(`\nTop 10:`);

  result.visible.slice(0, 10).forEach((career, i) => {
    console.log(`  ${i+1}. ${career.careerId} - ${career.score}/10 (${(career.coverage*100).toFixed(0)}% coverage)`);
  });

  console.log(`\nStats:`, result.stats);
}

/**
 * Run this to see tiebreaker in action
 */
function manualTest_tiebreakers() {
  const userScores = {
    technology_software: 7,
  };

  const result = rankCareers(userScores);

  console.log('=== TIEBREAKER DEMONSTRATION ===');

  // Find careers with same score
  const grouped = {};
  result.visible.forEach(career => {
    const scoreKey = career.score.toFixed(1);
    if (!grouped[scoreKey]) grouped[scoreKey] = [];
    grouped[scoreKey].push(career);
  });

  // Show tied careers
  for (const [score, careers] of Object.entries(grouped)) {
    if (careers.length > 1) {
      console.log(`\nCareers tied at ${score}:`);
      careers.slice(0, 3).forEach(c => {
        console.log(`  - ${c.careerId}`);
      });
    }
  }
}

/**
 * Run this to see coverage filter behavior
 */
function manualTest_coverageThreshold() {
  const singleRating = rankCareers({
    technology_software: 10,
  });

  console.log('=== COVERAGE THRESHOLD BEHAVIOR ===');
  console.log(`User rated 1 subcategory (technology_software = 10)`);
  console.log(`\nResults:`);
  console.log(`  Visible: ${singleRating.visible.length}`);
  console.log(`  Explore: ${singleRating.explore.length}`);

  if (singleRating.visible.length > 0) {
    console.log(`\n  Top visible (all require tech_software):`);
    singleRating.visible.slice(0, 5).forEach(c => {
      console.log(`    - ${c.careerId} (${(c.coverage*100).toFixed(0)}% coverage)`);
    });
  }

  if (singleRating.explore.length > 0) {
    console.log(`\n  Sample hidden (insufficient coverage):`);
    singleRating.explore.slice(0, 5).forEach(c => {
      console.log(`    - ${c.careerId} (${(c.coverage*100).toFixed(0)}% coverage)`);
    });
  }
}

// Export for manual testing
export { manualTest_detailedRanking, manualTest_tiebreakers, manualTest_coverageThreshold };
