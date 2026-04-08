'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants/colors';

interface LoginScreenProps {
  onLogin: (email: string) => void;
  onNavigateRegister: () => void;
}

export default function LoginScreen({ onLogin, onNavigateRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) return;

    setIsLoading(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    onLogin(email);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8" style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}>
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 text-2xl"
      >
        ←
      </button>

      {/* Title and Subtitle */}
      <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.dark }}>
        Welcome Back
      </h1>
      <p className="text-sm mb-8" style={{ color: COLORS.gray }}>
        Sign in to your account
      </p>

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

      {/* Password Input with Toggle */}
      <div className="mb-2">
        <label className="text-xs font-bold mb-2 block" style={{ color: COLORS.dark }}>
          PASSWORD
        </label>
        <div className="flex items-center" style={{ backgroundColor: COLORS.lightGray }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="flex-1 px-4 py-3 rounded-l-xl border-0 bg-transparent outline-none"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="px-4 py-3 text-xl"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      </div>

      {/* Forgot Password Link */}
      <button
        onClick={() => alert('Password reset link sent to your email')}
        className="text-xs font-medium mb-8 transition-opacity active:opacity-60"
        style={{ color: COLORS.primary }}
      >
        Forgot Password?
      </button>

      {/* Sign In Button */}
      <button
        onClick={handleSignIn}
        disabled={isLoading || !email || !password}
        className="w-full py-4 rounded-xl font-bold text-white mb-4 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        style={{ backgroundColor: COLORS.primary }}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        SIGN IN
      </button>

      {/* Sign Up Link */}
      <div className="text-center">
        <span className="text-sm" style={{ color: COLORS.gray }}>
          Don&apos;t have an account?{' '}
        </span>
        <button
          onClick={onNavigateRegister}
          className="text-sm font-bold transition-opacity active:opacity-60"
          style={{ color: COLORS.primary }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
