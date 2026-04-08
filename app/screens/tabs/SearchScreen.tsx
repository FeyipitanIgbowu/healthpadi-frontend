'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '@/lib/constants/colors';
import { FACILITIES, PROCEDURES } from '@/lib/constants/data';

interface SearchScreenProps {
  procedure?: string;
  location?: string;
  onSelectFacility?: (facilityId: number) => void;
}

export default function SearchScreen({ procedure: initialProcedure, location: initialLocation, onSelectFacility }: SearchScreenProps) {
  const [selectedFacility, setSelectedFacility] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'public' | 'private'>('all');
  const [procedure, setProcedure] = useState(initialProcedure || '');
  const [location, setLocation] = useState(initialLocation || '');

  if (selectedFacility !== null) {
    const facility = FACILITIES.find((f) => f.id === selectedFacility);
    if (!facility) return null;

    return (
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        {/* Back Button */}
        <div className="px-6 py-4 flex items-center">
          <button
            onClick={() => setSelectedFacility(null)}
            className="text-2xl"
          >
            ←
          </button>
        </div>

        {/* Facility Header */}
        <div className="px-6 mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.dark }}>
            {facility.name}
          </h1>
          <p className="text-sm mb-1" style={{ color: COLORS.gray }}>
            {facility.address}
          </p>
          <p className="text-sm mb-3" style={{ color: COLORS.gray }}>
            {facility.city}, {facility.state}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs px-3 py-1 rounded-full font-bold"
              style={{
                backgroundColor: COLORS.lightGray,
                color: COLORS.dark,
              }}
            >
              {facility.type}
            </span>
          </div>

          {/* Call Button */}
          <button
            onClick={() => window.location.href = `tel:${facility.phone}`}
            className="w-full py-3 rounded-xl font-bold text-white mb-4 transition-opacity active:opacity-60 flex items-center justify-center gap-2"
            style={{ backgroundColor: COLORS.primary }}
          >
            📞 {facility.phone}
          </button>
        </div>

        {/* Official Prices Table */}
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: COLORS.dark }}>
            Official Prices
          </h2>
          <div className="border rounded-xl overflow-hidden" style={{ borderColor: COLORS.lightBorder }}>
            {facility.official_prices.map((price, idx) => (
              <div
                key={idx}
                className={`px-4 py-3 flex justify-between items-center ${
                  idx % 2 === 0 ? '' : ''
                }`}
                style={{
                  backgroundColor: idx % 2 === 0 ? COLORS.white : COLORS.lightGray,
                  borderBottom: idx < facility.official_prices.length - 1 ? `1px solid ${COLORS.lightBorder}` : 'none',
                }}
              >
                <span className="text-sm font-medium" style={{ color: COLORS.dark }}>
                  {price.procedure}
                </span>
                <span className="text-sm font-bold" style={{ color: COLORS.primary }}>
                  ₦{price.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Price Button */}
        <div className="px-6 mb-8">
          <button
            className="w-full py-4 rounded-xl font-bold text-white transition-opacity active:opacity-60"
            style={{ backgroundColor: COLORS.primary }}
          >
            SUBMIT A PRICE
          </button>
        </div>
      </div>
    );
  }

  // Search Results View
  return (
    <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
      {/* Search Bar */}
      <div
        className="px-6 py-4 flex items-center gap-2 border-b"
        style={{ borderColor: COLORS.lightBorder }}
      >
        <div className="flex-1">
          <p className="text-xs font-bold mb-1" style={{ color: COLORS.gray }}>
            Search / Edit
          </p>
          <p className="text-sm font-bold" style={{ color: COLORS.dark }}>
            {procedure} {location ? `in ${location}` : 'in Lagos'}
          </p>
        </div>
        <button className="px-3 py-2 rounded-lg" style={{ backgroundColor: COLORS.lightGray }}>
          Edit
        </button>
      </div>

      {/* Filter Pills */}
      <div className="px-6 py-4 flex gap-2 border-b" style={{ borderColor: COLORS.lightBorder }}>
        {['all', 'public', 'private'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type as typeof filterType)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
              filterType === type ? 'text-white' : ''
            }`}
            style={{
              backgroundColor:
                filterType === type ? COLORS.primary : COLORS.lightGray,
              color: filterType === type ? 'white' : COLORS.dark,
            }}
          >
            {type === 'all' ? 'All' : type === 'public' ? 'Public' : 'Private'}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="px-6 py-4">
        {FACILITIES.filter(
          (f) =>
            filterType === 'all' ||
            f.type.toLowerCase() === filterType
        ).length === 0 ? (
          <div className="text-center py-12">
            <p style={{ color: COLORS.gray }}>No facilities found</p>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold mb-3" style={{ color: COLORS.gray }}>
              {FACILITIES.filter(
                (f) =>
                  filterType === 'all' ||
                  f.type.toLowerCase() === filterType
              ).length} Results Found
            </p>
            {FACILITIES.filter(
              (f) =>
                filterType === 'all' ||
                f.type.toLowerCase() === filterType
            ).map((facility) => (
              <div
                key={facility.id}
                onClick={() => setSelectedFacility(facility.id)}
                className="mb-4 p-4 rounded-2xl border cursor-pointer transition-opacity active:opacity-60"
                style={{
                  borderColor: COLORS.lightBorder,
                  backgroundColor: COLORS.white,
                }}
              >
                <p className="font-bold text-sm mb-1" style={{ color: COLORS.dark }}>
                  {facility.name}
                </p>
                <p className="text-xs mb-2" style={{ color: COLORS.gray }}>
                  {facility.address}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs" style={{ color: COLORS.gray }}>
                    {facility.distance} away
                  </span>
                  <span
                    className="text-xs px-2 py-1 rounded-full font-bold"
                    style={{
                      backgroundColor: COLORS.lightGray,
                      color: COLORS.dark,
                    }}
                  >
                    {facility.type}
                  </span>
                </div>
                <p className="text-xs mb-2" style={{ color: COLORS.gray }}>
                  Consultation • ₦5,000-₦6,000 • 45 submissions
                </p>
                <button
                  className="w-full py-2 rounded-lg font-bold text-xs text-white transition-opacity active:opacity-60"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  VIEW DETAILS
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
