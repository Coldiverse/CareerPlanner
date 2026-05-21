import React from 'react';
import CareerCard from './CareerCard';

export default function CareerGrid({ careers = [], savedCareers = [], onSelectCareer, onSaveCareer, isExplore = false }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {careers.map(career => (
        <CareerCard
          key={career.careerID}
          career={career}
          isSaved={savedCareers.includes(career.careerID)}
          onSelect={onSelectCareer}
          onSave={onSaveCareer}
          isExplore={isExplore}
        />
      ))}
    </div>
  );
}
