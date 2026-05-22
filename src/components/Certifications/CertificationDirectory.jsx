import React, { useState } from 'react';
import { CERTIFICATIONS } from '../../data/certifications';

export default function CertificationDirectory({ onBack }) {
  const [expandedCertId, setExpandedCertId] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            All Medical Certifications
          </h1>
          <p className="text-lg text-gray-600">
            Browse all {CERTIFICATIONS.length} Collin College medical certifications and their required courses.
          </p>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
          >
            ← Back to Rating
          </button>
        </div>

        {/* Certifications List */}
        <div className="space-y-3">
          {CERTIFICATIONS.map((cert) => (
            <CertificationRow
              key={cert.id}
              cert={cert}
              isExpanded={expandedCertId === cert.id}
              onToggle={() =>
                setExpandedCertId(expandedCertId === cert.id ? null : cert.id)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CertificationRow({ cert, isExpanded, onToggle }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-4 hover:bg-gray-50 transition flex items-center justify-between gap-2 border-l-4 border-teal-500"
      >
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900">{cert.name}</div>
          <div className="text-sm text-gray-600">{cert.creditHours} credit hours</div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold whitespace-nowrap">
            {cert.semesters.reduce((total, sem) => total + sem.courses.length, 0)} courses
          </span>
          <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {isExpanded && (
        <div className="bg-gray-50 border-t px-4 py-4 space-y-4">
          {/* Overview */}
          <div>
            <p className="text-sm text-gray-700">{cert.overview}</p>
          </div>

          {/* Semesters and Courses */}
          {cert.semesters.map((semester, semIdx) => (
            <div key={semIdx}>
              <h4 className="font-semibold text-gray-800 text-sm mb-2">{semester.label}</h4>
              <ul className="space-y-2 ml-4">
                {semester.courses.map((course, courseIdx) => (
                  <li key={courseIdx} className="text-sm text-gray-700">
                    <span className="font-mono font-semibold text-gray-800">{course.code}</span>
                    {' — '}
                    {course.name}
                    {course.isCapstone && (
                      <span className="ml-2 inline-block px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-semibold">
                        ★ Capstone
                      </span>
                    )}
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
          <div className="pt-2">
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
      )}
    </div>
  );
}
