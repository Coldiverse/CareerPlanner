import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { ref, get, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { ScoreProvider } from './contexts/ScoreContext';
import PhaseOne from './components/PhaseOne';
import PhaseTwo from './components/PhaseTwo';
import PhaseThree from './components/PhaseThree';
import CertificationHub from './components/Certifications/CertificationHub';

export default function App() {
  const [userId, setUserId] = useState(null);
  const [phase1Ratings, setPhase1Ratings] = useState({});
  const [phase2Ratings, setPhase2Ratings] = useState({});
  const [currentPhase, setCurrentPhase] = useState('phase1');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSharedView, setIsSharedView] = useState(false);

  // Initialize or load user ID
  useEffect(() => {
    // Check for hash parameters
    const hash = window.location.hash.slice(1); // e.g. "certifications&uid=abc123"
    const hashParams = new URLSearchParams(hash);
    const isCertView = hashParams.has('certifications');
    const sharedUid = hashParams.get('uid');

    if (isCertView) {
      // Certifications view (new or shared)
      if (sharedUid) {
        setUserId(sharedUid);
        setIsSharedView(true);
      } else {
        const stored = localStorage.getItem('careerUserId');
        const uid = stored || uuidv4();
        if (!stored) localStorage.setItem('careerUserId', uid);
        setUserId(uid);
      }
      setCurrentPhase('certifications');
      setLoading(false);
      // CertificationHub loads its own Firebase data on mount
    } else if (sharedUid) {
      // Existing Phase 3 shared view
      setUserId(sharedUid);
      setIsSharedView(true);
      setCurrentPhase('phase3');
      loadUserData(sharedUid);
    } else {
      // Normal flow: check localStorage for existing user
      const storedUserId = localStorage.getItem('careerUserId');
      if (storedUserId) {
        setUserId(storedUserId);
        loadUserData(storedUserId);
      } else {
        const newUserId = uuidv4();
        localStorage.setItem('careerUserId', newUserId);
        setUserId(newUserId);
        setLoading(false);
      }
    }
  }, []);

  const loadUserData = async (userId) => {
    try {
      const phase1Ref = ref(db, `users/${userId}/phase1/ratings`);
      const phase1Snapshot = await get(phase1Ref);
      if (phase1Snapshot.exists()) {
        setPhase1Ratings(phase1Snapshot.val());
      }

      const phase2Ref = ref(db, `users/${userId}/phase2/ratings`);
      const phase2Snapshot = await get(phase2Ref);
      if (phase2Snapshot.exists()) {
        setPhase2Ratings(phase2Snapshot.val());
      }
    } catch (err) {
      console.warn('Could not load previous ratings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePhase1Ratings = async (newRatings) => {
    try {
      await set(ref(db, `users/${userId}/phase1/ratings`), newRatings);
      await set(ref(db, `users/${userId}/phase1/timestamp`), Date.now());
      setPhase1Ratings(newRatings);
    } catch (err) {
      setError('Failed to save ratings. Please try again.');
      console.error(err);
    }
  };

  const handlePhaseChange = (newPhase) => {
    setCurrentPhase(newPhase);
  };

  const handleReset = () => {
    if (window.confirm('Start over? This will clear all your ratings.')) {
      localStorage.removeItem('careerUserId');
      window.location.hash = '';
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-4">Career Path Explorer</h1>
            <p className="text-lg text-gray-400">Loading your career explorer...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                <div className="flex gap-2">
                  <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                  <div className="w-12 h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <ScoreProvider phase1Ratings={phase1Ratings} phase2Ratings={phase2Ratings}>
      <>
        {/* Top Navigation Bar */}
        <nav className="no-print sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-2 flex gap-2">
            <button
              onClick={() => handlePhaseChange('phase1')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                currentPhase !== 'certifications'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Career Explorer
            </button>
            <button
              onClick={() => handlePhaseChange('certifications')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                currentPhase === 'certifications'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              CC Certifications
            </button>
          </div>
        </nav>

        {/* Phase Content */}
        {currentPhase === 'phase1' && (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
              <PhaseOne
                initialRatings={phase1Ratings}
                onSave={handleSavePhase1Ratings}
                onComplete={() => handlePhaseChange('phase2')}
                onReset={handleReset}
              />
            </div>
          </div>
        )}

        {currentPhase === 'phase2' && (
          <PhaseTwo
            userId={userId}
            onPhaseChange={handlePhaseChange}
            onReset={handleReset}
          />
        )}

        {currentPhase === 'phase3' && (
          <PhaseThree
            userId={userId}
            onPhaseChange={handlePhaseChange}
            onReset={handleReset}
            isSharedView={isSharedView}
          />
        )}

        {currentPhase === 'certifications' && (
          <CertificationHub
            userId={userId}
            onPhaseChange={handlePhaseChange}
            onReset={handleReset}
            isSharedView={isSharedView}
          />
        )}
      </>
    </ScoreProvider>
  );
}
