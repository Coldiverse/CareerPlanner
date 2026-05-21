import React from 'react';

export default function EmptyState({ type = 'noPhase2', onBack, filters }) {
  if (type === 'noPhase2') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-12 max-w-md text-center">
          <p className="text-6xl mb-4">📊</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Phase 2 First</h2>
          <p className="text-gray-600 mb-6">
            Phase 3 requires Phase 2 ratings to match you with careers. Go back and rate some subcategories first!
          </p>
          <button
            onClick={onBack}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            ← Back to Phase 2
          </button>
        </div>
      </div>
    );
  }

  if (type === 'noResults') {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center max-w-2xl mx-auto">
        <p className="text-6xl mb-4">🔍</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h2>
        <p className="text-gray-600 mb-6">
          No careers matched your current filters. Try adjusting your filters or exploring partial matches below.
        </p>
        {filters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <p className="text-sm font-semibold text-gray-700 mb-2">Current Filters:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Career Tiers: {filters.tiers?.join(', ') || 'All'}</li>
              <li>• Match Type: {filters.matchType || 'All matches'}</li>
            </ul>
          </div>
        )}
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Reset & Refresh
        </button>
      </div>
    );
  }

  return null;
}
