import React from 'react';

export default function CareerCard({ career, isSaved, onSelect, onSave, isExplore = false }) {
  const getTierColor = (tier) => {
    const colors = {
      core: 'bg-blue-100 text-blue-800 border-blue-300',
      advanced: 'bg-purple-100 text-purple-800 border-purple-300',
      niche: 'bg-green-100 text-green-800 border-green-300',
      exploratory: 'bg-orange-100 text-orange-800 border-orange-300'
    };
    return colors[tier] || 'bg-gray-100 text-gray-800';
  };

  const getScoreColor = (score) => {
    if (score >= 8.5) return 'text-green-600';
    if (score >= 7) return 'text-blue-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 cursor-pointer" onClick={() => onSelect(career.careerID)}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{career.careerTitle}</h3>
          <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-semibold border ${getTierColor(career.tier)}`}>
            {career.tier}
          </span>
        </div>
        {!isExplore && (
          <div className="text-right">
            <p className={`text-3xl font-bold ${getScoreColor(career.score)}`}>
              {career.score}
            </p>
            <p className="text-xs text-gray-500">/10</p>
          </div>
        )}
      </div>

      {/* Short Description */}
      <p className="text-sm text-gray-600 mb-3 truncate">
        {career.description || 'Explore this career to learn more'}
      </p>

      {/* Coverage & Education */}
      <div className="space-y-2 mb-4">
          {!isExplore && (
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{career.coverage}% match</span>
                {' '}({career.coverageFraction})
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mt-1">
                <div
                  className="bg-indigo-600 h-full"
                  style={{ width: `${career.coverage}%` }}
                />
              </div>
            </div>
          )}
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Education:</span> {career.education}
          </p>
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Outlook:</span> {career.jobOutlook}
          </p>
        </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t">
        <button
          onClick={() => onSelect(career.careerID)}
          className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded text-sm transition"
        >
          Explore
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(career.careerID);
          }}
          className={`px-3 py-2 font-semibold rounded text-sm transition ${
            isSaved
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isSaved ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}
