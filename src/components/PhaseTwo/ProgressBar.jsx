import React from 'react';

export default function ProgressBar({ rated, total }) {
  const percentage = total > 0 ? Math.round((rated / total) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-indigo-600">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
        <span className="text-sm font-medium text-indigo-600">{percentage}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-gray-600 text-sm mt-3">
        {rated} of {total} subcategories rated
      </p>

      {rated === 0 && (
        <p className="text-gray-500 text-sm mt-2 italic">
          Start rating to see your progress
        </p>
      )}

      {rated > 0 && rated < total && (
        <p className="text-gray-500 text-sm mt-2 italic">
          {total - rated} more to go! Keep exploring.
        </p>
      )}

      {rated === total && (
        <p className="text-green-600 text-sm mt-2 font-semibold">
          ✓ All subcategories rated! Ready to see your results?
        </p>
      )}
    </div>
  );
}
