import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { ref, get, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { ScoreProvider } from './contexts/ScoreContext';
import PhaseOne from './components/PhaseOne';
import PhaseTwo from './components/PhaseTwo';
import PhaseThree from './components/PhaseThree';

export default function App() {
  const [userId, setUserId] = useState(null);
  const [phase1Ratings, setPhase1Ratings] = useState({});
  const [currentPhase, setCurrentPhase] = useState('phase1');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize or load user ID
  useEffect(() => {
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
  }, []);

  const loadUserData = async (userId) => {
    try {
      const phase1Ref = ref(db, `users/${userId}/phase1/ratings`);
      const phase1Snapshot = await get(phase1Ref);
      if (phase1Snapshot.exists()) {
        setPhase1Ratings(phase1Snapshot.val());
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-indigo-600 font-medium">Loading...</p>
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
    <ScoreProvider phase1Ratings={phase1Ratings}>
      {currentPhase === 'phase1' && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-8">
            <PhaseOne
              initialRatings={phase1Ratings}
              onSave={handleSavePhase1Ratings}
              onComplete={() => handlePhaseChange('phase2')}
            />
          </div>
        </div>
      )}

      {currentPhase === 'phase2' && (
        <PhaseTwo
          userId={userId}
          onPhaseChange={handlePhaseChange}
        />
      )}

      {currentPhase === 'phase3' && (
        <PhaseThree
          userId={userId}
          onPhaseChange={handlePhaseChange}
        />
      )}
    </ScoreProvider>
  );
}
