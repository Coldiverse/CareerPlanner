import React, { useState } from 'react';
import { CERTIFICATIONS } from '../../data/certifications';
import CertCard from './CertCard';

export default function CertificationRating({
  userId,
  certRatings,
  onRatingChange,
  onViewClasses,
  onBack,
  isSharedView,
  isSaving,
  saveError,
}) {
  const [expandedCertId, setExpandedCertId] = useState(null);
  const [shareToastShown, setShareToastShown] = useState(false);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#certifications&uid=${userId}`;
    navigator.clipboard.writeText(shareUrl);
    setShareToastShown(true);
    setTimeout(() => setShareToastShown(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Collin College Medical Certifications
          </h1>
          <p className="text-lg text-gray-600">
            Rate your interest in these healthcare certification programs to see which path might be right for you.
          </p>
        </div>

        {/* Shared View Banner */}
        {isSharedView && (
          <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg">
            <p className="text-yellow-800 font-semibold">
              Viewing someone's shared certification ratings —{' '}
              <button onClick={onBack} className="underline hover:font-bold">
                start your own exploration
              </button>
            </p>
          </div>
        )}

        {/* Top Actions */}
        <div className="mb-8 flex flex-wrap gap-3 justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {!isSharedView && (
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition text-sm"
              >
                Share My Ratings
              </button>
            )}
            <button
              onClick={onViewClasses}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition text-sm"
            >
              View All Classes →
            </button>
          </div>

          {/* Save Indicator */}
          {!isSharedView && (
            <div className="text-right">
              {isSaving && <p className="text-sm text-gray-600">Saving...</p>}
              {!isSaving && certRatings && Object.keys(certRatings).length > 0 && (
                <p className="text-sm text-green-600 font-semibold">✓ Saved</p>
              )}
              {saveError && <p className="text-sm text-red-600 font-semibold">{saveError}</p>}
            </div>
          )}
        </div>

        {/* Share Toast */}
        {shareToastShown && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse no-print z-50">
            ✓ Link copied to clipboard!
          </div>
        )}

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {CERTIFICATIONS.map((cert) => (
            <CertCard
              key={cert.id}
              cert={cert}
              rating={certRatings[cert.id] || 0}
              onRatingChange={onRatingChange}
              isExpanded={expandedCertId === cert.id}
              onToggleExpand={() =>
                setExpandedCertId(expandedCertId === cert.id ? null : cert.id)
              }
              isReadOnly={isSharedView}
            />
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center gap-4 pb-8">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
          >
            ← Career Results
          </button>
          <button
            onClick={onViewClasses}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            View All Classes →
          </button>
        </div>
      </div>
    </div>
  );
}
