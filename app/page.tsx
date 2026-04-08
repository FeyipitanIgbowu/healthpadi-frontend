'use client';

import { useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainApp from './screens/MainApp';

export type AuthState = 'splash' | 'login' | 'register' | 'authenticated';

export default function Home() {
  const [authState, setAuthState] = useState<AuthState>('splash');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleSplashStart = () => {
    setAuthState('login');
  };

  const handleLogin = (email: string) => {
    const firstName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
    setUser({ name: firstName, email });
    setAuthState('authenticated');
  };

  const handleRegister = (firstName: string, email: string) => {
    setUser({ name: firstName, email });
    setAuthState('authenticated');
  };

  const handleLogout = () => {
    setUser(null);
    setAuthState('login');
  };

  if (authState === 'splash') {
    return <SplashScreen onStart={handleSplashStart} />;
  }

  if (authState === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onNavigateRegister={() => setAuthState('register')}
      />
    );
  }

  if (authState === 'register') {
    return (
      <RegisterScreen
        onRegister={handleRegister}
        onNavigateLogin={() => setAuthState('login')}
      />
    );
  }

  return <MainApp user={user} onLogout={handleLogout} />;
}
