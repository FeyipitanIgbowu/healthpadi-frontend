'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants/colors';
import { FACILITIES, PROCEDURES, LAGOS_LGAS } from '@/lib/constants/data';

interface HomeScreenProps {
  user: { name: string; email: string } | null;
  onNavigateSearch: (procedure?: string, location?: string) => void;
}

export default function HomeScreen({ user, onNavigateSearch }: HomeScreenProps) {
  const [procedure, setProcedure] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (procedure && location) {
      onNavigateSearch(procedure, location);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
      {/* Header Greeting */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold" style={{ color: COLORS.dark }}>
          Hello {user?.name || 'User'}
        </h1>
      </div>

      {/* Search Card */}
      <div
        className="mx-6 mb-6 p-5 rounded-2xl"
        style={{ backgroundColor: COLORS.lightGray }}
      >
        <p className="text-xs font-bold mb-3" style={{ color: COLORS.dark }}>
          WHAT PROCEDURE?
        </p>
        <select
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
          className="w-full px-4 py-3 rounded-xl mb-4 border text-sm"
          style={{
            borderColor: COLORS.lightBorder,
            backgroundColor: COLORS.white,
          }}
        >
          <option value="">Select a procedure</option>
          {PROCEDURES.map((proc) => (
            <option key={proc} value={proc}>
              {proc}
            </option>
          ))}
        </select>

        <p className="text-xs font-bold mb-3" style={{ color: COLORS.dark }}>
          YOUR LOCATION (LGA)
        </p>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-3 rounded-xl mb-4 border text-sm"
          style={{
            borderColor: COLORS.lightBorder,
            backgroundColor: COLORS.white,
          }}
        >
          <option value="">Select an LGA</option>
          {LAGOS_LGAS.map((lga) => (
            <option key={lga} value={lga}>
              {lga}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          disabled={!procedure || !location}
          className="w-full py-3 rounded-xl font-bold text-white text-sm transition-opacity disabled:opacity-50"
          style={{ backgroundColor: COLORS.primary }}
        >
          SEARCH
        </button>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div
            className="p-4 rounded-2xl text-center"
            style={{ backgroundColor: COLORS.lightGray }}
          >
            <p className="text-xl font-bold" style={{ color: COLORS.primary }}>
              500+
            </p>
            <p className="text-xs mt-1" style={{ color: COLORS.gray }}>
              Facilities
            </p>
          </div>
          <div
            className="p-4 rounded-2xl text-center"
            style={{ backgroundColor: COLORS.lightGray }}
          >
            <p className="text-xl font-bold" style={{ color: COLORS.accent }}>
              1.2k
            </p>
            <p className="text-xs mt-1" style={{ color: COLORS.gray }}>
              Searches
            </p>
          </div>
          <div
            className="p-4 rounded-2xl text-center"
            style={{ backgroundColor: COLORS.lightGray }}
          >
            <p className="text-xl font-bold" style={{ color: COLORS.danger }}>
              3.4k
            </p>
            <p className="text-xs mt-1" style={{ color: COLORS.gray }}>
              Prices
            </p>
          </div>
        </div>
      </div>

      {/* Nearby Facilities Section */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-bold mb-4" style={{ color: COLORS.dark }}>
          Nearby Facilities
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {FACILITIES.slice(0, 3).map((facility) => (
            <div
              key={facility.id}
              className="min-w-max w-64 p-4 rounded-2xl border"
              style={{
                borderColor: COLORS.lightBorder,
                backgroundColor: COLORS.white,
              }}
            >
              <p className="font-bold text-sm mb-1" style={{ color: COLORS.dark }}>
                {facility.name}
              </p>
              <p className="text-xs mb-2" style={{ color: COLORS.gray }}>
                {facility.city}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs px-2 py-1 rounded-full font-bold"
                  style={{
                    backgroundColor:
                      facility.type === 'Public' ? COLORS.lightGray : COLORS.lightGray,
                    color: COLORS.dark,
                  }}
                >
                  {facility.type}
                </span>
              </div>
              <button
                className="w-full py-2 rounded-lg font-bold text-xs text-white transition-opacity active:opacity-60"
                style={{ backgroundColor: COLORS.primary }}
              >
                VIEW DETAILS
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
