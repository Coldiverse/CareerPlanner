import React, { useState, useEffect } from 'react';
import SubjectCard from './SubjectCard';

const SUBJECTS = [
  {
    id: 'physics',
    name: 'Physics',
    description: 'Understanding forces, motion, energy, and the fundamental laws of the universe.'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Exploring matter, chemical reactions, and how elements interact and transform.'
  },
  {
    id: 'biology',
    name: 'Biology',
    description: 'Studying living organisms, cells, genetics, and biological processes.'
  },
  {
    id: 'history',
    name: 'History',
    description: 'Learning about past civilizations, events, and human societies and cultures.'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Working with numbers, patterns, equations, and logical problem-solving.'
  },
  {
    id: 'art_design',
    name: 'Art & Design',
    description: 'Creating visual works, exploring aesthetics, and expressing ideas visually.'
  },
  {
    id: 'writing_literature',
    name: 'Writing & Literature',
    description: 'Crafting stories and essays, analyzing written works, and expressing through words.'
  },
  {
    id: 'technology_computing',
    name: 'Technology & Computing',
    description: 'Building software, coding, solving problems with technology, and innovation.'
  }
];

export default function PhaseOne({ initialRatings, onSave }) {
  const [ratings, setRatings] = useState(initialRatings || {});
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Auto-save on changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(ratings).length > 0) {
        setIsSaving(true);
        onSave(ratings)
          .catch(err => console.error('Auto-save failed:', err))
          .finally(() => {
            setIsSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [ratings, onSave]);

  const handleRatingChange = (subjectId, rating) => {
    setRatings(prev => ({
      ...prev,
      [subjectId]: rating
    }));
  };

  const allRated = SUBJECTS.every(s => ratings[s.id] !== undefined);
  const averageRating = allRated
    ? (Object.values(ratings).reduce((a, b) => a + b, 0) / SUBJECTS.length).toFixed(1)
    : 'N/A';

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Career Path Explorer
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Let's discover careers that match your interests
        </p>
        <p className="text-sm text-gray-500">
          Phase 1: Rate your interest in different subject areas
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-indigo-600">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">How it works:</h2>
        <p className="text-gray-700">
          Rate each subject below on a scale of 1-10 based on how interested you are.
          Your ratings will be saved automatically and used to discover personalized career paths.
        </p>
      </div>

      {/* Subject Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {SUBJECTS.map(subject => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            rating={ratings[subject.id] || 0}
            onRatingChange={handleRatingChange}
          />
        ))}
      </div>

      {/* Summary */}
      {allRated && (
        <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {SUBJECTS.map(subject => (
              <div key={subject.id} className="text-center">
                <p className="text-sm text-gray-600 font-medium">{subject.name}</p>
                <p className="text-2xl font-bold text-indigo-600">{ratings[subject.id]}/10</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-6">
            <p className="text-gray-600 mb-2">Average Interest Level:</p>
            <p className="text-4xl font-bold text-indigo-600 mb-4">{averageRating}/10</p>
            <p className="text-gray-600 text-sm">
              ✓ Your ratings have been saved. Phase 2 career paths will be prioritized based on your interests.
            </p>
          </div>
        </div>
      )}

      {/* Save Status */}
      <div className="fixed bottom-6 right-6 flex items-center gap-2">
        {saved && (
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
            ✓ Saved
          </div>
        )}
        {isSaving && (
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Saving...
          </div>
        )}
      </div>
    </div>
  );
}
