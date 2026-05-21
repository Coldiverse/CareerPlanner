import React, { createContext, useState, useMemo, useRef } from 'react';
import { calculateAllScores, validatePhase1Ratings } from '../utils/scoring';

export const ScoreContext = createContext();

export function ScoreProvider({ children, phase1Ratings: initialPhase1Ratings = {}, phase2Ratings: initialPhase2Ratings = {} }) {
  const [phase2Ratings, setPhase2Ratings] = useState(initialPhase2Ratings);
  const phase1Ratings = useRef(validatePhase1Ratings(initialPhase1Ratings));

  // Memoized: recalculate only when phase2Ratings change
  const calculatedScores = useMemo(() => {
    return calculateAllScores(phase1Ratings.current, phase2Ratings);
  }, [phase2Ratings]);

  // Helper to update a single rating
  const updateRating = (subcategoryId, rating) => {
    setPhase2Ratings(prev => ({
      ...prev,
      [subcategoryId]: rating
    }));
  };

  // Helper to batch update ratings
  const batchUpdateRatings = (ratingsObj) => {
    setPhase2Ratings(prev => ({
      ...prev,
      ...ratingsObj
    }));
  };

  // Helper to reset phase 2 ratings
  const resetRatings = () => {
    setPhase2Ratings({});
  };

  const value = {
    phase1Ratings: phase1Ratings.current,
    phase2Ratings,
    setPhase2Ratings,
    updateRating,
    batchUpdateRatings,
    resetRatings,
    calculatedScores
  };

  return (
    <ScoreContext.Provider value={value}>
      {children}
    </ScoreContext.Provider>
  );
}
