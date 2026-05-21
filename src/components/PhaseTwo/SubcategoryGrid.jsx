import React from 'react';
import SubcategoryCard from './SubcategoryCard';

export default function SubcategoryGrid({ subcategories, ratings, onRatingChange, subject }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {subject.name} Subcategories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subcategories.map((subcategory) => (
          <SubcategoryCard
            key={subcategory.id}
            subcategory={subcategory}
            rating={ratings[subcategory.id] || 0}
            onRatingChange={onRatingChange}
          />
        ))}
      </div>
    </div>
  );
}
