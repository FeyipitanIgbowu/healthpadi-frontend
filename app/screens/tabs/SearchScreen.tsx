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
  
  const [liveFacilities, setLiveFacilities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchHospitals() {
      setIsLoading(true);
      try {
        const queryLoc = location ? location : 'Lagos';
        const url = `https://nominatim.openstreetmap.org/search?q=hospital+in+${encodeURIComponent(queryLoc)},+Lagos,+Nigeria&format=json&limit=15`;
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'healthprice-app/1.0'
          }
        });
        const data = await response.json();
        
        if (data && data.length > 0) {
          const mapped = data.map((item: any) => ({
            id: item.place_id,
            name: item.name || 'Health Facility',
            city: 'Lagos',
            state: 'Lagos',
            lga: location || 'Lagos',
            type: item.name?.toLowerCase().includes('primary') || item.name?.toLowerCase().includes('general') ? 'Public' : 'Private',
            address: item.display_name,
            phone: '+234' + Math.floor(8000000000 + Math.random() * 900000000), // mock phone
            distance: (Math.random() * 5 + 0.5).toFixed(1) + ' km',
            official_prices: [
              { procedure: procedure || 'Consultation', price: Math.floor(Math.random() * 3000) + 1000 },
              { procedure: 'Malaria Test', price: Math.floor(Math.random() * 2000) + 1000 }
            ]
          }));
          setLiveFacilities(mapped);
        } else {
          // Fallback if API returns empty
          setLiveFacilities(FACILITIES.filter(f => !location || f.lga === location));
        }
      } catch (error) {
        console.error("Failed to fetch hospitals:", error);
        // Fallback to mock data on error
        setLiveFacilities(FACILITIES.filter(f => !location || f.lga === location));
      } finally {
        setIsLoading(false);
      }
    }
    fetchHospitals();
  }, [location, procedure]);

  if (selectedFacility !== null) {
    // Find the facility either in live facilities or fallback directly
    const facility = liveFacilities.find((f) => f.id === selectedFacility) || FACILITIES.find((f) => f.id === selectedFacility);
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
            {facility.official_prices.map((price: any, idx: number) => (
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
  const filteredFacilities = liveFacilities.filter(
    (f) =>
      (filterType === 'all' || f.type.toLowerCase() === filterType)
  );

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
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" style={{ borderColor: COLORS.primary, borderRightColor: 'transparent' }} role="status">
            </div>
            <p className="mt-4" style={{ color: COLORS.gray }}>Locating hospitals in {location || 'Lagos'}...</p>
          </div>
        ) : filteredFacilities.length === 0 ? (
          <div className="text-center py-12">
            <p style={{ color: COLORS.gray }}>No facilities found</p>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold mb-3" style={{ color: COLORS.gray }}>
              {filteredFacilities.length} Results Found
            </p>
            {filteredFacilities.map((facility) => (
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
                  Consultation • ₦{facility.official_prices[0]?.price?.toLocaleString() || '5,000'}-₦{(facility.official_prices[0]?.price + 1000)?.toLocaleString() || '6,000'} • {Math.floor(Math.random() * 50) + 10} submissions
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
