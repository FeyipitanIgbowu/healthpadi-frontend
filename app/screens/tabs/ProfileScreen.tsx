'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants/colors';

interface ProfileScreenProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

const SETTINGS_OPTIONS = [
  { label: 'Edit Profile', icon: '✏️' },
  { label: 'My Submissions', icon: '📝' },
  { label: 'Notifications', icon: '🔔' },
  { label: 'Change Password', icon: '🔐' },
  { label: 'Help and Support', icon: '❓' },
  { label: 'About HealthPadi', icon: 'ℹ️' },
];

export default function ProfileScreen({ user, onLogout }: ProfileScreenProps) {
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);

  if (selectedSetting) {
    return (
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        {/* Back Button */}
        <div className="px-6 py-4 flex items-center">
          <button
            onClick={() => setSelectedSetting(null)}
            className="text-2xl"
          >
            ←
          </button>
        </div>

        {/* Setting Title */}
        <div className="px-6 mb-6">
          <h1 className="text-2xl font-bold" style={{ color: COLORS.dark }}>
            {selectedSetting}
          </h1>
        </div>

        {/* Placeholder Content */}
        <div className="px-6 text-center py-12">
          <p style={{ color: COLORS.gray }}>
            {selectedSetting} details will appear here
          </p>
        </div>
      </div>
    );
  }

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  return (
    <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
      {/* Profile Header */}
      <div className="px-6 py-8 text-center">
        {/* Avatar */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: COLORS.primary }}
        >
          <span className="text-4xl font-bold text-white">{initials}</span>
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-bold mb-1" style={{ color: COLORS.dark }}>
          {user?.name || 'User'}
        </h1>
        <p className="text-sm" style={{ color: COLORS.gray }}>
          {user?.email || 'email@example.com'}
        </p>
      </div>

      {/* Settings List */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold mb-4" style={{ color: COLORS.dark }}>
          Settings
        </h2>
        <div className="border rounded-xl overflow-hidden" style={{ borderColor: COLORS.lightBorder }}>
          {SETTINGS_OPTIONS.map((option, idx) => (
            <button
              key={option.label}
              onClick={() => setSelectedSetting(option.label)}
              className={`w-full px-4 py-4 flex items-center justify-between transition-opacity active:opacity-60 ${
                idx !== SETTINGS_OPTIONS.length - 1 ? 'border-b' : ''
              }`}
              style={{
                backgroundColor: idx % 2 === 0 ? COLORS.white : COLORS.lightGray,
                borderColor: COLORS.lightBorder,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{option.icon}</span>
                <span className="text-sm font-medium" style={{ color: COLORS.dark }}>
                  {option.label}
                </span>
              </div>
              <span style={{ color: COLORS.gray }}>›</span>
            </button>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-6 mb-8">
        <button
          onClick={() => {
            if (confirm('Are you sure you want to logout?')) {
              onLogout();
            }
          }}
          className="w-full py-4 rounded-xl font-bold text-white transition-opacity active:opacity-60"
          style={{ backgroundColor: COLORS.danger }}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
}
