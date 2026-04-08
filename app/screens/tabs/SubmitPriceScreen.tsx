'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants/colors';
import { FACILITIES, PROCEDURES } from '@/lib/constants/data';

export default function SubmitPriceScreen() {
  const [facility, setFacility] = useState('');
  const [procedure, setProcedure] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!facility || !procedure || !amount) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-2 text-center" style={{ color: COLORS.dark }}>
          Price Submitted!
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: COLORS.gray }}>
          Thank you for helping the community by sharing prices.
        </p>
        <button
          onClick={() => setShowSuccess(false)}
          className="px-8 py-3 rounded-xl font-bold text-white"
          style={{ backgroundColor: COLORS.primary }}
        >
          DONE
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
      {/* Header */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.dark }}>
          Submit a Price
        </h1>
        <p className="text-sm" style={{ color: COLORS.gray }}>
          Help others by sharing what you paid for healthcare
        </p>
      </div>

      {/* Facility Info Banner */}
      <div
        className="mx-6 mb-6 p-4 rounded-xl"
        style={{ backgroundColor: `${COLORS.primary}20` }}
      >
        <p className="text-xs font-bold mb-1" style={{ color: COLORS.primary }}>
          SELECTED FACILITY
        </p>
        <p className="text-sm font-bold" style={{ color: COLORS.primary }}>
          {facility ? FACILITIES.find(f => f.id.toString() === facility)?.name : 'Select a facility'}
        </p>
      </div>

      {/* Facility Selector */}
      <div className="px-6 mb-4">
        <label className="text-xs font-bold mb-2 block" style={{ color: COLORS.dark }}>
          SELECT FACILITY
        </label>
        <select
          value={facility}
          onChange={(e) => setFacility(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border text-sm"
          style={{
            borderColor: COLORS.lightBorder,
            backgroundColor: COLORS.lightGray,
          }}
        >
          <option value="">Choose a facility</option>
          {FACILITIES.map((f) => (
            <option key={f.id} value={f.id.toString()}>
              {f.name} - {f.city}
            </option>
          ))}
        </select>
      </div>

      {/* Procedure Selector */}
      <div className="px-6 mb-4">
        <label className="text-xs font-bold mb-2 block" style={{ color: COLORS.dark }}>
          SELECT PROCEDURE
        </label>
        <select
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border text-sm"
          style={{
            borderColor: COLORS.lightBorder,
            backgroundColor: COLORS.lightGray,
          }}
        >
          <option value="">Choose a procedure</option>
          {PROCEDURES.map((proc) => (
            <option key={proc} value={proc}>
              {proc}
            </option>
          ))}
        </select>
      </div>

      {/* Amount Input */}
      <div className="px-6 mb-4">
        <label className="text-xs font-bold mb-2 block" style={{ color: COLORS.dark }}>
          AMOUNT YOU WERE CHARGED
        </label>
        <div className="flex items-center" style={{ backgroundColor: COLORS.lightGray }}>
          <span className="px-4 py-3 font-bold" style={{ color: COLORS.dark }}>
            ₦
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="10,000"
            className="flex-1 px-2 py-3 bg-transparent outline-none border-0 text-sm"
          />
        </div>
      </div>

      {/* Date Picker */}
      <div className="px-6 mb-4">
        <label className="text-xs font-bold mb-2 block" style={{ color: COLORS.dark }}>
          DATE OF VISIT
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border text-sm"
          style={{
            borderColor: COLORS.lightBorder,
            backgroundColor: COLORS.lightGray,
          }}
        />
      </div>

      {/* Notes */}
      <div className="px-6 mb-8">
        <label className="text-xs font-bold mb-2 block" style={{ color: COLORS.dark }}>
          ADDITIONAL NOTES (OPTIONAL)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any extra details..."
          className="w-full px-4 py-3 rounded-xl border text-sm min-h-24"
          style={{
            borderColor: COLORS.lightBorder,
            backgroundColor: COLORS.lightGray,
          }}
        />
      </div>

      {/* Submit Button */}
      <div className="px-6 mb-8">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !facility || !procedure || !amount}
          className="w-full py-4 rounded-xl font-bold text-white transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 active:opacity-80"
          style={{ backgroundColor: COLORS.primary }}
        >
          {isLoading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          SUBMIT
        </button>
      </div>
    </div>
  );
}
