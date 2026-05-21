import React, { useMemo } from 'react';
import { getCareerDetails, getCoverageMessage } from '../../utils/careerMatching';

export default function CareerModal({ careerID, isSaved, onSave, onClose, phase2Ratings = {} }) {
  const career = useMemo(() => getCareerDetails(careerID), [careerID]);

  if (!career) return null;

  // Calculate user's match
  const ratedReqs = career.requirements.filter(r => phase2Ratings[r.subcategoryId] !== undefined);
  const coverage = career.requirements.length > 0 ? (ratedReqs.length / career.requirements.length) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end overflow-y-auto" onClick={onClose}>
      <div
        className="bg-white w-full md:w-1/2 h-full shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-start sticky top-0">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{career.title}</h2>
            <p className="text-indigo-100 text-sm">{career.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded text-2xl flex-shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Match Stats */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-600 mb-2">{getCoverageMessage(coverage)}</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Match Coverage: {coverage.toFixed(0)}%</span>
              <div className="w-32 bg-gray-300 rounded-full h-3 overflow-hidden">
                <div className="bg-blue-600 h-full" style={{ width: `${coverage}%` }} />
              </div>
            </div>
          </div>

          {/* Your Match Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Your Match</h3>
            <div className="space-y-2">
              {career.requirements.map(req => {
                const userScore = phase2Ratings[req.subcategoryId];
                const isRated = userScore !== undefined;

                return (
                  <div key={req.subcategoryId} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-semibold text-gray-900">{req.subcategoryId.replace(/_/g, ' ')}</p>
                      <p className="text-xs text-gray-600">Weight: {(req.weight * 100).toFixed(0)}%</p>
                    </div>
                    <div className="text-right">
                      {isRated ? (
                        <div>
                          <p className="text-xl font-bold text-indigo-600">{userScore}/10</p>
                          <p className="text-xs text-gray-500">Rated ✓</p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Not rated</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Career Context */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-xs text-green-600 font-semibold mb-1">Salary Range</p>
              <p className="font-bold text-gray-900">{career.context?.salary || 'Varies'}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-xs text-blue-600 font-semibold mb-1">Entry Timeline</p>
              <p className="font-bold text-gray-900">{career.context?.yearsToEntry || '2-4'} years</p>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Education & Path</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg mb-3">
              {career.context?.education || 'Requirements vary by employer'}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 font-semibold mb-2">Career Progression</p>
              <p className="text-gray-800">
                {career.context?.careerPath?.join(' → ') || 'Early career → Growth → Senior roles'}
              </p>
            </div>
          </div>

          {/* Skills */}
          {career.context?.skills && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Key Skills Needed</h3>
              <div className="flex flex-wrap gap-2">
                {career.context.skills.slice(0, 8).map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Job Outlook */}
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-purple-600 font-semibold mb-1">Job Market Outlook</p>
            <p className="text-gray-900">{career.context?.jobOutlook || 'Steady demand'}</p>
          </div>

          {/* Related Careers */}
          {career.relatedCareers?.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Related Careers</h3>
              <div className="space-y-2">
                {career.relatedCareers.map((relId, i) => (
                  <p key={i} className="text-gray-700 pl-4 border-l-2 border-indigo-600">
                    {relId.replace(/_/g, ' ').toUpperCase()}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Discovery Hint */}
          {career.discoveryHint && (
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <p className="text-sm text-yellow-700 font-semibold mb-2">💡 Why This Might Be For You</p>
              <p className="text-gray-800">{career.discoveryHint}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3">
          <button
            onClick={() => onSave(careerID)}
            className={`flex-1 px-4 py-3 font-semibold rounded-lg transition ${
              isSaved
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            {isSaved ? '❤️ Saved' : '🤍 Save Career'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
