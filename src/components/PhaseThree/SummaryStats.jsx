import React from 'react';

export default function SummaryStats({ stats = {} }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
      <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-indigo-600">
        <p className="text-gray-600 text-sm font-medium mb-2">Matched Careers</p>
        <p className="text-4xl font-bold text-indigo-600">{stats.totalMatches || 0}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
        <p className="text-gray-600 text-sm font-medium mb-2">Average Match</p>
        <p className="text-4xl font-bold text-green-600">{stats.avgScore || 'N/A'}/10</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
        <p className="text-gray-600 text-sm font-medium mb-2">Top Match Score</p>
        <p className="text-4xl font-bold text-blue-600">{stats.topScore || 0}/10</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
        <p className="text-gray-600 text-sm font-medium mb-2">Explore More</p>
        <p className="text-4xl font-bold text-purple-600">{stats.hiddenCount || 0}</p>
        <p className="text-xs text-gray-500 mt-1">Partial matches</p>
      </div>
    </div>
  );
}
