import React, { useState, useContext, useEffect } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebaseConfig';
import { ScoreContext } from '../contexts/ScoreContext.jsx';
import { SUBCATEGORIES, getSubcategoriesBySubject } from '../data/subcategories';
import { countProgress, getProgressBySubject } from '../utils/scoring';
import TabNavigation from './PhaseTwo/TabNavigation';
import SubcategoryGrid from './PhaseTwo/SubcategoryGrid';
import ProgressBar from './PhaseTwo/ProgressBar';
import SaveIndicator from './PhaseTwo/SaveIndicator';
import PhaseTwoResults from './PhaseTwoResults';

const SUBJECTS = [
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' },
  { id: 'history', name: 'History' },
  { id: 'mathematics', name: 'Mathematics' },
  { id: 'art_design', name: 'Art & Design' },
  { id: 'writing_literature', name: 'Writing & Literature' },
  { id: 'technology_computing', name: 'Technology & Computing' }
];

export default function PhaseTwo({ userId, onPhaseChange }) {
  const { phase2Ratings, setPhase2Ratings } = useContext(ScoreContext);
  const [activeTab, setActiveTab] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const activeSubject = SUBJECTS[activeTab];
  const activeSubcategories = getSubcategoriesBySubject(activeSubject.id);
  const { rated, total } = countProgress(phase2Ratings);
  const progressBySubject = getProgressBySubject(phase2Ratings);

  // Auto-save to Firebase
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(phase2Ratings).length > 0) {
        handleSaveToFirebase();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [phase2Ratings]);

  const handleSaveToFirebase = async () => {
    if (!userId) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      await set(ref(db, `users/${userId}/phase2/ratings`), phase2Ratings);
      await set(ref(db, `users/${userId}/phase2/timestamp`), Date.now());
    } catch (err) {
      console.error('Firebase save failed:', err);
      setSaveError('Failed to save ratings. Retrying...');
      // Retry after 5 seconds
      setTimeout(() => handleSaveToFirebase(), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRatingChange = (subcategoryId, rating) => {
    setPhase2Ratings(prev => ({
      ...prev,
      [subcategoryId]: rating
    }));
  };

  if (showResults) {
    return (
      <PhaseTwoResults
        onBack={() => setShowResults(false)}
        onNext={() => onPhaseChange && onPhaseChange('phase3')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's Get More Specific
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Phase 2: Explore subcategories within each subject
          </p>
          <p className="text-sm text-gray-500">
            Rate the areas that interest you most
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar rated={rated} total={total} />

        {/* Tab Navigation */}
        <TabNavigation
          subjects={SUBJECTS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          progressBySubject={progressBySubject}
        />

        {/* Subcategory Grid */}
        <SubcategoryGrid
          subcategories={activeSubcategories}
          ratings={phase2Ratings}
          onRatingChange={handleRatingChange}
          subject={activeSubject}
        />

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => onPhaseChange && onPhaseChange('phase1')}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition"
          >
            ← Back to Phase 1
          </button>

          {rated > 0 && (
            <button
              onClick={() => setShowResults(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
            >
              See Results →
            </button>
          )}
        </div>

        {/* Save Indicator */}
        <SaveIndicator
          isSaving={isSaving}
          error={saveError}
          onRetry={handleSaveToFirebase}
        />
      </div>
    </div>
  );
}
