'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants/colors';

interface RegisterScreenProps {
  onRegister: (firstName: string, email: string) => void;
  onNavigateLogin: () => void;
}

export default function RegisterScreen({ onRegister, onNavigateLogin }: RegisterScreenProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (!firstName || !lastName || !email || !password) return;

    setIsLoading(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    onRegister(firstName, email);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8" style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}>
      {/* Back Button */}
      <button
        onClick={onNavigateLogin}
        className="mb-6 text-2xl"
      >
        ←
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8" style={{ color: COLORS.dark }}>
        Create Account
      </h1>

      {/* First Name Input */}
      <div className="mb-4">
        <label className="text-xs font-bold mb-2 block" style={{ color: COLORS.dark }}>
          FIRST NAME
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Chioma"
          className="w-full px-4 py-3 rounded-xl border transition-colors"
          style={{
            borderColor: COLORS.lightBorder,
            backgroundColor: COLORS.lightGray,
          }}
        />
      </div>

      {/* Last Name Input */}
      <div className="mb-4">
        <label className="text-xs font-bold mb-2 block" style={{ color: COLORS.dark }}>
          LAST NAME
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Okonkwo"
          className="w-full px-4 py-3 rounded-xl border transition-colors"
          style={{
            borderColor: COLORS.lightBorder,
            backgroundColor: COLORS.lightGray,
          }}
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="text-xs font-bold mb-2 block" style={{ color: COLORS.dark }}>
          EMAIL ADDRESS
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl border transition-colors"
          style={{
            borderColor: COLORS.lightBorder,
            backgroundColor: COLORS.lightGray,
          }}
        />
      </div>

      {/* Password Input */}
      <div className="mb-8">
        <label className="text-xs font-bold mb-2 block" style={{ color: COLORS.dark }}>
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl border transition-colors"
          style={{
            borderColor: COLORS.lightBorder,
            backgroundColor: COLORS.lightGray,
          }}
        />
      </div>

      {/* Create Account Button */}
      <button
        onClick={handleCreateAccount}
        disabled={isLoading || !firstName || !lastName || !email || !password}
        className="w-full py-4 rounded-xl font-bold text-white mb-4 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        style={{ backgroundColor: COLORS.primary }}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        CREATE ACCOUNT
      </button>

      {/* Login Link */}
      <div className="text-center">
        <span className="text-sm" style={{ color: COLORS.gray }}>
          Already have an account?{' '}
        </span>
        <button
          onClick={onNavigateLogin}
          className="text-sm font-bold transition-opacity active:opacity-60"
          style={{ color: COLORS.primary }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
