import React, { useState, useEffect } from 'react';

export default function SaveIndicator({ isSaving, error, onRetry }) {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (isSaving) {
      setShowSaved(false);
    } else if (!error) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, error]);

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2 z-50">
      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <span className="text-sm font-medium">{error}</span>
          <button
            onClick={onRetry}
            className="ml-2 px-3 py-1 bg-red-700 hover:bg-red-800 rounded text-xs font-semibold transition"
          >
            Retry
          </button>
        </div>
      )}

      {isSaving && !error && (
        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span className="text-sm font-medium">Saving...</span>
        </div>
      )}

      {showSaved && !isSaving && !error && (
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse flex items-center gap-2">
          <span className="text-lg">✓</span>
          <span className="text-sm font-medium">Saved</span>
        </div>
      )}
    </div>
  );
}
