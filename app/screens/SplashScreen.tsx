'use client';

import { COLORS } from '@/lib/constants/colors';

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-8">
      {/* Shield Icon with Plus */}
      <div className="mb-8">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ backgroundColor: COLORS.primary }}
        >
          <span className="text-5xl text-white">🛡️</span>
        </div>
      </div>

      {/* App Name */}
      <h1
        className="text-4xl font-bold text-center mb-2"
        style={{ color: COLORS.primary }}
      >
        HealthPadi
      </h1>

      {/* Tagline */}
      <p className="text-center text-sm mb-12" style={{ color: COLORS.gray }}>
        Compare healthcare costs in Nigeria
      </p>

      {/* Get Started Button */}
      <button
        onClick={onStart}
        className="w-full py-4 rounded-xl font-bold text-white mb-4 transition-opacity active:opacity-60"
        style={{ backgroundColor: COLORS.primary }}
      >
        GET STARTED
      </button>

      {/* Login Link */}
      <button
        onClick={onStart}
        className="text-sm font-medium transition-opacity active:opacity-60"
        style={{ color: COLORS.primary }}
      >
        Already have an account? Login
      </button>
    </div>
  );
}
