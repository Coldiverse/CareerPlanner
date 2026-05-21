import React, { useState, useEffect } from 'react';
import SubjectCard from './SubjectCard';

const SUBJECTS = [
  {
    id: 'physics',
    name: 'Physics',
    description: 'Study of matter, energy, forces, and the fundamental laws governing the universe.'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Study of matter, chemical reactions, and the composition of substances.'
  },
  {
    id: 'biology',
    name: 'Biology',
    description: 'Study of living organisms, life processes, and biological systems.'
  },
  {
    id: 'earth_science',
    name: 'Earth Science & Geology',
    description: 'Study of Earth\'s structure, processes, and materials.'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Study of numbers, patterns, space, and logical reasoning.'
  },
  {
    id: 'computer_science',
    name: 'Computer Science & Technology',
    description: 'Study of computation, algorithms, and digital systems.'
  },
  {
    id: 'engineering',
    name: 'Engineering & Technology',
    description: 'Application of science and technology to solve practical problems.'
  },
  {
    id: 'visual_arts',
    name: 'Visual Arts & Design',
    description: 'Creative expression through visual media and spatial design.'
  },
  {
    id: 'music',
    name: 'Music & Audio Arts',
    description: 'Study and creation of music and sound across genres and technologies.'
  },
  {
    id: 'performing_arts',
    name: 'Performing Arts & Drama',
    description: 'Performance-based creative expression through acting, dance, and theater.'
  },
  {
    id: 'literature_writing',
    name: 'Literature & Writing',
    description: 'Written expression, literary analysis, and storytelling.'
  },
  {
    id: 'history',
    name: 'History & Social Studies',
    description: 'Study of past events, societies, and human change over time.'
  },
  {
    id: 'philosophy',
    name: 'Philosophy & Logic',
    description: 'Fundamental questions about existence, knowledge, ethics, and reality.'
  },
  {
    id: 'linguistics',
    name: 'Linguistics & Language Studies',
    description: 'Study of language structure, meaning, and communication.'
  },
  {
    id: 'psychology',
    name: 'Psychology & Behavioral Sciences',
    description: 'Study of human behavior, mental processes, and psychological phenomena.'
  },
  {
    id: 'sociology',
    name: 'Sociology & Anthropology',
    description: 'Study of societies, cultures, and human social relationships.'
  },
  {
    id: 'economics',
    name: 'Economics & Business',
    description: 'Study of resource allocation, markets, and economic systems.'
  },
  {
    id: 'political_science',
    name: 'Political Science & Governance',
    description: 'Study of government, politics, power, and political institutions.'
  },
  {
    id: 'education',
    name: 'Education & Pedagogy',
    description: 'Study of teaching, learning, and educational systems.'
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical Sciences',
    description: 'Study of human health, disease prevention, and medical treatment.'
  },
  {
    id: 'law',
    name: 'Law & Legal Practice',
    description: 'Study and practice of legal systems, justice, and the law.'
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Environmental Stewardship',
    description: 'Study of farming, plant cultivation, animal husbandry, and sustainable land use.'
  },
  {
    id: 'sports_recreation',
    name: 'Sports, Fitness & Recreation',
    description: 'Study and practice of physical activity, athletics, and recreational pursuits.'
  },
  {
    id: 'hospitality_tourism',
    name: 'Hospitality, Tourism & Events',
    description: 'Study of hospitality services, travel, and event management.'
  },
  {
    id: 'transportation_logistics',
    name: 'Transportation, Logistics & Supply Chain',
    description: 'Study of movement of goods and people, and supply chain management.'
  },
  {
    id: 'environmental_conservation',
    name: 'Environmental Science & Conservation',
    description: 'Study of environmental systems and protection of natural resources.'
  },
  {
    id: 'social_services',
    name: 'Social Services & Human Services',
    description: 'Study and practice of supporting vulnerable populations and social welfare.'
  }
];

export default function PhaseOne({ initialRatings, onSave, onComplete }) {
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

  const ratedCount = Object.keys(ratings).length;
  const hasEnoughRatings = ratedCount >= 5;
  const allRated = SUBJECTS.every(s => ratings[s.id] !== undefined);
  const averageRating = ratedCount > 0
    ? (Object.values(ratings).reduce((a, b) => a + b, 0) / ratedCount).toFixed(1)
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
      {hasEnoughRatings && (
        <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Interests So Far</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {SUBJECTS.filter(s => ratings[s.id] !== undefined).map(subject => (
              <div key={subject.id} className="text-center">
                <p className="text-sm text-gray-600 font-medium">{subject.name}</p>
                <p className="text-2xl font-bold text-indigo-600">{ratings[subject.id]}/10</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-6">
            <p className="text-gray-600 mb-2">Your Average Interest ({ratedCount}/{SUBJECTS.length} rated):</p>
            <p className="text-4xl font-bold text-indigo-600 mb-4">{averageRating}/10</p>
            <p className="text-gray-600 text-sm mb-6">
              ✓ Your ratings have been saved. Phase 2 will narrow down your interests to more specific paths.
            </p>

            {onComplete && (
              <button
                onClick={onComplete}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                Next: Get More Specific →
              </button>
            )}
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
