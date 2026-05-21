import React, { useState, useMemo, useCallback, useContext } from 'react';
import { ScoreContext } from '../contexts/ScoreContext';
import {
  calculateAllCareerMatches,
  getShownCareers,
  getHiddenCareers,
  sortCareers,
  filterCareers,
  sortCareersBy,
  getSummaryStats,
  validatePhase2Ratings
} from '../utils/careerMatching';
import SummaryStats from './PhaseThree/SummaryStats';
import FilterControls from './PhaseThree/FilterControls';
import CareerGrid from './PhaseThree/CareerGrid';
import CareerModal from './PhaseThree/CareerModal';
import EmptyState from './PhaseThree/EmptyState';

const TIERS = [
  { id: 'core', label: 'Core Paths', description: 'High demand, clear paths' },
  { id: 'advanced', label: 'Advanced Roles', description: 'Specialized education' },
  { id: 'niche', label: 'Niche Fields', description: 'Specific interests' },
  { id: 'exploratory', label: 'Exploratory', description: 'Unique combinations' }
];

export default function PhaseThree({ userId, onPhaseChange, onReset, isSharedView }) {
  const { phase2Ratings } = useContext(ScoreContext);

  // State
  const [selectedCareerID, setSelectedCareerID] = useState(null);
  const [savedCareers, setSavedCareers] = useState(
    JSON.parse(localStorage.getItem(`saved_careers_${userId}`) || '[]')
  );
  const [shareToastShown, setShareToastShown] = useState(false);
  const [filters, setFilters] = useState({
    tiers: ['core', 'advanced'],
    salaryMin: null,
    salaryMax: null,
    educations: [],
    matchType: null
  });
  const [sortField, setSortField] = useState('score');
  const [sortDirection, setSortDirection] = useState('desc');

  // Validate Phase 2 data exists
  if (!validatePhase2Ratings(phase2Ratings)) {
    return (
      <EmptyState
        type="noPhase2"
        onBack={() => onPhaseChange && onPhaseChange('phase2')}
      />
    );
  }

  // Calculate all career matches with localStorage caching
  const allCareerMatches = useMemo(() => {
    const cacheKey = `career_cache_v1_${userId}`;
    const ratingsKey = JSON.stringify(phase2Ratings);
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || '{}');
      if (cached?.ratingsKey === ratingsKey && cached?.matches) {
        return cached.matches;
      }
    } catch (_) {}

    const matches = calculateAllCareerMatches(phase2Ratings);
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ ratingsKey, matches }));
    } catch (_) {}
    return matches;
  }, [phase2Ratings, userId]);

  // Get shown and hidden careers
  const shownCareers = useMemo(
    () => getShownCareers(allCareerMatches),
    [allCareerMatches]
  );

  const hiddenCareers = useMemo(
    () => getHiddenCareers(allCareerMatches),
    [allCareerMatches]
  );

  // Apply filters and sorting (memoized)
  const filteredCareers = useMemo(() => {
    const filtered = filterCareers(shownCareers, filters);
    return sortCareersBy(filtered, sortField, sortDirection);
  }, [shownCareers, filters, sortField, sortDirection]);

  // Summary stats (memoized)
  const summaryStats = useMemo(
    () => getSummaryStats(shownCareers),
    [shownCareers]
  );

  // Handlers
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const handleSort = useCallback((field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // New field: start with descending
      setSortField(field);
      setSortDirection('desc');
    }
  }, [sortField]);

  const handleSaveCareer = useCallback((careerID) => {
    setSavedCareers(prev => {
      const updated = prev.includes(careerID)
        ? prev.filter(id => id !== careerID)
        : [...prev, careerID];
      localStorage.setItem(`saved_careers_${userId}`, JSON.stringify(updated));
      return updated;
    });
  }, [userId]);

  const handleSelectCareer = useCallback((careerID) => {
    setSelectedCareerID(careerID);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCareerID(null);
  }, []);

  const handleShareResults = useCallback(() => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#uid=${userId}`;
    navigator.clipboard.writeText(shareUrl);
    setShareToastShown(true);
    setTimeout(() => setShareToastShown(false), 2000);
  }, [userId]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Shared View Banner */}
        {isSharedView && (
          <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg">
            <p className="text-yellow-800 font-semibold">
              👀 Viewing someone's shared results —
              <button
                onClick={onReset}
                className="ml-2 underline hover:font-bold transition"
              >
                start your own
              </button>
            </p>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="flex justify-center gap-2 mb-4 no-print">
            <button
              onClick={handleShareResults}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition text-sm"
              title="Copy shareable link"
            >
              📤 Share Results
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition text-sm no-print"
              title="Print or save as PDF"
            >
              🖨️ Print / PDF
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Matched Career Paths
          </h1>
          <p className="text-xl text-gray-600">
            Personalized careers based on your interests in Phase 1 & 2
          </p>

          {/* Share Toast */}
          {shareToastShown && (
            <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse no-print">
              ✓ Link copied to clipboard!
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="no-print">
          <SummaryStats stats={summaryStats} />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 no-print">
          <FilterControls
            tiers={TIERS}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { field: 'score', label: 'Best Match' },
                { field: 'careerTitle', label: 'Name (A-Z)' },
                { field: 'jobOutlook', label: 'Job Growth' }
              ].map(option => (
                <button
                  key={option.field}
                  onClick={() => handleSort(option.field)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    sortField === option.field
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option.label}
                  {sortField === option.field && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredCareers.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {filteredCareers.length} Careers Match Your Interests
            </h2>
            <CareerGrid
              careers={filteredCareers}
              savedCareers={savedCareers}
              onSelectCareer={handleSelectCareer}
              onSaveCareer={handleSaveCareer}
            />
          </div>
        ) : (
          <EmptyState type="noResults" filters={filters} />
        )}

        {/* Explore Section (Partial Matches) */}
        {hiddenCareers.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🔍 Explore More ({hiddenCareers.length} careers with partial matches)
            </h2>
            <p className="text-gray-600 mb-6">
              These careers need more of your interests rated. Try rating more subcategories to unlock better matches!
            </p>
            <CareerGrid
              careers={sortCareers(hiddenCareers)}
              savedCareers={savedCareers}
              onSelectCareer={handleSelectCareer}
              onSaveCareer={handleSaveCareer}
              isExplore={true}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-16 flex justify-center gap-4 flex-wrap pb-8 no-print">
          <button
            onClick={() => onPhaseChange && onPhaseChange('phase2')}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition"
          >
            ← Back to Phase 2
          </button>
        </div>

        {/* Career Details Modal */}
        {selectedCareerID && (
          <CareerModal
            careerID={selectedCareerID}
            isSaved={savedCareers.includes(selectedCareerID)}
            onSave={handleSaveCareer}
            onClose={handleCloseModal}
            phase2Ratings={phase2Ratings}
          />
        )}
      </div>
    </div>
  );
}
