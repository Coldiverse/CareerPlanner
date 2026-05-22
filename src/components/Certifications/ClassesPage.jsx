import React, { useState, useMemo } from 'react';
import { ALL_COURSES, getCoursesByDepartment } from '../../data/certifications';

export default function ClassesPage({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCode, setExpandedCode] = useState(null);

  const filteredCourses = useMemo(() => {
    if (!searchQuery) return ALL_COURSES;
    const q = searchQuery.toLowerCase();
    return ALL_COURSES.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const coursesByDept = useMemo(() => {
    if (searchQuery) return null;
    const groups = getCoursesByDepartment();
    return groups;
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            All Medical Courses
          </h1>
          <p className="text-lg text-gray-600">
            Browse the {ALL_COURSES.length} courses used across all Collin College medical certifications.
          </p>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
          >
            ← Back to Certifications
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search courses (e.g., BIOL, Nursing, Pharmacology)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setExpandedCode(null);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          {searchQuery && (
            <p className="text-sm text-gray-600 mt-2">
              Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Courses List */}
        <div className="space-y-3">
          {searchQuery ? (
            // Flat list when searching
            filteredCourses.map((course) => (
              <CourseRow
                key={course.code}
                course={course}
                isExpanded={expandedCode === course.code}
                onToggle={() =>
                  setExpandedCode(expandedCode === course.code ? null : course.code)
                }
              />
            ))
          ) : (
            // Department grouped when not searching
            Object.keys(coursesByDept || {})
              .sort()
              .map((dept) => (
                <div key={dept} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Department Header */}
                  <div className="bg-gray-100 border-l-4 border-blue-500 px-4 py-2">
                    <h3 className="font-semibold text-gray-800">
                      {dept} ({coursesByDept[dept].length} course
                      {coursesByDept[dept].length !== 1 ? 's' : ''})
                    </h3>
                  </div>

                  {/* Courses in dept */}
                  <div className="divide-y">
                    {coursesByDept[dept].map((course) => (
                      <CourseRow
                        key={course.code}
                        course={course}
                        isExpanded={expandedCode === course.code}
                        onToggle={() =>
                          setExpandedCode(expandedCode === course.code ? null : course.code)
                        }
                      />
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Empty state */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CourseRow({ course, isExpanded, onToggle }) {
  return (
    <div className="bg-white">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center justify-between gap-2"
      >
        <div className="flex-1 min-w-0">
          <div className="font-mono font-semibold text-gray-800">{course.code}</div>
          <div className="text-sm text-gray-600">{course.name}</div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold whitespace-nowrap">
            {course.usedBy.length} cert{course.usedBy.length !== 1 ? 's' : ''}
          </span>
          <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {isExpanded && (
        <div className="bg-gray-50 border-t px-4 py-3 space-y-2">
          <p className="text-sm font-semibold text-gray-800 mb-2">Used in:</p>
          {course.usedBy.map((usage, idx) => (
            <div key={idx} className="text-sm text-gray-700 space-y-1">
              <div className="font-semibold text-gray-800">{usage.certName}</div>
              <div className="text-gray-600">
                {usage.semester}
                {usage.isCapstone && (
                  <span className="ml-2 inline-block px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-semibold">
                    ★ Capstone
                  </span>
                )}
              </div>
              <a
                href={usage.certLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 underline text-xs"
              >
                View certification →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
