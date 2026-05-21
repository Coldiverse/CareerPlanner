import React, { useState } from 'react';

export default function FilterControls({ tiers, filters, onFilterChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleTierChange = (tierId) => {
    const newTiers = filters.tiers.includes(tierId)
      ? filters.tiers.filter(t => t !== tierId)
      : [...filters.tiers, tierId];
    onFilterChange({ tiers: newTiers });
  };

  const handleMatchTypeChange = (type) => {
    onFilterChange({
      matchType: filters.matchType === type ? null : type
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter</h3>

      {/* Career Tiers */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">Career Tier</p>
        <div className="space-y-2">
          {tiers.map(tier => (
            <label key={tier.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.tiers.includes(tier.id)}
                onChange={() => handleTierChange(tier.id)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span className="text-gray-700">
                <span className="font-medium">{tier.label}</span>
                <span className="text-gray-500 text-xs"> - {tier.description}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Match Quality */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">Match Quality</p>
        <div className="space-y-2">
          {[
            { type: 'perfect', label: 'Perfect (100% coverage)' },
            { type: 'strong', label: 'Strong (7.0+)' },
            { type: 'good', label: 'Good (5.0+)' }
          ].map(option => (
            <label key={option.type} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="matchType"
                checked={filters.matchType === option.type}
                onChange={() => handleMatchTypeChange(option.type)}
                className="w-4 h-4 text-indigo-600"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="matchType"
              checked={filters.matchType === null}
              onChange={() => handleMatchTypeChange(null)}
              className="w-4 h-4 text-indigo-600"
            />
            <span className="text-gray-700">All matches</span>
          </label>
        </div>
      </div>

      {/* Reset Button */}
      {(filters.tiers.length < 4 || filters.matchType !== null) && (
        <button
          onClick={() => {
            onFilterChange({
              tiers: ['core', 'advanced', 'niche', 'exploratory'],
              matchType: null
            });
          }}
          className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition text-sm"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
