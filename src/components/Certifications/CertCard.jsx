import React from 'react';

export default function CertCard({
  cert,
  rating,
  onRatingChange,
  isExpanded,
  onToggleExpand,
  isReadOnly,
}) {
  const getRatingColor = (value) => {
    if (!value) return 'text-gray-400';
    if (value <= 3) return 'text-red-500';
    if (value <= 6) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRatingLabel = (value) => {
    if (!value) return 'Not rated';
    if (value <= 2) return 'Not interested';
    if (value <= 4) return 'Low';
    if (value <= 6) return 'Medium';
    if (value <= 8) return 'High';
    return 'Very interested';
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md border-l-4 transition ${
        isReadOnly ? 'border-gray-300' : 'border-teal-500'
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
            <p className="text-sm text-gray-500">{cert.creditHours} credit hours</p>
          </div>
          <button
            onClick={onToggleExpand}
            className="text-teal-600 hover:text-teal-700 font-semibold text-sm ml-4 whitespace-nowrap"
          >
            {isExpanded ? 'Less Info ▲' : 'More Info ▼'}
          </button>
        </div>

        {/* Overview */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{cert.overview}</p>

        {/* Rating Slider */}
        <div className="mb-3">
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={rating || 0}
            onChange={(e) => onRatingChange(cert.id, parseInt(e.target.value))}
            disabled={isReadOnly}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${
              isReadOnly ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{
              background: isReadOnly
                ? '#e5e7eb'
                : `linear-gradient(to right, ${rating > 5 ? '#10b981' : rating > 3 ? '#eab308' : '#ef4444'} 0%, ${rating > 5 ? '#10b981' : rating > 3 ? '#eab308' : '#ef4444'} ${rating * 10}%, #e5e7eb ${rating * 10}%, #e5e7eb 100%)`,
            }}
          />
        </div>

        {/* Rating Display: Stars + Number + Label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const fillThreshold = star * 2;
              const isFilled = rating >= fillThreshold;
              return (
                <button
                  key={star}
                  onClick={() => onRatingChange(cert.id, fillThreshold)}
                  disabled={isReadOnly}
                  className={`text-2xl transition ${
                    isReadOnly ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'
                  }`}
                >
                  {isFilled ? '★' : '☆'}
                </button>
              );
            })}
          </div>
          <div className="flex-1">
            <span className={`font-semibold text-lg ${getRatingColor(rating)}`}>
              {rating || '—'}
            </span>
            <span className="text-gray-600 text-sm ml-2">{getRatingLabel(rating)}</span>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <>
            <div className="border-t border-gray-200 pt-4 mt-4">
              {/* Semesters */}
              {cert.semesters.map((semester, semIdx) => (
                <div key={semIdx} className="mb-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">{semester.label}</h4>
                  <ul className="space-y-1">
                    {semester.courses.map((course, courseIdx) => (
                      <li key={courseIdx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="font-mono font-semibold text-gray-800 flex-shrink-0">
                          {course.code}
                        </span>
                        <span>
                          {course.name}
                          {course.isCapstone && (
                            <span className="ml-2 inline-block px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-semibold">
                              ★ Capstone
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Footnotes */}
              {cert.footnotes && cert.footnotes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600 space-y-1">
                  {cert.footnotes.map((note) => (
                    <p key={note.number}>
                      <sup>{note.number}</sup> {note.text}
                    </p>
                  ))}
                </div>
              )}

              {/* Link to Collin College */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg transition"
                >
                  View at Collin College →
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
