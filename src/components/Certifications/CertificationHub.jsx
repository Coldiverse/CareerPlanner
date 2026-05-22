import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { ref, get, set } from 'firebase/database';
import CertificationRating from './CertificationRating';
import CertificationDirectory from './CertificationDirectory';

export default function CertificationHub({
  userId,
  onPhaseChange,
  onReset,
  isSharedView,
}) {
  // Determine initial view from hash: #/certifications (rating) or #/certifications-list (directory)
  const getInitialView = () => {
    const hash = window.location.hash.slice(1);
    return hash.startsWith('/certifications-list') ? 'directory' : 'rating';
  };
  const [certView, setCertView] = useState(getInitialView);
  const [certRatings, setCertRatings] = useState({});
  const [loadingCerts, setLoadingCerts] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Load cert ratings on mount
  useEffect(() => {
    if (!userId) return;

    const loadCertRatings = async () => {
      setLoadingCerts(true);
      try {
        const snap = await get(ref(db, `users/${userId}/certifications/ratings`));
        if (snap.exists()) {
          setCertRatings(snap.val());
        }
      } catch (err) {
        console.warn('Could not load cert ratings:', err);
      } finally {
        setLoadingCerts(false);
      }
    };

    loadCertRatings();
  }, [userId]);

  // Auto-save with 500ms debounce
  useEffect(() => {
    if (Object.keys(certRatings).length === 0) return;
    if (isSharedView) return;

    const timer = setTimeout(async () => {
      setIsSaving(true);
      setSaveError(null);
      try {
        await set(ref(db, `users/${userId}/certifications/ratings`), certRatings);
        await set(ref(db, `users/${userId}/certifications/timestamp`), Date.now());
      } catch (err) {
        console.error('Cert save failed:', err);
        setSaveError('Failed to save. Please try again.');
      } finally {
        setIsSaving(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [certRatings, userId, isSharedView]);

  const handleRatingChange = (certId, value) => {
    setCertRatings((prev) => ({ ...prev, [certId]: value }));
  };

  if (loadingCerts) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-300 mb-4">
              Collin College Certifications
            </h1>
            <p className="text-lg text-gray-400">Loading...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
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

  return (
    <>
      {certView === 'rating' ? (
        <CertificationRating
          userId={userId}
          certRatings={certRatings}
          onRatingChange={handleRatingChange}
          onViewClasses={() => setCertView('directory')}
          onBack={() => onPhaseChange('phase3')}
          isSharedView={isSharedView}
          isSaving={isSaving}
          saveError={saveError}
        />
      ) : (
        <CertificationDirectory onBack={() => setCertView('rating')} />
      )}
    </>
  );
}
