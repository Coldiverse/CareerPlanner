import React from 'react';

export default function SubcategoryCard({ subcategory, rating, onRatingChange }) {
  const handleChange = (e) => {
    onRatingChange(subcategory.id, parseInt(e.target.value));
  };

  const getRatingColor = (value) => {
    if (!value) return 'text-gray-400';
    if (value <= 3) return 'text-red-500';
    if (value <= 6) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRatingLabel = (value) => {
    if (!value) return 'Not rated';
    if (value <= 2) return 'Very low';
    if (value <= 4) return 'Low';
    if (value <= 6) return 'Moderate';
    if (value <= 8) return 'High';
    return 'Very high';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="mb-2">
        <p className="text-sm text-gray-500 font-medium">{subcategory.parentSubjectName}</p>
        <h3 className="text-xl font-bold text-gray-900">{subcategory.name}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-6">{subcategory.description}</p>

      <div className="space-y-4">
        {/* Rating Slider */}
        <div>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={rating}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            aria-label={`Rate ${subcategory.name}`}
          />
        </div>

        {/* Rating Display */}
        <div className="flex justify-between items-center">
          <div>
            <p className={`text-3xl font-bold ${getRatingColor(rating)}`}>
              {rating || '—'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {getRatingLabel(rating)}
            </p>
          </div>

          {/* Visual Indicator Bars */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-6 w-2 rounded-sm transition-all ${
                  rating >= i * 2 ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Star Rating (alternative visual) */}
        <div className="flex gap-1 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              onClick={() => onRatingChange(subcategory.id, i * 2)}
              className="text-2xl transition-transform hover:scale-110"
              aria-label={`Rate ${i * 2} out of 10`}
              type="button"
            >
              {rating >= i * 2 ? '⭐' : '☆'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
