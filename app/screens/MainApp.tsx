'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants/colors';
import HomeScreen from './tabs/HomeScreen';
import SearchScreen from './tabs/SearchScreen';
import SubmitPriceScreen from './tabs/SubmitPriceScreen';
import ProfileScreen from './tabs/ProfileScreen';

type Tab = 'home' | 'search' | 'submit' | 'profile';

interface MainAppProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export default function MainApp({ user, onLogout }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [searchParams, setSearchParams] = useState<{ procedure?: string; location?: string }>({});

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            user={user}
            onNavigateSearch={(procedure?: string, location?: string) => {
              setSearchParams({ procedure, location });
              setActiveTab('search');
            }}
          />
        );
      case 'search':
        return <SearchScreen procedure={searchParams.procedure} location={searchParams.location} onEdit={() => setActiveTab('home')} />;
      case 'submit':
        return <SubmitPriceScreen />;
      case 'profile':
        return <ProfileScreen user={user} onLogout={onLogout} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ paddingBottom: '80px' }}>
      {/* Content */}
      {renderContent()}

      {/* Bottom Tab Navigator */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-around py-3 border-t"
        style={{
          backgroundColor: COLORS.white,
          borderColor: COLORS.lightBorder,
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        }}
      >
        <button
          onClick={() => setActiveTab('home')}
          className="flex flex-col items-center gap-1 transition-opacity active:opacity-60"
        >
          <span className="text-2xl">🏠</span>
          <span
            className="text-xs font-bold"
            style={{ color: activeTab === 'home' ? COLORS.primary : COLORS.gray }}
          >
            Home
          </span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
          className="flex flex-col items-center gap-1 transition-opacity active:opacity-60"
        >
          <span className="text-2xl">🔍</span>
          <span
            className="text-xs font-bold"
            style={{ color: activeTab === 'search' ? COLORS.primary : COLORS.gray }}
          >
            Search
          </span>
        </button>

        <button
          onClick={() => setActiveTab('submit')}
          className="flex flex-col items-center justify-center"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center -mt-6 shadow-lg transition-opacity active:opacity-60"
            style={{ backgroundColor: COLORS.primary }}
          >
            <span className="text-2xl text-white">+</span>
          </div>
          <span
            className="text-xs font-bold mt-2"
            style={{ color: activeTab === 'submit' ? COLORS.primary : COLORS.gray }}
          >
            Submit
          </span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className="flex flex-col items-center gap-1 transition-opacity active:opacity-60"
        >
          <span className="text-2xl">👤</span>
          <span
            className="text-xs font-bold"
            style={{ color: activeTab === 'profile' ? COLORS.primary : COLORS.gray }}
          >
            Profile
          </span>
        </button>
      </div>
    </div>
  );
}
