import React, { useContext } from 'react';
import { ScoreContext } from '../contexts/ScoreContext.jsx';
import { getRankedSubcategories, getUnratedSubcategories, formatScore, getScoreBreakdown } from '../utils/scoring';
import { SUBCATEGORIES } from '../data/subcategories';

export default function PhaseTwoResults({ onBack, onNext }) {
  const { phase1Ratings, phase2Ratings, calculatedScores } = useContext(ScoreContext);

  const ranked = getRankedSubcategories(calculatedScores, 20);
  const unrated = getUnratedSubcategories(phase2Ratings);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Top Matches
          </h1>
          <p className="text-xl text-gray-600">
            Here are the subcategories that best match your interests
          </p>
        </div>

        {/* Results Count */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700">
            <span className="font-semibold text-indigo-600">{ranked.length}</span> subcategories ranked
            {' '}
            <span className="text-gray-500">
              ({Object.keys(phase2Ratings).length} rated)
            </span>
          </p>
        </div>

        {/* Ranked Results */}
        {ranked.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Matches</h2>
            <div className="space-y-4">
              {ranked.map((item, index) => {
                const breakdown = getScoreBreakdown(
                  item.subcategoryId,
                  phase1Ratings,
                  phase2Ratings
                );

                return (
                  <div
                    key={item.subcategoryId}
                    className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-600 hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                          <h3 className="text-xl font-bold text-gray-900">
                            {item.subcategory.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 font-medium mb-2">
                          {item.subcategory.parentSubjectName}
                        </p>
                        <p className="text-gray-600 text-sm mb-3">
                          {item.subcategory.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-3xl font-bold text-indigo-600">
                          {formatScore(item.score)}
                        </div>
                        <div className="text-xs text-gray-500">/ 10</div>
                      </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="bg-gray-50 rounded p-3 text-xs text-gray-600">
                      <p>
                        <span className="font-semibold">{item.subcategory.parentSubjectName}:</span> {breakdown.phase1Rating}/10
                        {' '}
                        <span className="font-semibold">+</span>{' '}
                        <span className="font-semibold">{item.subcategory.name}:</span> {breakdown.phase2Rating}/10
                        {' '}
                        <span className="font-semibold">=</span> {formatScore(item.score)}/10
                      </p>
                    </div>

                    {/* Score Bar */}
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full"
                        style={{ width: `${(item.score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Unrated Subcategories */}
        {unrated.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Not Yet Rated ({unrated.length})
            </h2>
            <p className="text-gray-600 mb-6">
              These subcategories haven't been rated yet. Would you like to explore them?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unrated.map((subcategory) => (
                <div
                  key={subcategory.id}
                  className="bg-white rounded-lg shadow p-4 border border-gray-200"
                >
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    {subcategory.parentSubjectName}
                  </p>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {subcategory.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {subcategory.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {ranked.length === 0 && unrated.length === 32 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              No subcategories rated yet. Start exploring Phase 2 to see your matches!
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center gap-4 flex-wrap pb-8">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition"
          >
            ← Back to Rating
          </button>

          {ranked.length > 0 && onNext && (
            <button
              onClick={onNext}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
            >
              Next: Career Paths →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
